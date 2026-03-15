"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, AlertCircle, TrendingDown, CheckCircle2, Info, ArrowUpRight } from 'lucide-react';

interface BatteryHealthGuideProps {
  currentSOH: number;
  cycleCount?: number;
  lastChargedAt?: string;
  onOptimize?: () => void;
}

export default function BatteryHealthGuide({ 
  currentSOH = 92, 
  cycleCount = 450, 
  lastChargedAt = "2026-03-14",
  onOptimize 
}: BatteryHealthGuideProps) {
  
  // 가상의 수명 예측 데이터 생성
  const predictionData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      standard: 100 - (i * 0.8), // 일반적인 하락 곡선
      optimized: 100 - (i * 0.3), // 최적화 시 하락 곡선
    }));
  }, []);

  return (
    <div className="bg-[#0f1115] p-8 md:p-12 rounded-[3.5rem] border border-amber-500/10 relative overflow-hidden shadow-2xl group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-1000"></div>
      
      <div className="relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500">
                  <Battery size={20} className="fill-current" />
               </div>
               <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.3em]">Neural Health Report</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-3">
               Health <span className="text-amber-500">Optimization</span>
            </h2>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Advanced Battery Lifecycle Analysis v4.2</p>
          </div>
          <div className="flex items-center gap-6 bg-white/5 px-8 py-5 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current SOH</p>
              <p className="text-3xl font-black italic text-emerald-400 tracking-tighter">{currentSOH}%</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
               <p className="text-3xl font-black italic text-white tracking-tighter">OPTIMAL</p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12">
          {/* 수명 예측 그래프 시각화 (Simplified CSS representation) */}
          <div className="bg-black/40 rounded-[2.5rem] p-10 border border-white/5 shadow-inner relative overflow-hidden h-[340px] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-black italic uppercase text-white tracking-widest flex items-center gap-3">
                  <TrendingDown size={16} className="text-rose-500" />
                  Degradation Forecast
               </h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Standard</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                     <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Optimized</span>
                  </div>
               </div>
            </div>
            
            <div className="flex-1 flex items-end gap-1 px-2 mb-4">
               {predictionData.map((d, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${d.standard}%` }}
                        transition={{ delay: i * 0.05, duration: 1 }}
                        className="w-full bg-slate-800 rounded-t-sm opacity-30"
                    />
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${d.optimized}%` }}
                        transition={{ delay: i * 0.08, duration: 1.2 }}
                        className="w-full bg-gradient-to-t from-amber-600/50 to-amber-400 rounded-t-sm shadow-[0_-5px_15px_rgba(245,158,11,0.2)]"
                    />
                 </div>
               ))}
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Analysis Range: 12 Months Projection</p>
                <button className="text-[9px] text-amber-500 font-black uppercase tracking-widest hover:text-amber-400 flex items-center gap-2">
                    Detailed Metrics <ArrowUpRight size={10} />
                </button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black italic uppercase text-white tracking-tighter mb-4 flex items-center gap-3">
               <Zap size={20} className="text-amber-500" />
               Critical Care Tips
            </h3>
            
            <div className="space-y-4">
              {[
                { title: "80% Charge Limit", desc: "Recommended to maintain lithium stability.", icon: <CheckCircle2 className="text-emerald-500" />, active: true },
                { title: "Avoid DC Fast Charging", desc: "Excessive heat accelerates cathode wear.", icon: <AlertCircle className="text-amber-500" />, active: false },
                { title: "Stable Temperature", desc: "Keep vehicle in shade during extreme heat.", icon: <CheckCircle2 className="text-emerald-500" />, active: true }
              ].map((tip, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="bg-white/5 p-6 rounded-[1.8rem] border border-white/5 flex items-start gap-5 group/tip transition-all hover:bg-white/[0.08]"
                >
                  <div className="mt-1">{tip.icon}</div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-white tracking-widest mb-1">{tip.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase">{tip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={onOptimize}
              className="w-full py-6 mt-4 bg-gradient-to-r from-amber-600 to-amber-400 text-slate-950 font-black italic uppercase tracking-widest text-xs rounded-[1.8rem] shadow-[0_15px_30px_rgba(245,158,11,0.25)] hover:shadow-none hover:translate-y-1 transition-all flex items-center justify-center gap-3 group"
            >
              <Zap size={16} className="group-hover:animate-pulse" />
              Apply AI Optimization Profile
            </button>
          </div>
        </section>

        <footer className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-3xl">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                <Info size={24} />
             </div>
             <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Subscription Reward</span>
                <p className="text-sm font-black italic text-white tracking-tight uppercase">
                    Your <span className="text-blue-500">Gold Upgrade</span> saved 1.2% SOH this year.
                </p>
             </div>
          </div>
          <p className="text-[9px] font-black text-slate-600 italic uppercase tracking-[0.2em]">Next Audit: April 2026</p>
        </footer>
      </div>
    </div>
  );
}
