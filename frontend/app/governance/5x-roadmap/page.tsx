'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, ShieldCheck, Zap, LineChart, Banknote } from 'lucide-react';

const MULTIPLIERS = [
    { title: '현금 배당 (Dividend)', value: '1.5x', desc: '연평균 40~60%의 USDC/KRW 배당 누적', icon: Banknote, color: 'text-emerald-400' },
    { title: 'NFT 자산 가치 상향', value: '2.0x', desc: '소각(Burn) 및 바이백을 통한 Sovereign NFT 희귀도 상승', icon: TrendingUp, color: 'text-blue-400' },
    { title: '데이터 권리금', value: '1.5x', desc: 'B2B 독점 데이터 매각에 따른 특별 성과 분배', icon: Zap, color: 'text-purple-400' },
];

const TIMELINE = [
    { year: '2025-2026', title: '시스템 입증 및 국내 안착', metric: '국내 노드 1만 대 확보', result: '150% (원금 대비 누적)' },
    { year: '2026-2027', title: '글로벌 확장 및 아시아 진출', metric: '해외 노드 10만 대 돌파', result: '250% (원금 대비 누적)' },
    { year: '2027-2028', title: '데이터 뱅크 전환 (Monopoly)', metric: '완성차 제조사 B2B 공급', result: '500% (최종 5X 달성)' },
];

export default function Roadmap5xPage() {
    return (
        <div className="min-h-screen bg-[#07070d] text-white pt-24 pb-16 px-4 relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto relative z-10"
            >
                {/* Header Sequence */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6">
                        <TrendingUp size={16} /> 2027 Vision Blueprint
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">OZCAR </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">5X 수익화 로드맵</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        복리의 마법이 AI 기술과 만났을 때. 이 문서는 3년 내 다이아몬드 파운더의 <br className="hidden md:block"/>투자 원금을 5배(500%)로 환원하는 확정적 재무 시나리오입니다.
                    </p>
                </div>

                {/* Growth Formula Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {MULTIPLIERS.map((m, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <m.icon className={`${m.color} mb-6`} size={40} />
                            <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                            <p className="text-slate-400 text-sm mb-6 h-10">{m.desc}</p>
                            <div className="text-4xl font-black italic">{m.value}</div>
                        </motion.div>
                    ))}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-3 bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-emerald-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_0_50px_rgba(52,211,153,0.15)]"
                    >
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">Target ROI</p>
                            <h2 className="text-3xl md:text-4xl font-black">Total Expected Value (3 Years)</h2>
                        </div>
                        <div className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-200">
                            5.0X
                        </div>
                    </motion.div>
                </div>

                {/* Timeline */}
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <LineChart className="text-blue-400" />
                    연도별 수익화 타임라인
                </h2>
                <div className="space-y-4 mb-20">
                    {TIMELINE.map((t, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="flex flex-col md:flex-row items-start md:items-center bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="md:w-48 mb-4 md:mb-0">
                                <span className="text-blue-400 font-black text-xl italic">{t.year}</span>
                            </div>
                            <div className="flex-1 mb-4 md:mb-0 pr-8">
                                <h4 className="text-xl font-bold mb-1">{t.title}</h4>
                                <p className="text-sm text-slate-400">{t.metric}</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-bold">
                                    {t.result}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Special Minting Right */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                        <Globe size={300} className="translate-x-1/4 -translate-y-1/4 text-emerald-400" />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                            <ShieldCheck className="text-blue-400" size={24} />
                        </div>
                        <h2 className="text-3xl font-black">2027 글로벌 진출 특별 보장 조항</h2>
                    </div>
                    <div className="space-y-6 max-w-3xl">
                        <p className="text-lg text-slate-300 leading-relaxed">
                            오즈카 생태계가 베트남, 인도네시아 등 해외 시장으로 진출할 때, 2026 오리지널 파운더(Diamond/Platinum)들의 기득권은 영구히 보장됩니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                                <h4 className="font-bold text-emerald-400 mb-2">프리패스 화이트리스트</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">신규 국가 Genesis 노드 NFT 발행 시 전체 물량의 40%를 최우선 할당 및 50% 반값 할인을 제공합니다.</p>
                            </div>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                                <h4 className="font-bold text-blue-400 mb-2">글로벌 데이터 로열티</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">해외 데이터 판매 수익의 5%가 오리지널 파운더들의 지갑으로 영구 귀속(에어드랍) 됩니다.</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 italic mt-6">
                            * 본 문서는 Ozcar DAO 거버넌스 헌장에 의해 법적 효력을 발휘합니다.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
