"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Database, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/components/Web3Provider";

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();
    const { account } = useWeb3();

    const handleCheckout = async (planType: string) => {
        try {
            setIsLoading(planType);
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    planType,
                    userId: "demo_user_123", // Real app will use Supabase Auth session
                    vin: planType === "B2C_SINGLE" ? "KNA" + Math.floor(Math.random() * 100000000) : undefined,
                    walletAddress: account || "unlinked", // Passed for Web3 Payout splits
                }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Checkout failed:", data.error);
                alert("결제 초기화에 실패했습니다.");
                setIsLoading(null);
            }
        } catch (error) {
            console.error("Error connecting to checkout:", error);
            setIsLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white pt-32 pb-24 px-4 sm:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6"
                    >
                        <Shield size={14} />
                        투명하고 강력한 가격 정책
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-6"
                    >
                        Pricing & Plans
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg"
                    >
                        오즈카(Ozcar) 중고차 마켓플레이스의 '무결성 데이터'에 접근하세요.<br className="hidden md:block"/>데이터의 신뢰도와 희소성에 기반한 구독형 API 서비스를 제공합니다.
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                >
                    {/* B2C Plan */}
                    <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">B2C Single Query</h3>
                            <p className="text-sm text-slate-400">개인 구매자용 단건 조회</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-5xl font-black italic">₩14,000</span>
                            <span className="text-slate-500 text-sm"> / 건</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 특정 차량(VIN) 정밀 복원 기록</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 사고 상세 내역 리포트</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 수익의 50%를 차량 소유주에게 USDC로 지급 (Web3)</li>
                        </ul>
                        <button 
                            onClick={() => handleCheckout("B2C_SINGLE")}
                            disabled={isLoading === "B2C_SINGLE"}
                            className="w-full py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                        >
                            {isLoading === "B2C_SINGLE" ? <Loader2 size={18} className="animate-spin" /> : null}
                            결제 및 조회하기
                        </button>
                    </div>

                    {/* B2B Starter Plan (Most Popular) */}
                    <div className="flex flex-col p-10 rounded-[2.5rem] bg-gradient-to-b from-blue-900/50 to-[#050a15] border border-blue-500/50 relative shadow-[0_0_50px_rgba(59,130,246,0.2)] transform md:-translate-y-4 z-10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-black rounded-full shadow-lg whitespace-nowrap uppercase tracking-widest">
                            Most Popular (딜러 전용)
                        </div>
                        <div className="mb-6 mt-4">
                            <h3 className="text-2xl font-bold text-blue-400 mb-2">B2B Starter</h3>
                            <p className="text-sm text-blue-200/60">중소형 딜러사 및 렌터카 업체 최적화</p>
                        </div>
                        <div className="mb-8 flex items-baseline gap-1">
                            <span className="text-5xl font-black italic text-white">₩600,000</span>
                            <span className="text-blue-200/50 text-sm"> / 월</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 월 50회 정밀 API 쿼리 제공</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 전용 API 발급 및 Webhook 지원</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 대시보드를 통한 실시간 사용량 모니터링</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 잔여 쿼리 익월 이월 불가</li>
                        </ul>
                        <button 
                            onClick={() => handleCheckout("B2B_STARTER")}
                            disabled={isLoading === "B2B_STARTER"}
                            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex justify-center items-center gap-2 disabled:opacity-50 disabled:bg-blue-800"
                        >
                            {isLoading === "B2B_STARTER" ? <Loader2 size={18} className="animate-spin" /> : null}
                            월간 구독 시작하기
                        </button>
                    </div>

                    {/* B2B Enterprise Plan */}
                    <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                            <p className="text-sm text-slate-400">대규모 금융사 및 보험사 전용</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">Custom</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 무제한 API 쿼리 (SLA 99.9% 보장)</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 프리미엄 쿼리 (SOH/극한 환경) 접근</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> USDC 인보이스 기반 스마트 결제</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> 전담 기술 지원 및 맞춤형 인프라</li>
                        </ul>
                        <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all">
                            영업팀 도입 문의
                        </button>
                    </div>
                </motion.div>
                
                {/* FAQ or Trust badges can go here in the future */}
                <div className="mt-20 text-center text-sm text-slate-500">
                    안전하고 투명한 블록체인 기반의 스트라이프(Stripe) 결제 시스템을 이용합니다.
                </div>
            </div>
        </div>
    );
}
