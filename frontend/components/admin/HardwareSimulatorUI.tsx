"use client";

import React, { useState, useEffect } from 'react';
import { OBDSimulator } from '@/services/OBDSimulator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Play, Square, Database, TrendingUp, Info } from "lucide-react";

import { useI18n } from '@/hooks/useI18n';

export default function HardwareSimulatorUI() {
    const { t } = useI18n();
    const [isRunning, setIsRunning] = useState(false);
    const [stats, setStats] = useState({ rpm: 0, speed: 0, voltage: 0 });
    const [dataValue, setDataValue] = useState(0); // Simulated market value in USD/OZC
    const [dataCount, setDataCount] = useState(0);

    useEffect(() => {
        let interval: any;
        if (isRunning) {
            OBDSimulator.start(200);
            interval = setInterval(() => {
                const mockRpm = 800 + Math.random() * 2000;
                setStats({
                    rpm: mockRpm,
                    speed: Math.floor(mockRpm / 60),
                    voltage: 13.8 + Math.random() * 0.5
                });
                setDataCount(prev => prev + 3);
                setDataValue(prev => prev + 0.0005);
            }, 500);
        } else {
            OBDSimulator.stop();
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Simulation Controller */}
            <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3">
                    <span className={`flex h-3 w-3 ${isRunning ? 'animate-pulse' : ''}`}>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${isRunning ? 'bg-emerald-500' : 'bg-slate-700'}`}></span>
                    </span>
                </div>
                <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        {t('hub_sim_title')}
                    </CardTitle>
                    <CardDescription className="text-slate-400">{t('hub_sim_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-center py-4">
                        {!isRunning ? (
                            <Button onClick={() => setIsRunning(true)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 text-lg shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                                <Play className="w-6 h-6 mr-2" /> {t('hub_sim_start')}
                            </Button>
                        ) : (
                            <Button onClick={() => setIsRunning(false)} variant="destructive" className="w-full font-bold py-6 text-lg shadow-lg shadow-red-500/20 transition-all active:scale-95">
                                <Square className="w-6 h-6 mr-2" /> {t('hub_sim_stop')}
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-emerald-500/30 transition-colors">
                            <p className="text-xs text-slate-500 uppercase mb-1">{t('hub_sim_rpm')}</p>
                            <p className="text-xl font-mono font-bold text-emerald-400">{Math.floor(stats.rpm)}</p>
                        </div>
                        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-blue-500/30 transition-colors">
                            <p className="text-xs text-slate-500 uppercase mb-1">{t('hub_sim_speed')}</p>
                            <p className="text-xl font-mono font-bold text-blue-400">{stats.speed} km/h</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Data Assetization Engine */}
            <Card className="bg-slate-900 border-slate-800 shadow-2xl group">
                <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Database className="w-5 h-5 text-amber-500" />
                        {t('hub_sim_asset_title')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <p className="text-slate-400 text-sm">{t('hub_sim_est_value')}</p>
                            <p className="text-2xl font-bold text-amber-500">${dataValue.toFixed(4)} <span className="text-xs text-amber-500/60 font-black">USD</span></p>
                        </div>
                        <Progress value={(dataValue % 1) * 100} className="h-2 bg-slate-800" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                            <span className="text-slate-500">{t('hub_sim_records')}</span>
                            <span className="text-slate-300 font-mono font-bold">{dataCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-slate-800 pb-2 items-center">
                            <span className="text-slate-500">{t('hub_sim_status')}</span>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] px-2 h-5 font-black uppercase">
                                {t('hub_sim_signed')}
                            </Badge>
                        </div>
                        <div className="flex justify-between text-xs pb-1">
                            <span className="text-slate-500">{t('hub_sim_demand')}</span>
                            <span className="text-blue-400 font-bold uppercase tracking-tighter">High (Insurance)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Smart Marketplace Offer */}
            <Card className="bg-indigo-950/20 border-indigo-500/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-32 h-32 text-indigo-400" />
                </div>
                <CardHeader>
                    <CardTitle className="text-indigo-100 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                        {t('hub_sim_market_offer')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xs text-indigo-300/80 leading-relaxed italic">
                        "{t('hub_sim_market_desc')}"
                    </p>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-2 font-black shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                        {t('hub_sim_market_sell')}
                    </Button>
                    <div className="flex items-center gap-2 text-[10px] text-indigo-400/60 bg-indigo-500/5 p-2 rounded border border-indigo-500/10">
                        <Info className="w-3 h-3" />
                        {t('hub_sim_zkp_applied')}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
