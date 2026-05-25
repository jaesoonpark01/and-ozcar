"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Database, Shield, Zap, Cpu, Coins, ArrowRight, Star, AlertTriangle, TrendingUp, Sparkles, Battery, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/components/Web3Provider";
import { useI18n } from "@/hooks/useI18n";

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [sliderValue, setSliderValue] = useState(1500); // Monthly KM
    const { account } = useWeb3();

    // ROI Calculator Logic
    const monthlyCost = billingCycle === 'monthly' ? 9900 : 8250; // 99,000 / 12 = 8,250
    const estimatedTokenReward = Math.floor((sliderValue / 100) * 1500); // e.g. 1500km -> 22,500 KRW worth of OZ
    const estimatedMaintenanceSave = Math.floor((sliderValue / 100) * 800); // 12,000 KRW saved
    const totalMonthlyBenefit = estimatedTokenReward + estimatedMaintenanceSave;
    const netProfit = totalMonthlyBenefit - monthlyCost;

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
        <div className="min-h-screen bg-[#030806] text-white pt-32 pb-32 px-4 sm:px-8 relative overflow-hidden font-sans selection:bg-emerald-500/30">
            {/* Immersive Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* 1. Loss Aversion Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-5xl mx-auto mb-20"
                >
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-black tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    >
                        <AlertTriangle size={16} />
                        <span>지금 이 순간에도 당신의 주행 데이터는 버려지고 있습니다</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.15]">
                        돈을 쓰는 구독은 끝났습니다.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                            돈을 버는 오즈카 프리미엄
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
                        월 9,900원의 구독료. 하지만 오너님은 <strong className="text-white">매월 평균 34,000원</strong>의 리워드와 유지비 절감 혜택을 돌려받습니다. 이것은 비용이 아니라 <strong className="text-emerald-400">확실한 투자</strong>입니다.
                    </p>
                </motion.div>

                {/* 2. Interactive ROI Simulator */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl mb-32 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 pointer-events-none" />
                    
                    <div className="text-center mb-10 relative z-10">
                        <h2 className="text-3xl font-black mb-3">내 예상 수익 시뮬레이터 💸</h2>
                        <p className="text-slate-400">평소 한 달에 얼마나 운전하시나요?</p>
                    </div>

                    <div className="mb-12 relative z-10">
                        <div className="flex justify-between text-emerald-400 font-black mb-4 text-xl">
                            <span>0 km</span>
                            <span className="text-3xl">{sliderValue.toLocaleString()} km</span>
                            <span>3,000+ km</span>
                        </div>
                        <input 
                            type="range" 
                            min="100" max="3000" step="100"
                            value={sliderValue}
                            onChange={(e) => setSliderValue(Number(e.target.value))}
                            className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div className="bg-black/40 rounded-3xl p-6 border border-white/5 text-center">
                            <Coins className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                            <div className="text-sm text-slate-400 font-bold mb-1">예상 월간 토큰 수익</div>
                            <div className="text-2xl font-black text-white">+₩{estimatedTokenReward.toLocaleString()}</div>
                        </div>
                        <div className="bg-black/40 rounded-3xl p-6 border border-white/5 text-center">
                            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <div className="text-sm text-slate-400 font-bold mb-1">AI 정비 비용 절감액</div>
                            <div className="text-2xl font-black text-white">+₩{estimatedMaintenanceSave.toLocaleString()}</div>
                        </div>
                        <div className="bg-emerald-500/10 rounded-3xl p-6 border border-emerald-500/30 text-center transform md:scale-110 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <Gift className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                            <div className="text-sm text-emerald-400 font-black mb-1">구독료 제외 순수익 (월)</div>
                            <div className="text-4xl font-black text-emerald-400">+₩{netProfit.toLocaleString()}</div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. The "No-Brainer" Benefits */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">단 하나의 구독으로 얻는 4가지 압도적 무기</h2>
                        <p className="text-slate-400 text-lg">자동차의 생애주기 전체를 통제하고 현금화하세요.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <Shield className="text-blue-400" />,
                                title: "중고차 감가상각 완벽 방어",
                                desc: "블록체인에 영구 기록되는 100% 신뢰도 차량 이력. 향후 중고차 매각 시 '오즈카 인증 차량' 프리미엄이 붙어 평균 150만원 이상의 추가 가치를 인정받습니다.",
                                highlight: "감가 방어액: +₩1,500,000",
                                color: "blue"
                            },
                            {
                                icon: <Battery className="text-emerald-400" />,
                                title: "에코 드라이빙 자동 수익화",
                                desc: "급가속/급제동을 줄이고 연비를 높일수록 스마트 컨트랙트가 매일 $OZ 토큰을 지갑으로 전송합니다. 안전 운전이 곧 직관적인 현금 보상으로 돌아옵니다.",
                                highlight: "월 평균 보상: +₩25,000",
                                color: "emerald"
                            },
                            {
                                icon: <Cpu className="text-purple-400" />,
                                title: "3D 디지털 트윈 & 사전 고장 예측",
                                desc: "차량의 모든 센서 데이터를 AI가 실시간 분석하여 큰 고장이 발생하기 3개월 전에 미리 경고합니다. 불필요한 과잉 정비와 수리비 폭탄을 영구적으로 차단하세요.",
                                highlight: "연 평균 수리비 절감: +₩300,000",
                                color: "purple"
                            },
                            {
                                icon: <Zap className="text-amber-400" />,
                                title: "V2G 전력 판매 마켓 독점 접근권",
                                desc: "전기차 오너라면 잉여 배터리 전력을 오즈카 마켓을 통해 피크 타임에 판매하세요. 차를 주차해 놓는 것만으로도 수동적인 패시브 인컴(Passive Income)이 발생합니다.",
                                highlight: "연간 V2G 수익: +₩240,000",
                                color: "amber"
                            }
                        ].map((b, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-${b.color}-500/10 flex items-center justify-center shrink-0 border border-${b.color}-500/20`}>
                                        {React.cloneElement(b.icon, { size: 28 })}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black mb-3">{b.title}</h3>
                                        <p className="text-slate-400 leading-relaxed mb-6 font-medium">{b.desc}</p>
                                        <div className={`inline-block px-4 py-2 rounded-xl bg-${b.color}-500/10 text-${b.color}-400 font-black text-sm tracking-wide`}>
                                            EXPECTED: {b.highlight}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4. Pricing (Visual Hierarchy Focus) */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center mb-10">
                        <div className="bg-white/5 p-1.5 rounded-full border border-white/10 flex items-center gap-1">
                            <button 
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-8 py-3 rounded-full text-sm font-black transition-all ${billingCycle === 'monthly' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                매월 결제 (₩9,900)
                            </button>
                            <button 
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-8 py-3 rounded-full text-sm font-black transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                연간 결제
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${billingCycle === 'yearly' ? 'bg-emerald-500/20 text-emerald-700' : 'bg-emerald-500/20 text-emerald-400'} font-black uppercase`}>2달 무료 (₩99,000)</span>
                            </button>
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] p-1 bg-gradient-to-br from-blue-500 via-emerald-500 to-indigo-500 shadow-[0_0_80px_rgba(59,130,246,0.2)]"
                    >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-black text-sm uppercase tracking-widest rounded-full shadow-xl z-20 whitespace-nowrap">
                            단 1번의 구독으로 누리는 모든 특권
                        </div>
                        
                        <div className="bg-[#030806] rounded-[2.9rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                            
                            <div className="flex-1 z-10 w-full text-center md:text-left">
                                <h3 className="text-4xl font-black text-white mb-2">Personal Pro</h3>
                                <p className="text-slate-400 font-medium mb-8">오즈카의 모든 프리미엄 기능을 제한 없이 사용하세요.</p>
                                
                                <div className="mb-8">
                                    <div className="flex items-end justify-center md:justify-start gap-2 mb-2">
                                        <span className="text-6xl font-black tracking-tighter text-white">
                                            {billingCycle === 'monthly' ? '₩9,900' : '₩99,000'}
                                        </span>
                                        <span className="text-xl text-slate-500 font-bold mb-2">
                                            / {billingCycle === 'monthly' ? '월' : '년'}
                                        </span>
                                    </div>
                                    <p className="text-emerald-400 font-black tracking-wide text-sm bg-emerald-500/10 inline-block px-3 py-1 rounded-lg">
                                        첫 달 데이터 리워드로 100% 구독료 회수 가능
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 w-full z-10">
                                <ul className="space-y-5 mb-10">
                                    {[
                                        "내 차의 3D 디지털 트윈 무제한 접근",
                                        "블록체인 기반 차량 이력증명서(NFT) 발행",
                                        "에코 드라이빙 $OZ 토큰 최고 효율 채굴",
                                        "V2G 전력 판매 마켓 수수료 0%",
                                        "오즈카 DAO VIP 거버넌스 투표권"
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
                                                <CheckCircle2 size={14} className="text-white" />
                                            </div>
                                            <span className="text-slate-200 font-bold text-lg">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleCheckout("B2C_SINGLE")}
                                    disabled={isLoading === "B2C_SINGLE"}
                                    className="w-full py-5 rounded-2xl bg-white text-black font-black text-xl hover:scale-[1.02] transition-transform shadow-[0_10px_40px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isLoading === "B2C_SINGLE" ? (
                                        <>
                                            <Loader2 className="animate-spin" size={24} />
                                            <span>안전하게 결제창으로 이동 중...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>지금 바로 혜택 받기</span>
                                            <ArrowRight size={22} />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-slate-500 text-xs font-bold mt-4 tracking-widest uppercase">
                                    언제든지 클릭 한 번으로 해지 가능합니다
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* 5. Enterprise Link */}
                <div className="mt-16 text-center">
                    <button onClick={() => router.push('/marketplace')} className="text-slate-500 font-bold hover:text-white transition-colors underline underline-offset-4">
                        50대 이상 법인 차량을 운영 중이신가요? B2B Fleet 요금제 보기
                    </button>
                </div>

            </div>
        </div>
    );
}
