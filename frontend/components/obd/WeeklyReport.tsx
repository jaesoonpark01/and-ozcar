"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Zap, AlertTriangle, TrendingUp, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

// 주간 더미 데이터 (데이터가 없을 때 기본값)
const getFallbackData = (t: any) => [
    { day: t('day_mon'), efficiency: 6.2, aggressive: 20 },
    { day: t('day_tue'), efficiency: 5.8, aggressive: 45 },
    { day: t('day_wed'), efficiency: 7.1, aggressive: 15 },
    { day: t('day_thu'), efficiency: 6.5, aggressive: 30 },
    { day: t('day_fri'), efficiency: 5.2, aggressive: 85 },
    { day: t('day_sat'), efficiency: 6.9, aggressive: 10 },
    { day: t('day_sun'), efficiency: 7.3, aggressive: 5 },
];

export default function WeeklyReport() {
    const { t, lang } = useI18n();
    const [weeklyData, setWeeklyData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalScore, setTotalScore] = useState(88);

    useEffect(() => {
        setWeeklyData(getFallbackData(t));

        const fetchWeeklyData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyData();
    }, [t]);

    return (
        <div className="w-full text-slate-200 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* 1. 헤더: 주간 종합 점수 */}
            <div className="mb-6 flex justify-between items-end px-2">
                <div>
                    <h2 className="text-xl font-bold font-heading text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        {t('weekly_title')}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                        <button className="hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                        <span>{t('weekly_report_date_range', { start: lang === 'ko' ? '3월 2일' : 'Mar 2', end: lang === 'ko' ? '3월 8일' : 'Mar 8' })}</span>
                        <button className="hover:text-white transition-colors opacity-50 cursor-not-allowed"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-4xl font-black text-blue-500 tracking-tighter shadow-blue-500/20 drop-shadow-lg">{totalScore}</span>
                    <span className="text-lg text-slate-500 ml-1 font-medium">pts</span>
                </div>
            </div>

            {/* 2. 메인 차트: 전비 추이 */}
            <div className="bg-slate-900/40 rounded-3xl p-5 border border-white/5 mb-5 backdrop-blur-xl shadow-xl relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />

                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                        <Zap className="text-yellow-400 w-5 h-5 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                        <h3 className="font-semibold text-slate-100">{t('weekly_eff_chart_title')} <span className="text-slate-500 text-sm font-normal ml-1">(km/kWh)</span></h3>
                    </div>
                    {loading && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                </div>

                <div className="h-48 w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(8px)'
                                }}
                                itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="efficiency"
                                name={t('weekly_report_avg_efficiency')}
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorEff)"
                                activeDot={{ r: 6, stroke: '#1e3a8a', strokeWidth: 2, fill: '#60a5fa' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 3. 인사이트 카드: 매일 달라지는 코칭 멘트 */}
            <div className="grid grid-cols-1 gap-3 mb-5">
                <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-4 flex items-start gap-4 shadow-lg hover:border-orange-500/40 transition-colors">
                    <div className="bg-orange-500/20 p-2.5 rounded-xl text-orange-400 shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-orange-200 mb-1 leading-tight">{t('weekly_insight_warning_title')}</h4>
                        <p className="text-sm text-orange-200/70 leading-relaxed md:text-[13px]">
                            {t('weekly_insight_warning_desc', { day: t('day_fri'), count: 8 })}
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-4 flex items-start gap-4 shadow-lg hover:border-blue-500/40 transition-colors">
                    <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-200 mb-1 leading-tight">{t('weekly_insight_good_title')}</h4>
                        <p className="text-sm text-blue-200/70 leading-relaxed md:text-[13px]">
                            {t('weekly_insight_good_desc', { percent: 12, amt: lang === 'ko' ? '1.5만원' : '15,000 KRW' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. 하단 버튼: B2B 파트너십/수익화 연결 */}
            <button className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Trophy className="w-5 h-5 text-yellow-300 drop-shadow-sm relative z-10" />
                <span className="relative z-10">{t('weekly_cta_insurance')}</span>
            </button>

        </div>
    );
}
