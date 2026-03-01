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
import { useI18n } from '@/hooks/useI18n';

export default function DiagnosticGateway() {
    const { t } = useI18n();
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
            alert(`[Web3 Mining] ${t('success')}! 50 ${t('market_coin_name')} ${t('market_tx_completed')}`);
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
            const approved = await OBD3Service.requestOwnerConsent("KR-OZCAR-2026-VIN");
            if (!approved) throw new Error("Owner denied access");
            setConsentPending(false);

            const data = await OBD3Service.fetchManufacturerData(selectedBrand, "KR-OZCAR-2026-VIN", "demo-token-123");
            setMfrData(data);

            const success = await OBD3Service.syncWithSupabase(data);
            if (success) setSyncComplete(true);

        } catch (error) {
            console.error("OBD-III Sync Failed:", error);
            alert(t('error_tx_failed'));
        } finally {
            setSyncing(false);
            setConsentPending(false);
        }
    };

    return (
        <div className="bg-[#121212] text-white p-8 rounded-[3rem] shadow-2xl mt-8 border border-white/5 relative overflow-hidden group/main">
            {/* Background Glows */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none group-hover/main:bg-blue-600/15 transition-all duration-1000"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10 relative z-10">
                <div>
                    <h3 className="text-2xl font-black italic uppercase italic tracking-tighter flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isStreaming ? 'bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5'}`}>
                            <Wifi className={`w-6 h-6 ${isStreaming ? 'text-green-400 animate-pulse' : 'text-slate-600'}`} />
                        </div>
                        {t('diag_gateway_title')} <span className="text-blue-500">OBD-III</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <div className="p-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value as any)}
                                className="bg-[#010410] text-[10px] font-black uppercase tracking-widest border-none rounded-[10px] px-4 py-2 outline-none text-white cursor-pointer"
                            >
                                <option value="Hyundai">HYUNDAI / KIA</option>
                                <option value="Tesla">TESLA MOTORS</option>
                            </select>
                        </div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                            {t('diag_universal_interface')} <Terminal size={12} className="text-blue-500/50" />
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <button
                        onClick={handleBluetoothConnect}
                        className={`group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border flex-1 lg:flex-none ${btConnected ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'}`}
                    >
                        <Wifi className={`w-4 h-4 ${btConnected ? 'text-blue-400 animate-pulse' : 'text-slate-600'}`} />
                        {btConnected ? t('diag_bt_anchored') : t('diag_bt_pair')}
                    </button>

                    <button
                        onClick={handleManufacturerSync}
                        disabled={syncing}
                        className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-xl flex-1 lg:flex-none ${syncComplete ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            'bg-blue-600 text-white border-blue-500 shadow-blue-600/20 hover:scale-[1.02] active:scale-95'
                            }`}
                    >
                        {syncing ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> {consentPending ? t('diag_sync_pending_owner') : t('diag_syncing_mfr')}</>
                        ) : syncComplete ? (
                            <><CheckCircle2 className="w-4 h-4" /> {t('diag_sync_verified')}</>
                        ) : (
                            <><Link className="w-4 h-4" /> {t('diag_sync_mfr_cloud')}</>
                        )}
                    </button>

                    <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border flex-1 lg:flex-none ${isStreaming ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'bg-white/5 text-slate-400 border-white/5'
                            }`}
                    >
                        {isStreaming ? t('diag_stop_stream') : t('diag_intercept_can')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {/* Advanced Telemetry HUD */}
                <div className="bg-[#010410]/60 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group/card hover:border-blue-500/20 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <Gauge size={18} className="text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('diag_telemetry_engine')}</span>
                        </div>
                        <Activity size={14} className="text-blue-500 animate-pulse" />
                    </div>

                    <div className="space-y-6">
                        <div className="relative p-6 bg-white/5 rounded-3xl border border-white/5 group-hover/card:bg-white/10 transition-all">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{t('diag_soh')}</div>
                                    <div className="text-5xl font-black text-white tracking-tighter italic">
                                        {mfrData?.ext?.soh || 99}<span className="text-xl ml-1 text-emerald-500">%</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{t('diag_cycle_count')}</div>
                                    <div className="text-lg font-black text-white tracking-tighter">1,242</div>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${mfrData?.ext?.soh || 99}%` }}
                                    className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{t('diag_power_load')}</div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-1 h-3 rounded-full ${i < 3 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-4xl font-black text-white tracking-tighter italic">
                                {mfrData?.ext?.voltage ? (mfrData.ext.voltage / 10).toFixed(1) : "38.5"}<span className="text-lg ml-1 text-blue-500 italic uppercase">kW</span>
                            </div>
                            <div className="mt-4 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                <span>{t('diag_arch_800v')}</span>
                                <span className="text-blue-500/50">{t('diag_peak_opt')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Guardian HUD */}
                <div className="bg-[#010410]/60 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group/card hover:border-indigo-500/20 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <Shield size={18} className="text-indigo-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('diag_ai_sentinel')}</span>
                        </div>
                        <div className="px-3 py-1 bg-indigo-500/10 rounded-full text-[8px] font-black text-indigo-400 uppercase tracking-widest animate-pulse border border-indigo-500/20">
                            {t('diag_watching')}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
                            <div className="absolute inset-2 rounded-full border border-dashed border-indigo-500/20 animate-[spin_20s_linear_infinite]"></div>
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/5" />
                                <motion.circle
                                    cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="6"
                                    className="text-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                                    strokeDasharray="465"
                                    initial={{ strokeDashoffset: 465 }}
                                    animate={{ strokeDashoffset: 465 * (1 - 0.98) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-white italic tracking-tighter">98<span className="text-base text-indigo-500">%</span></span>
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">{t('diag_trust_score')}</span>
                            </div>
                        </div>
                        <p className="mt-10 text-[11px] font-medium text-slate-400 text-center leading-relaxed italic">
                            {t('dash_ai_guardian_active')}
                        </p>
                    </div>
                </div>

                {/* Web3 Mining HUD */}
                <div className="bg-[#010410]/60 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group/card hover:border-amber-500/20 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <Zap size={18} className="text-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('diag_data_mining')}</span>
                        </div>
                        <Share2 size={14} className="text-slate-600 hover:text-amber-500 cursor-pointer transition-colors" />
                    </div>

                    <div className="bg-amber-500/5 p-6 rounded-[2rem] border border-amber-500/10 mb-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-[8px] text-amber-500 uppercase font-black tracking-widest mb-1">{t('diag_accumulated_rewards')}</div>
                                <div className="text-5xl font-black text-white tracking-tighter italic">
                                    124.5<span className="text-xl ml-1 text-amber-500 italic">OZC</span>
                                </div>
                            </div>
                            <div className="bg-amber-500/20 px-3 py-1 rounded-lg text-[10px] font-black text-amber-500 italic">
                                x2.4
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-500">{t('diag_proof_mileage')}</span>
                            <span className="text-white">742 <span className="text-slate-600">/ 1000 km</span></span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '74.2%' }}
                                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                            />
                        </div>
                        <p className="text-[9px] text-slate-500 font-medium leading-relaxed italic mt-4" dangerouslySetInnerHTML={{ __html: t('diag_mining_desc') }} />
                    </div>

                    <button className="w-full mt-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-[1.02] active:scale-95 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_15px_30px_rgba(245,158,11,0.2)]">
                        {t('diag_claim_nft')}
                    </button>
                </div>
            </div>

            <DTCAlertPanel
                alerts={dtcAlerts}
                onClose={(code) => setDtcAlerts(prev => prev.filter(a => a.code !== code))}
                onAction={(info) => alert(t('maint_concierge_alert', { code: info.code }))}
            />

            <div className="fixed bottom-8 right-8 z-[500] pointer-events-none md:pointer-events-auto">
                <button
                    onClick={simulateDtc}
                    className="bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5 px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest backdrop-blur-xl transition-all shadow-2xl"
                >
                    {t('diag_debug_simulator')}
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
