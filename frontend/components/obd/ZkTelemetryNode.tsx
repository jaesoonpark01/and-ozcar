"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Cpu, Server, ShieldCheck, ArrowRight, Zap, Database } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function ZkTelemetryNode() {
    const { t } = useI18n();
    const [step, setStep] = useState(0);
    const [hashes, setHashes] = useState<string[]>([]);
    
    // Simulate ZK Proof Generation Pipeline
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
            
            if (Math.random() > 0.3) {
                const newHash = `0xZK${Math.random().toString(16).substring(2, 10).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
                setHashes(prev => [newHash, ...prev].slice(0, 5));
            }
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-[#0a0a0c] border border-blue-900/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[100%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[100%] bg-teal-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center h-[400px]">
                
                {/* 1. Raw Telemetry Data */}
                <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 border border-slate-800 rounded-2xl h-full relative">
                    <Database size={32} className="text-slate-500 mb-4" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Raw Telemetry</h3>
                    
                    <div className="w-full space-y-3 font-mono text-[10px]">
                        <motion.div animate={{ opacity: step === 0 ? 1 : 0.4 }} className="flex justify-between p-2 bg-black/40 rounded border border-slate-800">
                            <span className="text-slate-500">GPS:</span>
                            <span className="text-red-400">37.5665° N, 126.9780° E</span>
                        </motion.div>
                        <motion.div animate={{ opacity: step === 0 ? 1 : 0.4 }} className="flex justify-between p-2 bg-black/40 rounded border border-slate-800">
                            <span className="text-slate-500">Speed:</span>
                            <span className="text-amber-400">84 km/h</span>
                        </motion.div>
                        <motion.div animate={{ opacity: step === 0 ? 1 : 0.4 }} className="flex justify-between p-2 bg-black/40 rounded border border-slate-800">
                            <span className="text-slate-500">RPM:</span>
                            <span className="text-blue-400">2100</span>
                        </motion.div>
                    </div>
                    
                    <div className="mt-auto pt-4 flex items-center gap-2 text-[9px] text-red-500 font-bold uppercase tracking-wider">
                        <Lock size={12} className="text-red-500" /> Privacy Risk: High
                    </div>

                    {/* Arrow connecting to next phase */}
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block">
                        <ArrowRight className={`transition-colors duration-500 ${step === 0 ? 'text-blue-500' : 'text-slate-700'}`} />
                    </div>
                </div>

                {/* 2. Edge AI & ZK SNARKs NPU */}
                <div className="flex flex-col items-center justify-center p-6 bg-blue-900/20 border border-blue-500/30 rounded-2xl h-full relative shadow-[0_0_30px_rgba(37,99,235,0.15)] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div 
                            animate={{ rotate: step === 1 || step === 2 ? 180 : 0, scale: step === 1 || step === 2 ? 1.1 : 1 }} 
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 bg-blue-600/20 border-2 border-blue-500 rounded-xl flex items-center justify-center mb-4 relative"
                        >
                            <Cpu size={32} className="text-blue-400" />
                            {(step === 1 || step === 2) && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                            )}
                        </motion.div>
                        
                        <h3 className="text-[12px] font-black italic uppercase tracking-widest text-blue-400 mb-2">Edge AI NPU</h3>
                        <p className="text-[9px] text-blue-300/60 uppercase tracking-widest text-center mb-6">ZK-SNARKs Engine</p>

                        <div className="w-full bg-black/60 rounded-xl p-3 border border-blue-900/50 h-24 overflow-hidden flex flex-col justify-end font-mono text-[8px] text-blue-500">
                            <AnimatePresence>
                                {hashes.map((hash, i) => (
                                    <motion.div 
                                        key={hash + i} 
                                        initial={{ opacity: 0, x: 20 }} 
                                        animate={{ opacity: 1 - (i * 0.2), x: 0 }} 
                                        className="whitespace-nowrap truncate py-0.5"
                                    >
                                        &gt; encrypting... {hash}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block z-20">
                        <ArrowRight className={`transition-colors duration-500 ${step === 2 ? 'text-teal-500' : 'text-slate-700'}`} />
                    </div>
                </div>

                {/* 3. Blockchain Smart Contract */}
                <div className="flex flex-col items-center justify-center p-6 bg-teal-900/20 border border-teal-500/30 rounded-2xl h-full relative shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                    <Server size={32} className={`mb-4 transition-colors duration-500 ${step === 3 ? 'text-teal-400' : 'text-slate-600'}`} />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-6">Ozcar Smart Contract</h3>
                    
                    <div className="w-full space-y-3 font-mono text-[10px]">
                        <motion.div animate={{ opacity: step === 3 ? 1 : 0.4 }} className="flex justify-between p-3 bg-teal-950/50 rounded-xl border border-teal-800/50">
                            <span className="text-teal-500">Driving Score:</span>
                            <span className="text-white font-bold text-sm">98 / 100</span>
                        </motion.div>
                        <motion.div animate={{ opacity: step === 3 ? 1 : 0.4 }} className="flex flex-col gap-1 p-2 bg-black/40 rounded border border-slate-800">
                            <span className="text-slate-500 text-[8px]">Verified ZK Proof:</span>
                            <span className="text-teal-300 truncate">0x9f4a...e1b2</span>
                        </motion.div>
                        <motion.div animate={{ opacity: step === 3 ? 1 : 0.4 }} className="flex flex-col gap-1 p-2 bg-black/40 rounded border border-slate-800">
                            <span className="text-slate-500 text-[8px]">Location Data:</span>
                            <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck size={10} /> ENCRYPTED</span>
                        </motion.div>
                    </div>

                    <div className="mt-auto pt-4 flex items-center gap-2 text-[9px] text-teal-400 font-bold uppercase tracking-wider">
                        <Zap size={12} className="text-teal-400" /> Mining Approved
                    </div>
                </div>

            </div>
            
            {/* Context Explanation */}
            <div className="mt-8 text-center max-w-2xl mx-auto">
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    <span className="text-blue-400 font-bold">Phase 6: ZK-Telemetry.</span> 차량에서 발생한 원본 데이터(위치, 속도 등)는 외부로 전송되지 않습니다. 
                    대신, STN2120 기기와 연동된 스마트폰의 <span className="text-teal-400 font-bold">로컬 엣지 AI(Edge AI)</span>가 데이터를 분석하여 
                    오직 결과값(안전 점수)과 <span className="text-teal-400 font-bold">영지식 증명(Zero-Knowledge Proof)</span>만을 블록체인에 기록합니다. 
                    이를 통해 완벽한 사생활 보호와 데이터 가치화가 동시에 달성됩니다.
                </p>
            </div>
        </div>
    );
}
