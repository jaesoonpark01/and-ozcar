"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

// 차량 상태 팁 계산 로직 (간소화)
const getTipMessage = (temp: number, soc: number) => {
    if (temp < 5) return "summary_card_tip_cold";
    if (temp > 40) return "summary_card_tip_hot";
    if (soc < 20) return "summary_card_tip_low_soc";
    if (soc > 80 && temp > 35) return "summary_card_tip_full_hot";
    return "summary_card_tip_default";
};

export default function SummaryCard() {
    const { t, lang } = useI18n();

    // 모의 차량 데이터
    const mockData = {
        date: new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }),
        time: new Date().toLocaleTimeString(lang === 'ko' ? 'ko-KR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        carName: lang === 'ko' ? "칠공이" : "Ioniq 6",
        distanceLeftKm: 342,
        soc: 72,
        temp: 22,
    };

    const tipKey = getTipMessage(mockData.temp, mockData.soc);
    const tipMessage = t(tipKey as any, { carName: mockData.carName, temp: mockData.temp, soc: mockData.soc });

    return (
        <div className="relative overflow-hidden rounded-[32px] p-8 text-white shadow-2xl bg-gradient-to-br from-[#0052ff]/90 to-purple-700/90 backdrop-blur-xl border border-white/20 hover:shadow-blue-500/30 transition-all duration-500 group">

            {/* 1. 배경 장식 애니메이션 (구름 또는 빛 무리) */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-[80px] group-hover:bg-blue-300/30 transition-colors duration-1000" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-400/20 rounded-full blur-[60px]" />

            <div className="relative z-10 flex flex-col h-full">
                {/* 2. 헤드라인 섹션 */}
                <div className="mb-8">
                    <p className="text-white/80 text-sm font-semibold mb-2 tracking-wide uppercase">
                        {mockData.date} {mockData.time}
                    </p>
                    <h2 className="text-2xl font-black leading-snug drop-shadow-md">
                        {mockData.carName}{t('summary_card_status_great')} <br />
                        {t('summary_card_status_desc')}
                    </h2>
                </div>

                {/* 3. 주요 수치 커스텀 그리드 */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    {/* 주행 가능 거리 */}
                    <div className="bg-white/10 rounded-3xl p-5 border border-white/10 backdrop-blur-sm">
                        <p className="text-xs text-white/70 font-semibold mb-2 uppercase tracking-widest">{t('summary_card_est_range')}</p>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-4xl font-black tracking-tighter shadow-sm">{mockData.distanceLeftKm}</span>
                            <span className="text-white/80 font-bold">km</span>
                        </div>
                        {/* 미세 프로그레스 바 표현 */}
                        <div className="w-full bg-white/20 h-1 mt-3 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400" style={{ width: '68%' }} />
                        </div>
                    </div>

                    {/* 배터리 잔량 & 온도 */}
                    <div className="bg-white/10 rounded-3xl p-5 border border-white/10 backdrop-blur-sm flex flex-col justify-between">
                        <div>
                            <p className="text-xs text-white/70 font-semibold mb-2 uppercase tracking-widest">{t('summary_card_battery_soc')}</p>
                            <div className="flex items-baseline gap-1.5">
                                <span className={`text-4xl font-black tracking-tighter shadow-sm ${mockData.soc > 20 ? 'text-emerald-300' : 'text-rose-400'}`}>
                                    {mockData.soc}
                                </span>
                                <span className="text-white/80 font-bold">%</span>
                            </div>
                        </div>
                        <div className="mt-2 text-xs font-semibold text-white/60 bg-black/20 px-3 py-1.5 rounded-full inline-flex w-max relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            {t('summary_card_temp')}: {mockData.temp}°C
                        </div>
                    </div>
                </div>

                {/* 4. 상황별 감성 팁 메시지 */}
                <div className="mt-6 flex items-start gap-3 bg-black/30 rounded-2xl px-5 py-4 border border-white/10 shadow-inner backdrop-blur-md">
                    <span className="text-xl leading-none mt-0.5 opacity-90">💡</span>
                    <p className="text-white/90 leading-snug font-medium text-[13px]">
                        {tipMessage}
                    </p>
                </div>
            </div>
        </div>
    );
}
