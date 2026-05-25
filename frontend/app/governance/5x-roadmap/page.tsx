'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, ShieldCheck, Zap, LineChart, Banknote } from 'lucide-react';

const MULTIPLIERS = [
    { title: '?„ê¸ˆ ë°°ë‹¹ (Dividend)', value: '1.5x', desc: '?°í‰ê·?40~60%??USDC/KRW ë°°ë‹¹ ?„ì ', icon: Banknote, color: 'text-emerald-400' },
    { title: 'NFT ?ì‚° ê°€ì¹??í–¥', value: '2.0x', desc: '?Œê°(Burn) ë°?ë°”ì´ë°±ì„ ?µí•œ Sovereign NFT ?¬ê????ìŠ¹', icon: TrendingUp, color: 'text-blue-400' },
    { title: '?°ì´??ê¶Œë¦¬ê¸?, value: '1.5x', desc: 'B2B ?…ì  ?°ì´??ë§¤ê°???°ë¥¸ ?¹ë³„ ?±ê³¼ ë¶„ë°°', icon: Zap, color: 'text-purple-400' },
];

const TIMELINE = [
    { year: '2025-2026', title: '?œìŠ¤???…ì¦ ë°?êµ?‚´ ?ˆì°©', metric: 'êµ?‚´ ?¸ë“œ 1ë§??€ ?•ë³´', result: '150% (?ê¸ˆ ?€ë¹??„ì )' },
    { year: '2026-2027', title: 'ê¸€ë¡œë²Œ ?•ì¥ ë°??„ì‹œ??ì§„ì¶œ', metric: '?´ì™¸ ?¸ë“œ 10ë§??€ ?ŒíŒŒ', result: '250% (?ê¸ˆ ?€ë¹??„ì )' },
    { year: '2027-2028', title: '?°ì´??ë±…í¬ ?„í™˜ (Monopoly)', metric: '?„ì„±ì°??œì¡°??B2B ê³µê¸‰', result: '500% (ìµœì¢… 5X ?¬ì„±)' },
];

export default function Roadmap5xPage() {
    return (
        <div className="min-h-screen bg-[#07070d] text-white pt-24 pb-16 px-4 relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto relative z-10"
            >
                {/* Header Sequence */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6">
                        <TrendingUp size={16} /> 2027 Vision Blueprint
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">OZCAR </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">5X ?˜ìµ??ë¡œë“œë§?/span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        ë³µë¦¬??ë§ˆë²•??AI ê¸°ìˆ ê³?ë§Œë‚¬???? ??ë¬¸ì„œ??3?????¤ì´?„ëª¬???Œìš´?”ì˜ <br className="hidden md:block"/>?¬ì ?ê¸ˆ??5ë°?500%)ë¡??˜ì›?˜ëŠ” ?•ì •???¬ë¬´ ?œë‚˜ë¦¬ì˜¤?…ë‹ˆ??
                    </p>
                </div>

                {/* Growth Formula Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {MULTIPLIERS.map((m, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <m.icon className={`${m.color} mb-6`} size={40} />
                            <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                            <p className="text-slate-400 text-sm mb-6 h-10">{m.desc}</p>
                            <div className="text-4xl font-black italic">{m.value}</div>
                        </motion.div>
                    ))}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-3 bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-emerald-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_0_50px_rgba(52,211,153,0.15)]"
                    >
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">Target ROI</p>
                            <h2 className="text-3xl md:text-4xl font-black">Total Expected Value (3 Years)</h2>
                        </div>
                        <div className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-200">
                            5.0X
                        </div>
                    </motion.div>
                </div>

                {/* Timeline */}
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <LineChart className="text-blue-400" />
                    ?°ë„ë³??˜ìµ???€?„ë¼??                </h2>
                <div className="space-y-4 mb-20">
                    {TIMELINE.map((t, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="flex flex-col md:flex-row items-start md:items-center bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="md:w-48 mb-4 md:mb-0">
                                <span className="text-blue-400 font-black text-xl italic">{t.year}</span>
                            </div>
                            <div className="flex-1 mb-4 md:mb-0 pr-8">
                                <h4 className="text-xl font-bold mb-1">{t.title}</h4>
                                <p className="text-sm text-slate-400">{t.metric}</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-bold">
                                    {t.result}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Special Minting Right */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                        <Globe size={300} className="translate-x-1/4 -translate-y-1/4 text-emerald-400" />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                            <ShieldCheck className="text-blue-400" size={24} />
                        </div>
                        <h2 className="text-3xl font-black">2027 ê¸€ë¡œë²Œ ì§„ì¶œ ?¹ë³„ ë³´ì¥ ì¡°í•­</h2>
                    </div>
                    <div className="space-y-6 max-w-3xl">
                        <p className="text-lg text-slate-300 leading-relaxed">
                            ?¤ì¦ˆì¹??íƒœê³„ê? ë² íŠ¸?? ?¸ë„?¤ì‹œ?????´ì™¸ ?œì¥?¼ë¡œ ì§„ì¶œ???? 2026 ?¤ë¦¬ì§€???Œìš´??Diamond/Platinum)?¤ì˜ ê¸°ë“ê¶Œì? ?êµ¬??ë³´ì¥?©ë‹ˆ??
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                                <h4 className="font-bold text-emerald-400 mb-2">?„ë¦¬?¨ìŠ¤ ?”ì´?¸ë¦¬?¤íŠ¸</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">? ê·œ êµ?? Genesis ?¸ë“œ NFT ë°œí–‰ ???„ì²´ ë¬¼ëŸ‰??40%ë¥?ìµœìš°??? ë‹¹ ë°?50% ë°˜ê°’ ? ì¸???œê³µ?©ë‹ˆ??</p>
                            </div>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                                <h4 className="font-bold text-blue-400 mb-2">ê¸€ë¡œë²Œ ?°ì´??ë¡œì—´??/h4>
                                <p className="text-sm text-slate-400 leading-relaxed">?´ì™¸ ?°ì´???ë§¤ ?˜ìµ??5%ê°€ ?¤ë¦¬ì§€???Œìš´?”ë“¤??ì§€ê°‘ìœ¼ë¡??êµ¬ ê·€???ì–´?œë) ?©ë‹ˆ??</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 italic mt-6">
                            * ë³?ë¬¸ì„œ??Ozcar DAO ê±°ë²„?ŒìŠ¤ ?Œì¥???˜í•´ ë²•ì  ?¨ë ¥??ë°œíœ˜?©ë‹ˆ??
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
