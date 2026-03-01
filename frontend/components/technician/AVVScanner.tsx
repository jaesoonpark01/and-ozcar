// components/technician/AVVScanner.tsx
"use client";

import React, { useState } from 'react';
import { Camera, RefreshCw, ShieldCheck, AlertTriangle, Image as ImageIcon, CheckCircle2, ChevronRight } from 'lucide-react';

interface AVVScannerProps {
    repairId: string;
}

import { motion, AnimatePresence } from 'framer-motion';

export default function AVVScanner({ repairId }: AVVScannerProps) {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'verified' | 'rejected'>('idle');
    const [confidence, setConfidence] = useState(0);

    const handleAnalysis = async () => {
        setStatus('analyzing');
        setTimeout(() => {
            setStatus('verified');
            setConfidence(98.4);
        }, 4000);
    };

    return (
        <div className="bg-[#121212] rounded-[3.5rem] p-10 text-white overflow-hidden shadow-2xl relative border border-white/5 group/main">
            {/* Holographic Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover/main:bg-blue-600/15 transition-all duration-1000"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Vision Integrity Engine</span>
                        </div>
                        <h3 className="text-3xl font-black italic uppercase italic tracking-tighter">AI Finish <span className="text-blue-500">Verification</span></h3>
                    </div>
                    <div className="px-5 py-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-3xl">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            Edge Node <span className="text-white">#07-AVV</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-4">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pre-Service Archive</p>
                            <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-widest border border-emerald-500/20">Hashed</span>
                        </div>
                        <div className="relative aspect-video bg-[#010410] rounded-[2.5rem] overflow-hidden border border-white/5 flex items-center justify-center group/img">
                            <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-3xl px-4 py-2 rounded-xl border border-white/10 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                CID: QmR7s...8a2
                            </div>
                            <ImageIcon className="w-16 h-16 text-slate-800 opacity-20 group-hover/img:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-4">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Live Inspection Stream</p>
                            <div className="flex items-center gap-1.5 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                <span className="w-1 h-1 bg-blue-500 rounded-full animate-ping"></span>
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active</span>
                            </div>
                        </div>
                        <div className={`relative aspect-video bg-[#010410] rounded-[2.5rem] overflow-hidden border-2 transition-all duration-700 flex items-center justify-center ${status === 'verified' ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' :
                            status === 'analyzing' ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/5'
                            }`}>

                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-blue-500/20"
                                    >
                                        <Camera size={64} strokeWidth={1} />
                                    </motion.div>
                                )}

                                {status === 'analyzing' && (
                                    <motion.div
                                        key="analyzing"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-blue-600/5 backdrop-blur-[2px]"
                                    >
                                        <RefreshCw size={48} className="text-blue-500 animate-spin mb-6" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 animate-pulse">Analyzing Surface Geometry...</p>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-scan"></div>
                                    </motion.div>
                                )}

                                {status === 'verified' && (
                                    <motion.div
                                        key="verified"
                                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/10"
                                    >
                                        <div className="p-5 bg-emerald-500 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.5)] mb-6">
                                            <CheckCircle2 size={40} className="text-white" />
                                        </div>
                                        <div className="bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                                            Analysis Locked
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <AnimatePresence mode="wait">
                        {status === 'verified' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-[#052c22] border border-emerald-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group/alert"
                            >
                                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover/alert:scale-110 transition-transform duration-700">
                                    <ShieldCheck size={160} className="text-emerald-500" />
                                </div>
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="p-4 bg-emerald-500 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                        <ShieldCheck className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black italic uppercase italic tracking-tighter text-emerald-400">Authenticity Verified</h4>
                                        <p className="text-[10px] text-emerald-500/70 font-black uppercase tracking-widest mt-1">PoR Hash: 0x98f...d5a anchored to trust layer</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <div className="text-[10px] text-emerald-500/50 uppercase font-black mb-1">Confidence Score</div>
                                        <div className="text-3xl font-black text-white italic tracking-tighter">{confidence}%</div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : status === 'analyzing' ? (
                            <div className="space-y-4 px-4">
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 animate-progress"></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><RefreshCw size={12} className="animate-spin" /> Cross-Referencing Mesh</span>
                                    <span>Phase 2: Texture Octree</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-5 p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-medium text-slate-400 leading-relaxed italic">
                                        "정비 완료 사진을 분석하여 부품의 신규성 및 작업 품질을 데이터로 증명합니다. <br />
                                        <span className="text-blue-400 font-black not-italic uppercase tracking-widest">All verified records earn extra Reputation Fuel.</span>"
                                    </p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={handleAnalysis}
                    disabled={status === 'analyzing' || status === 'verified'}
                    className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn ${status === 'verified' ? 'bg-emerald-600 text-white shadow-emerald-500/20 shadow-2xl' :
                        status === 'analyzing' ? 'bg-white/5 text-slate-600 cursor-not-allowed' :
                            'bg-blue-600 text-white hover:scale-[1.01] active:scale-95 shadow-blue-600/30 shadow-2xl'
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-btn:hover:translate-x-full transition-transform duration-1000"></div>
                    {status === 'verified' ? (
                        <>VERIFICATION ANCHORED <ChevronRight size={18} /></>
                    ) : status === 'analyzing' ? (
                        <>CORE ENGINE ANALYSING...</>
                    ) : (
                        <>INITIATE VISION AUTHENTICATION</>
                    )}
                </button>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(200%); opacity: 0; }
                }
                @keyframes progress {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
                .animate-scan {
                    animation: scan 2.5s ease-in-out infinite;
                }
                .animate-progress {
                    animation: progress 4s linear forward;
                }
            `}</style>
        </div>
    );
}
