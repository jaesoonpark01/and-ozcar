"use client";

import React from 'react';
import { Battery, Zap, AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface EfficiencyProps {
    current: number; // A
    voltage: number; // V
    hvacConsumptionKw: number; // 공조 소비전력 (kW)
    tempMax: number; // 배터리 최대 온도
    soc: number;
}

export default function EfficiencyAnalysis({ current, voltage, hvacConsumptionKw, tempMax, soc }: EfficiencyProps) {
    const { t } = useI18n();
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

    const scoreLabel = effScore > 80 ? t('eff_score_excellent') : effScore > 60 ? t('eff_score_good') : t('eff_score_heavy');

    return (
        <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#0052FF]">{t('eff_title')}</h4>
                <div className={`px-2 py-1 rounded bg-slate-800 text-xs font-bold ${effScore > 80 ? 'text-emerald-400' : 'text-orange-400'
                    }`}>
                    {scoreLabel}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <span className="text-xs text-slate-500 font-bold">{t('eff_instant_power')}</span>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-black ${isRegen ? 'text-emerald-400' : 'text-slate-100'}`}>
                            {absPower.toFixed(1)}
                        </span>
                        <span className="text-sm text-slate-400 font-bold">kW</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                        {isRegen ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : <TrendingDown className="w-3 h-3 text-rose-400" />}
                        <span className="text-[10px] text-slate-400 font-medium">
                            {isRegen ? t('eff_regen_active') : t('eff_discharging')}
                        </span>
                    </div>
                </div>

                <div>
                    <span className="text-xs text-slate-500 font-bold">{t('eff_hvac_aux')}</span>
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
                            <strong className="text-blue-300">{t('eff_eco_tip_prefix')}: </strong> {t('eff_eco_tip_hvac', { percent: 30 })}
                        </p>
                    </div>
                )}

                {tempMax > 45 && soc > 85 ? (
                    <div className="flex gap-3 bg-rose-900/20 p-3 rounded-2xl items-start border border-rose-500/20">
                        <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-rose-200/70 font-medium font-sans">
                            <strong className="text-rose-400">{t('eff_battery_care_prefix')}: </strong> {t('eff_battery_care_hot_soc', { temp: tempMax, soc: soc })}
                        </p>
                    </div>
                ) : tempMax > 40 && (
                    <div className="flex gap-3 bg-amber-900/20 p-3 rounded-2xl items-start border border-amber-500/20">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-200/70 font-medium font-sans">
                            <strong className="text-amber-400">{t('eff_caution_prefix')}: </strong> {t('eff_battery_temp_high', { temp: tempMax })}
                        </p>
                    </div>
                )}
            </div>

            {/* Background Graphic */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0052FF]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        </div>
    );
}
