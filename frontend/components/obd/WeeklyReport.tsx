"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Zap, AlertTriangle, TrendingUp, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/obd/supabaseClient';

// 주간 더미 데이터 (데이터가 없을 때 기본값)
const fallbackData = [
    { day: '월', efficiency: 6.2, aggressive: 20 },
    { day: '화', efficiency: 5.8, aggressive: 45 },
    { day: '수', efficiency: 7.1, aggressive: 15 },
    { day: '목', efficiency: 6.5, aggressive: 30 },
    { day: '금', efficiency: 5.2, aggressive: 85 },
    { day: '토', efficiency: 6.9, aggressive: 10 },
    { day: '일', efficiency: 7.3, aggressive: 5 },
];

export default function WeeklyReport() {
    const [weeklyData, setWeeklyData] = useState<any[]>(fallbackData);
    const [loading, setLoading] = useState(false);
    const [totalScore, setTotalScore] = useState(88);

    useEffect(() => {
        // 실제 백엔드가 연결되면 여기서 데이터를 fetch 합니다.
        // RPC 함수 `get_weekly_summary`를 호출하여 이번 주 전비 및 공격성 통계를 불러옵니다.
        const fetchWeeklyData = async () => {
            setLoading(true);
            try {
                // Mocking: 네트워크 딜레이 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 800));

                // TODO: 향후 아래 주석 해제하여 실제 DB 연동
                // const { data, error } = await supabase.rpc('get_weekly_summary', { p_pseudo_id: '현사용자해시ID' });
                // if (data && !error) {
                //   setWeeklyData(data.daily_data);
                //   setTotalScore(data.avg_score);
                // }
            } catch (err) {
                console.error("데이터를 불러오는 중 오류 발생:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyData();
    }, []);

    return (
        <div className="w-full text-slate-200 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* 1. 헤더: 주간 종합 점수 */}
            <div className="mb-6 flex justify-between items-end px-2">
                <div>
                    <h2 className="text-xl font-bold font-heading text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        주간 분석 리포트
                    </h2>
                    <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                        <button className="hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                        <span>3월 2일 ~ 3월 8일</span>
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
                        <h3 className="font-semibold text-slate-100">요일별 전비 추이 <span className="text-slate-500 text-sm font-normal ml-1">(km/kWh)</span></h3>
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
                                name="평균 전비"
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
                        <h4 className="font-bold text-orange-200 mb-1 leading-tight">금요일 주행 주의!</h4>
                        <p className="text-sm text-orange-200/70 leading-relaxed md:text-[13px]">
                            금요일 오후 6시경 급가속이 8회 감지되었습니다. 주말 퇴근길 정체 시 조금만 더 여유를 가져보세요.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-4 flex items-start gap-4 shadow-lg hover:border-blue-500/40 transition-colors">
                    <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-200 mb-1 leading-tight">전비가 좋아졌어요</h4>
                        <p className="text-sm text-blue-200/70 leading-relaxed md:text-[13px]">
                            지난주 대비 평균 전비가 12% 상승했습니다. 이 추세라면 이번 달 충전비를 약 1.5만원 아낄 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. 하단 버튼: B2B 파트너십/수익화 연결 */}
            <button className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Trophy className="w-5 h-5 text-yellow-300 drop-shadow-sm relative z-10" />
                <span className="relative z-10">내 주행 점수로 자동차 보험료 할인받기</span>
            </button>

        </div>
    );
}
