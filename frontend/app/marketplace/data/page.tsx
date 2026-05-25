"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Search, Code, CheckCircle2, Key, Zap, Shield, Loader2, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWeb3 } from "@/components/Web3Provider";

export default function DataMarketplacePage() {
    const [activeTab, setActiveTab] = useState<"pricing" | "dashboard">("pricing");
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
                    userId: "demo_user_123", // In a real app, get from Supabase Auth
                    vin: planType === "B2C_SINGLE" ? "KNA" + Math.floor(Math.random() * 100000000) : undefined,
                    walletAddress: account || "unlinked",
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
        <div className="min-h-screen bg-[#030806] text-white pt-28 pb-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest mb-6">
                        <Database size={14} />
                        Dynamic Value API (DVA)
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
                        데이터 마켓플레이스 API
                    </h1>
                    <p className="text-slate-400 text-lg">
                        오즈카(Ozcar) 중고차 마켓플레이스의 '무결성 데이터'를 가장 빠르고 안전하게 접근하세요. 데이터의 신뢰도와 희소성에 기반한 구독형 API 서비스를 제공합니다.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center">
                    <div className="flex p-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                        <button 
                            onClick={() => setActiveTab("pricing")}
                            className={`px-8 py-3 rounded-full text-sm font-black transition-all ${activeTab === 'pricing' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            API 구독 플랜
                        </button>
                        <button 
                            onClick={() => setActiveTab("dashboard")}
                            className={`px-8 py-3 rounded-full text-sm font-black transition-all ${activeTab === 'dashboard' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
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
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8"
                    >
                        {/* Personal Pro */}
                        <div className="flex flex-col p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-white mb-2">Personal Pro</h3>
                                <p className="text-sm text-slate-400 font-medium">개인 구매자용 프리미엄 구독</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black tracking-tighter">₩9,900</span>
                                <span className="text-slate-500 text-sm font-medium"> / 월</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 특정 차량(VIN) 3D 트윈 데이터 조회</li>
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> AI 차량 진단 및 정비 리포트 제공</li>
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> NXP S32K3 무결성 검증 이력 포함</li>
                            </ul>
                            <button 
                                onClick={() => handleCheckout("B2C_SINGLE")}
                                disabled={isLoading === "B2C_SINGLE"}
                                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-lg hover:bg-blue-500 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                            >
                                {isLoading === "B2C_SINGLE" ? <Loader2 size={20} className="animate-spin" /> : "시작하기"}
                            </button>
                        </div>

                        {/* Business Fleet */}
                        <div className="flex flex-col p-10 rounded-[2.5rem] bg-gradient-to-b from-blue-600/20 to-indigo-900/20 border border-blue-500/50 relative shadow-[0_0_40px_rgba(59,130,246,0.15)] transform md:-translate-y-4">
                            <div className="absolute -top-4 -right-4 px-4 py-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black text-xs font-black rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                                Most Popular (B2B)
                            </div>
                            <div className="mb-6 mt-2">
                                <h3 className="text-2xl font-black text-blue-400 mb-2">Business Fleet</h3>
                                <p className="text-sm text-blue-200/60 font-medium">중소형 딜러사 및 렌터카 업체용 API</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black tracking-tighter text-white">₩149,000</span>
                                <span className="text-blue-200/50 text-sm font-medium"> / 월</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 기업용 전용 DVA API 키 발급</li>
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 플릿 운영 대시보드 연동 지원</li>
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 차량 최대 50대 데이터 무제한 조회</li>
                            </ul>
                            <button 
                                onClick={() => handleCheckout("B2B_FLEET")}
                                disabled={isLoading === "B2B_FLEET"}
                                className="w-full py-4 rounded-2xl bg-white text-blue-900 font-black text-lg hover:bg-indigo-50 transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
                            >
                                {isLoading === "B2B_FLEET" ? <Loader2 size={20} className="animate-spin" /> : "도입 문의하기"}
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="flex flex-col p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-white mb-2">Enterprise</h3>
                                <p className="text-sm text-slate-400 font-medium">금융사(심사), 보험사(보험료 산정)</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black tracking-tighter">Custom</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 무제한 API 쿼리 (SLA 99.9%)</li>
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> V2G 및 ESG 데이터 웹훅 지원</li>
                                <li className="flex gap-3 text-sm text-slate-300 font-medium"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> 전담 기술 지원 및 맞춤형 인프라</li>
                            </ul>
                            <button className="w-full py-4 rounded-2xl bg-white/10 text-white font-black text-lg hover:bg-white/20 transition-all">
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
                        className="space-y-6 pt-8"
                    >
                        {/* Status & Usage */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-5">
                                <div className="p-4 bg-blue-500/20 text-blue-400 rounded-2xl">
                                    <Zap size={28} />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 font-medium mb-1">현재 구독 플랜</div>
                                    <div className="font-black text-xl tracking-tight">Business Fleet</div>
                                </div>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-5">
                                <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-2xl">
                                    <Activity size={28} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span className="text-slate-400">차량 API 호출량</span>
                                        <span className="font-black text-white">12 / 50대</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: '24%' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-5">
                                <div className="p-4 bg-amber-500/20 text-amber-400 rounded-2xl">
                                    <Shield size={28} />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 font-medium mb-1">API 상태</div>
                                    <div className="font-black text-xl tracking-tight text-emerald-400">Active (Healthy)</div>
                                </div>
                            </div>
                        </div>

                        {/* API Keys */}
                        <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3"><Key size={24} className="text-blue-400"/> API Keys</h3>
                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div>
                                        <div className="font-black text-sm mb-1">Production Key</div>
                                        <div className="font-mono text-sm text-slate-500">ozk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                                    </div>
                                    <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-black transition-colors">
                                        Reveal Key
                                    </button>
                                </div>
                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div>
                                        <div className="font-black text-sm mb-1">Test Key</div>
                                        <div className="font-mono text-sm text-slate-500">ozk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                                    </div>
                                    <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-black transition-colors">
                                        Reveal Key
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Code Example */}
                        <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3"><Code size={24} className="text-blue-400"/> Quick Start</h3>
                            <div className="bg-[#050811] p-8 rounded-2xl border border-white/5 font-mono text-sm overflow-x-auto shadow-inner leading-relaxed">
                                <div className="text-blue-400 mb-2 font-medium">// curl request example</div>
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
