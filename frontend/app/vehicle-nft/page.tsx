'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Database, TrendingUp } from 'lucide-react';
import VehicleHistoryNFT from '@/components/user/VehicleHistoryNFT';

const MOCK_NFT_METADATA = {
    vin: 'WVWRB7AN4LE001234',
    model: 'Ozcar EV · Genesis',
    soh: 96,
    maintenanceCount: 12,
    dataContribution: '4.2TB',
    mintedDate: '2026-01-15',
    ownerAddress: '0x7f45...f812',
};

const STATS = [
    { label: '상태 건강도 (SOH)', value: '96%', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: '데이터 기여량', value: '4.2 TB', icon: Database, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: '정비 이력', value: '12건', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: '온체인 검증', value: '완료', icon: Cpu, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

export default function VehicleNFTPage() {
    return (
        <div className="min-h-screen bg-[#07070d] text-white font-sans">
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/10 pointer-events-none" />
                <div className="absolute -top-40 left-0 w-[700px] h-[700px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <Cpu className="text-blue-400" size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                                Vehicle History NFT · Phase 17
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                            차량 이력을
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                자산으로.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            VIN, 정비 이력, 배터리 건강도를 블록체인에 영구 기록한 디지털 증서.
                            카드를 클릭하여 메타데이터를 확인하세요.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
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

            <div className="max-w-7xl mx-auto px-6 py-16 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <VehicleHistoryNFT metadata={MOCK_NFT_METADATA} />
                </motion.div>
            </div>
        </div>
    );
}
