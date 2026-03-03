"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Globe,
    BarChart3,
    Database,
    TrendingUp,
    ShieldCheck,
    ArrowUpRight,
    PieChart,
    Layers,
    Lock,
    Zap,
    Cpu
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import DataMarketplace from '@/components/telemetry/DataMarketplace';
import OZPWallet from '@/components/wallet/OZPWallet';
import Link from 'next/link';

const StatCard = ({ title, value, detail, icon: Icon, color }: any) => (
    <div className="bg-[#121212] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-10 -mr-16 -mt-16 bg-${color}-500`} />
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-${color}-500/30 transition-colors`}>
                    <Icon size={20} className={color === 'emerald' ? 'text-[#00ffc2]' : `text-${color}-400`} />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 text-right">{title}</span>
                    <ArrowUpRight size={14} className="text-slate-700" />
                </div>
            </div>
            <div className="text-4xl font-black italic text-white tracking-tighter mb-2">{value}</div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{detail}</p>
        </div>
    </div>
);

export default function InsightLabPage() {
    const { t } = useI18n();

    return (
        <div className="min-h-screen bg-black text-white p-6 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-[#00ffc2] rounded-full" />
                            <span className="text-xs font-black text-[#00ffc2] uppercase tracking-[0.3em]">Governance Lab 0x1</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
                            {t('lab_title').split(' ').map((word: string, i: number) => (
                                <span key={i} className={i === 2 ? 'text-[#00ffc2]' : ''}>{word} </span>
                            ))}
                        </h1>
                        <p className="text-slate-500 text-sm font-medium mt-6 max-w-xl leading-relaxed">
                            {t('lab_lab_desc')}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-[10px] font-black text-[#00ffc2] uppercase tracking-widest mb-1">Founder Status</div>
                            <div className="text-xl font-black italic uppercase">Secondary Founder</div>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00ffc2] to-blue-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <ShieldCheck className="text-[#00ffc2]" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Action Area: Telemetry Link */}
                <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-[#0052FF]/30 p-1 rounded-[3rem]">
                    <div className="bg-black/40 backdrop-blur-xl rounded-[2.9rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-[#0052FF]/20 rounded-3xl border border-[#0052FF]/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,82,255,0.3)]">
                                <Cpu className="text-[#0052FF] animate-pulse" size={40} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase italic tracking-widest">{t("hw_telemetry_title")}</h2>
                                <p className="text-gray-400 text-xs mt-1 uppercase tracking-tight">Real-time CAN FD Analysis Interface active</p>
                            </div>
                        </div>
                        <Link href="/telemetry" className="px-10 py-5 bg-[#0052FF] hover:bg-[#0042CC] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_20px_rgba(0,82,255,0.5)] transition-all hover:scale-105">
                            Launch Link
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title={t('lab_data_assets_value')}
                        value="$42.5M"
                        detail="Global Aggregated"
                        icon={Database}
                        color="emerald"
                    />
                    <StatCard
                        title={t('lab_roi_projection')}
                        value="520%"
                        detail="36-Month Yield"
                        icon={TrendingUp}
                        color="blue"
                    />
                    <StatCard
                        title={t('lab_global_market_demand')}
                        value="High"
                        detail="Insurance & OEM"
                        icon={Globe}
                        color="purple"
                    />
                    <StatCard
                        title={t('lab_sovereignty_status')}
                        value="99.9%"
                        detail="Encrypted & Anchored"
                        icon={Lock}
                        color="amber"
                    />
                </div>

                {/* Marketplace & Wallet Integration */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DataMarketplace />
                    <OZPWallet />
                </div>

                {/* Original Insight Section (Secondary) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-60">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Visualization Wrapper */}
                        <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-xl font-black italic uppercase italic tracking-tighter text-slate-400">Regional Data Distribution</h3>
                                </div>
                                <div className="aspect-[21/9] w-full bg-white/5 rounded-3xl border border-dashed border-white/10 flex items-center justify-center">
                                    <div className="text-center">
                                        <Layers className="mx-auto mb-4 text-slate-800" size={32} />
                                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Global Oracle Network</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#121212] border border-white/5 p-8 rounded-[2.5rem]">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Network Health</h4>
                            <div className="space-y-4">
                                {[
                                    { name: 'Shard-1 (KR)', status: 'Optimal' },
                                    { name: 'Shard-2 (US)', status: 'Optimal' },
                                    { name: 'Shard-3 (EU)', status: 'Active' }
                                ].map((node, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-xl">
                                        <span className="text-[10px] font-bold text-slate-400">{node.name}</span>
                                        <div className="w-1.5 h-1.5 bg-[#00ffc2] rounded-full animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
