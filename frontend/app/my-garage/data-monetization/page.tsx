"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, ShieldCheck, Zap, Activity, ChevronRight, DollarSign, Lock, Unlock } from "lucide-react";
import { Switch } from "@/components/ui/switch"; // Assuming a switch component exists or I'll just use a basic one

export default function DataMonetizationPage() {
    const [isSellingEnabled, setIsSellingEnabled] = useState(false);
    const [ozcEarned, setOzcEarned] = useState(1250);
    const [queriesCount, setQueriesCount] = useState(25);

    const toggleSelling = () => {
        setIsSellingEnabled(!isSellingEnabled);
    };

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white pt-28 pb-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-blue-400 uppercase mb-2">
                            Data Monetization
                        </h1>
                        <p className="text-slate-400 max-w-2xl text-sm md:text-base">
                            영지식 증명(ZKP) 기반으로 안전하게 차량 데이터를 익명화하여 제공하고, 실시간 조회 수수료를 OZC 토큰으로 배당받으세요.
                        </p>
                    </div>
                </div>

                {/* Main Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Data Selling Toggle Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`col-span-1 lg:col-span-2 p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between ${
                            isSellingEnabled 
                                ? "bg-gradient-to-br from-emerald-900/40 to-black border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]" 
                                : "bg-white/5 border-white/10"
                        }`}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-3 rounded-xl ${isSellingEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'}`}>
                                        {isSellingEnabled ? <Unlock size={24} /> : <Lock size={24} />}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">데이터 판매 승인</h2>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    활성화 시, 중고차 딜러 및 보험사가 귀하의 차량 데이터를 익명 조회할 수 있으며, 조회 건당 로열티(OZC)가 즉시 지급됩니다.
                                </p>
                            </div>
                            {/* Toggle Switch */}
                            <button 
                                onClick={toggleSelling}
                                className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex items-center px-1 ${isSellingEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                            >
                                <motion.div 
                                    className="w-6 h-6 bg-white rounded-full shadow-md"
                                    animate={{ x: isSellingEnabled ? 32 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                                <div className="text-sm text-slate-400 mb-1">총 누적 수익</div>
                                <div className="text-3xl font-black text-emerald-400 italic">
                                    {ozcEarned.toLocaleString()} <span className="text-lg text-emerald-600">OZC</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                                <div className="text-sm text-slate-400 mb-1">데이터 조회 횟수</div>
                                <div className="text-3xl font-black text-white italic">
                                    {queriesCount} <span className="text-lg text-slate-500">Hits</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Data Valuation Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-1 p-8 rounded-3xl bg-blue-900/10 border border-blue-500/20 flex flex-col gap-6"
                    >
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">내 데이터 가치 평가</h2>
                            <p className="text-slate-400 text-sm">현재 제공 중인 데이터의 희소성과 무결성 등급입니다.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-blue-400" size={20} />
                                    <div>
                                        <div className="font-bold text-sm">NXP S32K3 보증</div>
                                        <div className="text-xs text-slate-400">하드웨어 무결성 서명됨</div>
                                    </div>
                                </div>
                                <div className="text-xs font-black text-blue-400 bg-blue-500/20 px-2 py-1 rounded">x1.5 가중치</div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <Activity className="text-amber-400" size={20} />
                                    <div>
                                        <div className="font-bold text-sm">프리미엄 쿼리 대상</div>
                                        <div className="text-xs text-slate-400">정밀 SOH 배터리 로그 포함</div>
                                    </div>
                                </div>
                                <div className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-1 rounded">고단가 판매</div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">예상 1회 조회 수익</span>
                                <span className="font-bold text-white">~$3.50 (OZC 환산)</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Revenue Structure Information */}
                <div className="mt-12">
                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-2">수익 배분 구조 (Revenue Sharing)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: "차주 보상 (Data Owner)", percent: "50%", desc: "데이터 제공 동의에 대한 실시간 로열티 지급", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                            { label: "정비사 보상 (Mechanic)", percent: "15%", desc: "데이터를 최초에 마이닝하고 보증한 마스터 정비사 지급", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                            { label: "플랫폼 운영비 (Platform)", percent: "20%", desc: "데이터 큐레이션, 서버, API 게이트웨이 유지비", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                            { label: "생태계 소각 (Token Burn)", percent: "15%", desc: "OZC 토큰 가치 방어 및 생태계 선순환을 위한 자동 소각", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                        ].map((item, idx) => (
                            <div key={idx} className={`p-5 rounded-2xl border ${item.bg} ${item.border}`}>
                                <div className={`text-2xl font-black italic mb-2 ${item.color}`}>{item.percent}</div>
                                <div className="font-bold text-white text-sm mb-1">{item.label}</div>
                                <div className="text-xs text-slate-400">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
