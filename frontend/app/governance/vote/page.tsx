"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote, Users, Flame, Landmark, Activity, Coins, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/components/Web3Provider";

const options = [
    { id: "A", label: "ê³µê²©???íƒœê³??•ì¥", desc: "?Œê° 20% / ?¸ë ˆ?€ë¦?80%", icon: <Users size={24} />, color: "text-blue-400" },
    { id: "B", label: "ê°€ì¹?ë³´ì¡´ (?„ì¬ ? ì?)", desc: "?Œê° 50% / ?¸ë ˆ?€ë¦?50%", icon: <Landmark size={24} />, color: "text-emerald-400" },
    { id: "C", label: "ê°€ì¹??ìŠ¹ ê·¹ë???, desc: "?Œê° 80% / ?¸ë ˆ?€ë¦?20%", icon: <Flame size={24} />, color: "text-red-400" },
];

export default function GovernanceVotePage() {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCasting, setIsCasting] = useState(false);
    const [voteCasted, setVoteCasted] = useState(false);
    const { account } = useWeb3();

    // Mock results for UI display
    const results = { A: 15, B: 30, C: 55 };

    const handleCasting = () => {
        setIsCasting(true);
        setTimeout(() => {
            setIsCasting(false);
            setVoteCasted(true);
        }, 2500);
    };

    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#050510] text-white">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Proposal Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none" />

                        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-widest mb-4">
                            <Vote size={18} /> OIP-1 (Ozcar Improvement Proposal #1)
                        </div>

                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 text-white">?Œë«???œìˆ˜?µê¸ˆ ë°°ë¶„ ê·œì •??/h1>

                        <div className="flex items-center gap-4 mb-6 text-sm text-slate-400 border-y border-slate-800 py-3">
                            <span>?œì•ˆ?? <strong>Ozcar Core Team</strong></span>
                            <span>?íƒœ: <strong className="text-emerald-400 animate-pulse">?¬í‘œ ì§„í–‰ ì¤?/strong></span>
                            <span>?¨ì? ?œê°„: <strong className="font-mono">14h 22m</strong></span>
                        </div>

                        <div className="prose prose-invert prose-slate max-w-none text-sm leading-relaxed mb-6">
                            <p>
                                ?¤ì¦ˆì¹??Œìš´???¬ëŸ¬ë¶? ë³??ˆê±´?€ ?°ì´???ë§¤ ë°?êµ¬ë… ëª¨ë¸?ì„œ ë°œìƒ?˜ëŠ” ë¶„ê¸°ë³??‰ì—¬ ?˜ìµ(?„ê¸ˆ ?ë¦„)???€??ì²˜ë¦¬ ë°©ì•ˆ???•ì •?˜ê¸° ?„í•¨?…ë‹ˆ??
                                ?¤ë§ˆ??ì»¨íŠ¸?™íŠ¸ë¥??µí•´ ?ë™ ì§‘í–‰???ê¸ˆ??ë¹„ìœ¨(? í° ?Œê° vs DAO ê¸ˆê³  ?€????ì§ì ‘ ê²°ì •??ì£¼ì‹­?œì˜¤.
                                ?Œë¡œ???„ë¼?´ìŠ¤ë¥??’ì´ê¸??„í•´ ê°•ë„ë¥??’ì¼ ê²ƒì¸ì§€(C??, ?¥í›„ ë§ˆì???ë°?ê·¸ëœ?¸ë? ?„í•´ ê¸ˆê³ ë¥?ì±„ìš¸ ê²ƒì¸ì§€(A?? ?Œìš´?”ë“¤???˜ì?ê°€ ?„ìš”?©ë‹ˆ??
                            </p>
                        </div>

                        <div className="bg-black/60 rounded-2xl p-4 border border-slate-800 flex gap-4 text-slate-300">
                            <Activity size={24} className="text-purple-400 flex-shrink-0" />
                            <div className="text-xs">
                                <strong>?•ì¡±??ë°?ê°€ê²?ì¡°ê±´:</strong> ?„ì²´ ?¤ì´?„ëª¬???Œë˜?°ë„˜ ?Œìš´?”ì˜ 30% ?´ìƒ ì°¸ì„. ìµœë‹¤ ?í‘œ ?ˆê±´ ?ë™ ì±„íƒ.<br />
                                ?¬í‘œ ??ë³€ê²?ë¶ˆê??˜ë©°, OZC ? í° 1ê°œê? ?Œëª¨?©ë‹ˆ??(ê°€?¤ë¹„ ?œì™¸).
                            </div>
                        </div>
                    </div>

                    {/* Voting Options */}
                    <AnimatePresence mode="wait">
                        {!voteCasted ? (
                            <motion.div key="voting" className="space-y-4">
                                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">Your Decision</h3>
                                {options.map((opt) => (
                                    <div
                                        key={opt.id}
                                        onClick={() => setSelected(opt.id)}
                                        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${selected === opt.id ? 'bg-purple-900/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-black/40 border-slate-800 hover:border-slate-600'}`}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-black/50 border border-slate-700 ${opt.color}`}>
                                                {opt.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold mb-1">?ˆê±´ {opt.id}: {opt.label}</h4>
                                                <p className="text-sm text-slate-400">{opt.desc}</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === opt.id ? 'border-purple-400 bg-purple-500/20' : 'border-slate-700'}`}>
                                            {selected === opt.id && <div className="w-3 h-3 bg-purple-400 rounded-full" />}
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    onClick={handleCasting}
                                    disabled={!selected || isCasting || !account}
                                    className="w-full h-16 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest text-lg rounded-2xl mt-4"
                                >
                                    {isCasting ? "?¨ì²´???¸ëœ??…˜ ?„ì†¡ ì¤?.." : "?¬í‘œ ?œì¶œ ?•ì •"}
                                </Button>
                                {!account && <p className="text-xs text-red-400 text-center mt-2">?¬í‘œë¥??„í•´ ì§€ê°‘ì„ ?°ê²°?˜ì„¸??</p>}
                            </motion.div>
                        ) : (
                            <motion.div key="voted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-950/30 border border-emerald-500/50 rounded-3xl p-12 text-center backdrop-blur-xl">
                                <Check className="text-emerald-400 mx-auto mb-6 bg-emerald-500/20 p-4 rounded-full" size={80} />
                                <h2 className="text-3xl font-black italic tracking-tighter text-emerald-400 mb-2">?¬í‘œê°€ ë¸”ë¡ì²´ì¸??ê¸°ë¡?˜ì—ˆ?µë‹ˆ??/h2>
                                <p className="text-slate-300 mb-8 max-w-sm mx-auto">
                                    ?Œìš´?”ë‹˜??ê²°ì •???œìŠ¤?œì— ë°˜ì˜?˜ì—ˆ?µë‹ˆ?? ë§ˆê° ???¨ì²´??ë¡œì§???°ë¼ ?ê¸ˆ???ë™ ë¶„ë°°/?Œê°?©ë‹ˆ??
                                </p>
                                <div className="bg-black/40 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-500 overflow-hidden text-left mb-8 max-w-md mx-auto">
                                    <div className="text-emerald-500 mb-1">TxHash:</div>
                                    <div className="truncate text-slate-300">0x3f...92d1a (Polygon PoS)</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Col: Info / Results Sidebar */}
                <div className="space-y-6">
                    <div className="bg-black/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                            <Coins size={14} /> ?„ì¬ ?¬ë¡  (?¤ì‹œê°?
                        </h3>

                        <div className="space-y-6">
                            {options.map((opt) => (
                                <div key={opt.id}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-white">{opt.id}: {opt.label}</span>
                                        <strong className="text-purple-400 font-mono">{results[opt.id as keyof typeof results]}%</strong>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-purple-500`}
                                            style={{ width: `${results[opt.id as keyof typeof results]}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-800 text-center">
                            ?¬í‘œê°€ ?„ë£Œ?˜ë©´ ê²°ê³¼???°ë¼ DAO ê¸ˆê³ ?ì„œ ?ë™?¼ë¡œ ?ê¸ˆ???€ì§ì…?ˆë‹¤ (OzcarTreasury.sol ?œìš©).
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/10 border border-purple-500/20 rounded-3xl p-6 relative overflow-hidden text-center">
                        <Flame size={32} className="text-red-500 mx-auto mb-2 opacity-50" />
                        <div className="text-sm font-bold text-purple-300 mb-1">?„ì¬ ?„ì  ?Œê°??/div>
                        <div className="text-2xl font-black font-mono text-white mb-4">4,204,115 OZC</div>
                        <button className="text-xs uppercase tracking-widest px-4 py-2 border border-slate-600 rounded-full hover:bg-slate-800 transition-colors w-full text-slate-300">
                            ?Œê° ?´ì—­ ë³´ê¸° (Polygonscan)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
