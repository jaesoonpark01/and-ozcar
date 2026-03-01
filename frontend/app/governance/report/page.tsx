"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Presentation, ArrowUpRight, BarChart3, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalInvestorReport() {
    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#0a0c10] text-white">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="inline-block px-3 py-1 bg-white/10 text-slate-300 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-slate-700">
                            Q1 2026 Founder's Report
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">Q1 Financial Performance</h1>
                        <p className="text-slate-400 max-w-xl">오즈카 생태계의 분기별 자금 흐름과 성장을 투명하게 공시합니다. 다이아몬드, 플래티넘 파운더 전용 기밀 자료입니다.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
                            <Download size={16} className="mr-2" /> PDF 저장
                        </Button>
                        <Button className="bg-white text-black hover:bg-slate-200">
                            <Share2 size={16} className="mr-2" /> 포트폴리오 요약 공유
                        </Button>
                    </div>
                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-emerald-900/40 to-black/50 border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full" />
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><Wallet size={16} /> Total Revenue</h3>
                        <div className="text-4xl font-black text-white font-mono mb-2">$1.42M</div>
                        <div className="text-emerald-400 flex items-center gap-1 font-bold text-sm">
                            <ArrowUpRight size={16} /> +24.5% vs Q4
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-blue-900/40 to-black/50 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full" />
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><BarChart3 size={16} /> Data Sales (B2B)</h3>
                        <div className="text-4xl font-black text-white font-mono mb-2">$850K</div>
                        <div className="text-blue-400 flex items-center gap-1 font-bold text-sm">
                            <ArrowUpRight size={16} /> +12% target tracking
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-purple-900/40 to-black/50 border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full" />
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><TrendingUp size={16} /> Founder APR</h3>
                        <div className="text-4xl font-black text-white font-mono mb-2">15.8%</div>
                        <div className="text-purple-400 flex items-center gap-1 font-bold text-sm">
                            <ArrowUpRight size={16} /> Steady growth
                        </div>
                    </motion.div>
                </div>

                {/* Blueprint Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Presentation className="text-blue-400" /> 5X Profitability Blueprint (2027)
                        </h2>

                        <div className="space-y-6">
                            <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                                <h4 className="font-bold text-white mb-2 italic">1. 다목적 AI 데이터 파이프라인 개방</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    자율주행 R&D 연구소 및 보험사에 실시간 OBD-II + 블랙박스 Vision 데이터를 패키징하여 B2B 구독 모델로 제공. (예상 ARR 증가율: 120%)
                                </p>
                            </div>

                            <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                                <h4 className="font-bold text-white mb-2 italic">2. 글로벌 노드 확장 수수료</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    2026년 하반기 동남아시아(베트남, 인도네시아) 진출. 해당 권역에서 발생하는 OZC 트랜잭션 수수료의 10%를 Genesis 파운더 금고로 영구 편입.
                                </p>
                            </div>

                            <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                                <h4 className="font-bold text-white mb-2 italic">3. Sovereign NFT 마켓플레이스 활성화</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    에이징된 데이터 가치(플래티넘, 다이아몬드 등급) 차량의 NFT 거래 시 발생하는 로열티 풀을 거버넌스 투표를 통해 홀더들에게 에어드랍.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col">
                        <h2 className="text-2xl font-bold mb-6">Revenue Breakdown (Mock)</h2>
                        <div className="flex-1 border border-slate-800 bg-black/50 rounded-2xl flex items-center justify-center relative overflow-hidden group">

                            {/* Fake visual chart layout */}
                            <div className="w-full h-full flex items-end justify-around px-8 pb-12 pt-16">
                                <div className="w-16 bg-gradient-to-t from-blue-900 to-blue-500 rounded-t-lg h-[40%] relative group-hover:h-[45%] transition-all">
                                    <span className="absolute -top-6 w-full text-center text-xs font-mono text-blue-400">Q2 25</span>
                                </div>
                                <div className="w-16 bg-gradient-to-t from-emerald-900 to-emerald-500 rounded-t-lg h-[60%] relative group-hover:h-[65%] transition-all">
                                    <span className="absolute -top-6 w-full text-center text-xs font-mono text-emerald-400">Q3 25</span>
                                </div>
                                <div className="w-16 bg-gradient-to-t from-purple-900 to-purple-500 rounded-t-lg h-[85%] relative group-hover:h-[90%] transition-all">
                                    <span className="absolute -top-6 w-full text-center text-xs font-mono text-purple-400">Q4 25</span>
                                </div>
                                <div className="w-16 bg-gradient-to-t from-yellow-900 to-yellow-500 rounded-t-lg h-[100%] shadow-[0_0_30px_rgba(234,179,8,0.3)] relative scale-110">
                                    <span className="absolute -top-8 w-full text-center text-sm font-bold font-mono text-yellow-400">Q1 26</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4 justify-center text-xs text-slate-500 uppercase tracking-widest font-bold">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full" />B2B Sales</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-full" />Tx Fees</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-500 rounded-full" />NFT Royalties</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
