"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, Battery, Target, CarFront, Lock, ShieldCheck, ChevronRight, Activity, Cpu } from "lucide-react";

export default function InsightLabPage() {
    const [hasInsightPass, setHasInsightPass] = useState(true);

    return (
        <div className="min-h-screen bg-[#050811] text-white pt-28 pb-20 px-4 sm:px-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-4">
                            <Network size={14} />
                            Sub-DAO / Secondary Founders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-2">
                            Insight Lab
                        </h1>
                        <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                            Î∞©Î???Ï∞®Îüâ ?∞Ïù¥???àÏù¥?¨Ïóê Í∏∞Î∞ò?òÏó¨ ?àÎ°ú??B2B Í∞ÄÏπòÎ? Ï∞ΩÏ∂ú?òÎäî ?§Ï¶àÏπ¥Ïùò ?êÎáå. ?§ÏßÅ Í≤ÄÏ¶ùÎêú ?åÏö¥?îÎì§ÎßåÏù¥ ?ëÍ∑º Í∞Ä?•Ìïú ?ÑÎùº?¥Îπó ?∞Íµ¨?åÏûÖ?àÎã§.
                        </p>
                    </div>
                    
                    {/* Insight Pass Status */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Access Level</div>
                            {hasInsightPass ? (
                                <div className="text-sm font-black text-purple-400">INSIGHT PASS [VERIFIED]</div>
                            ) : (
                                <div className="text-sm font-black text-red-400 flex items-center gap-1"><Lock size={14}/> ACCESS DENIED</div>
                            )}
                        </div>
                    </div>
                </div>

                {!hasInsightPass ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Lock size={64} className="text-slate-700 mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">?∏ÏÇ¨?¥Ìä∏ ???ëÍ∑º Í∂åÌïú???ÜÏäµ?àÎã§</h2>
                        <p className="text-slate-400 max-w-md">?ÅÏúÑ 1% ÎßàÏä§???±Í∏â ?åÏö¥??Î∞?OZC ?§ÌÖå?¥ÌÇπ Ï°∞Í±¥??Ï∂©Ï°±?òÏó¨ Insight Pass NFTÎ•?Î∞úÍ∏âÎ∞õÏúº?∏Ïöî.</p>
                        <button onClick={() => setHasInsightPass(true)} className="mt-8 px-6 py-2 border border-slate-700 rounded-full text-xs text-slate-400 hover:text-white hover:border-slate-500">
                            [?∞Î™®?? Í∂åÌïú ?úÏÑ±???åÏä§??                        </button>
                    </div>
                ) : (
                    <>
                        {/* Data Projects */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                    <Activity size={20} className="text-purple-400" /> Active Insight Projects
                                </h2>
                                <button className="text-xs text-purple-400 font-bold hover:text-purple-300">View All Projects</button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Project 1 */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Battery size={24} /></div>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">LIVE (B-aaS)</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">?ÑÏÉù??Ï£ºÍ∏∞ Î∞∞ÌÑ∞Î¶??òÎ™Ö ÏßÑÎã®</h3>
                                    <p className="text-xs text-slate-400 mb-6 flex-1">
                                        AIÍ∞Ä ?òÏßë???ÑÍ∏∞Ï∞??ÑÏïï/?ÑÎ•ò ?∞Ïù¥?∞Î? Í∏∞Î∞ò?ºÎ°ú ?∏ÌõÑ?îÏóê ?∞Î•∏ Í∞ÄÏπ??∞Ï†ï ?úÏ? ?§Í≥Ñ Î∞??åÍ≥†Î¶¨Ï¶ò ?ºÏù¥?†Ïã±.
                                    </p>
                                    <div className="space-y-4 border-t border-white/10 pt-4 mt-auto">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">?ÄÍ≤?Í∏∞ÏóÖ</span>
                                            <span className="font-bold">EV ?úÏ°∞?? ?êÎ∞∞?∞Î¶¨ Í∏∞ÏóÖ</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">?ÑÏ†Å ?ºÏù¥?†Ïä§ ?òÏùµ</span>
                                            <span className="font-bold text-emerald-400">$142,500</span>
                                        </div>
                                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 group-hover:text-purple-400">
                                            ?ÑÎ°ú?ùÌä∏ Ï∞∏Ïó¨?òÍ∏∞ <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Project 2 */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Target size={24} /></div>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">BETA (SaaS)</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">?òÏù¥??Î°úÏª¨ ?ïÎπÑ ?òÏöî ?àÏ∏°</h3>
                                    <p className="text-xs text-slate-400 mb-6 flex-1">
                                        ?πÏ†ï ÏßÄ??ùò Ï∞®Îüâ Î∂Ä???åÎ™® ?®ÌÑ¥??Î∂ÑÏÑù?òÏó¨ Î∂Ä???úÏ°∞??Î∞??†ÌÜµ?¨Ïóê ÏµúÏ†Å???¨Í≥† Í¥ÄÎ¶??ÑÎûµ Ïª®ÏÑ§???∞Ïù¥???úÍ≥µ.
                                    </p>
                                    <div className="space-y-4 border-t border-white/10 pt-4 mt-auto">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">?ÄÍ≤?Í∏∞ÏóÖ</span>
                                            <span className="font-bold">?êÎèôÏ∞?Î∂Ä???†ÌÜµÎß?/span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">?ÑÏ†Å Íµ¨ÎèÖ ?òÏùµ</span>
                                            <span className="font-bold text-emerald-400">$48,200</span>
                                        </div>
                                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 group-hover:text-purple-400">
                                            ?ÑÎ°ú?ùÌä∏ Ï∞∏Ïó¨?òÍ∏∞ <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Project 3 */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl"><CarFront size={24} /></div>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-md">PLANNING</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">?êÏú®Ï£ºÌñâ '?£Ï? ?úÎÇòÎ¶¨Ïò§' ??/h3>
                                    <p className="text-xs text-slate-400 mb-6 flex-1">
                                        ?¨Í≥† ÏßÅÏ†Ñ???πÏù¥ Ï£ºÌñâ ?®ÌÑ¥, ?πÌïúÍ∏???ö∞ ??Í∑πÌïú ?òÍ≤Ω???êÏãú ?∞Ïù¥?∞Î? ?†Î≥Ñ?òÏó¨ ?êÏú®Ï£ºÌñâ ?ôÏäµ??Í≥†Îã®Í∞Ä ?∞Ïù¥?∞ÏÖã Í∞ÄÍ≥?
                                    </p>
                                    <div className="space-y-4 border-t border-white/10 pt-4 mt-auto">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">?ÄÍ≤?Í∏∞ÏóÖ</span>
                                            <span className="font-bold">Í∏ÄÎ°úÎ≤å ?êÏú®Ï£ºÌñâ ?∞Íµ¨??/span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">?àÏÉÅ ?®Í?</span>
                                            <span className="font-bold text-blue-400">$10,000 / Set</span>
                                        </div>
                                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 group-hover:text-purple-400">
                                            ?ÑÎ°ú?ùÌä∏ Ï∞∏Ïó¨?òÍ∏∞ <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* ROI Structure */}
                        <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-black border border-purple-500/20 rounded-[3rem] p-8 md:p-12 relative">
                            <Cpu className="absolute top-8 right-8 text-purple-500/20" size={120} />
                            
                            <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-8 relative z-10">
                                Investment & ROI Structure
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">?∞Ïù¥???åÏö¥???òÏùµ</div>
                                    <div className="text-3xl font-black text-purple-400 italic mb-2">50%</div>
                                    <p className="text-xs text-slate-400">ÎπÑÏ¶à?àÏä§ Î™®Îç∏ ?§Í≥Ñ Î∞?Í∞ÄÍ≥?Ï∞∏Ïó¨??ÏßÅÏ†ë Î∞∞Îãπ (USDC Ï¶âÏãú ?ïÏÇ∞)</p>
                                </div>
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">?§Î¶¨ÏßÄ???åÏö¥??Î°úÏó¥??/div>
                                    <div className="text-3xl font-black text-blue-400 italic mb-2">20%</div>
                                    <p className="text-xs text-slate-400">?∞Ïù¥???∏ÌîÑ?ºÎ? Íµ¨Ï∂ï???åÎû´??Ï¥àÍ∏∞ Í∏∞Ïó¨??Î∞∞Î∂Ñ</p>
                                </div>
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Î©îÏù∏ DAO Treasury</div>
                                    <div className="text-3xl font-black text-emerald-400 italic mb-2">20%</div>
                                    <p className="text-xs text-slate-400">?ÑÏ≤¥ ?ùÌÉúÍ≥??∏ÌîÑ???ïÏû•???ÑÌïú ?¨Ìà¨???¨Ïõê Í∑Ä??/p>
                                </div>
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">OZC ?†ÌÅ∞ ?åÍ∞Å</div>
                                    <div className="text-3xl font-black text-rose-400 italic mb-2">10%</div>
                                    <p className="text-xs text-slate-400">?†ÌÅ∞ Í∞ÄÏπ??ÅÏäπ???ÑÌïú ?úÏû•Í∞Ä Îß§Ïàò ???êÎèô ?åÍ∞Å ÏßëÌñâ</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
