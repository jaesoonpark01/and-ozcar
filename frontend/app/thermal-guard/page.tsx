'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, ShieldAlert, AlertTriangle, Zap } from 'lucide-react';
import ThermalSafetyMonitor from '@/components/maintenance/ThermalSafetyMonitor';

export default function ThermalGuardPage() {
    return (
        <div className="min-h-screen bg-[#060408] text-white font-sans">
            {/* Hero */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-orange-900/10 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                                <Thermometer className="text-red-400" size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-red-400">
                                Thermal Guard · Phase 16
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                            배터리
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                                열폭주 예보.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            셀 온도 및 내부 압력을 실시간 모니터링하여 열폭주 징조를 0.5초 내 감지합니다.
                        </p>

                        <div className="grid grid-cols-3 gap-4 mt-10">
                            {[
                                { icon: ShieldAlert, label: '위험 감지', value: '0.5초 이내', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
                                { icon: Zap, label: 'ZKP 증명', value: '보험사 제출용', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                                { icon: AlertTriangle, label: '긴급 알림', value: '즉시 발송', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
                            ].map((s, i) => (
                                <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-5`}>
                                    <s.icon className={`${s.color} mb-3`} size={20} />
                                    <p className="text-xl font-black text-white mb-1">{s.value}</p>
                                    <p className="text-xs text-slate-500">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Monitor */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <ThermalSafetyMonitor carId="demo-car-001" />
                </motion.div>
            </div>
        </div>
    );
}
