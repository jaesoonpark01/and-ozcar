"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Zap, ShieldCheck, Share2, Award, Info, Globe, TreePine } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface EcoMetadata {
  ecoScore: number;
  carbonSaved: number; // kg
  energyRecovered: number; // kWh
  totalDistance: number; // km
  tier: 'SEED' | 'LEAF' | 'TREE' | 'FOREST';
  lastUpdated: string;
}

export default function EcoDrivingNFT({ metadata }: { metadata: EcoMetadata }) {
  const { t } = useI18n();
  const [isHovered, setIsHovered] = useState(false);

  // 점수에 따른 테마 색상 결정
  const getThemeColor = () => {
    if (metadata.ecoScore > 90) return 'text-emerald-400';
    if (metadata.ecoScore > 75) return 'text-green-400';
    return 'text-lime-400';
  };

  const getGlowColor = () => {
    if (metadata.ecoScore > 90) return 'rgba(52, 211, 153, 0.4)';
    if (metadata.ecoScore > 75) return 'rgba(74, 222, 128, 0.3)';
    return 'rgba(163, 230, 53, 0.2)';
  };

  // 티어별 아이콘
  const TierIcon = () => {
    switch (metadata.tier) {
      case 'SEED': return <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 text-lime-400"><Leaf size={24} /></div>;
      case 'LEAF': return <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 text-emerald-400"><Leaf size={24} /></div>;
      case 'TREE': return <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30 text-emerald-400"><TreePine size={24} /></div>;
      case 'FOREST': return <div className="w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center border border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"><TreePine size={24} /></div>;
      default: return <Leaf size={24} />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-[340px] h-[520px] group/eco cursor-pointer"
        whileHover={{ y: -10 }}
      >
        {/* Dynamic Glowing Aura */}
        <div 
          className="absolute inset-x-10 inset-y-20 blur-[100px] opacity-40 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: getGlowColor() }}
        ></div>

        <div className="relative z-10 w-full h-full bg-[#0a0c0a] rounded-[3rem] border border-emerald-500/20 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
          {/* Nature Patterns Ornament */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full"></div>

          <div className="p-8 h-full flex flex-col justify-between">
            <header className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-500">
                  <Leaf size={14} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60">{t('eco_guardian_proof')}</span>
              </div>
              <Badge content={metadata.tier} />
            </header>

            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="relative w-56 h-56 mb-10">
                {/* Floating Eco Orb */}
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative z-10 w-full h-full rounded-full flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-500/5 rounded-full border border-emerald-500/30"></div>
                  <div className="absolute inset-4 bg-emerald-500/5 rounded-full blur-xl"></div>
                  
                  <div className="relative text-center">
                    <span className={`text-6xl font-black italic tracking-tighter ${getThemeColor()}`}>
                      {metadata.ecoScore}
                    </span>
                    <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest mt-1">{t('eco_score')}</p>
                  </div>

                  {/* Dynamic Particles simulation */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        rotate: 360,
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "linear" }}
                      className="absolute inset-[-10px] border border-emerald-500/10 rounded-full"
                    />
                  ))}
                </motion.div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase mb-1">
                  {t('climate_resistor')}
                </h3>
                <p className="text-[9px] text-emerald-500/40 font-bold uppercase tracking-[0.3em]">{t('dynamic_soulbound')}</p>
              </div>
            </div>

            <footer className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <StatItem label={t('co2_reduced')} value={`${metadata.carbonSaved}kg`} sub="Carbon Credit" />
                <StatItem label={t('energy_regen')} value={`${metadata.energyRecovered}kWh`} sub={t('v2g_ready')} />
              </div>

              <div className="bg-white/[0.03] p-5 rounded-[2rem] border border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <TierIcon />
                   <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-tight">{t('tier_transition')}</p>
                     <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                       {t('next_tier_pts', { pts: (metadata.ecoScore / 10).toFixed(0), nextTier: metadata.tier === 'FOREST' ? 'GODLIKE' : 'NEXT TIER' })}
                     </p>
                   </div>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                   <Award size={20} />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4">
         <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">
            <Globe size={14} />
            {t('global_registry')}
         </button>
         <button className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all">
            <Share2 size={14} />
            {t('share_proof')}
         </button>
      </div>
    </div>
  );
}

function StatItem({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-lg font-black italic text-white tracking-tighter">{value}</p>
        <span className="text-[7px] font-bold text-emerald-500/50 uppercase">{sub}</span>
      </div>
    </div>
  );
}

function Badge({ content }: { content: string }) {
  return (
    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em]">{content}</span>
    </div>
  );
}
