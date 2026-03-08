"use client";

import React from 'react';
import { Battery, Zap, AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';

interface EfficiencyProps {
    current: number; // A
    voltage: number; // V
    hvacConsumptionKw: number; // 공조 소비전력 (kW)
    tempMax: number; // 배터리 최대 온도
    soc: number;
}

export default function EfficiencyAnalysis({ current, voltage, hvacConsumptionKw, tempMax, soc }: EfficiencyProps) {
    // 실시간 소모/회생 전력 (P = VI/1000)
    const instantPowerKw = (current * voltage) / 1000;

    // 마이너스면 방전(소모), 플러스면 충전(회생)으로 가정 시 단순화
    const isRegen = instantPowerKw < 0;
    const absPower = Math.abs(instantPowerKw);

    // 효율 스코어링 (0~100)
    // 회생 중이면 100점, 급가속(높은 출력)이면 점수 차감 등
    let effScore = 80;
    if (isRegen) effScore = 95;
    else if (absPower > 50) effScore = 40;
    else if (absPower > 20) effScore = 65;

    const scoreLabel = effScore > 80 ? "Excellent" : effScore > 60 ? "Good" : "Heavy Foot";

    return (
        <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#0052FF]">Real-time Efficiency</h4>
                <div className={`px-2 py-1 rounded bg-slate-800 text-xs font-bold ${effScore > 80 ? 'text-emerald-400' : 'text-orange-400'
                    }`}>
                    {scoreLabel}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <span className="text-xs text-slate-500 font-bold">Instant Power</span>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-black ${isRegen ? 'text-emerald-400' : 'text-slate-100'}`}>
                            {absPower.toFixed(1)}
                        </span>
                        <span className="text-sm text-slate-400 font-bold">kW</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                        {isRegen ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : <TrendingDown className="w-3 h-3 text-rose-400" />}
                        <span className="text-[10px] text-slate-400 font-medium">
                            {isRegen ? '회생 제동 활성화' : '동력 배터리 방전 중'}
                        </span>
                    </div>
                </div>

                <div>
                    <span className="text-xs text-slate-500 font-bold">HVAC / Aux</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-blue-300">
                            {hvacConsumptionKw.toFixed(1)}
                        </span>
                        <span className="text-sm text-slate-400 font-bold">kW</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 mt-2 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full" style={{ width: `${Math.min(100, (hvacConsumptionKw / 6) * 100)}%` }} />
                    </div>
                </div>
            </div>

            {/* Predictive Maintenance & Alerts */}
            <div className="space-y-2 mt-4">
                {(hvacConsumptionKw / absPower) > 0.3 && absPower > 0 && (
                    <div className="flex gap-3 bg-blue-900/20 p-3 rounded-2xl items-start border border-blue-500/10">
                        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-200/70 font-medium font-sans">
                            <strong className="text-blue-300">에코 팁: </strong> 공조(에어컨/히터) 소비량이 현재 주행 출력의 30%를 넘습니다. 회생 제동(i-Pedal)을 강화하거나 공조 설정을 최적화하면 전비가 개선됩니다.
                        </p>
                    </div>
                )}

                {tempMax > 45 && soc > 85 ? (
                    <div className="flex gap-3 bg-rose-900/20 p-3 rounded-2xl items-start border border-rose-500/20">
                        <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-rose-200/70 font-medium font-sans">
                            <strong className="text-rose-400">배터리 케어: </strong> 고온 환경({tempMax}°C)에서 높은 충전율({soc}%)을 장시간 유지하면 수명(SoH) 열화가 빨라집니다. 80% 스마트 충전을 권장합니다.
                        </p>
                    </div>
                ) : tempMax > 40 && (
                    <div className="flex gap-3 bg-amber-900/20 p-3 rounded-2xl items-start border border-amber-500/20">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-200/70 font-medium font-sans">
                            <strong className="text-amber-400">주의: </strong> 배터리 온도가 40도를 넘었습니다 ({tempMax}°C). 과격한 주행을 자제해 주세요.
                        </p>
                    </div>
                )}
            </div>

            {/* Background Graphic */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0052FF]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        </div>
    );
}
