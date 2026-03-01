"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Gauge,
    Wind,
    Thermometer,
    Activity,
    Zap,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useI18n } from '@/hooks/useI18n';

// Configuration for Performance
const MAX_DATA_POINTS = 300;
const THROTTLE_MS = 100; // 10Hz Update for UI (Data comes at 50Hz)

export default function RealtimeTelemetryDashboard() {
    const { t } = useI18n();
    const [telemetry, setTelemetry] = useState({
        rpm: 0,
        speed: 0,
        temp: 85,
        aps: 0,
        bps: false,
        isAnomaly: false
    });

    const [history, setHistory] = useState<number[]>([]);
    const lastUpdateRef = useRef(0);
    const [isLoading, setIsLoading] = useState(true);

    // Simulated Data Stream (Mimicking Supabase Realtime)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);

        const interval = setInterval(() => {
            const now = Date.now();

            // Artificial Data Generation
            const newRpm = 2000 + Math.sin(now / 1000) * 1000 + (Math.random() * 100);
            const newSpeed = 60 + Math.sin(now / 2000) * 20;
            const newAps = 15 + Math.sin(now / 500) * 10;

            // Performance Throttling for UI Re-renders
            if (now - lastUpdateRef.current > THROTTLE_MS) {
                setTelemetry(prev => ({
                    ...prev,
                    rpm: Math.round(newRpm),
                    speed: Math.round(newSpeed),
                    aps: Math.round(newAps),
                    bps: newRpm > 3500 && Math.random() > 0.8 // Random brake for sim
                }));

                setHistory(prev => {
                    const next = [...prev, Math.round(newRpm)];
                    return next.slice(-MAX_DATA_POINTS);
                });

                lastUpdateRef.current = now;
            }
        }, 20); // Underlying source is 50Hz (20ms)

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-6 space-y-6">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-48 bg-slate-800 animate-pulse rounded" />
                    <div className="h-6 w-32 bg-slate-800 animate-pulse rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <Card key={i} className="bg-slate-900 border-slate-800 h-32 animate-pulse" />
                    ))}
                </div>
                <Card className="bg-slate-900 border-slate-800 h-64 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6 bg-black min-h-screen text-slate-100">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black italic tracking-tighter uppercase">
                        ozcar <span className="text-emerald-500 font-normal">{t('hub_telemetry_live')}</span>
                    </h1>
                    <p className="text-xs text-slate-500 font-mono">{t('hub_telemetry_node')}: S32K3_PRO_01 | {t('hub_telemetry_status')}: {t('hub_telemetry_connected')}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] text-emerald-400 font-bold">50Hz {t('hub_telemetry_uplink')}</span>
                    </div>
                </div>
            </div>

            {/* Main Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    label={t('hub_telemetry_rpm')}
                    value={telemetry.rpm}
                    unit="r/min"
                    icon={<Gauge className="w-4 h-4 text-indigo-400" />}
                    progress={(telemetry.rpm / 8000) * 100}
                    color="bg-indigo-500"
                />
                <StatCard
                    label={t('hub_telemetry_speed')}
                    value={telemetry.speed}
                    unit="km/h"
                    icon={<Zap className="w-4 h-4 text-emerald-400" />}
                    progress={(telemetry.speed / 240) * 100}
                    color="bg-emerald-500"
                />
                <StatCard
                    label={t('hub_telemetry_aps')}
                    value={telemetry.aps}
                    unit="%"
                    icon={<Activity className="w-4 h-4 text-blue-400" />}
                    progress={telemetry.aps}
                    color="bg-blue-500"
                />
                <Card className={`bg-slate-900 border-slate-800 relative overflow-hidden transition-colors ${telemetry.bps ? 'bg-red-900/20 border-red-500/50' : ''}`}>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-[10px] uppercase text-slate-500 flex items-center gap-2">
                            <Wind className="w-4 h-4" /> {t('hub_telemetry_brake')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-3xl font-black">{telemetry.bps ? t('hub_telemetry_applied') : t('hub_telemetry_idle')}</div>
                        <div className={`mt-2 h-1 w-full rounded-full ${telemetry.bps ? 'bg-red-500' : 'bg-slate-800'}`} />
                    </CardContent>
                </Card>
            </div>

            {/* Performance Chart Simulation */}
            <Card className="bg-slate-950 border-slate-800 overflow-hidden">
                <CardHeader className="p-4 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-sm font-bold">{t('hub_telemetry_chart_title')}</CardTitle>
                        <p className="text-[10px] text-slate-500">{t('hub_telemetry_chart_desc')}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono border-slate-700">MTU: 1500 | LOSS: 0%</Badge>
                </CardHeader>
                <CardContent className="p-0 h-[200px] flex items-end gap-[2px] px-4">
                    {history.map((val, i) => (
                        <motion.div
                            key={i}
                            className="bg-indigo-500/40 w-full min-w-[2px] rounded-t-[1px]"
                            style={{ height: `${(val / 8000) * 100}%` }}
                            initial={false}
                        />
                    ))}
                </CardContent>
            </Card>

            {/* Bottom System Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center gap-4">
                    <Thermometer className="w-8 h-8 text-orange-500 bg-orange-500/10 p-2 rounded-lg" />
                    <div className="flex-1">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>{t('hub_telemetry_core_temp')}</span>
                            <span>{telemetry.temp}°C</span>
                        </div>
                        <Progress value={telemetry.temp} className="h-1 bg-slate-800" />
                    </div>
                </div>
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 bg-emerald-500/10 p-2 rounded-lg" />
                    <div className="flex-1">
                        <p className="text-xs font-bold text-slate-200 uppercase tracking-widest">{t('hub_telemetry_sec_health')}</p>
                        <p className="text-[10px] text-emerald-500">{t('hub_telemetry_sec_desc')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, unit, icon, progress, color }: any) {
    return (
        <Card className="bg-slate-900 border-slate-800 group hover:border-slate-600 transition-all">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-[10px] uppercase text-slate-500 flex items-center gap-2">
                    {icon} {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-4xl font-black text-white">{value.toLocaleString()}<span className="text-sm font-normal text-slate-500 ml-1">{unit}</span></div>
                <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className={`h-full ${color}`}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
