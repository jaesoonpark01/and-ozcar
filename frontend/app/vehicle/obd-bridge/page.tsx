// app/vehicle/obd-bridge/page.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wifi,
    Link as LinkIcon,
    ShieldCheck,
    RefreshCw,
    CheckCircle2,
    ArrowLeft,
    Activity,
    Database,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { OBD3Service, ManufacturerData } from '@/services/obd/OBD3Service';
import MarketplaceLayout from '@/components/layout/MarketplaceLayout';
import ManufacturerHealthBadge from '@/components/technician/ManufacturerHealthBadge';

export default function OBDBridgePage() {
    const [syncing, setSyncing] = useState(false);
    const [mfrData, setMfrData] = useState<ManufacturerData | null>(null);
    const [syncComplete, setSyncComplete] = useState(false);
    const [step, setStep] = useState<'IDLE' | 'CONSENT' | 'FETCHING' | 'SYNCING' | 'COMPLETE'>('IDLE');
    const [progress, setProgress] = useState(0);

    const handleSync = async () => {
        setSyncing(true);
        setStep('CONSENT');
        setProgress(10);

        try {
            // 1. Consent Flow
            const approved = await OBD3Service.requestOwnerConsent("KR-OZCAR-2026-VIN");
            if (!approved) throw new Error("Consent denied");

            setStep('FETCHING');
            setProgress(40);

            // 2. Fetching from Manufacturer API
            const data = await OBD3Service.fetchManufacturerData('Tesla', "KR-OZCAR-2026-VIN");
            setMfrData(data);
            setProgress(70);

            setStep('SYNCING');
            // 3. Syncing with Ozcar DB
            const success = await OBD3Service.syncWithSupabase(data);
            if (success) {
                setProgress(100);
                setStep('COMPLETE');
                setSyncComplete(true);
            }
        } catch (error) {
            console.error("Sync failed:", error);
            setStep('IDLE');
            setSyncing(false);
        }
    };

    return (
        <MarketplaceLayout>
            <div className="max-w-4xl mx-auto py-20 px-6">
                {/* Header Section */}
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Back to Ecosystem</span>
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-500 mb-6">
                                <Wifi size={14} className="animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">OBD-III Remote Bridge</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none italic">
                                MANUFACTURER<br />
                                <span className="text-blue-600">DATA SYNC .</span>
                            </h1>
                        </div>
                        {!syncComplete && (
                            <button
                                onClick={handleSync}
                                disabled={syncing}
                                className="bg-slate-950 text-white px-10 py-6 rounded-[2rem] font-black text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 disabled:opacity-50"
                            >
                                {syncing ? (
                                    <RefreshCw className="animate-spin" size={20} />
                                ) : (
                                    <LinkIcon size={20} />
                                )}
                                <span>{syncing ? 'BRIDGING...' : '제조사 데이터 연동 시작'}</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Left: Sync Status & Progress */}
                    <div className="md:col-span-12 lg:col-span-5 space-y-8">
                        <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 font-mono">Integration Pipeline</h3>

                            <div className="space-y-10">
                                <SyncStep
                                    active={step === 'IDLE' || step === 'CONSENT'}
                                    done={['FETCHING', 'SYNCING', 'COMPLETE'].includes(step)}
                                    label="Owner Consent"
                                    sub="Authorization via Telematics Auth"
                                />
                                <SyncStep
                                    active={step === 'FETCHING'}
                                    done={['SYNCING', 'COMPLETE'].includes(step)}
                                    label="Manufacturer API Fetch"
                                    sub="Querying Global Fleet Records"
                                />
                                <SyncStep
                                    active={step === 'SYNCING'}
                                    done={step === 'COMPLETE'}
                                    label="Ledger Anchoring"
                                    sub="Ozcar Node Validation & Sync"
                                />
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-12">
                                <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase mb-3">
                                    <span>Sync Status</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-blue-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ShieldCheck size={80} className="group-hover:rotate-12 transition-transform duration-700" />
                            </div>
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Integrity Level</p>
                            <h4 className="text-2xl font-black mb-4 italic">Encrypted Point-to-Point</h4>
                            <p className="text-sm text-slate-400 font-medium">제조사 API와 오즈카 노드 간의 직접 통신을 통해 데이터 주권을 보장하며 위변조를 원천 차단합니다.</p>
                        </div>
                    </div>

                    {/* Right: Fetched Records View */}
                    <div className="md:col-span-12 lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {mfrData ? (
                                <motion.div
                                    key="data"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 space-y-10"
                                >
                                    <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Manufacturer Profile</p>
                                            <h4 className="text-xl font-black text-slate-900">{mfrData.brand}</h4>
                                        </div>
                                        <ManufacturerHealthBadge brand={mfrData.brand} status={mfrData.healthStatus} />
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Immutable Service History</h3>
                                        <div className="space-y-4">
                                            {mfrData.records.map((record, i) => (
                                                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-blue-500 transition-colors">
                                                    <div className="flex items-start gap-5">
                                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors">
                                                            <Database size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-blue-600 uppercase mb-1">{record.date}</p>
                                                            <p className="text-sm font-black text-slate-800 tracking-tight">{record.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-black tabular-nums">{record.odometer.toLocaleString()} km</p>
                                                        <p className="text-[10px] font-bold text-slate-300 uppercase">Verified</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {syncComplete && (
                                        <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                                        <CheckCircle2 size={24} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black text-lg">Sync Complete</h5>
                                                        <p className="text-xs text-white/70">Blockchain Registry Updated</p>
                                                    </div>
                                                </div>
                                                <Link href="/dashboard" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-xs hover:scale-105 transition-all">
                                                    VIEW DASHBOARD
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-24 text-center flex flex-col items-center justify-center min-h-[500px]"
                                >
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-8">
                                        <Activity className={`w-10 h-10 ${syncing ? 'text-blue-600 animate-pulse' : 'text-slate-200'}`} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-400 italic">Waiting for Sync Connection</h3>
                                    <p className="text-sm text-slate-400 mt-4 max-w-sm font-medium">
                                        연동 버튼을 눌러 제조사 서버로부터 차량의 원본 데이터를 안전하게 불러오세요.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </MarketplaceLayout>
    );
}

function SyncStep({ active, done, label, sub }: { active: boolean, done: boolean, label: string, sub: string }) {
    return (
        <div className={`flex gap-6 items-center px-4 transition-opacity ${!active && !done ? 'opacity-30' : 'opacity-100'}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all ${done ? 'bg-emerald-500 border-emerald-500 text-white' :
                active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110' :
                    'bg-white border-slate-100 text-slate-200'
                }`}>
                {done ? <CheckCircle2 size={16} /> : <Zap size={16} />}
            </div>
            <div>
                <p className={`text-sm font-black tracking-tight ${done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{label}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
            </div>
        </div>
    );
}
