"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/hooks/useI18n";
import { motion } from "framer-motion";
import {
    Diamond,
    TrendingUp,
    ShieldCheck,
    ExternalLink,
    ChevronRight,
    Target,
    PieChart as PieChartIcon,
    ArrowRightLeft,
    BarChart3,
    Activity,
    Zap,
    Lock
} from "lucide-react";
import { PricingEngine, PricingResult } from "@/services/PricingEngine";

const OFFERS = [
    { id: 1, type: 'insurance', buyer: 'Samsung Fire', reward: '5.2 OZC', grade: 'GOLD', demandTrend: [20, 45, 30, 80, 50, 90] },
    { id: 2, type: 'research', buyer: 'KAIST Lab', reward: '12.8 OZC', grade: 'DIAMOND', demandTrend: [40, 20, 60, 40, 85, 100] },
    { id: 3, type: 'mfg', buyer: 'Hyundai Motor', reward: '8.5 OZC', grade: 'DIAMOND', demandTrend: [10, 30, 20, 50, 40, 75] },
];

export default function DataMarketplace() {
    const { t } = useI18n();
    const [sellingId, setSellingId] = useState<number | null>(null);
    const [pricingResult, setPricingResult] = useState<PricingResult | null>(null);

    useEffect(() => {
        // 프리싱 엔진 시뮬레이션: 428.5 MB 데이터, 하드웨어 서명+ZKP 적용
        const res = PricingEngine.calculateAdvancedValue(428.5 * 1024, {
            reliability: 1.0,
            scarcity: 1.2,
            fidelity: 1.0,
            demand: 1.5,
            hasHardwareSignature: true,
            hasZKP: true
        });
        setPricingResult(res);
    }, []);

    const handleSell = (id: number) => {
        setSellingId(id);
        setTimeout(() => setSellingId(null), 2000);
    };

    return (
        <div className="bg-[#0a0b0d]/80 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            {/* Visual Flare */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors duration-1000"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
                <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2 flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                           <BarChart3 size={24} />
                        </div>
                        {t("hw_market_title")}
                    </h2>
                    <p className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] italic">{t("hw_market_subtitle")}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 rounded-2xl shadow-xl">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t("hw_market_demand_high")}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
                {/* Asset Summary Area */}
                <div className="space-y-8">
                    <div className="p-8 bg-gradient-to-br from-[#12141a] to-[#07080a] rounded-[2.5rem] border border-white/10 relative overflow-hidden group/card shadow-2xl hover:border-blue-500/30 transition-all duration-500">
                        <div className="absolute -right-8 -top-8 w-48 h-48 bg-blue-600/5 blur-[80px] group-hover/card:bg-blue-600/15 transition-all duration-700"></div>
                        
                        <div className="flex items-start justify-between mb-10 relative z-10">
                            <div>
                                <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em] mb-3 block">{t("hw_market_asset_diamond")}</span>
                                <h3 className="text-5xl font-black italic text-white flex items-baseline gap-2">
                                    428.5 <span className="text-sm font-black text-gray-600 italic uppercase">{t('market_megabytes')}</span>
                                </h3>
                            </div>
                            <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-500/20">
                                <Diamond className="text-blue-400 rotate-12" size={32} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                    <div className="p-1.5 bg-blue-500/10 rounded-lg"><ShieldCheck size={14} /></div>
                                    <span>ZKP Verified Asset</span>
                                </div>
                                {pricingResult && (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                           <div>
                                              <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Estimated Value</p>
                                              <p className="text-3xl font-black text-white italic italic tracking-tighter">{pricingResult.totalPriceUSDC.toLocaleString()} <span className="text-sm">USDC</span></p>
                                           </div>
                                           <div className="text-right">
                                              <p className="text-[10px] font-black text-blue-500 italic">≈ {pricingResult.totalPriceOZC.toLocaleString()} OZC</p>
                                           </div>
                                        </div>
                                        <div className="w-full h-px bg-white/5" />
                                        <div className="grid grid-cols-3 gap-2">
                                           {[
                                              { label: "Driver", val: pricingResult.revenueShare.driver, share: 70, color: "bg-blue-500" },
                                              { label: "Mechanic", val: pricingResult.revenueShare.mechanic, share: 15, color: "bg-slate-700" },
                                              { label: "DAO", val: pricingResult.revenueShare.daoTreasury, share: 15, color: "bg-slate-800" }
                                           ].map(item => (
                                              <div key={item.label} className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                                                 <span className="text-[7px] font-black text-gray-500 uppercase tracking-tighter mb-1">{item.label} ({item.share}%)</span>
                                                 <span className="text-[10px] font-black text-white">{item.val.toLocaleString()}</span>
                                              </div>
                                           ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Value Breakdown Mini Circle (Phase 14 New) */}
                            <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-3xl border border-white/5">
                               <div className="relative w-24 h-24 mb-4">
                                  <svg className="w-full h-full -rotate-90">
                                     <circle cx="48" cy="48" r="40" className="stroke-slate-800 stroke-[8] fill-none" />
                                     <circle cx="48" cy="48" r="40" className="stroke-blue-500 stroke-[8] fill-none" strokeDasharray="251" strokeDashoffset="75" />
                                     <circle cx="48" cy="48" r="40" className="stroke-cyan-400 stroke-[8] fill-none" strokeDasharray="251" strokeDashoffset="180" />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                     <PieChartIcon className="text-blue-500" size={20} />
                                  </div>
                               </div>
                               <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center">Data Quality Factors</p>
                               <div className="mt-3 space-y-1 w-full text-[7px] font-black uppercase">
                                  <div className="flex justify-between text-blue-400"><span>Reliability</span><span>100%</span></div>
                                  <div className="flex justify-between text-cyan-300"><span>Scarcity</span><span>85%</span></div>
                               </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pb-2">
                        <div className="p-6 bg-[#12141a]/50 rounded-[2rem] border border-white/5 hover:border-yellow-500/20 transition-all group/sub">
                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-2 italic">Historical (Gold)</p>
                            <div className="flex justify-between items-end">
                               <p className="text-2xl font-black text-yellow-500 italic">1.2 <span className="text-xs">GB</span></p>
                               <TrendingUp size={16} className="text-yellow-600 opacity-30 group-hover/sub:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <div className="p-6 bg-[#12141a]/50 rounded-[2rem] border border-white/5 hover:border-slate-500/20 transition-all group/sub">
                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-2 italic">Archival (Silver)</p>
                            <div className="flex justify-between items-end">
                               <p className="text-2xl font-black text-slate-400 italic">8.4 <span className="text-xs">GB</span></p>
                               <Activity size={16} className="text-slate-500 opacity-30 group-hover/sub:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offers Area */}
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                       <h3 className="text-xs font-black italic text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                           <Target size={16} className="text-blue-500" />
                           {t("hw_market_offer_title")}
                       </h3>
                       <Lock size={14} className="text-slate-700" />
                    </div>

                    <div className="space-y-4">
                        {OFFERS.map((offer) => (
                            <motion.div
                                key={offer.id}
                                onHoverStart={() => {}}
                                onHoverEnd={() => {}}
                                whileHover={{ x: 5 }}
                                className={`p-6 bg-gradient-to-r from-black/60 to-transparent border border-white/5 rounded-[2rem] flex flex-col md:flex-row items-center justify-between group hover:border-blue-500/30 transition-all relative overflow-hidden ${sellingId === offer.id ? 'opacity-50 grayscale' : ''}`}
                            >
                                <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                                    <div className={`p-4 rounded-2xl shadow-xl transition-transform group-hover:rotate-6 ${offer.type === 'insurance' ? 'bg-blue-600/10 text-blue-400' : offer.type === 'research' ? 'bg-purple-600/10 text-purple-400' : 'bg-emerald-600/10 text-emerald-400'}`}>
                                        <ExternalLink size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-black text-white italic uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{offer.buyer}</div>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <span className={`text-[8px] px-2 py-0.5 rounded-full font-black italic tracking-widest ${offer.grade === 'DIAMOND' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                                {offer.grade}
                                            </span>
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{offer.reward} {t("hw_market_per_sess")}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Demand Trend Chart Widget (Phase 14 New) */}
                                <div className="flex-1 px-8 hidden md:block">
                                   <div className="h-10 flex items-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                      {offer.demandTrend.map((val, idx) => (
                                         <motion.div 
                                           key={idx}
                                           initial={{ height: 0 }}
                                           animate={{ height: `${val}%` }}
                                           className="w-1.5 bg-blue-500/30 rounded-full group-hover:bg-blue-500" 
                                         />
                                      ))}
                                   </div>
                                </div>

                                <button
                                    onClick={() => handleSell(offer.id)}
                                    disabled={sellingId !== null}
                                    className="p-4 rounded-2xl hover:bg-white/5 transition-all active:scale-95 group/btn"
                                >
                                    {sellingId === offer.id ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        >
                                            <RefreshCwIcon size={24} className="text-blue-500" />
                                        </motion.div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                           <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest group-hover/btn:text-blue-500 transition-colors">Accept</span>
                                           <ChevronRight size={20} className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </div>
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full py-6 bg-blue-600/5 hover:bg-blue-600 text-blue-500 hover:text-slate-950 rounded-[1.8rem] border border-blue-500/20 shadow-2xl transition-all font-black uppercase italic tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 group">
                        <Zap size={16} className="animate-pulse" />
                        {t("hw_market_sell_button")}
                        <ArrowRightLeft size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function RefreshCwIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
    )
}
