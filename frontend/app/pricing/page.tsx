"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle2, 
    Loader2, 
    Shield, 
    Zap, 
    Cpu, 
    Coins, 
    ArrowRight, 
    Star, 
    AlertTriangle, 
    TrendingUp, 
    Sparkles, 
    Car, 
    Percent, 
    ShieldCheck, 
    DollarSign,
    Leaf
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/components/Web3Provider";
import { useI18n } from "@/hooks/useI18n";

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [sliderValue, setSliderValue] = useState(1500); // Monthly KM
    const { account } = useWeb3();
    const router = useRouter();

    // Dynamically calculate benefits based on mileage slider
    const monthlyCost = billingCycle === 'monthly' ? 9900 : 8250; // 99,000 / 12 = 8,250
    const carbonReward = Math.floor((sliderValue / 100) * 1200); // Carbon credit reward
    const refiBenefit = Math.floor((sliderValue / 100) * 900); // ReFi / Finance rate advantage equivalent
    const insuranceSave = Math.floor((sliderValue / 100) * 1100); // Safe driving insurance save
    const maintenanceSave = Math.floor((sliderValue / 100) * 800); // AI diagnostics save
    const totalBenefit = carbonReward + refiBenefit + insuranceSave + maintenanceSave;
    const netProfit = totalBenefit - monthlyCost;

    const handleCheckout = async (planType: string) => {
        try {
            setIsLoading(planType);
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    planType,
                    userId: "demo_user_123",
                    vin: planType === "B2C_SINGLE" ? "KNA" + Math.floor(Math.random() * 100000000) : undefined,
                    walletAddress: account || "unlinked", 
                }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                setIsLoading(null);
                alert("결제 초기화에 실패했습니다.");
            }
        } catch (error) {
            setIsLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#030605] text-white pt-32 pb-32 px-4 sm:px-8 relative overflow-hidden font-sans selection:bg-emerald-500/30">
            {/* Ambient Lighting & High-Tech Futuristic Grid Background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-emerald-600/10 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* 1. LOSS AVERSION HERO BANNER */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-black mb-6 shadow-[0_0_20px_rgba(239,68,68,0.15)] backdrop-blur-md"
                    >
                        <AlertTriangle size={15} className="animate-pulse" />
                        <span>주의: 매일 그냥 버려지는 당신의 주행 데이터 가치</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]"
                    >
                        지출은 <span className="text-emerald-400">9,900원</span>.<br />
                        수익과 가치는 <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]">매월 그 이상.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        운전만 해도 회수되는 구독료. 오즈카 프리미엄으로 탄소 크레딧, 데이터 대출 우대 금리, 안전 운전 보험 할인, 그리고 중고차 매각 프리미엄까지 한 번에 손에 넣으세요.
                    </motion.p>
                </div>

                {/* 2. THE 4 CORE PILLARS (Concise, Visual, Action-Driven Cards) */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-white">오즈카 프리미엄 핵심 특권 4가지</h2>
                        <p className="text-slate-500 text-sm mt-1">복잡한 설명 없이, 오너님이 누릴 직접적인 경제적 메리트만 나열합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <Leaf className="text-emerald-400" />,
                                title: "탄소 크레딧 현금화",
                                desc: "친환경 주행 및 연비 감축 데이터를 실시간 탄소 크레딧 기후 자산으로 변환하여 매월 계좌로 자동 환급합니다.",
                                badge: "연 최대 +280,000원",
                                color: "emerald",
                                glow: "shadow-emerald-500/10"
                            },
                            {
                                icon: <Percent className="text-indigo-400" />,
                                title: "DePIN+ReFi 데이터 금융",
                                desc: "블록체인에 영구 인증된 차량 무결성 데이터와 지갑을 담보로, 오즈카 우대 프로토콜 저금리 혜택 및 간편 대출을 제공합니다.",
                                badge: "대출 금리 최대 -2.5% 인하",
                                color: "indigo",
                                glow: "shadow-indigo-500/10"
                            },
                            {
                                icon: <ShieldCheck className="text-amber-400" />,
                                title: "안전 운전 보험 즉시 할인",
                                desc: "차량 OBD2 센서 기반 AI가 오너님의 무사고 및 안전 운전 습관을 즉각 입증하여 실시간 월 자동차 보험료를 즉시 차감 정산합니다.",
                                badge: "보험료 최대 35% 즉시 절감",
                                color: "amber",
                                glow: "shadow-amber-500/10"
                            },
                            {
                                icon: <Car className="text-blue-400" />,
                                title: "중고차 감가상각 완벽 방어",
                                desc: "허위매물 차단을 위한 블록체인 이력증명서(NFT)를 발행하여, 훗날 중고차 직거래 또는 판매 시 감가 없이 최고가 판매를 보장합니다.",
                                badge: "차량 가치 평균 +180만원 보존",
                                color: "blue",
                                glow: "shadow-blue-500/10"
                            }
                        ].map((b, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.4 }}
                                className={`group p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden shadow-xl ${b.glow}`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none group-hover:bg-white/[0.02] transition-colors" />
                                <div className="flex items-start gap-5">
                                    <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                                        {React.cloneElement(b.icon, { size: 24 })}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                            <h3 className="text-xl sm:text-2xl font-black text-white">{b.title}</h3>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-black bg-${b.color}-500/10 text-${b.color}-400 border border-${b.color}-500/20 tracking-wide uppercase`}>
                                                {b.badge}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">{b.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3. COMPACT ROI SIMULATOR (Side-by-side / Split design to reduce cognitive load) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch mb-24 max-w-5xl mx-auto">
                    {/* Left: Input */}
                    <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                        <h3 className="text-lg sm:text-xl font-bold mb-1 flex items-center gap-2">
                            <span>실시간 혜택 시뮬레이터 💸</span>
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm mb-6">평소 월평균 주행 거리를 입력해 예상 혜택을 측정해 보세요.</p>
                        
                        <div className="mb-6">
                            <div className="flex justify-between text-emerald-400 font-black mb-3 text-lg">
                                <span className="text-xs text-slate-500">0 km</span>
                                <span className="text-2xl sm:text-3xl text-emerald-400">{sliderValue.toLocaleString()} km / 월</span>
                                <span className="text-xs text-slate-500">3,000 km</span>
                            </div>
                            <input 
                                type="range" 
                                min="100" max="3000" step="100"
                                value={sliderValue}
                                onChange={(e) => setSliderValue(Number(e.target.value))}
                                className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                            <div className="bg-black/30 rounded-2xl p-4 border border-white/[0.03]">
                                <div className="text-slate-400 mb-1">탄소 크레딧 수익</div>
                                <div className="text-base font-extrabold text-slate-200">+₩{carbonReward.toLocaleString()}</div>
                            </div>
                            <div className="bg-black/30 rounded-2xl p-4 border border-white/[0.03]">
                                <div className="text-slate-400 mb-1">데이터 대출 이자 절감</div>
                                <div className="text-base font-extrabold text-slate-200">+₩{refiBenefit.toLocaleString()}</div>
                            </div>
                            <div className="bg-black/30 rounded-2xl p-4 border border-white/[0.03]">
                                <div className="text-slate-400 mb-1">안전 운전 보험 할인</div>
                                <div className="text-base font-extrabold text-slate-200">+₩{insuranceSave.toLocaleString()}</div>
                            </div>
                            <div className="bg-black/30 rounded-2xl p-4 border border-white/[0.03]">
                                <div className="text-slate-400 mb-1">AI 정비 예방 절감</div>
                                <div className="text-base font-extrabold text-slate-200">+₩{maintenanceSave.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Output */}
                    <div className="lg:col-span-2 bg-gradient-to-b from-emerald-950/20 to-black/40 border border-emerald-500/30 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
                        <div>
                            <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-black rounded-full mb-4">
                                ROI ESTIMATE
                            </span>
                            <div className="text-slate-400 text-sm font-semibold mb-2">월 총 예상 혜택 가치</div>
                            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                                ₩{totalBenefit.toLocaleString()}
                            </div>
                            <div className="text-slate-500 text-xs font-medium">
                                월 구독 비용 {monthlyCost.toLocaleString()}원 대비
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <div className="text-emerald-400 text-xs font-black uppercase mb-1 tracking-wider">
                                실질 순이익 (매월)
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">
                                +₩{netProfit.toLocaleString()}
                            </div>
                            <div className="text-slate-500 text-xs">
                                첫 주행 데이터 전송 시 즉시 혜택 적립 시작
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. PRICING CONVERSION BLOCK (Visual Priority & Single Action Card) */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/5 p-1 rounded-full border border-white/10 flex items-center">
                            <button 
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all ${billingCycle === 'monthly' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                매월 정기 결제 (₩9,900)
                            </button>
                            <button 
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                연간 일시불
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${billingCycle === 'yearly' ? 'bg-emerald-500/20 text-emerald-700' : 'bg-emerald-500/20 text-emerald-400'} font-black`}>2달 할인</span>
                            </button>
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[2.5rem] p-[1.5px] bg-gradient-to-r from-blue-500 via-emerald-500 to-indigo-500 shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
                        
                        <div className="bg-[#040806] rounded-[2.4rem] p-6 sm:p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
                            {/* Card Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black mb-4">
                                        <Sparkles size={12} />
                                        <span>BEST CHOICE</span>
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Personal Pro</h3>
                                    <p className="text-slate-400 text-sm sm:text-base font-medium mb-6">오즈카의 탄소 크레딧, 데이터 금융, 보험, 중고차 혜택을 제한 없이 즉시 연동하세요.</p>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                                            {billingCycle === 'monthly' ? '₩9,900' : '₩99,000'}
                                        </span>
                                        <span className="text-lg text-slate-500 font-bold mb-1.5">
                                            / {billingCycle === 'monthly' ? '월' : '년'}
                                        </span>
                                    </div>
                                    <p className="text-emerald-400 font-black tracking-wide text-xs sm:text-sm bg-emerald-500/10 inline-block px-3 py-1 rounded-lg">
                                        첫 달 리워드 및 데이터 할인으로 구독료 100% 즉시 회수 가능
                                    </p>
                                </div>
                            </div>

                            {/* Card CTA & Features list */}
                            <div className="flex-1 w-full bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                                <ul className="space-y-4 mb-8">
                                    {[
                                        "실시간 탄소 크레딧 적립 및 현금 정산",
                                        "DePIN+ReFi 차량 데이터 담보 대출 금리 우대",
                                        "안전 운행 점수(AI 관제) 연동 월 보험료 할인",
                                        "블록체인 차량 이력 무결성 이력 NFT 발급",
                                        "내 차량 3D 디지털 트윈 진단/관제 무제한"
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
                                                <CheckCircle2 size={12} className="text-white" />
                                            </div>
                                            <span className="text-slate-200 font-bold text-sm sm:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleCheckout("B2C_SINGLE")}
                                    disabled={isLoading === "B2C_SINGLE"}
                                    className="w-full py-4.5 rounded-2xl bg-white text-black font-black text-lg hover:bg-slate-100 active:scale-[0.99] transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 h-[56px]"
                                >
                                    {isLoading === "B2C_SINGLE" ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Stripe 결제창 이동 중...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>프리미엄 혜택 즉시 시작하기</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-slate-500 text-[10px] font-bold mt-3 tracking-widest uppercase">
                                    약정 없음 • 언제든지 클릭 한 번으로 간편 해지 가능
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* 5. ENTERPRISE OR B2B FLEET LINK */}
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => router.push('/marketplace')} 
                        className="text-slate-500 font-bold text-sm hover:text-slate-300 transition-colors underline underline-offset-4"
                    >
                        법인 차량 및 딜러사이신가요? 오즈카 비즈니스 플랫(Business Fleet) 요금제 보기
                    </button>
                </div>

                {/* FAQ or Trust badge */}
                <div className="mt-20 text-center text-xs text-slate-600">
                    글로벌 신용 정보 및 보안 결제 표준 Stripe(스트라이프)를 통해 결제 데이터가 종단간 암호화되어 안전하게 처리됩니다.
                </div>
            </div>
        </div>
    );
}
