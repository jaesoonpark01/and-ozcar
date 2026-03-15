'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Bluetooth, Power, Send, ShieldCheck, Coins, LayoutDashboard, CalendarDays 
} from 'lucide-react';
import { useBluetoothOBD } from '@/lib/obd/useBluetooth';
import { flushObdDataToSupabase } from '@/lib/obd/supabaseClient';
import { simulateRealtimeValue } from '@/lib/obd/pricing';
import { SentinelAIService } from '@/services/diagnostics/SentinelAIService';
import { VerifiedBadge } from '@/components/obd/VerifiedBadge';
import { LiveTelemetryGraph } from '@/components/obd/LiveTelemetryGraph';
import EfficiencyAnalysis from '@/components/obd/EfficiencyAnalysis';
import SummaryCard from '@/components/obd/SummaryCard';
import HUDMode from '@/components/obd/HUDMode';
import TripSummary from '@/components/obd/TripSummary';
import CommunityRanking from '@/components/obd/CommunityRanking';
import DataCertificate from '@/components/obd/DataCertificate';
import WeeklyReport from '@/components/obd/WeeklyReport';
import GovernanceDashboard from '@/components/community/GovernanceDashboard';
import { useI18n } from '@/hooks/useI18n';

export default function SentinelDashboard() {
    const { t, lang } = useI18n();
    const {
        isConnected,
        log,
        carData,
        bufferPayloads,
        connectDevice,
        disconnectDevice,
        pollData,
        clearBufferPayloads
    } = useBluetoothOBD();

    // AI 진단 상태 관리
    const [aiReport, setAiReport] = useState<any>(null);
    const [isPolling, setIsPolling] = useState(false);
    const [graphData, setGraphData] = useState<any[]>([]);

    // 프라이싱 엔진 연동 (클라이언트 사이드 모의 동작)
    const [minedOzp, setMinedOzp] = useState(0);
    const [totalPackets, setTotalPackets] = useState(0);

    // UI 상태
    const [showHUD, setShowHUD] = useState(false);
    const [showTripSummary, setShowTripSummary] = useState(false);
    const [activeView, setActiveView] = useState<'live' | 'community' | 'certificate' | 'weekly' | 'governance'>('live');

    // 폴링(Polling) 루프 + AI 분석 로직 통합
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isConnected && isPolling) {
            interval = setInterval(() => {
                pollData();
            }, 1000); // 1초 간격
        }
        return () => clearInterval(interval);
    }, [isConnected, isPolling, pollData]);

    // 실시간 데이터 변화 감지 및 AI 분석 엔진 호출
    useEffect(() => {
        if (carData?.voltage) {
            const report = SentinelAIService.analyzeVoltageStability(carData.voltage);
            setAiReport(report);
        }
    }, [carData?.voltage]);

    // 버퍼 배열 모니터링 및 Supabase 전송
    useEffect(() => {
        if (bufferPayloads.length > 0) {
            const addedCount = bufferPayloads.length;

            // Supabase로 전송 (Mock VIN 활용)
            flushObdDataToSupabase('KR-HKMC-TEST1', bufferPayloads).then(res => {
                if (res.success) {
                    setGraphData((prev: any[]) => [...prev.slice(-30), ...bufferPayloads.filter(b => b.pid === 'SOC')]);
                    setTotalPackets((prev: number) => {
                        const newTotal = prev + addedCount;
                        setMinedOzp(simulateRealtimeValue({
                            isHardwareVerified: true,
                            dataPacketCount: newTotal
                        }));
                        return newTotal;
                    });
                }
            });
            clearBufferPayloads();
        }
    }, [bufferPayloads, clearBufferPayloads]);

    return (
        <div className="min-h-screen bg-[#07080a] text-slate-100 p-6 md:p-12 font-sans selection:bg-blue-500/30">
            {/* Neural Background */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4 border-b border-white/5 pb-6 relative z-10">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-4">
                        <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                            <Activity size={28} />
                        </div>
                        Ozcar <span className="text-blue-500">Sentinel</span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-[10px] font-black uppercase tracking-[0.2em]">{t('sentinel_subtitle')}</p>
                </div>

                <div className="flex items-center gap-4">
                    <VerifiedBadge isVerified={isConnected} />
                    {isConnected ? (
                        <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-xl">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            {t('sentinel_obd_connected')}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 bg-white/5 text-slate-500 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5">
                            <div className="w-2 h-2 bg-slate-700 rounded-full" />
                            {t('sentinel_obd_disconnected')}
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                {/* 제어 패널 */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-[#0f1115] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />

                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl shadow-xl shadow-blue-900/40 mb-8 overflow-hidden relative">
                             <div className="absolute top-0 right-0 opacity-10 rotate-12 -translate-y-2">
                                <Coins size={80} />
                             </div>
                             <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Coins size={12} /> {t('sentinel_mined_value')}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-black text-white italic tracking-tighter">{Math.floor(minedOzp).toLocaleString()}</p>
                                <span className="text-blue-300 font-black italic text-xs uppercase tracking-tighter">OZP</span>
                            </div>
                            <p className="text-blue-300/60 text-[9px] font-black uppercase tracking-widest mt-4">
                                {t('sentinel_packets_sent', { count: totalPackets.toLocaleString() })}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                <Bluetooth size={14} className="text-blue-500" /> {t('sentinel_connection_mgr')}
                            </h2>
                            {!isConnected ? (
                                <button
                                    onClick={connectDevice}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/30 uppercase italic tracking-widest text-[10px]"
                                >
                                    <Bluetooth size={18} /> {t('sentinel_bt_pairing')}
                                </button>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            const nextState = !isPolling;
                                            setIsPolling(nextState);
                                            if (!nextState) setShowTripSummary(true);
                                        }}
                                        className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase italic tracking-widest text-[10px] ${isPolling
                                            ? 'bg-amber-600/10 text-amber-500 border border-amber-600/20'
                                            : 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20'
                                            }`}
                                    >
                                        {isPolling ? <Power size={18} /> : <Send size={18} />}
                                        {isPolling ? t('sentinel_stop_polling') : t('sentinel_start_polling')}
                                    </button>
                                    <button
                                        onClick={disconnectDevice}
                                        className="w-full bg-white/5 hover:bg-rose-600/10 text-slate-500 hover:text-rose-500 font-black py-3 rounded-2xl transition-all border border-white/5 uppercase tracking-widest text-[8px]"
                                    >
                                        {t('sentinel_disconnect')}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex flex-col flex-1">
                            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">{t('sentinel_terminal_log')}</h3>
                            <div className="h-48 bg-black/40 p-5 rounded-2xl border border-white/5 overflow-y-auto font-mono text-[9px] text-blue-400/70 flex flex-col gap-2 scrollbar-hide">
                                {log.length === 0 ? <p className="text-slate-700 italic">{t('sentinel_waiting')}</p> : null}
                                {log.map((l, i) => (
                                    <div key={i} className="break-all flex gap-3 group">
                                        <span className="text-slate-800 group-hover:text-blue-500 transition-colors">&gt;&gt;</span>
                                        {l}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 텔레메트리 대시보드 */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Summary Card + AI Insight 통합 */}
                        <div className="md:col-span-3">
                            <SummaryCard />
                        </div>
                        
                        {/* HUD Control & Status */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => setShowHUD(true)}
                                className="bg-[#0f1115] hover:bg-blue-600 text-slate-400 hover:text-white font-black p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all border border-white/5 shadow-2xl group h-full"
                            >
                                <LayoutDashboard className="group-hover:scale-110 transition-transform text-blue-500 group-hover:text-white" size={32} />
                                <span className="text-[10px] tracking-[0.2em] uppercase italic">{t('sentinel_btn_hud')}</span>
                            </button>
                        </div>
                    </div>

                    {/* AI Insight Bar (Phase 12 New) */}
                    {aiReport && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-1 rounded-3xl bg-gradient-to-r ${aiReport.score > 50 ? 'from-rose-500/20 via-amber-500/20' : 'from-emerald-500/10 via-blue-500/10'} to-transparent`}
                        >
                            <div className="bg-[#0f1115] p-6 rounded-[calc(1.5rem-2px)] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl ${aiReport.score > 50 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sentinel AI Insight</span>
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${aiReport.score > 50 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                                {aiReport.type}
                                            </span>
                                        </div>
                                        <h4 className="text-white font-black italic uppercase text-lg tracking-tight">
                                            {t(aiReport.message)}
                                        </h4>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-8 pr-4">
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Health Score</p>
                                        <p className={`text-2xl font-black italic ${aiReport.score > 50 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                            {100 - aiReport.score}%
                                        </p>
                                    </div>
                                    <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                                    <div className="text-left hidden md:block">
                                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Peak Dev.</p>
                                        <p className="text-lg font-black text-slate-300 italic">
                                            {aiReport.metrics?.peakDeviation.toFixed(3)}V
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-[#0f1115] p-8 rounded-[2rem] border border-white/5 group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4 group-hover:text-blue-400 transition-colors">{t('sentinel_stat_soc')}</p>
                                <p className="text-4xl font-black text-white italic tracking-tighter">{carData?.socDisplay.toFixed(1) || '--'} <span className="text-sm font-black text-slate-600 uppercase translate-y-1">%</span></p>
                            </div>
                        </div>
                        <div className="bg-[#0f1115] p-8 rounded-[2rem] border border-white/5 group hover:bg-white/[0.02] transition-colors">
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4 group-hover:text-amber-400 transition-colors">{t('sentinel_stat_temp')}</p>
                            <p className="text-4xl font-black text-amber-500 italic tracking-tighter">{carData?.tempMax.toFixed(1) || '--'} <span className="text-sm font-black text-amber-700 uppercase translate-y-1">°C</span></p>
                        </div>
                        <div className="bg-[#0f1115] p-8 rounded-[2rem] border border-white/5 group hover:bg-white/[0.02] transition-colors">
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4 group-hover:text-blue-400 transition-colors">{t('sentinel_stat_current')}</p>
                            <p className="text-4xl font-black text-blue-500 italic tracking-tighter">{carData?.current.toFixed(1) || '--'} <span className="text-sm font-black text-blue-700 uppercase translate-y-1">A</span></p>
                        </div>
                        <div className="bg-[#0f1115] p-8 rounded-[2rem] border border-white/5 group hover:bg-white/[0.02] transition-colors flex flex-col justify-between">
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4 group-hover:text-emerald-400 transition-colors">{t('sentinel_stat_soh')}</p>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className={carData?.soh && carData.soh > 90 ? "text-emerald-500" : "text-slate-700"} size={32} />
                                <span className="text-2xl font-black text-white italic tracking-tighter">{carData?.soh.toFixed(1) || '--'}%</span>
                            </div>
                        </div>
                    </div>

                    <LiveTelemetryGraph data={graphData} />

                    {carData && (
                        <div className="mt-6">
                            <EfficiencyAnalysis
                                current={carData.current}
                                voltage={carData.voltage}
                                hvacConsumptionKw={1.2} // Dummy Data for now
                                tempMax={carData.tempMax}
                                soc={carData.socDisplay}
                            />
                        </div>
                    )}

                    {carData?.isCharging && (
                        <div className="mt-4 bg-emerald-900/20 border border-emerald-800/50 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Power className="text-emerald-500 animate-pulse" />
                                <div>
                                    <p className="font-bold text-emerald-400 text-sm">{t('sentinel_charging_fast')}</p>
                                    <p className="text-emerald-500/70 text-xs">{t('sentinel_charging_desc')}</p>
                                </div>
                            </div>
                            <p className="font-mono text-emerald-500/80 text-sm">{carData.voltage.toFixed(1)}V</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 하단 확장 뷰포트 영역 (Phase 5) */}
            <div className="mt-12">
                <div className="flex gap-4 border-b border-slate-800 pb-4 mb-8">
                    <button
                        onClick={() => setActiveView('live')}
                        className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${activeView === 'live' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        {t('sentinel_tab_live')}
                    </button>
                    <button
                        onClick={() => setActiveView('community')}
                        className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${activeView === 'community' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        {t('sentinel_tab_community')}
                    </button>
                    <button
                        onClick={() => setActiveView('weekly')}
                        className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${activeView === 'weekly' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        {t('sentinel_tab_weekly')}
                    </button>
                    <button
                        onClick={() => setActiveView('certificate')}
                        className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${activeView === 'certificate' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        {t('sentinel_tab_certificate')}
                    </button>
                    <button
                        onClick={() => setActiveView('governance')}
                        className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${activeView === 'governance' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        {t('sentinel_tab_governance')}
                    </button>
                </div>

                {activeView === 'governance' && (
                    <div className="max-w-5xl">
                        <GovernanceDashboard />
                    </div>
                )}
                {activeView === 'community' && (
                    <div className="h-[600px] max-w-4xl">
                        <CommunityRanking />
                    </div>
                )}
                {activeView === 'certificate' && (
                    <div className="h-[700px] max-w-4xl">
                        <DataCertificate />
                    </div>
                )}
                {activeView === 'live' && (
                    <div className="text-center py-10 bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
                        <p>{t('sentinel_live_placeholder')}</p>
                    </div>
                )}
                {activeView === 'weekly' && (
                    <div className="max-w-4xl">
                        <WeeklyReport />
                    </div>
                )}
            </div>

            {/* Trip Summary 오버레이 (조건부 모달) */}
            {showTripSummary && (
                <TripSummary
                    score={91} // Mock Data
                    distance={carData?.socDisplay ? 12 : 0}
                    efficiency={6.8}
                    savedMoney={4200}
                    onClose={() => setShowTripSummary(false)}
                />
            )}

            {/* HUD 모드 오버레이 (조건부 렌더링) */}
            {showHUD && (
                <HUDMode
                    speed={carData?.speed || 0}
                    soc={carData?.socDisplay || 0}
                    temp={carData?.tempMax || 0}
                    powerKw={carData?.current ? (carData.current * carData.voltage) / 1000 : 0}
                    dtcWarning={false} // 연동 예정
                    onClose={() => setShowHUD(false)}
                />
            )}

        </div>
    );
}
