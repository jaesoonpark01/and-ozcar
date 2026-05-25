import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wifi, Share2, Terminal, ShieldAlert, Zap, Link,
    Loader2, CheckCircle2, Gauge, Shield, Activity, Cpu
} from 'lucide-react';
import { OBD3Service, ManufacturerData } from '@/services/obd/OBD3Service';
import DTCAlertPanel from '../diagnostics/DTCAlertPanel';
import { BluetoothOBDService } from '@/services/obd/BluetoothOBDService';
import ManufacturerHealthBadge from './ManufacturerHealthBadge';

export default function DiagnosticGateway() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [dataPoints, setDataPoints] = useState<number[]>(Array(20).fill(50));

    // OBD-III States
    const [syncing, setSyncing] = useState(false);
    const [consentPending, setConsentPending] = useState(false);
    const [mfrData, setMfrData] = useState<ManufacturerData | null>(null);
    const [syncComplete, setSyncComplete] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isStreaming) {
            interval = setInterval(() => {
                setDataPoints(prev => {
                    const next = [...prev.slice(1), 40 + Math.random() * 40];
                    return next;
                });
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isStreaming]);

    const [selectedBrand, setSelectedBrand] = useState<'Hyundai' | 'Tesla'>('Hyundai');
    const [btConnected, setBtConnected] = useState(false);
    const [dtcAlerts, setDtcAlerts] = useState<any[]>([]);

    useEffect(() => {
        // Initialize Bluetooth -> Cloud Pipeline
        OBD3Service.initBluetoothPipeline((liveData) => {
            setMfrData(liveData);
            setSyncComplete(true);
        });

        // Listen for DTC events
        const handleDtc = async (e: any) => {
            const { DTCService } = await import('@/services/obd/DTCService');
            const newCodes = e.detail as string[];

            for (const code of newCodes) {
                const info = await DTCService.analyzeDTC(code);
                setDtcAlerts(prev => {
                    if (prev.find(a => a.code === info.code)) return prev;
                    return [info, ...prev];
                });
            }
        };

        document.addEventListener('obd_dtc_detected', handleDtc);

        // Listen for AI Guardian events
        const handleAiAnomaly = (e: any) => {
            const report = e.detail;
            alert(`[AI Guardian] ${report.type}: ${report.message}`);
        };

        // Listen for Mining events
        const handleMining = (e: any) => {
            const { reward } = e.detail;
            alert(`[Web3 Mining] 축하합니다! 50 OZC 토큰이 마이닝되었습니다.`);
        };

        document.addEventListener('obd_ai_anomaly', handleAiAnomaly);
        document.addEventListener('obd_mining_milestone', handleMining);

        return () => {
            document.removeEventListener('obd_dtc_detected', handleDtc);
            document.removeEventListener('obd_ai_anomaly', handleAiAnomaly);
            document.removeEventListener('obd_mining_milestone', handleMining);
        };
    }, []);

    const simulateDtc = async () => {
        const { DTCService } = await import('@/services/obd/DTCService');
        const demoCode = "P1B70"; // High Voltage Battery Low
        const info = await DTCService.analyzeDTC(demoCode);
        setDtcAlerts(prev => [info, ...prev]);
    };

    const handleBluetoothConnect = async () => {
        try {
            const { obdScanner } = await import('@/services/obd/BluetoothOBDService');
            const success = await obdScanner.connect();
            if (success) {
                setBtConnected(true);
                await obdScanner.startTelemeteryStream();
            }
        } catch (error) {
            console.error("BT Connection failed", error);
        }
    };

    const handleManufacturerSync = async () => {
        setSyncing(true);
        setConsentPending(true);

        try {
            // 1. 차주 승인 요청 (Owner Approval Request)
            const approved = await OBD3Service.requestOwnerConsent("KR-OZCAR-2026-VIN");
            if (!approved) throw new Error("Owner denied access");
            setConsentPending(false);

            // 2. 제조사 데이터 페칭 (Universal Gateway Call)
            // In demo mode, we pass a 'mock-token' to trigger the real gateway path
            const data = await OBD3Service.fetchManufacturerData(selectedBrand, "KR-OZCAR-2026-VIN", "demo-token-123");
            setMfrData(data);

            // 3. Supabase DB와 동기화
            const success = await OBD3Service.syncWithSupabase(data);
            if (success) setSyncComplete(true);

        } catch (error) {
            console.error("OBD-III Sync Failed:", error);
            alert("제조사 데이터 연동 실패: 차주 승인 거절 또는 네트워크 오류");
        } finally {
            setSyncing(false);
            setConsentPending(false);
        }
    };

    return (
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl mt-8 border border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Wifi className={`w-5 h-5 ${isStreaming ? 'text-green-400 animate-pulse' : 'text-slate-500'}`} />
                        원격 진단 게이트웨이 (OBD-III)
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value as any)}
                            className="bg-slate-800 text-[10px] font-bold border border-white/10 rounded-lg px-2 py-1 outline-none text-blue-400"
                        >
                            <option value="Hyundai">HYUNDAI / KIA</option>
                            <option value="Tesla">TESLA MOTORS</option>
                        </select>
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Remote Diagnostic & Multi-Brand API Bridge</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleBluetoothConnect}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${btConnected ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-slate-800 text-slate-200 border border-white/10 hover:bg-slate-700'}`}
                    >
                        <Wifi className={`w-4 h-4 ${btConnected ? 'text-blue-400' : 'text-slate-500'}`} />
                        {btConnected ? 'BT 연결됨' : '블루투스 페어링'}
                    </button>
                    <button
                        onClick={handleManufacturerSync}
                        disabled={syncing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${syncComplete ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' :
                            'bg-indigo-600 text-white border-indigo-500/50 hover:bg-indigo-500'
                            }`}
                    >
                        {syncing ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> {consentPending ? '차주 승인 대기중...' : '제조사 동기화...'}</>
                        ) : syncComplete ? (
                            <><CheckCircle2 className="w-4 h-4" /> 동기화 완료</>
                        ) : (
                            <><Link className="w-4 h-4" /> 제조사 데이터 연동</>
                        )}
                    </button>
                    <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isStreaming ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-slate-800 text-slate-200 border border-white/10'
                            }`}
                    >
                        {isStreaming ? '스트리밍 중지' : 'CAN 버스 탭'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {/* Advanced Telemetry HUD (Holographic Glass) */}
                <div className="bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Gauge className="w-5 h-5 text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/80">Telemetry Engine</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1 H-3 bg-blue-500/50 rounded-full animate-pulse" />
                            <div className="w-1 H-3 bg-blue-500/30 rounded-full animate-pulse [animation-delay:0.2s]" />
                            <div className="w-1 H-3 bg-blue-500/20 rounded-full animate-pulse [animation-delay:0.4s]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-blue-500/30 transition-all">
                            <div className="text-[8px] text-slate-500 uppercase font-black mb-1">State of Health</div>
                            <div className="text-3xl font-black text-emerald-400 tracking-tighter">
                                {mfrData?.ext?.soh || 99}<span className="text-sm ml-1 opacity-50">%</span>
                            </div>
                            <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${mfrData?.ext?.soh || 99}%` }}
                                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                />
                            </div>
                        </div>
                        <div className="relative p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-blue-500/30 transition-all">
                            <div className="text-[8px] text-slate-500 uppercase font-black mb-1">Power Output</div>
                            <div className="text-3xl font-black text-blue-400 tracking-tighter">
                                {mfrData?.ext?.voltage ? (mfrData.ext.voltage / 10).toFixed(1) : "38.5"}<span className="text-sm ml-1 opacity-50">kW</span>
                            </div>
                            <div className="mt-2 text-[8px] font-mono text-blue-500/70">800V Architecture</div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-black/40 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-slate-400">CAN Bus Latency</span>
                            <span className="text-[10px] font-mono text-green-400">1.2ms</span>
                        </div>
                        <div className="flex gap-0.5 h-8 items-end">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: `${20 + Math.random() * 80}%` }}
                                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                                    className="flex-1 bg-blue-500/20 rounded-t-[1px]"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Guardian: Sentinel HUD */}
                <div className="bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-indigo-500/20 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80">AI Sentinel Guardian</span>
                        </div>
                        <div className="px-2 py-0.5 bg-indigo-500/20 rounded-full text-[8px] font-black text-indigo-400 animate-pulse">
                            ACTIVE
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/5" />
                                <motion.circle
                                    cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="4"
                                    className="text-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                                    strokeDasharray="377"
                                    animate={{ strokeDashoffset: 377 * (0.1) }} // 90% health
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-white">98</span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase">Trust Score</span>
                            </div>
                        </div>
                        <p className="mt-6 text-[11px] font-bold text-slate-300 text-center leading-relaxed">
                            "Sentinel AI가 배터리 셀 밸런싱을 <br /> 0.001V 단위로 실시간 감시 중입니다."
                        </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="bg-white/5 p-2 rounded-xl text-center">
                            <div className="text-[8px] text-slate-500 uppercase mb-1">Anomaly Risk</div>
                            <div className="text-xs font-black text-emerald-400">LOW (0.2%)</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded-xl text-center">
                            <div className="text-[8px] text-slate-500 uppercase mb-1">Predictive RUL</div>
                            <div className="text-xs font-black text-indigo-400">421,500 km</div>
                        </div>
                    </div>
                </div>

                {/* Web3 Loyalty: OBD Mining HUD */}
                <div className="bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/80">OZC Data Mining</span>
                        </div>
                        <Share2 className="w-4 h-4 text-slate-500 hover:text-amber-500 transition-colors pointer-events-auto cursor-pointer" />
                    </div>

                    <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 mb-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-[8px] text-amber-500/70 uppercase font-black mb-1">Pending Rewards</div>
                                <div className="text-4xl font-black text-white tracking-tighter">
                                    124.50<span className="text-sm ml-1 text-amber-500 italic">OZC</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[8px] text-slate-500 uppercase font-black mb-1">Current Multiplier</div>
                                <div className="text-lg font-black text-amber-500">x2.4</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-slate-400">Proof of Data Progress</span>
                            <span className="font-mono text-amber-500">742 / 1000 km</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '74.2%' }}
                                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                            />
                        </div>
                        <p className="text-[9px] text-slate-500 leading-tight">
                            "신뢰할 수 있는 주행 데이터 1,000km 도달 시 <br /> **Trust NFT**의 가치가 영구 상승합니다."
                        </p>
                    </div>

                    <button className="w-full mt-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_20px_rgba(245,158,11,0.2)]">
                        보상 수령 및 NFT 업데이트
                    </button>
                </div>
            </div>

            {/* DTC Real-time Alert System */}
            <DTCAlertPanel
                alerts={dtcAlerts}
                onClose={(code) => setDtcAlerts(prev => prev.filter(a => a.code !== code))}
                onAction={(info) => alert(`[OZCAR Concierge] 정비 예약 프로세스 시작: ${info.code}`)}
            />

            {/* Simulation Controls (Demo Only) */}
            <div className="fixed bottom-8 left-8 z-[500]">
                <button
                    onClick={simulateDtc}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-xl transition-all"
                >
                    고장 코드(DTC) 시뮬레이션
                </button>
            </div>
        </div>
    );
}

function ReportItem({ label, value, status }: { label: string, value: string, status: string }) {
    return (
        <div className="flex justify-between items-start">
            <div>
                <div className="text-xs font-bold text-slate-200">{label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{value}</div>
            </div>
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${status === 'Passed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {status}
            </span>
        </div>
    );
}

function AnalyticsSmallCard({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="text-center bg-white/5 p-2 rounded-lg">
            <div className="text-[8px] text-slate-500 uppercase">{label}</div>
            <div className={`text-xs font-bold ${color}`}>{value}</div>
        </div>
    );
}

function Badge({ text, color }: { text: string, color: string }) {
    return (
        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${color}`}>
            {text}
        </span>
    );
}
