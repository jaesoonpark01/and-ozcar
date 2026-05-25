// components/user/AssetOptimizationAlert.tsx
"use client";

import React from 'react';
import { TrendingUp, AlertCircle, Rocket, Info, ChevronRight } from 'lucide-react';

interface AssetData {
    currentValue: number;
    premiumValue: number;
    resaleRetention: number;
    warrantyStatus: string;
}

export default function AssetOptimizationAlert({ assetData }: { assetData: AssetData }) {
    return (
        <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
            <header className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">AI 자산 최적화 리포트</h3>
                <div className="flex items-center gap-2 bg-[#0052FF]/10 text-[#0052FF] px-4 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase">Real-time Analysis</span>
                </div>
            </header>

            {/* Value Trend Card */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 mb-8 border border-white">
                <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">₩{assetData.currentValue.toLocaleString()}</p>
                    <span className="text-sm font-black text-green-500 flex items-center gap-0.5">
                        <TrendingUp className="w-4 h-4" /> ₩{assetData.premiumValue.toLocaleString()} ↑
                    </span>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">AI 검증 정비 프리미엄 반영가</p>

                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4">
                    <div className="h-full bg-[#0052FF]" style={{ width: `${assetData.resaleRetention}%` }}></div>
                    <div className="h-full bg-orange-400" style={{ width: `${100 - assetData.resaleRetention}%` }}></div>
                </div>
                <div className="flex justify-between text-[11px] font-black text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <Info className="w-3 h-3 text-slate-300" />
                        <span>신차 대비 {assetData.resaleRetention}% 가치 보존 중</span>
                    </div>
                    <span>{assetData.warrantyStatus}</span>
                </div>
            </div>

            {/* AI AI Strategy / Golden Time Alert */}
            <div className="bg-[#0052FF] text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-blue-500/30 group">
                <Rocket className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 rotate-12 transition-transform group-hover:scale-110" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                        <AlertCircle className="w-4 h-4 text-blue-200" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">AI 매각 골든타임 탐지</p>
                    </div>

                    <h4 className="text-2xl font-black mb-2 leading-tight">지금이 가장 비싸게<br />팔 수 있는 시기입니다!</h4>
                    <p className="text-sm text-blue-100/80 mb-8 font-medium leading-relaxed max-w-[80%]">
                        최근 완료된 엔진 정비로 가치가 회복되었으며, 다음 달 <span className="text-white font-bold underline underline-offset-4 Decoration-white/30 text-decoration-orange-400">타이어 교체 주기(비용 발생) 도래 전</span> 매각 시 최대의 시익 실현이 가능합니다.
                    </p>

                    <button className="w-full py-5 bg-white text-[#0052FF] rounded-2xl font-black text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-blue-50">
                        실시간 견적 확인 및 경매 입찰
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
