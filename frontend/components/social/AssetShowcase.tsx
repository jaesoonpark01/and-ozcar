"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Maximize2, Trophy, Leaf, Zap, Crown } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface Asset {
  id: string;
  type: 'HISTORY' | 'ECO' | 'ENERGY' | 'LICENSE';
  name: string;
  tier: string;
  rarity: 'LEGENDARY' | 'EPIC' | 'RARE' | 'COMMON';
}

export default function AssetShowcase() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const assets: Asset[] = [
    { id: '1', type: 'HISTORY', name: 'Cyber Trunk v1', tier: 'S-Tier', rarity: 'LEGENDARY' },
    { id: '2', type: 'ECO', name: 'Carbon Resistor', tier: 'Forest', rarity: 'EPIC' },
    { id: '3', type: 'ENERGY', name: 'Grid Stabilizer', tier: 'Omega', rarity: 'RARE' },
    { id: '4', type: 'LICENSE', name: 'Master License', tier: 'Platinum', rarity: 'EPIC' },
    { id: '5', type: 'HISTORY', name: 'Alpha Chassis', tier: 'A-Tier', rarity: 'RARE' },
  ];

  const categories = [
    { id: 'ALL', label: t('showcase_category_all') },
    { id: 'HISTORY', label: t('showcase_category_history') },
    { id: 'ECO', label: t('showcase_category_eco') },
    { id: 'ENERGY', label: t('showcase_category_energy') },
    { id: 'LICENSE', label: t('showcase_category_license') },
  ];

  const filteredAssets = selectedCategory === 'ALL' 
    ? assets 
    : assets.filter(a => a.type === selectedCategory);

  const getRarityColor = (rarity: string) => {
     switch (rarity) {
        case 'LEGENDARY': return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
        case 'EPIC': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
        case 'RARE': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
        default: return 'text-slate-400 border-white/10 bg-white/5';
     }
  };

  return (
    <div className="bg-[#08080a] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl p-10 md:p-14 min-h-[800px]">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 mb-16">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                 <LayoutGrid size={18} />
              </div>
              <span className="text-[10px] font-black italic text-slate-500 uppercase tracking-[0.4em]">{t('showcase_metaverse_gallery')}</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">
             {t('showcase_digital_title').split(' ')[0]} <span className="text-purple-500">{t('showcase_digital_title').split(' ')[1]}</span>
           </h2>
           <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-4">
              {t('showcase_digital_desc')}
           </p>
        </div>

        <div className="flex items-center gap-6 bg-white/5 p-3 rounded-3xl border border-white/5">
           {categories.map(cat => (
             <button 
               key={cat.id}
               onClick={() => setSelectedCategory(cat.id)}
               className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                 selectedCategory === cat.id ? 'bg-white text-black' : 'text-slate-500 hover:text-white'
               }`}
             >
                {cat.label}
             </button>
           ))}
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         <AnimatePresence mode="popLayout">
            {filteredAssets.map((asset) => (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onMouseEnter={() => setHoveredId(asset.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative h-[450px] bg-white/5 rounded-[3rem] border border-white/5 overflow-hidden transition-all hover:bg-white/[0.08] hover:border-white/10"
              >
                 {/* Pedestal Top Visual */}
                 <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>

                 <div className="p-10 h-full flex flex-col justify-between items-center relative z-10">
                    <header className="w-full flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                       <div className="flex items-center gap-2">
                          <Crown size={12} className="text-blue-500" />
                          <span>{t(`showcase_category_${asset.type.toLowerCase()}` as any)}</span>
                       </div>
                       <div className={`px-4 py-1 rounded-full border ${getRarityColor(asset.rarity)}`}>
                          {asset.rarity}
                       </div>
                    </header>

                    {/* Asset Floating Visual Placeholder */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                       <motion.div 
                         animate={{ 
                           y: [0, -10, 0],
                           rotate: [0, 5, 0]
                         }}
                         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                         className="relative z-10"
                       >
                          {asset.type === 'HISTORY' && <Trophy size={80} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />}
                          {asset.type === 'ECO' && <Leaf size={80} className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]" />}
                          {asset.type === 'ENERGY' && <Zap size={80} className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]" />}
                          {asset.type === 'LICENSE' && <Crown size={80} className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]" />}
                       </motion.div>
                       {/* Floating Shadow */}
                       <div className="absolute bottom-[-20px] w-24 h-4 bg-black/40 blur-xl rounded-full scale-x-150"></div>
                    </div>

                    <div className="text-center w-full">
                       <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">
                          {asset.name}
                       </h4>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">
                          {t('showcase_tier')}: <span className="text-white">{asset.tier}</span>
                       </p>
                       <button className="w-full py-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center gap-3 group/btn hover:bg-white hover:text-black transition-all">
                          <Maximize2 size={16} className="group-hover/btn:scale-125 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest italic">{t('showcase_inspect_asset')}</span>
                       </button>
                    </div>
                 </div>

                 {/* Hover Overlay Detail */}
                 {hoveredId === asset.id && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute inset-0 bg-black/60 backdrop-blur-md p-10 flex flex-col justify-center pointer-events-none"
                   >
                      <div className="space-y-4">
                         <DetailRow label={t('showcase_asset_id')} value={`#OZ-${asset.id}002`} />
                         <DetailRow label={t('showcase_ownership')} value="OZC_Foundation" />
                         <DetailRow label={t('showcase_staked_ozc')} value="1,240 OZC" />
                         <DetailRow label={t('showcase_last_trade')} value="7 Days Ago" />
                      </div>
                   </motion.div>
                 )}
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      <footer className="mt-16 bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-12 rounded-[3.5rem] border border-white/10 flex flex-col xl:flex-row items-center justify-between gap-10 shadow-inner">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-white shadow-2xl rounded-3xl flex items-center justify-center text-black rotate-12 group hover:rotate-0 transition-transform cursor-pointer">
               <Crown size={36} />
            </div>
            <div>
               <h4 className="text-xl font-black italic text-white uppercase tracking-tight mb-2">{t('showcase_collector_status')}</h4>
               <p className="text-xs text-slate-500 font-medium uppercase tracking-[0.2em] leading-relaxed">
                  {t('showcase_collector_desc', { count: "5", rank: "28" })}
               </p>
            </div>
         </div>
         <div className="flex gap-4 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none px-12 py-6 bg-white text-black rounded-3xl font-black italic tracking-[0.2em] text-[11px] hover:bg-slate-200 transition-all uppercase shadow-2xl shadow-blue-500/10">
               {t('showcase_enter_virtual')}
            </button>
            <button className="flex-1 xl:flex-none px-12 py-6 bg-purple-600 text-white rounded-3xl font-black italic tracking-[0.2em] text-[11px] hover:bg-purple-500 transition-all uppercase shadow-2xl shadow-purple-600/20">
               {t('showcase_mint_collection')}
            </button>
         </div>
      </footer>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       <span className="text-xs font-black italic text-white tracking-widest">{value}</span>
    </div>
  );
}
