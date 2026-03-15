"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe, ShieldCheck, Share2, Award, Info, Database, BarChart3 } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface EnergyMetadata {
  totalDischarged: number; // kWh
  carbonOffset: number; // kg
  gridContributionScore: number;
  activeSessions: number;
  certId: string;
  tier: 'STABILIZER' | 'PROVIDER' | 'PILLAR' | 'OMEGA';
}

export default function EnergyAssetNFT({ metadata }: { metadata: EnergyMetadata }) {
  const { t } = useI18n();
  const [isFlipped, setIsFlipped] = useState(false);

  // 티어별 테마 색상 (에너지 테마: Blue/Cyan/Violet)
  const getTierColor = () => {
    switch (metadata.tier) {
      case 'STABILIZER': return 'text-cyan-400';
      case 'PROVIDER': return 'text-blue-400';
      case 'PILLAR': return 'text-indigo-400';
      case 'OMEGA': return 'text-violet-400';
      default: return 'text-white';
    }
  };

  const getGlowStyle = () => {
     const colors = {
        STABILIZER: 'rgba(34, 211, 238, 0.3)',
        PROVIDER: 'rgba(59, 130, 246, 0.3)',
        PILLAR: 'rgba(99, 102, 241, 0.3)',
        OMEGA: 'rgba(167, 139, 250, 0.4)'
     };
     return { backgroundColor: colors[metadata.tier] };
  };

  return (
    <div className="flex flex-col items-center gap-12 py-10">
      <div 
        className="relative w-[360px] h-[560px] perspective-[2000px] cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div 
          className="relative w-full h-full transition-all duration-700 preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front Side: Visual Asset */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-[3.5rem] bg-[#0a0a0c] border border-white/10 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
             {/* Dynamic Energy Aura */}
             <div 
               className="absolute inset-x-12 inset-y-24 blur-[120px] opacity-40 animate-pulse pointer-events-none"
               style={getGlowStyle()}
             ></div>

             <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                <header className="flex justify-between items-start">
                   <div>
                      <div className="flex items-center gap-2 mb-2">
                         <Zap size={14} className="text-blue-500" />
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
                           {t('energy_nft_grid_asset')}
                         </span>
                      </div>
                      <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase line-clamp-1">
                         {t('energy_nft_provision')}
                      </h3>
                   </div>
                   <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${getTierColor()}`}>
                         {metadata.tier}
                      </span>
                   </div>
                </header>

                <div className="flex-1 flex items-center justify-center">
                   <div className="relative w-64 h-64">
                      {/* Energy Core Visual */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="absolute inset-0 border border-white/5 rounded-full"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute inset-8 border border-blue-500/20 rounded-full"
                      />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <motion.div 
                           animate={{ scale: [1, 1.1, 1] }}
                           transition={{ repeat: Infinity, duration: 4 }}
                           className={`w-36 h-36 rounded-full flex items-center justify-center relative overflow-hidden`}
                         >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-violet-600/30 blur-xl"></div>
                            <Zap size={64} className={`${getTierColor()} relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]`} />
                         </motion.div>
                         <div className="mt-8 text-center">
                            <p className="text-5xl font-black italic text-white tracking-tighter">
                               {metadata.gridContributionScore}
                            </p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                              {t('energy_nft_impact_factor')}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <footer className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                           {t('energy_nft_provision')}
                         </p>
                         <p className="text-xl font-black italic text-white tracking-tighter">{metadata.totalDischarged} <span className="text-[10px]">kWh</span></p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-right">
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                           {t('energy_nft_sessions')}
                         </p>
                         <p className="text-xl font-black italic text-white tracking-tighter">{metadata.activeSessions}</p>
                      </div>
                   </div>

                   <div className="flex justify-between items-center text-[9px] font-black text-slate-600 uppercase tracking-widest border-t border-white/5 pt-6">
                      <span>{t('energy_nft_verified_chain')}</span>
                      <span>OZCAR v1.9</span>
                   </div>
                </footer>
             </div>
          </div>

          {/* Back Side: On-chain Detailed Registry */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-[3.5rem] bg-[#0d0d10] border border-blue-500/30 overflow-hidden rotate-y-180 p-10 flex flex-col">
             <header className="mb-10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <Database size={16} className="text-blue-500" />
                   <h4 className="text-xs font-black italic text-white uppercase tracking-widest">{t('energy_nft_registry')}</h4>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                   <Info size={14} />
                </div>
             </header>

             <div className="space-y-8 flex-1">
                <RegistryItem label={t('energy_nft_cert_id')} value={metadata.certId} />
                <RegistryItem label={t('energy_nft_contract')} value="0x72a...ff91" />
                <RegistryItem label={t('energy_nft_carbon_offset')} value={`${metadata.carbonOffset} kg CO2`} />
                <RegistryItem label={t('energy_nft_participation')} value="Premium (Level 4)" />
                
                <div className="pt-6 border-t border-white/5">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('energy_nft_historical_yield')}</p>
                   <div className="h-24 flex items-end gap-1 px-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm" style={{ height: `${20 + Math.random() * 80}%` }} />
                      ))}
                   </div>
                </div>
             </div>

             <div className="mt-8 space-y-4">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                   <Award size={24} className="text-blue-400" />
                   <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-tight">{t('energy_nft_governance_mult')}</p>
                      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{t('energy_nft_reward_bonus')}</p>
                   </div>
                </div>
                <p className="text-[8px] text-center text-slate-600 font-bold uppercase tracking-[0.2em]">
                   {t('energy_nft_registry').includes('Registry') ? 'Click to flip and view certificate visual' : '클릭하여 인증서 비주얼을 확인하세요'}
                </p>
             </div>
          </div>
        </motion.div>

        {/* Floating Tooltip Effect */}
        <div className="absolute -top-6 -right-6 bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white border-4 border-[#0a0c10] shadow-xl group-hover:scale-110 transition-transform">
           <Zap size={20} />
        </div>
      </div>

      <div className="flex gap-4">
         <button className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all shadow-xl">
            <BarChart3 size={16} />
            {t('v2g_view_marketplace_proof').includes('Market') ? 'Marketplace Analysis' : '마켓플레이스 분석'}
         </button>
         <button className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:bg-blue-500 transition-all">
            <Share2 size={16} />
            {t('energy_nft_list_sale')}
         </button>
      </div>
    </div>
  );
}

function RegistryItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
       <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-sm font-black italic text-white tracking-widest truncate">{value}</p>
    </div>
  );
}
