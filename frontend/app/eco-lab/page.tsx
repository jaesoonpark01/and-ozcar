'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Leaf, TreePine, Globe, Zap, TrendingUp,
    Award, ArrowRight, BarChart3, Battery
} from 'lucide-react';
import EcoDrivingNFT from '@/components/social/EcoDrivingNFT';
import VehicleDigitalTwin from '@/components/social/VehicleDigitalTwin';

const MOCK_ECO_METADATA = {
    ecoScore: 92,
    carbonSaved: 148.6,
    energyRecovered: 312.4,
    totalDistance: 8240,
    tier: 'FOREST' as const,
    lastUpdated: '2026-03-15',
};

const ECO_STATS = [
    { label: '절감된 탄소', value: '148.6 kg', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: '회수된 에너지', value: '312 kWh', icon: Battery, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: '총 주행거리', value: '8,240 km', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: '글로벌 에코 랭킹', value: '#1,284', icon: Globe, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

const TABS = [
    { id: 'nft', label: '에코 드라이빙 NFT', icon: Award },
    { id: 'twin', label: '디지털 트윈', icon: BarChart3 },
] as const;

type TabId = typeof TABS[number]['id'];

export default function EcoLabPage() {
    const [activeTab, setActiveTab] = useState<TabId>('nft');

    return (
        <div className="min-h-screen bg-[#030806] text-white font-sans">
            {/* Hero */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-green-900/10 pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <TreePine className="text-emerald-400" size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                                Ozcar Eco Lab
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                            Drive
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                                Greener.
                            </span>
                            Earn More.
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            친환경 주행 데이터를 희귀 에코 NFT로 변환하세요. 탄소 절감 실적이 디지털 자산이 됩니다.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                    >
                        {ECO_STATS.map((stat, i) => (
                            <div
                                key={i}
                                className={`${stat.bg} border ${stat.border} rounded-2xl p-5 backdrop-blur-sm`}
                            >
                                <stat.icon className={`${stat.color} mb-3`} size={20} />
                                <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Tabs */}
            <div className="sticky top-0 z-50 bg-[#030806]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-1">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
                                    activeTab === tab.id
                                        ? 'text-white'
                                        : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="eco-tab-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    {activeTab === 'nft' && (
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <EcoDrivingNFT metadata={MOCK_ECO_METADATA} />
                            <div className="space-y-6">
                                <div className="bg-white/3 border border-white/5 rounded-3xl p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Zap className="text-emerald-400" size={20} />
                                        <h3 className="text-lg font-black text-white">에코 NFT란?</h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        당신의 친환경 주행 기록이 블록체인 위에 영구적으로 기록된 디지털 증서입니다.
                                        탄소 절감량, 회수 에너지, 에코 스코어가 NFT 메타데이터에 담겨 거래 가능한 자산이 됩니다.
                                    </p>
                                </div>
                                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-3xl p-8">
                                    <h3 className="text-lg font-black text-white mb-4">티어 시스템</h3>
                                    <div className="space-y-3">
                                        {[
                                            { tier: 'SEED', req: '에코 점수 50+', color: 'text-lime-500' },
                                            { tier: 'LEAF', req: '에코 점수 70+', color: 'text-green-400' },
                                            { tier: 'TREE', req: '에코 점수 85+', color: 'text-emerald-400' },
                                            { tier: 'FOREST', req: '에코 점수 93+', color: 'text-cyan-400' },
                                        ].map(item => (
                                            <div key={item.tier} className="flex justify-between items-center">
                                                <span className={`font-black text-sm ${item.color}`}>{item.tier}</span>
                                                <span className="text-xs text-slate-500">{item.req}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'twin' && <VehicleDigitalTwin />}
                </motion.div>
            </div>

            {/* CTA */}
            <div className="border-t border-white/5 bg-gradient-to-r from-emerald-900/20 to-green-900/10">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Leaf size={16} className="text-emerald-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                                지금 바로 시작
                            </span>
                        </div>
                        <h3 className="text-2xl font-black text-white">친환경 주행으로 NFT를 획득하세요</h3>
                        <p className="text-slate-400 mt-1">OBD 연결 후 에코 데이터가 자동 누적됩니다.</p>
                    </div>
                    <a
                        href="/vehicle/obd-bridge"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs py-4 px-8 rounded-2xl transition-all shrink-0"
                    >
                        OBD 연결하기 <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}
