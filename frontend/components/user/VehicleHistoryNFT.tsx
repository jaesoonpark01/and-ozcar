"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Zap, History, Database, Cpu, Share2, Download, Info } from 'lucide-react';

interface NFTMetadata {
  vin: string;
  model: string;
  soh: number;
  maintenanceCount: number;
  dataContribution: string; // e.g. "4.2TB"
  mintedDate: string;
  ownerAddress: string;
}

export default function VehicleHistoryNFT({ metadata }: { metadata: NFTMetadata }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Mouse hover tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col items-center gap-12 group/nft">
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[340px] h-[520px] cursor-pointer"
      >
        {/* Hologram Card Front */}
        <motion.div 
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute inset-0 w-full h-full bg-[#141417] rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden backface-hidden"
        >
          {/* Hologram Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <header className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Cpu size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Ozcar Genesis</span>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-white/50 uppercase tracking-widest">
                Edition #001
              </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center py-10">
              <div className="relative w-48 h-48 mb-8">
                 <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 animate-pulse"></div>
                 <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="relative z-10 w-full h-full bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0d] border border-white/5 rounded-3xl flex items-center justify-center overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                    <Zap size={64} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                 </motion.div>
              </div>
              <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase text-center mb-1">
                {metadata.model}
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metadata.vin}</p>
            </div>

            <footer className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">SOH Score</p>
                    <p className="text-xl font-black italic text-emerald-400 tracking-tighter">{metadata.soh}%</p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Data Assets</p>
                    <p className="text-xl font-black italic text-blue-400 tracking-tighter">{metadata.dataContribution}</p>
                 </div>
              </div>
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mt-0.5">Verified Asset</span>
                 </div>
                 <p className="text-[9px] font-mono text-slate-600 truncate max-w-[120px]">{metadata.ownerAddress}</p>
              </div>
            </footer>
          </div>
        </motion.div>

        {/* Card Back (Metadata Details) */}
        <motion.div 
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 360 : 180 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute inset-0 w-full h-full bg-[#0a0a0d] rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden backface-hidden"
        >
          <div className="relative z-10 p-10 h-full flex flex-col">
            <h4 className="text-lg font-black italic text-white uppercase tracking-tighter mb-8 pb-4 border-b border-white/5 flex items-center gap-3">
              <History size={20} className="text-blue-500" />
              On-chain Registry
            </h4>
            
            <div className="space-y-6 flex-1">
              {[
                { label: "Asset ID", val: "OZ-NFT-2026-X88" },
                { label: "Maintenance Log", val: `${metadata.maintenanceCount} Records` },
                { label: "ZKP Checksums", val: "12 Passed" },
                { label: "Genesis Date", val: metadata.mintedDate },
                { label: "Market Category", val: "Premium EV Class" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                  <p className="text-xs font-bold text-white uppercase tracking-tight">{item.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/5 p-6 rounded-3xl border border-blue-500/10 mb-8 mt-auto">
               <div className="flex items-center gap-3 mb-2">
                  <Database size={14} className="text-blue-500" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">Metadata Hash</span>
               </div>
               <p className="text-[10px] font-mono text-blue-500/60 break-all leading-tight">
                0x7f45b912a2c3...f45812e9
               </p>
            </div>

            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">
              View on Explorer
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Controls */}
      <div className="flex gap-4">
        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-colors">
          <Share2 size={20} />
        </button>
        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-colors">
          <Download size={20} />
        </button>
        <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-600/20 active:scale-95 transition-all">
          List for Sale
        </button>
      </div>

      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] flex items-center gap-2">
        <Info size={12} />
        Click to Rotate Metadata
      </p>
    </div>
  );
}
