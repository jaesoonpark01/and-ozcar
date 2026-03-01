// app/maintenance/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wrench,
    Activity,
    Zap,
    Cpu,
    ShieldCheck,
    Clock,
    AlertTriangle,
    Bluetooth,
    Link as LinkIcon,
    ChevronRight,
    Search,
    Filter,
    History
} from 'lucide-react';
import { useWeb3 } from '@/components/Web3Provider';
import DiagnosticGateway from '@/components/technician/DiagnosticGateway';
import LiveDiagnosticMonitor from '@/components/technician/LiveDiagnosticMonitor';
import PremiumReportBlur from '@/components/diagnostics/PremiumReportBlur';
import ChurnPreventionModal from '@/components/diagnostics/ChurnPreventionModal';
import { useI18n } from '@/hooks/useI18n';

export default function MaintenancePortal() {
    const { account } = useWeb3();
    const { t } = useI18n();
    const [view, setView] = useState<'DIAGNOSTIC' | 'HISTORY' | 'BOOKING'>('DIAGNOSTIC');
    const [isConnected, setIsConnected] = useState(false);

    // Subscription Mock State
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showChurnModal, setShowChurnModal] = useState(false);

    // Mock history data
    const maintenanceHistory = [
        { id: 'REC-001', date: '2026-02-15', shop: 'Ozcar Seoul Premium', type: 'Software Update', status: 'VERIFIED' },
        { id: 'REC-002', date: '2026-01-20', shop: 'BOSCH Certified', type: 'Brake Fluid Replace', status: 'VERIFIED' },
        { id: 'REC-003', date: '2025-11-05', shop: 'Hyundai Bluehands', type: 'Battery Health Check', status: 'UNVERIFIED' },
    ];

    return (
        <div className="min-h-screen bg-[#010410] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Wrench size={20} className="text-blue-400" />
                            </div>
                            <span className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">{t('maint_hub_banner')}</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl font-black italic uppercase italic tracking-tighter"
                        >
                            {t('maint_title')} <span className="text-[#00ffc2]">{t('maint_portal')}</span>
                        </motion.h1>
                    </div>

                    <div className="flex bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/10">
                        {['DIAGNOSTIC', 'HISTORY', 'BOOKING'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setView(tab as any)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === tab
                                    ? 'bg-[#00ffc2] text-black shadow-[0_0_20px_rgba(0,255,194,0.3)]'
                                    : 'text-slate-500 hover:text-white'
                                    }`}
                            >
                                {tab === 'DIAGNOSTIC' ? t('maint_tab_diagnostic') : tab === 'HISTORY' ? t('maint_tab_history') : t('maint_tab_booking')}
                            </button>
                        ))}
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {view === 'DIAGNOSTIC' && (
                        <motion.div
                            key="diagnostic"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-8"
                        >
                            {/* Device Connection Status */}
                            <div className="bg-gradient-to-r from-blue-600/20 to-transparent border border-blue-500/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className={`p-5 rounded-full ${isConnected ? 'bg-green-500/20' : 'bg-slate-800'} animate-pulse`}>
                                        <Bluetooth size={32} className={isConnected ? 'text-green-400' : 'text-slate-500'} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black italic uppercase">{t('maint_obd_status')}</h3>
                                        <p className="text-slate-400 text-sm font-medium">
                                            {isConnected ? t('maint_obd_connected') : t('maint_obd_searching')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsConnected(!isConnected)}
                                    className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isConnected
                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        : 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
                                        }`}
                                >
                                    {isConnected ? t('maint_obd_disconnect') : t('maint_obd_connect')}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <LiveDiagnosticMonitor vehicleId="VIN-DRIVE-777" />
                                <div className="space-y-8">
                                    <DiagnosticGateway />
                                    {/* AI Insight Card */}
                                    <div className="bg-[#121212] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                                            <Cpu size={120} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-4 text-[#00ffc2]">
                                                <Zap size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{t('maint_ai_engine')}</span>
                                            </div>
                                            <h3 className="text-2xl font-black mb-2">{t('maint_ai_proposal')}</h3>
                                            <p className="text-slate-400 text-sm mb-6 max-w-sm">{t('maint_ai_proposal_desc')}</p>
                                            <div className="flex gap-3">
                                                <div className="bg-white/5 px-4 py-3 rounded-xl">
                                                    <p className="text-[9px] font-black text-slate-500 uppercase">{t('maint_confidence')}</p>
                                                    <p className="text-lg font-black italic text-white">94%</p>
                                                </div>
                                                <div className="bg-white/5 px-4 py-3 rounded-xl border border-[#00ffc2]/20">
                                                    <p className="text-[9px] font-black text-slate-500 uppercase">{t('maint_urgency')}</p>
                                                    <p className="text-lg font-black italic text-[#00ffc2]">{t('maint_urgency_high')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Premium Report Blur Container */}
                                    <div className="mt-8">
                                        <PremiumReportBlur
                                            isSubscribed={isSubscribed}
                                            onSubscribeClick={() => setIsSubscribed(true)}
                                        />

                                        {/* Mock buttons for testing Subscription state */}
                                        <div className="flex justify-center mt-4 gap-4">
                                            {isSubscribed && (
                                                <button
                                                    onClick={() => setShowChurnModal(true)}
                                                    className="text-xs text-slate-500 hover:text-red-400 underline decoration-slate-700 transition-colors"
                                                >
                                                    구독 해지하기 (테스트용)
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {view === 'HISTORY' && (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                                <div className="relative w-full sm:w-96">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type="text"
                                        placeholder={t('maint_history_search_placeholder')}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-xs font-medium focus:outline-none focus:border-blue-500/50"
                                    />
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400">
                                        <Filter size={14} /> {t('maint_filter')}
                                    </button>
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
                                        {t('maint_export_report')}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {maintenanceHistory.map((rec) => (
                                    <div key={rec.id} className="bg-[#121212]/50 border border-white/5 p-6 sm:p-8 rounded-[2rem] hover:border-white/10 transition-all group">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                                                    <History className="text-slate-400 group-hover:text-blue-400" size={24} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{rec.id}</span>
                                                        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{rec.date}</span>
                                                    </div>
                                                    <h4 className="text-xl font-black text-white">{rec.type}</h4>
                                                    <p className="text-slate-500 text-sm font-medium">{rec.shop}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                {rec.status === 'VERIFIED' ? (
                                                    <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                                        <ShieldCheck size={14} /> {t('maint_blockchain_verified')}
                                                    </div>
                                                ) : (
                                                    <div className="bg-slate-800 text-slate-500 px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                                        <AlertTriangle size={14} /> {t('maint_pending_verification')}
                                                    </div>
                                                )}
                                                <button className="p-4 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {view === 'BOOKING' && (
                        <motion.div
                            key="booking"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="bg-[#121212] border border-white/5 rounded-[3rem] p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Clock className="text-blue-400" size={32} />
                            </div>
                            <h3 className="text-3xl font-black italic uppercase italic mb-4">{t('maint_booking_ready')}</h3>
                            <p className="text-slate-400 max-w-sm mx-auto mb-8">{t('maint_booking_desc')}</p>
                            <button className="bg-white/5 text-slate-400 px-8 py-4 rounded-xl font-black uppercase tracking-widest">{t('maint_notify_me')}</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Churn Prevention Modal */}
                <ChurnPreventionModal
                    isOpen={showChurnModal}
                    userStats={{ months: 3, dataCount: "1.2M", points: "4,500" }}
                    onKeep={() => {
                        setShowChurnModal(false);
                        setIsSubscribed(true);
                        alert("구독을 유지해주셔서 감사합니다. OZP 포인트 2배 부스팅이 적용되었습니다.");
                    }}
                    onConfirmCancel={() => {
                        setShowChurnModal(false);
                        setIsSubscribed(false);
                        alert("구독이 해지되었습니다. 무료 버전을 계속 이용해 주세요.");
                    }}
                    onClose={() => setShowChurnModal(false)}
                />
            </div>
        </div>
    );
}
