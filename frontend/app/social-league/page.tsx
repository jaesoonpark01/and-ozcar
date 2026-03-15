'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Trophy, Users, Star, Zap, Shield, ArrowRight,
    TrendingUp, Award, Globe
} from 'lucide-react';
import DrivingLeagueBoard from '@/components/social/DrivingLeagueBoard';
import AssetShowcase from '@/components/social/AssetShowcase';
import DigitalHandshake from '@/components/social/DigitalHandshake';
import { useI18n } from '@/hooks/useI18n';

const TABS = [
    { id: 'league', label: '드라이빙 리그', icon: Trophy },
    { id: 'assets', label: '에셋 쇼케이스', icon: Star },
    { id: 'handshake', label: '디지털 핸드셰이크', icon: Shield },
] as const;

type TabId = typeof TABS[number]['id'];

const STATS = [
    { label: '총 참여 드라이버', value: '28,412', icon: Users, color: 'text-blue-400' },
    { label: '이번 주 리그 보상', value: '142,000 OZP', icon: Trophy, color: 'text-amber-400' },
    { label: '검증된 에코 점수', value: '98.4%', icon: TrendingUp, color: 'text-emerald-400' },
    { label: '글로벌 리전', value: '14개국', icon: Globe, color: 'text-purple-400' },
];

export default function SocialLeaguePage() {
    const [activeTab, setActiveTab] = useState<TabId>('league');
    const { t } = useI18n();

    return (
        <div className="min-h-screen bg-[#07090f] text-white font-sans">
            {/* Hero Header */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <Award className="text-amber-400" size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">
                                Ozcar Social League
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                            Drive.
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Compete.
                            </span>
                            Earn.
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            실시간 드라이빙 리그에서 경쟁하고, 희귀 에셋을 수집하며, 글로벌 드라이버 네트워크와 연결하세요.
                        </p>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                    >
                        {STATS.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white/3 border border-white/5 rounded-2xl p-5 backdrop-blur-sm"
                            >
                                <stat.icon className={`${stat.color} mb-3`} size={20} />
                                <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-50 bg-[#07090f]/90 backdrop-blur-xl border-b border-white/5">
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
                                        layoutId="tab-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
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
                    {activeTab === 'league' && <DrivingLeagueBoard />}
                    {activeTab === 'assets' && <AssetShowcase />}
                    {activeTab === 'handshake' && <DigitalHandshake />}
                </motion.div>
            </div>

            {/* CTA Banner */}
            <div className="border-t border-white/5 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Zap size={16} className="text-blue-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-blue-400">
                                시즌 2026 Q1 리그
                            </span>
                        </div>
                        <h3 className="text-2xl font-black text-white">지금 바로 리그에 참여하세요</h3>
                        <p className="text-slate-400 mt-1">OBD 연결 후 자동으로 랭킹에 반영됩니다.</p>
                    </div>
                    <a
                        href="/vehicle/obd-bridge"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs py-4 px-8 rounded-2xl transition-all shrink-0"
                    >
                        OBD 연결하기 <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}
