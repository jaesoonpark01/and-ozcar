// components/user/WarrantySubscriptionCard.tsx
"use client";

import React from 'react';
import { ShieldCheck, Zap, Heart, Check, ArrowRight } from 'lucide-react';

interface WarrantyProps {
    vehicleHealthScore: number;
    basePrice: number;
}

export default function WarrantySubscriptionCard({ vehicleHealthScore, basePrice }: WarrantyProps) {
    const discountRate = vehicleHealthScore > 90 ? 30 : vehicleHealthScore > 80 ? 15 : 0;
    const finalPrice = basePrice * (1 - discountRate / 100);

    return (
        <div className="bg-gradient-to-br from-slate-900 to-[#1E293B] text-white rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden group">
            {/* Dynamic Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:bg-blue-500/30 transition-all duration-700"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-blue-600 px-3 py-1 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-widest">AI Special Offer</span>
                            </div>
                            <span className="text-blue-400 text-xs font-black uppercase tracking-tighter">Owner Exclusive</span>
                        </div>
                        <h3 className="text-3xl font-black leading-tight tracking-tighter">
                            ozcar Care<br />
                            <span className="text-blue-500">Master Plan</span>
                        </h3>
                    </div>
                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
                        <ShieldCheck className="w-10 h-10 text-blue-500" />
                    </div>
                </div>

                {/* AI Discount Analysis Indicator */}
                <div className="bg-white/5 rounded-[2rem] p-6 mb-8 backdrop-blur-md border border-white/10 group-hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-xl">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                        </div>
                        <div>
                            <span className="text-sm font-black">차량 건강 점수: {vehicleHealthScore}점</span>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">상위 5% 관리 상태</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-300 mb-4 font-medium leading-relaxed">
                        블록체인에 기록된 꾸준한 정비 이력을 AI가 확인하여 월 <span className="text-green-400 font-black">{discountRate}% 특별 할인</span>이 적용되었습니다.
                    </p>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-400 h-full transition-all duration-1000" style={{ width: `${vehicleHealthScore}%` }}></div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="flex items-baseline gap-3 mb-10">
                    <span className="text-5xl font-black tracking-tighter">₩{Math.floor(finalPrice).toLocaleString()}</span>
                    <span className="text-sm font-bold text-slate-500 line-through">₩{basePrice.toLocaleString()}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">/ MONTH</span>
                </div>

                <ul className="space-y-4 mb-10">
                    {[
                        "엔진/미션 등 주요 파워트레인 100% 보증",
                        "고장 시 견인 및 24시간 긴급 출동 무상",
                        "매월 2,000 OZC 토큰 리워드 적립"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-200">
                            <div className="bg-blue-500/20 p-1 rounded-full">
                                <Check className="w-3.5 h-3.5 text-blue-400" />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>

                <button className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]">
                    <Zap className="w-5 h-5 fill-white" />
                    구독 시작하고 안심하고 타기
                    <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-[10px] font-bold text-slate-500 mt-5 uppercase tracking-widest">
                    * Anytime cancellation with no penalty
                </p>
            </div>
        </div>
    );
}
