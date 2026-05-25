"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Activity, AlertTriangle, ArrowRight, Settings, Wrench, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AgenticCoDriverPage() {
    const [chatStep, setChatStep] = useState(0);

    // Simulated chat progression
    useEffect(() => {
        const timer1 = setTimeout(() => setChatStep(1), 2000); // AI Greeting
        const timer2 = setTimeout(() => setChatStep(2), 5000); // User responds "What's wrong?"
        const timer3 = setTimeout(() => setChatStep(3), 8000); // AI explains causality
        const timer4 = setTimeout(() => setChatStep(4), 13000); // AI offers bidding
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-[#050505] text-white overflow-hidden relative">
            
            {/* Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
                
                {/* Left Panel: Ontology Graph RAG Visualizer */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <div>
                        <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-500/30">
                            Phase 5: Decisive AI
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4">Agentic Co-Driver</h1>
                        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                            ?®ÌÜ®Î°úÏ? ?òÏù¥Î∏åÎ¶¨??RAG ÏßÄ?ùÎßù???µÌï¥ Ï¶ùÏÉÅ(Symptom)??Í∑ºÎ≥∏ ?êÏù∏(Root Cause)??Ï∂îÏ†Å?òÍ≥†, ?§Îßà??Ïª®Ìä∏?ôÌä∏Î°?ÏµúÏ†Å???ïÎπÑ ?îÎ£®?òÏùÑ ?êÏú® ?ÖÏ∞∞?©Îãà??
                        </p>
                    </div>

                    <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative flex items-center justify-center min-h-[400px] overflow-hidden">
                        {/* 3D Graph Simulation UI */}
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                        
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <motion.path 
                                d="M 120,100 Q 200,100 250,200 T 380,250" 
                                fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="2" strokeDasharray="5,5"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 9 }}
                            />
                            <motion.path 
                                d="M 120,300 Q 200,300 250,200" 
                                fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="2" strokeDasharray="5,5"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 9 }}
                            />
                            <motion.path 
                                d="M 250,200 Q 300,200 380,100" 
                                fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="2" strokeDasharray="5,5"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 10 }}
                            />
                        </svg>

                        <div className="relative w-full h-full">
                            {/* KINETIC NODE */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 8.5 }}
                                className="absolute top-[80px] left-[20px] bg-blue-900/40 border border-blue-500/50 p-3 rounded-xl backdrop-blur-md w-48 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <div className="text-[10px] text-blue-300 font-bold tracking-widest flex justify-between">KINETIC EVENT <Activity size={12}/></div>
                                <div className="text-white text-sm font-semibold mt-1">2/18 ÎπÑÌè¨?•Î°ú Í∞ïÌïú Ï∂©Í≤©</div>
                                <div className="text-slate-400 text-xs mt-1">G-Sensor: 3.2G Spike</div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 8.7 }}
                                className="absolute top-[280px] left-[20px] bg-red-900/40 border border-red-500/50 p-3 rounded-xl backdrop-blur-md w-48 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <div className="text-[10px] text-red-300 font-bold tracking-widest flex justify-between">SEMANTIC STATE <AlertTriangle size={12}/></div>
                                <div className="text-white text-sm font-semibold mt-1">?∞Ï∏° ??Î∞∏Îü∞???¥ÌÉà</div>
                                <div className="text-slate-400 text-xs mt-1">OBD-II RPM Mismatch</div>
                            </motion.div>

                            {/* DYNAMIC NODE */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 9.5 }}
                                className="absolute top-[170px] left-[200px] bg-purple-900/40 border border-purple-500/50 p-3 rounded-xl backdrop-blur-md w-56 shadow-[0_0_15px_rgba(168,85,247,0.2)] z-10">
                                <div className="text-[10px] text-purple-300 font-bold tracking-widest flex justify-between">DYNAMIC CAUSALITY <Zap size={12}/></div>
                                <div className="text-white text-sm font-semibold mt-1">?∞ÎπÑ 12% ?®Í∏∞ ?òÎùΩ ÏßÑÌñâÏ§?/div>
                                <div className="text-slate-400 text-xs mt-1">Expected Loss: -$45/month</div>
                            </motion.div>

                            {/* AGENTIC ACTION */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: chatStep >= 4 ? 1 : 0, scale: 1 }} transition={{ duration: 0.5 }}
                                className="absolute top-[70px] left-[320px] bg-white/10 border border-emerald-500/50 p-3 rounded-xl backdrop-blur-md w-48 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <div className="text-[10px] text-emerald-400 font-bold tracking-widest flex justify-between">AGENTIC ACTION <Wrench size={12}/></div>
                                <div className="text-white text-sm font-semibold mt-1">Pro-Master ?ÖÏ∞∞ ?úÏûë</div>
                                <div className="text-emerald-300 text-xs mt-1">Smart Contract Bidding</div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Co-Driver Chat Interface */}
                <div className="w-full lg:w-1/2 flex flex-col h-[600px] bg-black/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl relative">
                    
                    {/* Header */}
                    <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                            <span className="font-bold tracking-wide">Ozcar AI <span className="text-slate-500 font-normal">v2.1</span></span>
                        </div>
                        <Settings size={18} className="text-slate-500" />
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                        
                        <AnimatePresence>
                            {chatStep >= 1 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl rounded-tl-none">
                                        <p className="text-sm leading-relaxed text-slate-200">
                                            ?åÏö¥?îÎãò, ?ÑÏû¨ Ï∞®Îüâ ?∞ÎπÑÍ∞Ä ?ïÏÉÅ Î≤îÏúÑ ?ÄÎπ?**12% ?òÎùΩ**?òÎäî ?ÑÏÉÅ??Í∞êÏ??òÏóà?µÎãà?? ?êÏù∏??Ï∂îÏ†Å?†Íπå??
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {chatStep >= 2 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">ME</div>
                                    <div className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-2xl rounded-tr-none">
                                        <p className="text-sm text-blue-100">?? Í∞ëÏûêÍ∏???Í∑∏Îü∞Í±∞Ï?? ?§Î™Ö?¥Ï§ò.</p>
                                    </div>
                                </motion.div>
                            )}

                            {chatStep >= 3 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 max-w-[95%]">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl rounded-tl-none space-y-3">
                                        <p className="text-sm leading-relaxed text-slate-200">
                                            ÏßÄ??Í∑∏Îûò??Graph RAG) Î∂ÑÏÑù Í≤∞Í≥º?ÖÎãà?? 
                                        </p>
                                        <div className="bg-black/50 p-3 rounded-lg border border-slate-700 text-xs text-slate-400 font-mono leading-relaxed">
                                            &gt; 2??18??Í∞ïÏõê??Ï£ºÌñâ Ï§?G-Sensor 3.2G Ï∂©Í≤© Í∞êÏ? (Kinetic)<br/>
                                            &gt; ?¥ÌõÑ ?∞Ï∏° ?ÑÎ•ú ?çÎèÑ ?ºÏÑú?Ä GPS ?çÎèÑ Í∞?ÎØ∏ÏÑ∏ ?§Ï∞® Î∞úÏÉù (Semantic)<br/>
                                            &gt; Ï°∞Ìñ•Í∞??Ä?¥Ïßê?ºÎ°ú ?∏Ìïú ?Ä?¥Ïñ¥ ÎßàÏ∞∞ ?Ä??Ï¶ùÍ?Î°??∞ÎπÑ ?òÎùΩ ?êÏ†ï (Dynamic)
                                        </div>
                                        <p className="text-sm leading-relaxed text-slate-200">
                                            ?®Ïàú ?êÎü¨ ÏΩîÎìúÍ∞Ä ?ÑÎãå Î¨ºÎ¶¨??Ï∂©Í≤©???òÌïú **???ºÎùº?∏Î®º??Î∂àÍ∑†??*??Í∑ºÎ≥∏ ?êÏù∏?ÖÎãà?? Î∞©Ïπò ??????????$45???†Î•òÎπ??êÏã§???àÏÉÅ?©Îãà??
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {chatStep >= 4 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 max-w-[95%]">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-2xl rounded-tl-none shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                        <p className="text-sm leading-relaxed text-emerald-100 mb-4">
                                            ?¥Í≤∞???ÑÌï¥ Î∞òÍ≤Ω 10km ?¥ÎÇ¥??Í≤ÄÏ¶ùÎêú Pro-Master ?åÌä∏?àÎì§?êÍ≤å ?ºÎùº?∏Î®º??ÍµêÏ†ï ??≤ΩÎß?Bidding) ?§Î†à?úÎ? ?êÎèô Í∞úÏÑ§?†Íπå?? ?§Îßà??Ïª®Ìä∏?ôÌä∏Î°?ÏµúÏ?Í∞ÄÎ•?Î≥¥Ïû•Î∞õÏùÑ ???àÏäµ?àÎã§.
                                        </p>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white w-full">?àÏä§?∏Îûô????≤ΩÎß? ?§Ìñâ</Button>
                                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 w-full hover:bg-slate-800">?òÏ§ë??/Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-slate-800 bg-black/40 backdrop-blur-md flex gap-4 items-center">
                        <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400 group">
                            <Mic size={20} className="group-hover:text-blue-400 transition-colors" />
                        </button>
                        <div className="flex-1 h-12 bg-white/5 border border-white/10 rounded-full flex items-center px-4">
                            <input 
                                type="text" 
                                placeholder="ÏΩ??úÎùº?¥Î≤Ñ?êÍ≤å ?åÏÑ±?ºÎ°ú ÏßÄ?úÌïòÍ±∞ÎÇò ?ÖÎ†•?òÏÑ∏??.." 
                                className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-slate-500"
                                disabled
                            />
                        </div>
                        <button className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                            <ArrowRight size={20} className="text-white" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
