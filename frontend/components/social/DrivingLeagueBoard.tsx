"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Zap, Users, MapPin, ArrowUpRight, Crown, Sparkles } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface Driver {
  id: string;
  name: string;
  score: number;
  efficiency: number; // %
  rank: number;
  isMVP?: boolean;
}

export default function DrivingLeagueBoard() {
  const { t } = useI18n();
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: 'CyberNeo', score: 2840, efficiency: 98.2, rank: 1, isMVP: true },
    { id: '2', name: 'EcoQueen', score: 2710, efficiency: 96.5, rank: 2 },
    { id: '3', name: 'OZC_Master', score: 2650, efficiency: 95.8, rank: 3 },
    { id: '4', name: 'VoltRunner', score: 2500, efficiency: 94.1, rank: 4 },
    { id: '5', name: 'GreenCloud', score: 2420, efficiency: 93.4, rank: 5 },
  ]);

  const [region, setRegion] = useState('Seoul Central');
  const [showReward, setShowReward] = useState(false);

  // 시뮬레이션: 순위 변동
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev => {
        const next = [...prev].map(d => ({
          ...d,
          score: d.score + Math.floor(Math.random() * 5)
        })).sort((a, b) => b.score - a.score);
        
        return next.map((d, i) => ({ ...d, rank: i + 1, isMVP: i === 0 }));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const claimLeagueReward = () => {
    setShowReward(true);
    setTimeout(() => setShowReward(false), 4000);
  };

  return (
    <div className="relative bg-[#0a0c10] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl min-h-[700px]">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 p-10 md:p-14">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500">
                  <Trophy size={20} />
               </div>
               <span className="text-[10px] font-black italic text-slate-500 uppercase tracking-[0.4em]">
                 {t('league_decentralized_social')}
               </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">
              {t('social_league_title').split(' ')[0]} <span className="text-blue-500">{t('social_league_title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <div className="flex items-center gap-3 mt-4">
                <MapPin size={14} className="text-slate-500" />
                <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    className="bg-transparent text-[10px] font-black text-slate-400 uppercase tracking-widest border-none focus:ring-0 cursor-pointer hover:text-white transition-colors"
                >
                    <option value="Seoul Central">{t('league_region_seoul')}</option>
                    <option value="Tokyo Bay">{t('league_region_tokyo')}</option>
                    <option value="Neo Vegas">{t('league_region_vegas')}</option>
                </select>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
             <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                <Users size={16} className="text-blue-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  1,204 {t('social_active_pilots')}
                </span>
             </div>
             <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
               {t('social_league_ends')}: <span className="text-rose-500">02D 14H 21M</span>
             </p>
          </div>
        </header>

        {/* Leaderboard Table */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {drivers.map((driver) => (
              <motion.div
                key={driver.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`group relative overflow-hidden p-6 md:p-8 rounded-[2rem] border transition-all duration-500 ${
                  driver.isMVP 
                  ? 'bg-gradient-to-r from-blue-600/10 via-white/5 to-transparent border-blue-500/30 shadow-[0_10px_40px_rgba(37,99,235,0.15)]' 
                  : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                }`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="w-12 text-center">
                       {driver.rank === 1 ? (
                         <Crown className="w-8 h-8 text-amber-400 mx-auto drop-shadow-glow" />
                       ) : (
                         <span className="text-2xl font-black italic text-slate-700 group-hover:text-slate-500 transition-colors uppercase tracking-tighter">
                            #{driver.rank}
                         </span>
                       )}
                    </div>
                    
                    <div className="flex items-center gap-6">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                         driver.isMVP ? 'bg-blue-600 border-blue-400' : 'bg-slate-800 border-white/10'
                       }`}>
                          <span className="text-sm font-black text-white">{driver.name[0]}</span>
                       </div>
                       <div>
                          <h4 className="text-lg font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                            {driver.name}
                            {driver.isMVP && <Sparkles size={14} className="text-blue-400" />}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{t('league_efficiency')}</span>
                            <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500" 
                                  style={{ width: `${driver.efficiency}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-black text-blue-400">{driver.efficiency}%</span>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                     <div className="hidden md:block text-right">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('social_impact_score')}</p>
                        <p className="text-xl font-black italic text-white tracking-tighter">{driver.score} pts</p>
                     </div>
                     <div className="bg-black/40 px-5 py-3 rounded-xl border border-white/5 flex flex-col items-center">
                        <Zap size={14} className="text-amber-500 mb-1" />
                        <span className="text-[10px] font-black text-white italic">{(driver.score / 100).toFixed(1)} OZC</span>
                     </div>
                     <ArrowUpRight size={20} className="text-slate-700 group-hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>

                {/* Rank Slide Background Effect (for MVP) */}
                {driver.isMVP && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <footer className="mt-16 flex flex-col xl:flex-row items-center justify-between gap-10 bg-white/5 p-10 rounded-[3rem] border border-white/5">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-inner">
                 <Medal size={32} />
              </div>
              <div>
                 <h4 className="text-lg font-black italic text-white uppercase tracking-tight mb-1">{t('social_current_standing')}</h4>
                 <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                    {t('social_top_percent', { percent: '8' })}. {t('social_reach_mvp')}.
                 </p>
              </div>
           </div>
           <button 
             onClick={claimLeagueReward}
             className="w-full xl:w-auto px-12 py-6 bg-blue-600 text-white rounded-3xl font-black italic tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3 active:scale-95"
           >
              {t('social_claim_reward')}
           </button>
        </footer>
      </div>

      {/* Reward Pop Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -100 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#141417] p-16 rounded-[4rem] border border-blue-500/30 shadow-[0_0_100px_rgba(37,99,235,0.4)] text-center w-[400px]"
          >
             <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-amber-500 blur-[40px] opacity-40 animate-pulse"></div>
                <div className="relative z-10 w-full h-full bg-amber-500 rounded-full flex items-center justify-center text-white">
                    <Zap size={48} />
                </div>
             </div>
             <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">{t('social_reward_issued')}</h3>
             <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.3em] mb-10">{t('social_gov_proof_confirmed')}</p>
             <div className="text-5xl font-black italic text-white tracking-tighter mb-4">
                +24.5 <span className="text-blue-500">OZC</span>
             </div>
             <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">{t('social_added_to_wallet')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
