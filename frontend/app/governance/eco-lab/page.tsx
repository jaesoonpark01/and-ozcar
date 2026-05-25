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
    { label: '?àÍ∞ê???ÑÏÜå', value: '148.6 kg', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: '?åÏàò???êÎÑàÏßÄ', value: '312 kWh', icon: Battery, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Ï¥?Ï£ºÌñâÍ±∞Î¶¨', value: '8,240 km', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Í∏ÄÎ°úÎ≤å ?êÏΩî ??Çπ', value: '#1,284', icon: Globe, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

const TABS = [
    { id: 'nft', label: '?êÏΩî ?úÎùº?¥Îπô NFT', icon: Award },
    { id: 'twin', label: '?îÏ????∏Ïúà', icon: BarChart3 },
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
                            ÏπúÌôòÍ≤?Ï£ºÌñâ ?∞Ïù¥?∞Î? ?¨Í? ?êÏΩî NFTÎ°?Î≥Ä?òÌïò?∏Ïöî. ?ÑÏÜå ?àÍ∞ê ?§Ï†Å???îÏ????êÏÇ∞???©Îãà??
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
                                        <h3 className="text-lg font-black text-white">?êÏΩî NFT?Ä?</h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        ?πÏã†??ÏπúÌôòÍ≤?Ï£ºÌñâ Í∏∞Î°ù??Î∏îÎ°ùÏ≤¥Ïù∏ ?ÑÏóê ?ÅÍµ¨?ÅÏúºÎ°?Í∏∞Î°ù???îÏ???Ï¶ùÏÑú?ÖÎãà??
                                        ?ÑÏÜå ?àÍ∞ê?? ?åÏàò ?êÎÑàÏßÄ, ?êÏΩî ?§ÏΩî?¥Í? NFT Î©îÌ??∞Ïù¥?∞Ïóê ?¥Í≤® Í±∞Îûò Í∞Ä?•Ìïú ?êÏÇ∞???©Îãà??
                                    </p>
                                </div>
                                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-3xl p-8">
                                    <h3 className="text-lg font-black text-white mb-4">?∞Ïñ¥ ?úÏä§??/h3>
                                    <div className="space-y-3">
                                        {[
                                            { tier: 'SEED', req: '?êÏΩî ?êÏàò 50+', color: 'text-lime-500' },
                                            { tier: 'LEAF', req: '?êÏΩî ?êÏàò 70+', color: 'text-green-400' },
                                            { tier: 'TREE', req: '?êÏΩî ?êÏàò 85+', color: 'text-emerald-400' },
                                            { tier: 'FOREST', req: '?êÏΩî ?êÏàò 93+', color: 'text-cyan-400' },
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
                                ÏßÄÍ∏?Î∞îÎ°ú ?úÏûë
                            </span>
                        </div>
                        <h3 className="text-2xl font-black text-white">ÏπúÌôòÍ≤?Ï£ºÌñâ?ºÎ°ú NFTÎ•??çÎìù?òÏÑ∏??/h3>
                        <p className="text-slate-400 mt-1">OBD ?∞Í≤∞ ???êÏΩî ?∞Ïù¥?∞Í? ?êÎèô ?ÑÏ†Å?©Îãà??</p>
                    </div>
                    <a
                        href="/vehicle/obd-bridge"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs py-4 px-8 rounded-2xl transition-all shrink-0"
                    >
                        OBD ?∞Í≤∞?òÍ∏∞ <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}
