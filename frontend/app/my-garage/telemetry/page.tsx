"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/hooks/useI18n";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    ShieldAlert,
    Zap,
    Database,
    Play,
    Square,
    Lock,
    Cpu,
    BarChart3,
    AlertTriangle
} from "lucide-react";

export default function TelemetryPage() {
    const { t } = useI18n();
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [metrics, setMetrics] = useState({
        rpm: 0,
        speed: 0,
        aps: 0,
        bps: 0,
        load: 0,
        voltage: 14.2
    });
    const [status, setStatus] = useState<"normal" | "warning" | "critical">("normal");
    const [suaDetected, setSuaDetected] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Simulation Logic
    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setMetrics(prev => {
                    // Simulate some random movement
                    const newRpm = Math.max(800, Math.min(6500, prev.rpm + (Math.random() - 0.5) * 500));
                    const newSpeed = Math.max(0, Math.min(180, prev.speed + (Math.random() - 0.5) * 5));
                    const newAps = Math.max(0, Math.min(100, prev.aps + (Math.random() - 0.5) * 10));
                    // Simulate BPS (Brake)
                    const newBps = Math.random() > 0.9 ? 1 : 0;

                    // SUA Detection Logic: High APS + BPS Applied = CRITICAL
                    if (newAps > 80 && newBps === 1) {
                        setStatus("critical");
                        setSuaDetected(true);
                    } else if (newAps > 60) {
                        setStatus("warning");
                    } else {
                        setStatus("normal");
                    }

                    const newDataPoint = {
                        time: new Date().toLocaleTimeString(),
                        rpm: newRpm,
                        aps: newAps,
                        bps: newBps * 100 // Scale for chart
                    };

                    setData(curr => [...curr.slice(-19), newDataPoint]);
                    return { ...prev, rpm: newRpm, speed: newSpeed, aps: newAps, bps: newBps };
                });
            }, 500);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isActive]);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-[#0052FF]/30 pb-4">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#0052FF] to-[#00F0FF]">
                        {t("hw_telemetry_title")}
                    </h1>
                    <p className="text-gray-400 text-sm">{t("hw_telemetry_subtitle")}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${isActive ? 'border-green-500/50 bg-green-500/10 text-green-400' : 'border-gray-700 bg-gray-800 text-gray-500'}`}>
                        <Cpu size={14} className={isActive ? 'animate-pulse' : ''} />
                        <span className="text-xs uppercase tracking-widest font-bold">
                            {isActive ? t("hw_telemetry_connected") : t("hw_telemetry_disconnected")}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${isActive ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-[#0052FF] hover:bg-[#0042CC] shadow-[0_0_15px_rgba(0,82,255,0.5)]'}`}
                    >
                        {isActive ? <Square size={18} /> : <Play size={18} />}
                        {isActive ? t("hw_session_end") : t("hw_session_start")}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Gauges & Status */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Main Gauges */}
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <h3 className="text-gray-500 text-xs mb-4 uppercase tracking-tighter">{t("hw_telemetry_live_metrics")}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-black/40 rounded-xl border border-[#00F0FF]/20">
                                <span className="text-[10px] text-gray-500 uppercase">{t("hw_metrics_rpm")}</span>
                                <div className="text-2xl font-bold text-[#00F0FF]">{Math.round(metrics.rpm)}</div>
                                <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#00F0FF]"
                                        animate={{ width: `${(metrics.rpm / 7000) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                    />
                                </div>
                            </div>
                            <div className="p-4 bg-black/40 rounded-xl border border-[#0052FF]/20">
                                <span className="text-[10px] text-gray-500 uppercase">{t("hw_metrics_speed")}</span>
                                <div className="text-2xl font-bold text-white">{Math.round(metrics.speed)} <span className="text-xs text-gray-500">{t("hw_telemetry_unit_kmh")}</span></div>
                                <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#0052FF]"
                                        animate={{ width: `${(metrics.speed / 200) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div>
                                <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase">
                                    <span>{t("hw_metrics_aps")}</span>
                                    <span className={metrics.aps > 80 ? 'text-red-500' : ''}>{Math.round(metrics.aps)}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${metrics.aps > 80 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-yellow-500'}`}
                                        animate={{ width: `${metrics.aps}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                                <span className="text-xs text-gray-400">{t("hw_metrics_bps")}</span>
                                <div className={`px-4 py-1 rounded text-xs font-bold ${metrics.bps > 0 ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 text-gray-500'}`}>
                                    {metrics.bps > 0 ? t("hw_telemetry_status_applied") : t("hw_telemetry_status_idle")}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Guardian Alert */}
                    <motion.div
                        animate={status === 'critical' ? { scale: [1, 1.02, 1], borderColor: ['rgba(239,68,68,0.5)', 'rgba(239,68,68,1)'] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className={`p-6 rounded-2xl border ${status === 'critical' ? 'bg-red-900/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-gray-900/50 border-white/10'}`}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldAlert size={20} className={status === 'critical' ? 'text-red-500' : 'text-[#0052FF]'} />
                            <h2 className="text-xl font-black italic uppercase tracking-tight">{t("hw_safety_title")}</h2>
                        </div>

                        <div className="space-y-4">
                            <div className={`p-4 rounded-xl text-sm ${status === 'critical' ? 'bg-red-500/10 text-red-400' : 'bg-black/40 text-gray-400'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity size={14} className={status === 'critical' ? 'text-red-500' : ''} />
                                    <span className="font-bold">{status === 'critical' ? t("hw_safety_status_critical") : t("hw_safety_status_normal")}</span>
                                </div>
                                {status === 'critical' && (
                                    <p className="text-xs mt-2 leading-relaxed text-red-300">
                                        <AlertTriangle size={12} className="inline mr-1" />
                                        {t("hw_safety_alert_mismatch")}
                                    </p>
                                )}
                            </div>

                            <button
                                disabled={!suaDetected}
                                className="w-full py-3 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-colors disabled:opacity-30 flex items-center justify-center gap-2"
                            >
                                <Database size={14} />
                                {t("hw_safety_report_generate")}
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Center/Right: Visualizer */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Chart Area */}
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <BarChart3 size={18} className="text-[#0052FF]" />
                                <span className="text-sm font-black italic uppercase tracking-widest text-slate-400">{t("hw_telemetry_chart_stream")}</span>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase italic">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#00F0FF] rounded-full"></div> RPM</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> APS</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> BPS</span>
                            </div>
                        </div>

                        <div className="flex-1 w-full relative">
                            {/* Simple Chart Visualization using SVG */}
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradient-rpm" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* RPM Path */}
                                {data.length > 1 && (
                                    <path
                                        d={`M ${data.map((p, i) => `${(i / (data.length - 1)) * 100}% ${(1 - (p.rpm / 7000)) * 100}%`).join(' L ')}`}
                                        fill="none"
                                        stroke="#00F0FF"
                                        strokeWidth="2"
                                        className="transition-all duration-300"
                                    />
                                )}
                                {/* APS Path */}
                                {data.length > 1 && (
                                    <path
                                        d={`M ${data.map((p, i) => `${(i / (data.length - 1)) * 100}% ${(1 - (p.aps / 100)) * 100}%`).join(' L ')}`}
                                        fill="none"
                                        stroke="#EAB308"
                                        strokeWidth="2"
                                        className="transition-all duration-300 opacity-60"
                                    />
                                )}
                                {/* BPS Path (Steps) */}
                                {data.length > 1 && (
                                    <path
                                        d={`M ${data.map((p, i) => `${(i / (data.length - 1)) * 100}% ${(1 - (p.bps / 200)) * 100}%`).join(' L ')}`}
                                        fill="none"
                                        stroke="#EF4444"
                                        strokeWidth="1"
                                        strokeDasharray="4 2"
                                        className="transition-all duration-300"
                                    />
                                )}
                            </svg>

                            {!isActive && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl">
                                    <div className="text-center group cursor-pointer" onClick={() => setIsActive(true)}>
                                        <div className="w-16 h-16 rounded-full bg-[#0052FF]/20 border border-[#0052FF]/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Play className="text-[#0052FF] ml-1" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">{t("hw_session_start")}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Secure Hardware Info */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-gray-900/50 border border-white/10 rounded-2xl flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
                                <Lock className="text-[#0052FF]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black italic uppercase tracking-tight mb-1">{t("hw_telemetry_hw_secure_engine")}</h4>
                                <p className="text-[10px] text-gray-500 leading-tight">{t("hw_telemetry_hw_secure_desc")}</p>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-900/50 border border-white/10 rounded-2xl flex items-center gap-4">
                            <div className="p-3 bg-[#00F0FF]/10 rounded-xl border border-[#00F0FF]/30">
                                <Zap className="text-[#00F0FF]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black italic uppercase tracking-tight mb-1">{t("hw_telemetry_net_uplink")}</h4>
                                <p className="text-[10px] text-gray-500 leading-tight">{t("hw_telemetry_net_desc")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
