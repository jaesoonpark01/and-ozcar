'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, TrendingUp, ShieldCheck, BatteryCharging, ChevronRight, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MiningReportPage() {
    const router = useRouter();
    const [rewardCounter, setRewardCounter] = useState(0);
    const targetReward = 1250; // OZC

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current += 25;
            if (current >= targetReward) {
                current = targetReward;
                clearInterval(interval);
            }
            setRewardCounter(current);
        }, 20);
        return () => clearInterval(interval);
    }, []);

    const handleShareViral = () => {
        alert("수익 공유 완료! 10% 추가 $OZC 부스트가 지급되었습니다.");
        router.push("/leaderboard");
    };

    return (
        <div className="min-h-screen bg-[#07070d] text-white pt-24 pb-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-16 h-16 bg-emerald-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-emerald-500/40"
                    >
                        <TrendingUp className="text-emerald-400" size={32} />
                    </motion.div>
                    <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                        첫 번째 주행 채굴 성공!
                    </h1>
                </div>

                {/* Main Reward Card (Glassmorphism) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 mb-6 shadow-[0_0_50px_rgba(52,211,153,0.15)] text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity size={100} />
                    </div>
                    <p className="text-sm font-bold text-emerald-400/80 uppercase tracking-widest mb-2">이번 주행 획득량</p>
                    <div className="flex justify-center items-end gap-2 mb-2">
                        <span className="text-6xl font-black text-white lining-nums">
                            +{rewardCounter.toLocaleString()}
                        </span>
                        <span className="text-2xl font-bold text-emerald-400 pb-2">$OZC</span>
                    </div>
                    <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-sm font-medium text-slate-300">
                        ≈ ₩{(rewardCounter * 12).toLocaleString()} 원 환산
                    </div>
                </motion.div>

                {/* Data Value Breakdown */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-5 mb-6"
                >
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">AI 주행 데이터 퀄리티</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg"><ShieldCheck size={18} className="text-blue-400"/></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">엔진 정밀 진단치</p>
                            </div>
                            <span className="text-sm font-bold text-blue-400">98% 매칭</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg"><Activity size={18} className="text-emerald-400"/></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">주행 경로 최적화</p>
                            </div>
                            <span className="text-sm font-bold text-emerald-400">100% 구간</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg"><BatteryCharging size={18} className="text-purple-400"/></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">배터리 SOH 체크</p>
                            </div>
                            <span className="text-sm font-bold text-purple-400">Gold Tier</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                        STN2120 칩셋이 방금 생성한 1.2MB의 고부가가치 데이터가 레이크에 적립되었습니다.
                    </p>
                </motion.div>

                {/* ROI Tracker */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-slate-900 to-black border border-emerald-500/20 rounded-2xl p-5 mb-8"
                >
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-white">투자금 회수 (BEP) 예상</span>
                        <span className="text-xs text-emerald-400 font-bold">누적: 0.12%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full mb-3 overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[5%] shadow-[0_0_10px_#34d399]" />
                    </div>
                    <p className="text-xs text-slate-400">
                        현재 속도라면 <span className="text-white font-bold">7.2개월</span> 내 투자 원금(Diamond) 회수가 가능합니다!
                    </p>
                </motion.div>

                {/* Viral CTA */}
                <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    onClick={handleShareViral}
                    className="w-full group relative overflow-hidden bg-emerald-400 hover:bg-emerald-300 text-black font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)] flex justify-center items-center gap-2"
                >
                    <Share2 size={20} />
                    수익 인증하고 추가 20% $OZC 받기
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </motion.div>
        </div>
    );
}
