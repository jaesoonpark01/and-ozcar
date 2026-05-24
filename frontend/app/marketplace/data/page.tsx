"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Search, Code, CheckCircle2, Key, Zap, Shield, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DataMarketplacePage() {
    const [activeTab, setActiveTab] = useState<"pricing" | "dashboard">("pricing");
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleCheckout = async (planType: string) => {
        try {
            setIsLoading(planType);
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    planType,
                    userId: "demo_user_123", // In a real app, get from Supabase Auth
                    vin: planType === "B2C_SINGLE" ? "KNA" + Math.floor(Math.random() * 100000000) : undefined
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
        <div className="min-h-screen bg-[#0a0f1d] text-white pt-28 pb-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
                        <Database size={14} />
                        Dynamic Value API (DVA)
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">
                        Data Marketplace
                    </h1>
                    <p className="text-slate-400">
                        오즈카(Ozcar) 중고차 마켓플레이스의 '무결성 데이터'를 가장 빠르고 안전하게 접근하세요. 데이터의 신뢰도와 희소성에 기반한 구독형 API 서비스를 제공합니다.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center">
                    <div className="flex p-1 bg-white/5 rounded-full border border-white/10">
                        <button 
                            onClick={() => setActiveTab("pricing")}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'pricing' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            플랜 및 요금제
                        </button>
                        <button 
                            onClick={() => setActiveTab("dashboard")}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            API 대시보드
                        </button>
                    </div>
                </div>

                {/* Pricing Plans */}
                {activeTab === "pricing" && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* B2C Plan */}
                        <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">B2C Single Query</h3>
                                <p className="text-sm text-slate-400">개인 구매자용 단건 조회</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-black italic">$10</span>
                                <span className="text-slate-500 text-sm"> / 건</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 특정 차량(VIN) 정밀 복원 기록</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 사고 상세 내역 리포트</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> NXP S32K3 무결성 검증 포함</li>
                            </ul>
                            <button 
                                onClick={() => handleCheckout("B2C_SINGLE")}
                                disabled={isLoading === "B2C_SINGLE"}
                                className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                            >
                                {isLoading === "B2C_SINGLE" ? <Loader2 size={18} className="animate-spin" /> : null}
                                조회 시작하기
                            </button>
                        </div>

                        {/* B2B Starter Plan */}
                        <div className="flex flex-col p-8 rounded-3xl bg-gradient-to-b from-blue-900/40 to-black border border-blue-500/50 relative shadow-[0_0_40px_rgba(59,130,246,0.15)] transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                                MOST POPULAR (딜러 전용)
                            </div>
                            <div className="mb-6 mt-2">
                                <h3 className="text-xl font-bold text-blue-400 mb-2">B2B Starter</h3>
                                <p className="text-sm text-blue-200/60">중소형 딜러사 및 렌터카 업체</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-black italic text-white">$450</span>
                                <span className="text-blue-200/50 text-sm"> / 월</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 월 50회 API 쿼리 제공</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 전용 API 발급 및 Webhook 지원</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 잔여 쿼리 익월 이월 불가</li>
                            </ul>
                            <button 
                                onClick={() => handleCheckout("B2B_STARTER")}
                                disabled={isLoading === "B2B_STARTER"}
                                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2 disabled:opacity-50 disabled:bg-blue-800"
                            >
                                {isLoading === "B2B_STARTER" ? <Loader2 size={18} className="animate-spin" /> : null}
                                구독 시작하기
                            </button>
                        </div>

                        {/* B2B Enterprise Plan */}
                        <div className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                                <p className="text-sm text-slate-400">금융사(대출 심사), 보험사(보험료 산정)</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-black italic">Custom</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 무제한 API 쿼리 (SLA 99.9%)</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 프리미엄 쿼리 (SOH/극한 환경) 접근</li>
                                <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 전담 기술 지원 및 맞춤형 인프라</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
                                영업팀 문의
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* API Dashboard */}
                {activeTab === "dashboard" && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Status & Usage */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400">현재 구독 플랜</div>
                                    <div className="font-bold text-lg">B2B Starter</div>
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                                    <Activity size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">이번 달 API 사용량</span>
                                        <span className="font-bold">12 / 50</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400" style={{ width: '24%' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400">API 상태</div>
                                    <div className="font-bold text-lg text-emerald-400">Active (Healthy)</div>
                                </div>
                            </div>
                        </div>

                        {/* API Keys */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Key size={20} className="text-blue-400"/> API Keys</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div>
                                        <div className="font-bold text-sm mb-1">Production Key</div>
                                        <div className="font-mono text-xs text-slate-500">ozk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                                    </div>
                                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                                        Reveal Key
                                    </button>
                                </div>
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div>
                                        <div className="font-bold text-sm mb-1">Test Key</div>
                                        <div className="font-mono text-xs text-slate-500">ozk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                                    </div>
                                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                                        Reveal Key
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Code Example */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Code size={20} className="text-blue-400"/> Quick Start</h3>
                            <div className="bg-[#050811] p-6 rounded-2xl border border-white/5 font-mono text-sm overflow-x-auto">
                                <div className="text-blue-400 mb-2">// curl request example</div>
                                <div className="text-emerald-300">curl</div>
                                <div className="pl-4 text-slate-300">-X POST https://api.ozcar.com/v1/vehicle/query \</div>
                                <div className="pl-4 text-slate-300">-H <span className="text-amber-300">"Authorization: Bearer ozk_live_..."</span> \</div>
                                <div className="pl-4 text-slate-300">-H <span className="text-amber-300">"Content-Type: application/json"</span> \</div>
                                <div className="pl-4 text-slate-300">-d <span className="text-amber-300">'{'{"vin": "KNAxxxxxxxxx"}'}'</span></div>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
