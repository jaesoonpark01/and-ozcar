"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, ShieldCheck, Zap, Info, ArrowUpRight, History, Award } from 'lucide-react'

interface DepreciationReportProps {
    report: {
        estimatedLoss: number
        marketAvgLoss: number
        defenseBonus: number
        aiAttentionScore: number
        confidenceScore: number
        reasoning: string
    }
}

export const DepreciationReport: React.FC<DepreciationReportProps> = ({ report }) => {
    const defensePercentage = (report.defenseBonus / report.marketAvgLoss) * 100
    const totalMarketLoss = report.estimatedLoss + report.defenseBonus

    return (
        <div className="mt-8 p-10 bg-[#0a0f1e] rounded-[3rem] border border-white/5 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none"></div>
            
            <div className="absolute top-8 right-8">
                <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 border border-emerald-500/20 shadow-lg">
                    <Zap className="w-3 h-3 fill-current" />
                    AI ENGINE v4.2 | {report.confidenceScore}% CONFIDENCE
                </div>
            </div>

            <div className="flex items-center gap-3 mb-10 text-slate-500">
                <div className="p-2 bg-white/5 rounded-lg">
                    <TrendingDown className="w-4 h-4" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Asset Depreciation Defense</h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
                <div>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-4">Estimated Depreciation</span>
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-6xl font-black italic tracking-tighter text-white">
                            -₩{(report.estimatedLoss / 10000).toLocaleString()}<span className="text-2xl not-italic ml-1">만</span>
                        </h2>
                        <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                            <ArrowUpRight size={14} />
                            <span className="text-xs font-black italic">{(defensePercentage).toFixed(1)}% Saved</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-2">Market Avg Loss</p>
                        <p className="text-sm font-black text-slate-400 italic">₩{(totalMarketLoss / 10000).toLocaleString()}만</p>
                    </div>
                    <div className="flex-1 p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-inner">
                        <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">oz-Defense Bonus</p>
                        <p className="text-sm font-black text-blue-300 italic">+₩{(report.defenseBonus / 10000).toLocaleString()}만</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black text-white flex items-center gap-3 uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4 text-blue-500" />
                                Maintenance Provenance Defense
                            </span>
                            <span className="text-xs font-black text-blue-400 italic">
                                SECURE ASSET
                            </span>
                        </div>
                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-6 p-0.5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${defensePercentage}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: <History size={12} />, label: "Service History", value: "Verified" },
                                { icon: <Award size={12} />, label: "Parts Quality", value: "Genuine" },
                                { icon: <ShieldCheck size={12} />, label: "Data Integrity", value: "ZKP Proved" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="text-slate-600 flex items-center gap-1.5">{item.icon} <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span></div>
                                    <div className="text-[10px] font-bold text-slate-300 uppercase">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-white/5 to-transparent border-l-2 border-slate-700">
                    <div className="flex gap-4">
                        <Info className="w-5 h-5 text-slate-700 shrink-0" />
                        <div>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic opacity-80">
                                "{report.reasoning}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
