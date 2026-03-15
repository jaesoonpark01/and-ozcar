'use client';

import { useBluetoothOBD } from '@/lib/obd/useBluetooth';
import { flushObdDataToSupabase } from '@/lib/obd/supabaseClient';
import { simulateRealtimeValue } from '@/lib/obd/pricing';
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
import { Activity, Bluetooth, Power, Send, ShieldCheck, Coins, LayoutDashboard, CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
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

    const [isPolling, setIsPolling] = useState(false);
    const [graphData, setGraphData] = useState<any[]>([]);

    // 프라이싱 엔진 연동 (클라이언트 사이드 모의 동작)
    const [minedOzp, setMinedOzp] = useState(0);
    const [totalPackets, setTotalPackets] = useState(0);

    // HUD 모드 상태
    const [showHUD, setShowHUD] = useState(false);

    // Trip Summary (주행 종료 후 모달)
    const [showTripSummary, setShowTripSummary] = useState(false);

    // 하단 뷰 탭 상태 (실시간 대시보드 | 커뮤니티 랭킹 | 인증서 | 주간 리포트 | 정책 거버넌스)
    const [activeView, setActiveView] = useState<'live' | 'community' | 'certificate' | 'weekly' | 'governance'>('live');

    // 폴링(Polling) 루프
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isConnected && isPolling) {
            interval = setInterval(() => {
                pollData();
            }, 1000); // 1초 간격
        }
        return () => clearInterval(interval);
    }, [isConnected, isPolling, pollData]);

    // 버퍼 배열 모니터링 및 Supabase 전송
    useEffect(() => {
        if (bufferPayloads.length > 0) {
            const addedCount = bufferPayloads.length;

            // Supabase로 전송 (Mock VIN 활용)
            flushObdDataToSupabase('KR-HKMC-TEST1', bufferPayloads).then(res => {
                if (res.success) {
                    // 성공한 경우 그래프 데이터용으로도 저장 (로컬 표출용)
                    setGraphData(prev => [...prev.slice(-30), ...bufferPayloads.filter(b => b.pid === 'SOC')]);

                    // 프라이싱 스토어 연동: 채굴된 데이터 누적량 기반 실시간 통화 가치 산출
                    setTotalPackets(prev => {
                        const newTotal = prev + addedCount;
                        setMinedOzp(simulateRealtimeValue({
                            isHardwareVerified: true, // 향후 실제 Hardware Key 검증으로 대치
                            dataPacketCount: newTotal
                        }));
                        return newTotal;
                    });
                }
            });
            // 발송 후 버퍼 초기화
            clearBufferPayloads();
        }
    }, [bufferPayloads, clearBufferPayloads]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-blue-500/30">

            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold flex items-center gap-3 text-white">
                        <Activity className="text-blue-500" size={32} />
                        Ozcar Sentinel
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">{t('sentinel_subtitle')}</p>
                </div>

                <div className="flex items-center gap-4">
                    <VerifiedBadge isVerified={isConnected} />
                    {isConnected ? (
                        <div className="flex items-center gap-2 bg-blue-900/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold border border-blue-800">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                            {t('sentinel_obd_connected')}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-slate-800 text-slate-400 px-4 py-2 rounded-full text-sm font-semibold border border-slate-700">
                            <div className="w-2.5 h-2.5 bg-slate-500 rounded-full" />
                            {t('sentinel_obd_disconnected')}
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 제어 패널 */}
                <div className="lg:col-span-1 border border-slate-800 bg-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

                    {/* 데이터 채굴 현황 컴포넌트 */}
                    <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/40 p-5 rounded-2xl border border-purple-500/30">
                        <p className="text-purple-300 text-xs font-bold mb-1 flex items-center gap-1">
                            <Coins size={14} /> {t('sentinel_mined_value')}
                        </p>
                        <div className="flex items-end gap-2">
                            <p className="text-3xl font-black text-white">{Math.floor(minedOzp).toLocaleString()}</p>
                            <span className="text-purple-400 font-bold mb-1">OZP</span>
                        </div>
                        <p className="text-slate-400 text-xs mt-2">{t('sentinel_packets_sent', { count: totalPackets.toLocaleString() })}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Bluetooth className="text-blue-400" /> {t('sentinel_connection_mgr')}
                        </h2>
                        {!isConnected ? (
                            <button
                                onClick={connectDevice}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-900/20"
                            >
                                <Bluetooth size={20} /> {t('sentinel_bt_pairing')}
                            </button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        const nextState = !isPolling;
                                        setIsPolling(nextState);
                                        // 주행 종료 시(isPolling이 true->false로 변할 때) 요약 리포트 표시
                                        if (!nextState) setShowTripSummary(true);
                                    }}
                                    className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all ${isPolling
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 hover:bg-amber-500/30'
                                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                                        }`}
                                >
                                    {isPolling ? <Power size={20} /> : <Send size={20} />}
                                    {isPolling ? t('sentinel_stop_polling') : t('sentinel_start_polling')}
                                </button>
                                <button
                                    onClick={disconnectDevice}
                                    className="w-full bg-slate-800 hover:bg-red-900/40 text-slate-300 font-bold py-3 rounded-xl transition-colors border border-slate-700"
                                >
                                    {t('sentinel_disconnect')}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-h-[200px] flex flex-col">
                        <h3 className="text-sm font-bold text-slate-400 mb-2">{t('sentinel_terminal_log')}</h3>
                        <div className="flex-1 bg-black/50 p-4 rounded-xl border border-slate-800/50 overflow-y-auto font-mono text-xs text-green-400 flex flex-col gap-1">
                            {log.length === 0 ? <p className="text-slate-600 italic">{t('sentinel_waiting')}</p> : null}
                            {log.map((l, i) => (
                                <div key={i} className="break-all opacity-80 hover:opacity-100 flex gap-2">
                                    <span className="text-slate-500 select-none">&rsaquo;</span>
                                    {l}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 텔레메트리 대시보드 */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* 상단 요약 카드 및 HUD 제어 (Phase 4 도입) */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <SummaryCard />
                        </div>
                        <div className="flex flex-col gap-3 justify-center">
                            <button
                                onClick={() => setShowHUD(true)}
                                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all border border-slate-700 shadow-xl h-full group"
                            >
                                <LayoutDashboard className="text-[#00ffcc] group-hover:scale-110 transition-transform" size={28} />
                                <span className="text-sm tracking-widest uppercase">{t('sentinel_btn_hud')}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <p className="text-slate-500 text-sm font-semibold mb-1">{t('sentinel_stat_soc')}</p>
                            <p className="text-3xl font-black text-white">{carData?.socDisplay.toFixed(1) || '--'} <span className="text-base font-medium text-slate-500">%</span></p>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <p className="text-slate-500 text-sm font-semibold mb-1">{t('sentinel_stat_temp')}</p>
                            <p className="text-3xl font-black text-amber-400">{carData?.tempMax.toFixed(1) || '--'} <span className="text-base font-medium text-amber-600/50">°C</span></p>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <p className="text-slate-500 text-sm font-semibold mb-1">{t('sentinel_stat_current')}</p>
                            <p className="text-3xl font-black text-blue-400">{carData?.current.toFixed(1) || '--'} <span className="text-base font-medium text-blue-600/50">A</span></p>
                        </div>
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-center">
                            <p className="text-slate-500 text-sm font-semibold mb-2">{t('sentinel_stat_soh')}</p>
                            <div className="flex items-end gap-2">
                                <ShieldCheck className={carData?.soh && carData.soh > 90 ? "text-emerald-500" : "text-slate-600"} size={28} />
                                <span className="text-xl font-bold">{carData?.soh.toFixed(1) || '--'}%</span>
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
