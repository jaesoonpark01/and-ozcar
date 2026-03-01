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
import OZPWalletUI from './OZPWalletUI';
import DataMarketplaceUI from './DataMarketplaceUI';
import VehiclePassportUI from './VehiclePassportUI';
import SecurityDashboard from './SecurityDashboard';
import WorkshopMatchingUI from './WorkshopMatchingUI';

type ViewMode = 'telemetry' | 'simulator' | 'wallet' | 'marketplace' | 'security' | 'passport' | 'workshop';

export default function OzcarAdminHub() {
    const { t } = useI18n();
    const [view, setView] = useState<ViewMode>('simulator');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { id: 'simulator', label: t('hub_sidemenu_simulator'), icon: Cpu, color: 'text-emerald-400' },
        { id: 'telemetry', label: t('hub_sidemenu_telemetry'), icon: Zap, color: 'text-yellow-400' },
        { id: 'wallet', label: t('hub_sidemenu_wallet'), icon: Wallet, color: 'text-indigo-400' },
        { id: 'marketplace', label: t('hub_sidemenu_marketplace'), icon: ShoppingBag, color: 'text-purple-400' },
        { id: 'passport', label: t('hub_sidemenu_passport'), icon: FileText, color: 'text-blue-400' },
        { id: 'security', label: t('hub_sidemenu_security'), icon: ShieldAlert, color: 'text-red-400' },
        { id: 'workshop', label: t('hub_sidemenu_workshop'), icon: Wrench, color: 'text-amber-400' },
    ];

    const renderView = () => {
        switch (view) {
            case 'simulator': return <HardwareSimulatorUI />;
            case 'telemetry': return <RealtimeTelemetryDashboard />;
            case 'wallet': return <OZPWalletUI />;
            case 'marketplace': return <DataMarketplaceUI />;
            case 'passport': return <VehiclePassportUI />;
            case 'security': return <SecurityDashboard />;
            case 'workshop': return <WorkshopMatchingUI />;
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
