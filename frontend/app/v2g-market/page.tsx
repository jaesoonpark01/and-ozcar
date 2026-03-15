'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import V2GEnergyMarket from '@/components/energy/V2GEnergyMarket';
import SmartChargingOptimizer from '@/components/energy/SmartChargingOptimizer';
import EnergyAssetNFT from '@/components/energy/EnergyAssetNFT';

const MOCK_ENERGY_METADATA = {
    totalDischarged: 892,
    carbonOffset: 412.6,
    gridContributionScore: 97,
    activeSessions: 38,
    certId: 'DER-2026-OZ-00184',
    tier: 'PILLAR' as const,
};

const TABS = [
    { id: 'market', label: 'V2G 에너지 마켓', icon: Zap },
    { id: 'optimizer', label: '스마트 충전 최적화', icon: Battery },
    { id: 'nft', label: '에너지 자산 NFT', icon: Globe },
] as const;

type TabId = typeof TABS[number]['id'];

const STATS = [
    { label: '현재 전력 단가', value: '₩ 142/kWh', icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    { label: '방전 보상(today)', value: '2,840 OZP', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: '참여 차량 수', value: '4,192대', icon: Battery, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: '절감 탄소(today)', value: '18.4 ton', icon: Globe, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
];

export default function V2GMarketPage() {
    const [activeTab, setActiveTab] = useState<TabId>('market');

    return (
        <div className="min-h-screen bg-[#030a08] text-white font-sans">
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-blue-900/10 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[700px] h-[700px] bg-yellow-600/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <Zap className="text-yellow-400" size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400">
                                V2G Energy Market · Phase 19
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                            내 차가
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
                                발전소가 된다.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            차량 배터리를 그리드에 방전하고 실시간 OZP 보상을 받으세요.
                            스마트 스케줄러로 충전 비용을 최소화합니다.
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

            {/* Tabs */}
            <div className="sticky top-0 z-50 bg-[#030a08]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-1">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div layoutId="v2g-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    {activeTab === 'market' && <V2GEnergyMarket />}
                    {activeTab === 'optimizer' && <SmartChargingOptimizer />}
                    {activeTab === 'nft' && <EnergyAssetNFT metadata={MOCK_ENERGY_METADATA} />}
                </motion.div>
            </div>

            {/* CTA */}
            <div className="border-t border-white/5 bg-gradient-to-r from-yellow-900/10 to-blue-900/10">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Zap size={16} className="text-yellow-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-yellow-400">그리드 기여 시작</span>
                        </div>
                        <h3 className="text-2xl font-black text-white">방전 참여로 OZP 보상 받기</h3>
                        <p className="text-slate-400 mt-1">OBD 연결 후 V2G 참여 설정이 가능합니다.</p>
                    </div>
                    <a
                        href="/vehicle/obd-bridge"
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest text-xs py-4 px-8 rounded-2xl transition-all shrink-0"
                    >
                        OBD 연결하기 <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}
