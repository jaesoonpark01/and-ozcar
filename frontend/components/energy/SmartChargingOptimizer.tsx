"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Leaf, Shield, CheckCircle2, Zap, ArrowRight, Settings2 } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function SmartChargingOptimizer() {
  const { t } = useI18n();
  const [isOptimizerActive, setIsOptimizerActive] = useState(true);
  const [targetSOC, setTargetSOC] = useState(100);
  const [departureTime] = useState("08:30");

  return (
    <div className="bg-[#0c0c0e] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl p-10 md:p-14 min-h-[700px]">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
          <div className="flex-1">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-500">
                   <Shield size={20} />
                </div>
                <span className="text-[10px] font-black italic text-slate-500 uppercase tracking-[0.4em]">{t('charging_grid_aware')}</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">
               {t('charging_smart_title')}
             </h2>
             <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-6 max-w-md leading-relaxed">
                {t('charging_optimizer_desc_detail')}
             </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-3xl border border-white/5">
             <button 
               onClick={() => setIsOptimizerActive(true)}
               className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isOptimizerActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
             >
                {t('charging_mode_optimized')}
             </button>
             <button 
               onClick={() => setIsOptimizerActive(false)}
               className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!isOptimizerActive ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
             >
                {t('charging_mode_manual')}
             </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
           <div className="space-y-8 bg-white/5 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
              {/* Animated Background Pulse */}
              {isOptimizerActive && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute inset-x-0 top-0 h-40 bg-emerald-500/10 blur-3xl pointer-events-none"
                />
              )}

              <div className="relative z-10 space-y-8">
                 <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('charging_schedule_setup')}</h4>
                    <Settings2 size={14} className="text-slate-500 cursor-pointer hover:text-white" />
                 </div>

                 <div className="space-y-6">
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-all">
                       <div className="flex items-center gap-4">
                          <Calendar size={18} className="text-emerald-400" />
                          <span className="text-xs font-black italic text-white uppercase tracking-widest">{t('charging_departure_time')}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-white italic">{departureTime}</span>
                          <ArrowRight size={14} className="text-slate-700 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>

                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                       <div className="flex justify-between items-baseline mb-6">
                          <span className="text-xs font-black italic text-slate-500 uppercase tracking-widest">{t('charging_target_soc')}</span>
                          <span className="text-2xl font-black italic text-white tracking-tighter">{targetSOC}%</span>
                       </div>
                       <input 
                         type="range" 
                         min="50" 
                         max="100" 
                         value={targetSOC}
                         onChange={(e) => setTargetSOC(parseInt(e.target.value))}
                         className="w-full accent-emerald-500 bg-black/40 h-1.5 rounded-lg border-none"
                       />
                       <div className="flex justify-between mt-3 px-1 text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                          <span>{t('charging_health_mode')}</span>
                          <span>{t('charging_max_range')}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col gap-6">
              <div className="flex-1 bg-gradient-to-br from-emerald-600/10 via-transparent to-transparent p-10 rounded-[3rem] border border-emerald-500/10 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <Leaf size={32} className="text-emerald-500" />
                    <div className="text-right">
                       <p className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest mb-1">{t('charging_co2_avoided')}</p>
                       <p className="text-3xl font-black italic text-white tracking-tighter">142.5 kg</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={14} className="text-emerald-500" />
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{t('charging_balancing_participation')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={14} className="text-emerald-500" />
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{t('charging_offpeak_optimization')}</span>
                    </div>
                 </div>
              </div>

              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                       <Zap size={24} />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t('charging_saving_status')}</p>
                       <p className="text-xl font-black italic text-white tracking-tighter">-$42.80 <span className="text-[10px] text-emerald-500">{t('charging_this_month')}</span></p>
                    </div>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">{t('charging_status_active')}</div>
                 </div>
              </div>
           </div>
        </div>

        <section className="bg-white/5 p-10 rounded-[3rem] border border-white/5">
           <header className="flex justify-between items-center mb-10">
              <h4 className="text-xs font-black italic text-white uppercase tracking-[0.2em] flex items-center gap-3">
                 <Clock size={16} className="text-blue-400" />
                 {t('charging_optimization_timeline')}
              </h4>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{t('charging_next_24h')}</span>
           </header>

           {/* Timeline visualization */}
           <div className="relative h-24 flex items-end gap-2 px-2">
              {[...Array(24)].map((_, i) => {
                 const load = 30 + Math.sin(i / 3) * 30 + Math.random() * 20;
                 const isCharging = i > 1 && i < 6; // 새벽 시간대 충전 시뮬레이션
                 return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                       <div 
                         className={`w-full rounded-t-md transition-all duration-500 ${isCharging ? 'bg-emerald-500/40 border-t-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-white/5'}`} 
                         style={{ height: `${load}%` }}
                       />
                       <span className="text-[7px] font-bold text-slate-700 uppercase">{i}:00</span>
                    </div>
                 );
              })}
              
              {/* Tooltip Simulation */}
              <div className="absolute top-0 left-[15%] bg-emerald-600 px-4 py-2 rounded-xl text-[8px] font-black text-white uppercase tracking-widest shadow-xl">
                 {t('charging_peak_saving')}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
