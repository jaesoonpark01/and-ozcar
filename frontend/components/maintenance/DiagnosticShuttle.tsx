"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Zap, ArrowRight, FileText, CheckCircle2, ShieldCheck, Lock, Loader2, BrainCircuit } from 'lucide-react';
import { ZKPService, PrivacyProof } from '@/services/ZKPService';
import BatteryHealthGuide from './BatteryHealthGuide';
import AIReservationCard from '../user/AIReservationCard';

export default function DiagnosticShuttle() {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'shuttling' | 'completed'>('idle');
    const [proof, setProof] = useState<PrivacyProof | null>(null);

    const startShuttle = async () => {
        setStatus('analyzing');
        // Generate ZKP Proof
        const newProof = await ZKPService.generateSafeDriverProof("KOR-728-7129", 30);
        setProof(newProof);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('shuttling');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('completed');
    };

    const mockAiRecommendation = {
        part: "Battery Cell Balancing",
        urgency: "CAUTION" as const,
        recommendedShop: {
            id: "SHOP-77AF",
            name: "Gangnam Master Center",
            distance: 2.4,
            location: "Seoul, Gangnam-gu",
            rating: 4.9,
            isMaster: true
        },
        availableTime: "TOMORROW 10:00 AM"
    };

    return (
        <div className="space-y-10">
            <div className="bg-[#0f1115] p-6 sm:p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
                {/* Background Neural Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                </div>

                <div className="relative z-10 flex flex-col gap-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner group">
                                {status === 'idle' ? <BrainCircuit size={32} className="group-hover:rotate-12 transition-transform" /> : <Loader2 className="animate-spin" size={32} />}
                            </div>
                            <div>
                                <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none mb-2">Neural <span className="text-blue-500">Shuttle</span></h3>
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${status === 'completed' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-blue-500 animate-pulse'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                        {status === 'completed' ? 'Encrypted Tunnel Closed' : 'Privacy Guardian Active'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {proof && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                            >
                                <ShieldCheck size={16} className="text-emerald-500" />
                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">ZKP-Proof: VALIDATED</span>
                            </motion.div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Status 1: Anomaly Detection */}
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 relative group transition-all hover:bg-white/[0.08] hover:border-amber-500/20">
                            <ShieldAlert className="text-amber-500 mb-6" size={28} />
                            <h4 className="font-black italic uppercase text-xs text-white mb-2 tracking-widest">Anomaly Matrix</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-black tracking-tighter">Cell #14 Voltage Deviation Detected (0.42V)</p>
                            <div className="absolute top-8 right-8 text-[8px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Critical</div>
                        </div>

                        {/* Status 2: Data Shuttle */}
                        <div className={`p-8 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden ${status === 'shuttling' ? 'bg-blue-600/20 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/5'}`}>
                            <Zap className={`mb-6 transition-colors duration-500 ${status === 'shuttling' ? 'text-blue-400' : 'text-slate-600'}`} size={28} />
                            <h4 className="font-black italic uppercase text-xs text-white mb-2 tracking-widest">Neural Link</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-black tracking-tighter">
                                {status === 'shuttling' ? 'Broadcasting Zero-Knowledge Packet...' : status === 'completed' ? 'Transmission 100% Verified' : 'Awaiting Data Sovereign Approval...'}
                            </p>
                            {status === 'shuttling' && (
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: "100%" }} 
                                    transition={{ duration: 2, ease: "linear" }}
                                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400" 
                                />
                            )}
                        </div>

                        {/* Status 3: Match Success */}
                        <div className={`p-8 rounded-[2.5rem] border transition-all duration-700 ${status === 'completed' ? 'bg-emerald-600/10 border-emerald-500/30' : 'bg-white/5 border-white/5'}`}>
                            <CheckCircle2 className={`mb-6 transition-colors duration-500 ${status === 'completed' ? 'text-emerald-500' : 'text-slate-600'}`} size={28} />
                            <h4 className="font-black italic uppercase text-xs text-white mb-2 tracking-widest">Expert Match</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-black tracking-tighter">
                                {status === 'completed' ? 'Shop Found: Gangnam Master Center' : 'Geospatial AI Matchmaking in progress...'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-[3rem] p-8 md:p-10 flex flex-col xl:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-8">
                            <div className="p-6 bg-[#1a1a1f] rounded-[2rem] border border-white/5 shadow-inner">
                                <FileText className="text-blue-500" size={40} />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-2 block">Neural Asset Passport</span>
                                <div className="text-2xl font-black italic text-white tracking-tighter">14가 3928 | <span className="text-blue-500">Tesla Model 3</span></div>
                                {proof && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-mono text-slate-600 mt-2 truncate max-w-[280px] bg-black/40 px-3 py-1 rounded-lg border border-white/5">{proof.proofHash}</motion.div>}
                            </div>
                        </div>
                        <div className="flex gap-4 w-full xl:w-auto">
                            <button className="flex-1 xl:flex-none px-12 py-6 rounded-[1.8rem] bg-white/5 border border-white/10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95">
                                Full Analysis
                            </button>
                            <button 
                                onClick={startShuttle}
                                disabled={status !== 'idle'}
                                className={`flex-1 xl:flex-none px-12 py-6 rounded-[1.8rem] font-black uppercase italic tracking-[0.2em] text-[11px] transition-all shadow-2xl flex items-center justify-center gap-3 ${
                                    status === 'completed' ? 'bg-emerald-500 text-slate-950' : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-600/30'
                                } disabled:opacity-50 active:scale-95 group`}
                            >
                                {status === 'completed' ? <CheckCircle2 size={18} /> : <Lock size={18} className="group-hover:rotate-12 transition-transform" />}
                                {status === 'idle' ? 'Open Neural Tunnel' : status === 'completed' ? 'Access Granted' : 'Processing...'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {status === 'completed' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="flex items-center gap-4 px-10">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/20"></div>
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] whitespace-nowrap">AI Insight Generation</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/20"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <BatteryHealthGuide 
                                currentSOH={92} 
                                cycleCount={450} 
                                onOptimize={() => alert("AI Optimization Profile Applied to Battery ECU.")} 
                            />
                            <AIReservationCard aiRecommendation={mockAiRecommendation} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
