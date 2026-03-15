"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Cpu, Activity, ShieldCircle, Zap, Layers, Globe, MousePointer2 } from 'lucide-react';

export default function VehicleDigitalTwin() {
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<'SHELL' | 'INTERNAL' | 'DATA'>('SHELL');
  const [pulse, setPulse] = useState(false);

  // 시뮬레이션: 자동 회전 및 데이터 펄스
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
      setPulse(prev => !prev);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050507] rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl p-10 md:p-14 min-h-[800px] relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-blue-600/5 pointer-events-none"></div>

      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                 <Cpu size={20} />
              </div>
              <span className="text-[10px] font-black italic text-slate-500 uppercase tracking-[0.5em]">Neural Digital Twin v2.0</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
             Vehicle <span className="text-blue-500">Avatar</span>
           </h2>
        </div>

        <div className="flex gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
           {['SHELL', 'INTERNAL', 'DATA'].map((mode) => (
             <button
               key={mode}
               onClick={() => setViewMode(mode as any)}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 viewMode === mode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
               }`}
             >
               {mode}
             </button>
           ))}
        </div>
      </header>

      <div className="relative h-[500px] flex items-center justify-center">
        {/* Holographic Platform */}
        <div className="absolute bottom-20 w-[400px] h-[400px] border border-blue-500/10 rounded-full flex items-center justify-center">
           <div className="w-[300px] h-[300px] border border-blue-500/20 rounded-full animate-ping opacity-20"></div>
           <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>
        </div>

        {/* 3D Car Placeholder Visual using CSS/Framer */}
        <motion.div 
          className="relative z-20 w-[600px] flex items-center justify-center"
          style={{ rotateY: rotation }}
        >
          {/* Main Body Representation */}
          <div className="relative w-96 h-32">
             {/* Dynamic Layers based on ViewMode */}
             <AnimatePresence mode="wait">
                {viewMode === 'SHELL' && (
                   <motion.div 
                     key="shell"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.2 }}
                     className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-400/40 to-blue-600/20 rounded-full border-2 border-blue-400/30 flex items-center justify-center overflow-hidden"
                   >
                      <div className="w-full h-1/2 bg-white/5 backdrop-blur-sm border-b border-white/10"></div>
                   </motion.div>
                )}
                {viewMode === 'INTERNAL' && (
                   <motion.div 
                     key="internal"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.2 }}
                     className="absolute inset-0 border-2 border-amber-500/30 rounded-full flex items-center justify-around p-8"
                   >
                      <Zap className="text-amber-500 animate-pulse" size={40} />
                      <Cpu className="text-blue-400" size={40} />
                      <Activity className="text-emerald-500" size={40} />
                   </motion.div>
                )}
                {viewMode === 'DATA' && (
                   <motion.div 
                     key="data"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.2 }}
                     className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                   >
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-px bg-blue-500/20 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                      ))}
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Neural Stream Active</span>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Wheels / Nodes */}
             <div className="absolute -bottom-4 left-6 w-12 h-12 bg-black border-2 border-white/10 rounded-xl"></div>
             <div className="absolute -bottom-4 right-6 w-12 h-12 bg-black border-2 border-white/10 rounded-xl"></div>
          </div>

          {/* Data Callouts */}
          <div className="absolute -top-32 left-0 flex flex-col items-start gap-4">
             <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Engine SOH</p>
                <div className="flex items-center gap-3">
                   <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                   </div>
                   <span className="text-xs font-black italic text-white tracking-tighter">98.4%</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Telemetry Ring */}
        <motion.div 
           animate={{ rotate: rotation * -2 }}
           className="absolute w-[450px] h-[150px] border border-blue-500/10 rounded-[300px] perspective-[1000px] flex items-center justify-around"
           style={{ rotateX: 75 }}
        >
           {[...Array(4)].map((_, i) => (
             <div key={i} className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]"></div>
           ))}
        </motion.div>
      </div>

      <footer className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <StatusCard icon={<Activity size={18} />} label="Live Bio-Sync" value="CONNECTED" sub="Latency 14ms" active />
        <StatusCard icon={<Globe size={18} />} label="Metaverse Node" value="SEOUL_ID_41" sub="Cluster G-04" />
        <StatusCard icon={<ShieldCircle size={18} />} label="ZKP Security" value="VERIFIED" sub="Proof #99A1" />
      </footer>

      {/* Interactive Controls */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-4">
         <button className="p-4 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-transform group">
            <MousePointer2 size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </button>
      </div>
    </div>
  );
}

function StatusCard({ icon, label, value, sub, active }: { icon: any, label: string, value: string, sub: string, active?: boolean }) {
  return (
    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors">
       <div className="flex items-center gap-4 mb-4">
          <div className={`p-2 rounded-xl border ${active ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}>
             {icon}
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       </div>
       <p className={`text-2xl font-black italic tracking-tighter mb-1 ${active ? 'text-white' : 'text-slate-400'}`}>
          {value}
       </p>
       <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{sub}</p>
    </div>
  );
}
