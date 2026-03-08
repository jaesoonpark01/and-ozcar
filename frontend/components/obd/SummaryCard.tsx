"use client";

import React from 'react';

// 차량 상태 팁 계산 로직 (간소화)
const getTipMessage = (temp: number, soc: number) => {
    if (temp < 5) return "오늘 아침 기온이 좀 차갑네요. 칠공이의 배터리 효율 향상을 위해 실내 주차를 권장해요!";
    if (temp > 40) return "날이 덥네요! 과속을 줄이면 배터리 스트레스를 크게 낮출 수 있어요.";
    if (soc < 20) return "배터리가 많이 배고파요. 얼른 밥 주러 갈까요?";
    if (soc > 80 && temp > 35) return "배터리가 가득 찼지만 온도가 높아요. 회생제동을 부드럽게 쓰시는 걸 추천드려요!";
    return "칠공이 컨디션 이상 무! 훌륭한 주행 습관 덕분이에요 🚗💨";
};

export default function SummaryCard() {
    // 모의 차량 데이터
    const mockData = {
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }),
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        carName: "칠공이",
        distanceLeftKm: 342,
        soc: 72,
        temp: 22,
    };

    const tipMessage = getTipMessage(mockData.temp, mockData.soc);

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
                        {mockData.carName}의 컨디션은 <span className="text-yellow-300 border-b-2 border-yellow-300/50 pb-0.5">최고예요!</span> <br />
                        오늘 외출도 문제없어요. ⭐
                    </h2>
                </div>

                {/* 3. 주요 수치 커스텀 그리드 */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    {/* 주행 가능 거리 */}
                    <div className="bg-white/10 rounded-3xl p-5 border border-white/10 backdrop-blur-sm">
                        <p className="text-xs text-white/70 font-semibold mb-2 uppercase tracking-widest">Estimated Range</p>
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
                            <p className="text-xs text-white/70 font-semibold mb-2 uppercase tracking-widest">Battery SoC</p>
                            <div className="flex items-baseline gap-1.5">
                                <span className={`text-4xl font-black tracking-tighter shadow-sm ${mockData.soc > 20 ? 'text-emerald-300' : 'text-rose-400'}`}>
                                    {mockData.soc}
                                </span>
                                <span className="text-white/80 font-bold">%</span>
                            </div>
                        </div>
                        <div className="mt-2 text-xs font-semibold text-white/60 bg-black/20 px-3 py-1.5 rounded-full inline-flex w-max relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            온도: {mockData.temp}°C
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
