"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, ArrowDownToLine, DollarSign, Battery, Activity, Info } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function V2GEnergyMarket() {
  const { t } = useI18n();
  const [gridLoad, setGridLoad] = useState(72); // %
  const [ozcYield, setOzcYield] = useState(1.4); // OZC/kWh
  const [isDischarging, setIsDischarging] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(84); // %
  const [dischargeLimit, setDischargeLimit] = useState(40); // %
  const [earnedToday, setEarnedToday] = useState(12.4);

  // 시뮬레이션: 그리드 부하 변동
  useEffect(() => {
    const interval = setInterval(() => {
      setGridLoad(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = Math.min(Math.max(prev + delta, 60), 95);
        // 부하가 높을수록 보상 수익률 상승
        setOzcYield(Number((1.0 + (next - 60) * 0.05).toFixed(2)));
        return next;
      });
      
      if (isDischarging && batteryLevel > dischargeLimit) {
        setBatteryLevel(prev => Math.max(prev - 0.1, dischargeLimit));
        setEarnedToday(prev => Number((prev + ozcYield * 0.01).toFixed(3)));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isDischarging, batteryLevel, dischargeLimit, ozcYield]);

  return (
    <div className="bg-[#0a0a0c] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl p-10 md:p-14 min-h-[700px]">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500">
                 <Zap size={18} />
              </div>
              <span className="text-[10px] font-black italic text-slate-500 uppercase tracking-[0.4em]">
                {t('v2g_market_title').includes('Market') ? 'Decentralized Energy Grid' : '분산형 에너지 그리드'}
              </span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">
             {t('v2g_market_title').split(' ')[0]} <span className="text-blue-500">{t('v2g_market_title').split(' ').slice(1).join(' ')}</span>
           </h2>
           <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-4">
              {t('v2g_market_desc')}
           </p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white/5 px-8 py-4 rounded-3xl border border-white/5 text-right">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('v2g_today_earnings')}</p>
              <p className="text-2xl font-black italic text-white tracking-tighter">{earnedToday} OZC</p>
           </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: Market Stats */}
        <div className="space-y-8">
           <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-transparent p-10 rounded-[3rem] border border-blue-500/20">
              <div className="relative z-10 flex justify-between items-end mb-8">
                 <div>
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">{t('v2g_grid_load')}</p>
                    <div className="flex items-baseline gap-4">
                       <span className="text-6xl font-black italic text-white tracking-tighter">{gridLoad}%</span>
                       {gridLoad > 85 && <span className="text-[10px] font-black text-rose-500 uppercase animate-pulse">{t('v2g_critical_demand')}</span>}
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('v2g_discharge_yield')}</p>
                    <p className="text-2xl font-black italic text-emerald-400 tracking-tighter">{ozcYield} OZC/kWh</p>
                 </div>
              </div>

              {/* Fake Graph simulation */}
              <div className="flex items-end gap-1.5 h-32 mb-4">
                 {[...Array(20)].map((_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        className={`flex-1 rounded-t-lg ${i === 19 ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-white/5'}`}
                      />
                    );
                 })}
              </div>
              <div className="flex justify-between items-center px-2">
                 <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">{t('v2g_market_depth')}</span>
                 <div className="flex items-center gap-2">
                    <TrendingUp size={12} className="text-blue-500" />
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{t('v2g_bullish_yield')}</span>
                 </div>
              </div>
           </div>

           <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500">
                    <Battery size={32} />
                 </div>
                 <div>
                    <h4 className="text-lg font-black italic text-white uppercase tracking-tight mb-1">{t('v2g_battery_health')}</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t('v2g_optimized_cycles')}</p>
                 </div>
              </div>
              <span className="text-2xl font-black italic text-blue-500 tracking-tighter">98.2%</span>
           </div>
        </div>

        {/* Right: Controls */}
        <div className="space-y-8 bg-white/5 p-10 rounded-[3rem] border border-white/5 shadow-inner">
           <div className="space-y-6">
              <div className="flex justify-between items-end">
                 <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">{t('v2g_config')}</h3>
                 <div className="flex items-center gap-2 text-slate-500">
                    <Info size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{t('v2g_smart_limit')}</span>
                 </div>
              </div>

              <div className="space-y-8 py-6">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">{t('v2g_current_level')}</span>
                       <span className="text-white">{batteryLevel.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                       <motion.div 
                         className="h-full bg-gradient-to-r from-blue-600 to-indigo-500" 
                         animate={{ width: `${batteryLevel}%` }}
                       />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-blue-500">{t('v2g_discharge_limit')}</span>
                       <span className="text-white">{dischargeLimit}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="80" 
                      value={dischargeLimit}
                      onChange={(e) => setDischargeLimit(parseInt(e.target.value))}
                      className="w-full accent-blue-600 bg-black/40 h-1.5 rounded-lg border-none"
                    />
                    <p className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
                       * {t('v2g_market_desc')} (Limit Check)
                    </p>
                 </div>
              </div>
           </div>

           <div className="pt-8 space-y-4">
              <button 
                onClick={() => setIsDischarging(!isDischarging)}
                className={`w-full py-8 rounded-3xl font-black italic tracking-[0.4em] text-[11px] uppercase transition-all flex items-center justify-center gap-4 ${
                  isDischarging 
                  ? 'bg-rose-500/10 border border-rose-500/30 text-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.1)]' 
                  : 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30'
                }`}
              >
                {isDischarging ? (
                  <>
                    <Activity size={18} className="animate-pulse" />
                    {t('v2g_stop_discharging')}
                  </>
                ) : (
                  <>
                    <ArrowDownToLine size={18} />
                    {t('v2g_discharge_to_grid')}
                  </>
                )}
              </button>
              
              <AnimatePresence>
                {isDischarging && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center gap-4 shadow-inner"
                   >
                      <Activity className="text-emerald-500 animate-pulse" size={16} />
                      <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex-1">
                         {t('v2g_generating_rewards')}: <span className="text-white italic">{(ozcYield * 0.05).toFixed(3)} OZC/min</span>
                      </p>
                      <ShieldCheck className="text-emerald-500" size={16} />
                   </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>

      <footer className="mt-16 bg-white/5 p-10 rounded-[3rem] border border-white/5 flex flex-col xl:flex-row items-center justify-between gap-10">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
               <DollarSign size={32} />
            </div>
            <div>
               <h4 className="text-lg font-black italic text-white uppercase tracking-tight mb-1">{t('v2g_energy_asset_cert')}</h4>
               <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                  {t('v2g_contribution_verified')}
               </p>
            </div>
         </div>
         <button className="w-full xl:w-auto px-12 py-6 bg-white text-black rounded-3xl font-black italic tracking-[0.2em] text-[11px] hover:bg-slate-200 transition-all uppercase">
            {t('v2g_view_marketplace_proof')}
         </button>
      </footer>
    </div>
  );
}

function ShieldCheck({ className, size }: { className?: string, size?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
