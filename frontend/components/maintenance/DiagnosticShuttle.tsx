"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Zap, ArrowRight, FileText, CheckCircle2, ShieldCheck, Lock, Loader2 } from 'lucide-react';
import { ZKPService, PrivacyProof } from '@/services/ZKPService';

export default function DiagnosticShuttle() {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'shuttling' | 'completed'>('idle');
    const [proof, setProof] = useState<PrivacyProof | null>(null);

    const startShuttle = async () => {
        setStatus('analyzing');
        // Generate ZKP Proof
        const newProof = await ZKPService.generateSafeDriverProof("KOR-728-7129", 30);
        setProof(newProof);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('shuttling');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('completed');
    };

    return (
        <div className="bg-[#0f1115] p-6 sm:p-10 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
            {/* Background Neural Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="relative z-10 flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
                            {status === 'idle' ? <Activity size={24} /> : <Loader2 className="animate-spin" size={24} />}
                        </div>
                        <div>
                            <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none mb-2">Diagnostic <span className="text-blue-500">Shuttle</span></h3>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    {status === 'completed' ? 'Secure Tunnel Closed' : 'AI Safety Guardian Ready'}
                                </span>
                            </div>
                        </div>
                    </div>
                    {proof && (
                        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">ZKP Proof Verified</span>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Status 1: Anomaly Detection */}
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 relative group transition-all hover:bg-white/[0.07]">
                        <ShieldAlert className="text-amber-500 mb-6" size={24} />
                        <h4 className="font-black italic uppercase text-xs text-white mb-2">Anomaly Detected</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-medium">Cylinder #3 misfire threshold exceeded (0.85rms)</p>
                        <div className="absolute top-8 right-8 text-[8px] font-black text-amber-500/50 uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded">Critical</div>
                    </div>

                    {/* Status 2: Data Shuttle */}
                    <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${status === 'shuttling' ? 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/5'}`}>
                        <Zap className={`mb-6 ${status === 'shuttling' ? 'text-blue-400' : 'text-slate-500'}`} size={24} />
                        <h4 className="font-black italic uppercase text-xs text-white mb-2">Privacy Shuttle</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-medium">
                            {status === 'shuttling' ? 'Transmitting cryptographically secure data...' : 'Waiting for Data Sovereignty approval...'}
                        </p>
                        {status === 'shuttling' && (
                             <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-1 bg-blue-500 mt-4 rounded-full" />
                        )}
                    </div>

                    {/* Status 3: Match Success */}
                    <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${status === 'completed' ? 'bg-emerald-600/20 border-emerald-500/50' : 'bg-white/5 border-white/5'}`}>
                        <CheckCircle2 className={`mb-6 ${status === 'completed' ? 'text-emerald-500' : 'text-slate-500'}`} size={24} />
                        <h4 className="font-black italic uppercase text-xs text-white mb-2">Technician Match</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-medium">
                            {status === 'completed' ? 'Gangnam Professional Center - Master J. Choi' : 'Analyzing best match near your location...'}
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-slate-800 rounded-3xl">
                            <FileText className="text-blue-400" size={32} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2 block">Secure Digital Passport</span>
                            <div className="text-lg font-black italic text-white tracking-tight">KOR-728 가 7129 | <span className="text-blue-500">Benz C-Class</span></div>
                            {proof && <div className="text-[8px] font-mono text-slate-600 mt-1 truncate max-w-[200px]">{proof.proofHash}</div>}
                        </div>
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto">
                        <button className="flex-1 lg:flex-none px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all">
                            View Report
                        </button>
                        <button 
                            onClick={startShuttle}
                            disabled={status !== 'idle'}
                            className={`flex-1 lg:flex-none px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${
                                status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-600/20'
                            } disabled:opacity-50`}
                        >
                            {status === 'completed' ? <CheckCircle2 size={16} /> : <Lock size={16} />}
                            {status === 'idle' ? 'Authorize Privacy Tunnel' : status === 'completed' ? 'Authorized' : 'Processing...'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
