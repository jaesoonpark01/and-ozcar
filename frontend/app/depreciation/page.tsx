'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, ShieldCheck, BarChart3 } from 'lucide-react';
import { DepreciationReport } from '@/components/ar/DepreciationReport';
import AssetValueTimeline from '@/components/user/AssetValueTimeline';

const MOCK_REPORT = {
    estimatedLoss: 3200000,
    marketAvgLoss: 5800000,
    defenseBonus: 2600000,
    aiAttentionScore: 94,
    confidenceScore: 92,
    reasoning: '정기 정비 이력 12건, ZKP 증명 해시 100% 일치, 블록체인 기록 데이터 4.2TB 기반으로 산출된 감가상각 방어력 보고서입니다.',
};

const STATS = [
    { label: '시장 평균 감가', value: '₩580만', icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { label: 'oz-Defense 절감', value: '₩260만', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'AI 신뢰도', value: '92%', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
];

export default function DepreciationPage() {
    return (
        <div className="min-h-screen bg-[#080a12] text-white font-sans">
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-emerald-900/10 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <TrendingDown className="text-blue-400" size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                                Depreciation Defense · Phase 11
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                            차량 가치를
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                지켜드립니다.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            정비 이력과 ZKP 데이터 증명이 차량의 감가상각을 방어합니다.
                            AI가 산출한 내 차의 자산 방어력을 확인하세요.
                        </p>

                        <div className="grid grid-cols-3 gap-4 mt-10">
                            {STATS.map((s, i) => (
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

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <DepreciationReport report={MOCK_REPORT} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                >
                    <AssetValueTimeline
                        currentValue={42500}
                        marketAverage={38000}
                        events={[
                            { date: '2026-01-10', type: 'MAINTENANCE', impact: 'POSITIVE', valueChange: 250, description: 'Master Service: Cell Balancing' },
                            { date: '2026-02-15', type: 'DATA_MINT', impact: 'POSITIVE', valueChange: 120, description: 'Neural Data Contribution Reward' },
                            { date: '2026-03-01', type: 'SAFETY_AUDIT', impact: 'STABLE', valueChange: 0, description: 'ZKP Safety Audit Passed' },
                            { date: '2026-03-14', type: 'MILEAGE_UPDATE', impact: 'DEPRECIATION', valueChange: -80, description: 'Monthly Usage Depreciation' },
                        ]}
                    />
                </motion.div>
            </div>
        </div>
    );
}
