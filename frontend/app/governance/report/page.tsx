"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Presentation, ArrowUpRight, BarChart3, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalInvestorReport() {
    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#0a0c10] text-white">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="inline-block px-3 py-1 bg-white/10 text-slate-300 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-slate-700">
                            Q1 2026 Founder's Report
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">Q1 Financial Performance</h1>
                        <p className="text-slate-400 max-w-xl">?¤ì¦ˆì¹??íƒœê³„ì˜ ë¶„ê¸°ë³??ê¸ˆ ?ë¦„ê³??±ì¥???¬ëª…?˜ê²Œ ê³µì‹œ?©ë‹ˆ?? ?¤ì´?„ëª¬?? ?Œë˜?°ë„˜ ?Œìš´???„ìš© ê¸°ë? ?ë£Œ?…ë‹ˆ??</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
                            <Download size={16} className="mr-2" /> PDF ?€??
                        </Button>
                        <Button className="bg-white text-black hover:bg-slate-200">
                            <Share2 size={16} className="mr-2" /> ?¬íŠ¸?´ë¦¬???”ì•½ ê³µìœ 
                        </Button>
                    </div>
                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-emerald-900/40 to-black/50 border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full" />
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><Wallet size={16} /> Total Revenue</h3>
                        <div className="text-4xl font-black text-white font-mono mb-2">$1.42M</div>
                        <div className="text-emerald-400 flex items-center gap-1 font-bold text-sm">
                            <ArrowUpRight size={16} /> +24.5% vs Q4
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-blue-900/40 to-black/50 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full" />
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><BarChart3 size={16} /> Data Sales (B2B)</h3>
                        <div className="text-4xl font-black text-white font-mono mb-2">$850K</div>
                        <div className="text-blue-400 flex items-center gap-1 font-bold text-sm">
                            <ArrowUpRight size={16} /> +12% target tracking
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-purple-900/40 to-black/50 border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full" />
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><TrendingUp size={16} /> Founder APR</h3>
                        <div className="text-4xl font-black text-white font-mono mb-2">15.8%</div>
                        <div className="text-purple-400 flex items-center gap-1 font-bold text-sm">
                            <ArrowUpRight size={16} /> Steady growth
                        </div>
                    </motion.div>
                </div>

                {/* Blueprint Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Presentation className="text-blue-400" /> 5X Profitability Blueprint (2027)
                        </h2>

                        <div className="space-y-6">
                            <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                                <h4 className="font-bold text-white mb-2 italic">1. ?¤ëª©??AI ?°ì´???Œì´?„ë¼??ê°œë°©</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    ?ìœ¨ì£¼í–‰ R&D ?°êµ¬??ë°?ë³´í—˜?¬ì— ?¤ì‹œê°?OBD-II + ë¸”ë™ë°•ìŠ¤ Vision ?°ì´?°ë? ?¨í‚¤ì§•í•˜??B2B êµ¬ë… ëª¨ë¸ë¡??œê³µ. (?ˆìƒ ARR ì¦ê??? 120%)
                                </p>
                            </div>

                            <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                                <h4 className="font-bold text-white mb-2 italic">2. ê¸€ë¡œë²Œ ?¸ë“œ ?•ì¥ ?˜ìˆ˜ë£?/h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    2026???˜ë°˜ê¸??™ë‚¨?„ì‹œ??ë² íŠ¸?? ?¸ë„?¤ì‹œ?? ì§„ì¶œ. ?´ë‹¹ ê¶Œì—­?ì„œ ë°œìƒ?˜ëŠ” OZC ?¸ëœ??…˜ ?˜ìˆ˜ë£Œì˜ 10%ë¥?Genesis ?Œìš´??ê¸ˆê³ ë¡??êµ¬ ?¸ì….
                                </p>
                            </div>

                            <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                                <h4 className="font-bold text-white mb-2 italic">3. Sovereign NFT ë§ˆì¼“?Œë ˆ?´ìŠ¤ ?œì„±??/h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    ?ì´ì§•ëœ ?°ì´??ê°€ì¹??Œë˜?°ë„˜, ?¤ì´?„ëª¬???±ê¸‰) ì°¨ëŸ‰??NFT ê±°ë˜ ??ë°œìƒ?˜ëŠ” ë¡œì—´???€??ê±°ë²„?ŒìŠ¤ ?¬í‘œë¥??µí•´ ?€?”ë“¤?ê²Œ ?ì–´?œë.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col">
                        <h2 className="text-2xl font-bold mb-6">Revenue Breakdown (Mock)</h2>
                        <div className="flex-1 border border-slate-800 bg-black/50 rounded-2xl flex items-center justify-center relative overflow-hidden group">

                            {/* Fake visual chart layout */}
                            <div className="w-full h-full flex items-end justify-around px-8 pb-12 pt-16">
                                <div className="w-16 bg-gradient-to-t from-blue-900 to-blue-500 rounded-t-lg h-[40%] relative group-hover:h-[45%] transition-all">
                                    <span className="absolute -top-6 w-full text-center text-xs font-mono text-blue-400">Q2 25</span>
                                </div>
                                <div className="w-16 bg-gradient-to-t from-emerald-900 to-emerald-500 rounded-t-lg h-[60%] relative group-hover:h-[65%] transition-all">
                                    <span className="absolute -top-6 w-full text-center text-xs font-mono text-emerald-400">Q3 25</span>
                                </div>
                                <div className="w-16 bg-gradient-to-t from-purple-900 to-purple-500 rounded-t-lg h-[85%] relative group-hover:h-[90%] transition-all">
                                    <span className="absolute -top-6 w-full text-center text-xs font-mono text-purple-400">Q4 25</span>
                                </div>
                                <div className="w-16 bg-gradient-to-t from-yellow-900 to-yellow-500 rounded-t-lg h-[100%] shadow-[0_0_30px_rgba(234,179,8,0.3)] relative scale-110">
                                    <span className="absolute -top-8 w-full text-center text-sm font-bold font-mono text-yellow-400">Q1 26</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4 justify-center text-xs text-slate-500 uppercase tracking-widest font-bold">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full" />B2B Sales</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-full" />Tx Fees</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-500 rounded-full" />NFT Royalties</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
