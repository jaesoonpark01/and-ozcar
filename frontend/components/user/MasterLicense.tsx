"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { QrCode, ShieldCheck, Award, Zap, Camera, Terminal } from "lucide-react";
import Image from "next/image";

interface User {
  name: string;
  avatar: string;
}

export default function MasterLicense({ user }: { user: User }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // 3D Tilt Effect
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
    <div className="perspective-1000 w-full max-w-md mx-auto aspect-[1.6/1] cursor-pointer group"
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         onClick={() => setIsFlipped(!isFlipped)}>
      
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full w-full h-full"
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] p-[2px] bg-gradient-to-br from-amber-200 via-yellow-600 to-amber-900 shadow-2xl">
          <div className="w-full h-full bg-[#0a0c10] rounded-[2.4rem] p-8 relative overflow-hidden">
            {/* Holographic Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:200%_100%] group-hover:animate-[shimmer_2s_infinite]"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                    <ShieldCheck className="text-amber-500" size={16} />
                  </div>
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Master Mechanic ID</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                    {user?.name || "Anonymous Master"}
                  </h2>
                  <p className="text-[9px] text-slate-500 mt-2 font-mono tracking-widest">OZ-MSTR-2026-X77</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl border-2 border-amber-500/50 p-1 bg-slate-800 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  {user?.avatar && (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="rounded-2xl grayscale group-hover:grayscale-0 transition-all object-cover"
                    />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-full border-4 border-[#0a0c10] shadow-lg">
                  <Zap size={10} className="text-white fill-current" />
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 relative z-10">
              <div className="space-y-1">
                <p className="text-[8px] text-slate-600 uppercase font-black tracking-[0.2em]">Specialization</p>
                <p className="text-sm font-black text-slate-300 italic uppercase">LFP Power Grid</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-slate-600 uppercase font-black tracking-[0.2em]">Trust Index</p>
                <div className="flex items-center gap-2 text-amber-500 font-black italic text-lg">
                   99.9% <Award size={16} />
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
               <span className="text-[8px] font-mono text-slate-600 tracking-tighter">BLOCKCHAIN VERIFIED PASSPORT v2.0</span>
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] p-[2px] bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl [transform:rotateY(180deg)]">
          <div className="w-full h-full bg-[#0a0c10] rounded-[2.4rem] p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
              <Terminal size={200} className="absolute -bottom-20 -right-20 text-white" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-black text-white italic uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Verification Data</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[8px] font-black text-slate-600 uppercase mb-2">Signature Root</p>
                    <p className="text-[10px] font-mono text-slate-400 break-all leading-relaxed">
                      0x${Array.from({ length: 42 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}
                    </p>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div>
                       <p className="text-[8px] font-black text-slate-500 uppercase">Contributions</p>
                       <p className="text-lg font-black text-white italic">728 Cases</p>
                    </div>
                    <Camera size={24} className="text-slate-600" />
                 </div>
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div className="text-[8px] font-mono text-slate-700 max-w-[150px] leading-tight uppercase">
                This digital asset is non-transferable and represents the owner's expertise in the ozcar ecosystem.
              </div>
              <div className="w-20 h-20 bg-white p-2 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <QrCode className="w-full h-full text-black" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Add these styles to globals.css or keep as inline if possible
// .perspective-1000 { perspective: 1000px; }
// .backface-hidden { backface-visibility: hidden; }
