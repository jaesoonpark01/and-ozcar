"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    LayoutDashboard,
    Cpu,
    Wallet,
    ShoppingBag,
    ShieldAlert,
    FileText,
    Wrench,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Zap
} from "lucide-react";

import { useI18n } from '@/hooks/useI18n';

import HardwareSimulatorUI from './HardwareSimulatorUI';
import RealtimeTelemetryDashboard from './RealtimeTelemetryDashboard';
import SecurityDashboard from './SecurityDashboard';
import Link from 'next/link';

type ViewMode = 'telemetry' | 'simulator' | 'security' | 'technician' | 'assetization';

export default function OzcarAdminHub() {
    const { t } = useI18n();
    const [view, setView] = useState<ViewMode>('simulator');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { id: 'simulator', label: t('hub_sidemenu_simulator'), icon: Cpu, color: 'text-emerald-400' },
        { id: 'telemetry', label: t('hub_sidemenu_telemetry'), icon: Zap, color: 'text-yellow-400' },
        { id: 'security', label: t('hub_sidemenu_security'), icon: ShieldAlert, color: 'text-red-400' },
        { id: 'assetization', label: '자산 토큰화', icon: ShoppingBag, color: 'text-purple-400' },
        { id: 'technician', label: t('nav_technician'), icon: Wrench, color: 'text-amber-400' },
    ];

    const renderView = () => {
        switch (view) {
            case 'simulator': return <HardwareSimulatorUI />;
            case 'telemetry': return <RealtimeTelemetryDashboard />;
            case 'security': return <SecurityDashboard />;
            case 'assetization': return (
                <div className="space-y-8">
                    <header>
                        <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Vehicle Assetization Engine</h2>
                        <p className="text-slate-500 font-medium">Verify vehicle metadata and mint Decentralized History NFTs.</p>
                    </header>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <FileText className="text-purple-400" />
                                Pending Mint Queue
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { vin: 'WVWRB7AN...', model: 'CyberSedan S', status: 'Ready' },
                                    { vin: 'KLNA391B...', model: 'Ozcar Pulse', status: 'Verifying' }
                                ].map((car, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                                        <div>
                                            <p className="text-xs font-black text-white">{car.model}</p>
                                            <p className="text-[10px] text-slate-500 font-mono">{car.vin}</p>
                                        </div>
                                        <Badge className={car.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}>
                                            {car.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-10 rounded-[2.5rem] border border-purple-500/20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 mb-6 animate-pulse">
                                <ShoppingBag size={32} />
                            </div>
                            <h4 className="text-lg font-black italic text-white uppercase mb-2">Metadata Integrity Verified</h4>
                            <p className="text-xs text-slate-400 mb-8 max-w-xs">All 14 maintenance proofs and ZKP safety hashes synchronized for the selected vehicle.</p>
                            <button className="px-12 py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-purple-600/30 hover:bg-purple-500 transition-all active:scale-95">
                                Mint Decentralized History NFT
                            </button>
                        </div>
                    </div>
                </div>
            );
            case 'technician': return (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
                    <Wrench className="w-16 h-16 text-amber-500 animate-bounce" />
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase">Technician Portal Shortcut</h2>
                    <p className="text-slate-500 max-w-md">Access the dedicated service operations and business intelligence engine.</p>
                    <Link href="/technician/dashboard" className="px-8 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                        Launch Full Portal
                    </Link>
                </div>
            );
            default: return <HardwareSimulatorUI />;
        }
    };

    return (
        <div className="flex h-screen bg-black text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 80 }}
                className="bg-slate-900 border-r border-slate-800 flex flex-col z-50 relative shadow-2xl"
            >
                <div className="p-6 flex items-center justify-between">
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xl font-black italic tracking-tighter"
                            >
                                ozcar <span className="text-emerald-500 font-normal">Hub</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5 text-slate-500" /> : <Menu className="w-5 h-5 text-slate-500" />}
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = view === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id as ViewMode)}
                                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group relative ${isActive ? 'bg-indigo-600/10 text-white border border-indigo-600/30' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${isActive ? item.color : 'text-slate-500 group-hover:text-slate-300'}`} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="font-bold text-sm tracking-tight"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="w-full flex items-center gap-4 p-3 text-slate-500 hover:text-white hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && <span className="font-bold text-sm">{t('hub_logout')}</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Content Area */}
            <main className="flex-1 overflow-auto relative bg-[#050505]">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="p-8"
                    >
                        {renderView()}
                    </motion.div>
                </AnimatePresence>

                {/* Footer Insight (Sticky-ish) */}
                <div className="mt-auto p-8 pt-0 opacity-40 hover:opacity-100 transition-opacity">
                    <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <LayoutDashboard className="w-4 h-4 text-slate-500" />
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                                ozcar <span className="text-emerald-500">{t('hub_system_status')}</span> v2.4 | High Security Activated
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Badge variant="outline" className="text-[9px] border-slate-800 py-0 h-4">{t('hub_uptime')}: 99.9%</Badge>
                            <Badge variant="outline" className="text-[9px] border-slate-800 py-0 h-4 uppercase">mTLS Linked</Badge>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
