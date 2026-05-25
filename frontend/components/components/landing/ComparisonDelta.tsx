import React from 'react';
import { TrendingDown, TrendingUp, ShieldCheck, ArrowRight, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComparisonDelta() {
    return (
        <section id="delta" className="py-48 bg-[#010410] px-6 relative overflow-hidden">
            {/* Background Spatial Flourish */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center space-y-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] italic"
                    >
                        <Zap size={14} className="animate-pulse" /> The Economic Delta
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1]">
                        당신의 데이터가<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-blue-600">현금이 되는 순간</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        일반 차량은 '소모품'으로서 가치가 하락하지만, 오즈카로 관리된 차량은 '데이터 자산'으로서 가치를 방어합니다. 그 15%의 차이를 숫자로 증명합니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Standard Depreciation (The Warning) */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 md:p-16 relative group"
                    >
                        <div className="flex justify-between items-start mb-16">
                            <div>
                                <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
                                    <TrendingDown className="text-rose-500" />
                                </div>
                                <h3 className="text-3xl font-black text-white/40 uppercase tracking-tight">일반 관리 차량</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Estimated Return</p>
                                <p className="text-4xl font-black text-white/20">-32% <span className="text-xs">Avg. Loss</span></p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <ComparisonBar label="정비 투명성" value={20} color="bg-rose-500/20" />
                            <ComparisonBar label="이력 신뢰도" value={15} color="bg-rose-500/20" />
                            <ComparisonBar label="시장 선호도" value={40} color="bg-rose-500/20" />
                        </div>

                        <div className="mt-20 p-8 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/10 hidden md:block">
                            <p className="text-sm font-medium text-rose-500/60 leading-relaxed italic italic">
                                "증명되지 않은 이력은 시장에서 '0'에 가까운 가치로 취급됩니다. 블랙박스 같은 관리 공백은 결국 중고차 가격 감가로 이어집니다."
                            </p>
                        </div>
                    </motion.div>

                    {/* Ozcar Preservation (The Success) */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-blue-600 rounded-[4rem] p-12 md:p-16 relative overflow-hidden shadow-[0_40px_100px_rgba(37,99,235,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-20" />
                        <div className="relative z-10 flex justify-between items-start mb-16">
                            <div>
                                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="text-blue-600" />
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tight italic">OZCAR 관리 차량</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">Asset Premium</p>
                                <p className="text-4xl font-black text-white">+15.4% <span className="text-xs">Market Up</span></p>
                            </div>
                        </div>

                        <div className="space-y-10 relative z-10">
                            <ComparisonBar label="정비 투명성" value={98} color="bg-white" textColor="text-white" />
                            <ComparisonBar label="이력 신뢰도" value={100} color="bg-white" textColor="text-white" />
                            <ComparisonBar label="시장 선호도" value={92} color="bg-white" textColor="text-white" />
                        </div>

                        <div className="mt-20 p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 hidden md:block">
                            <div className="flex items-center gap-4 text-white font-black text-lg mb-2">
                                <ShieldCheck size={24} />
                                <span>온체인 가치 보증서 발행</span>
                            </div>
                            <p className="text-sm font-medium text-white/70 leading-relaxed italic">
                                "오즈카 정밀 진단 이력이 포함된 차량은 딜러와 개인 거래 모두에서 가장 높은 등급의 '데이터 자산'으로 즉각 인정받습니다."
                            </p>
                        </div>

                        <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    </motion.div>
                </div>

                {/* Global Delta Ticker */}
                <div className="mt-32 flex flex-col md:flex-row items-center justify-between border-y border-white/5 py-16 gap-12">
                    <div className="flex items-center gap-8">
                        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] rotate-90 md:rotate-0">The Difference</div>
                        <div className="flex items-center gap-6">
                            <p className="text-7xl font-black tabular-nums tracking-tight">15.4%</p>
                            <div className="w-[1px] h-12 bg-white/10" />
                            <p className="text-sm font-bold text-slate-500 leading-snug">Average resale value<br />premium for certified vehicles.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => document.getElementById('value')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white text-black px-12 py-5 rounded-full font-black text-xs hover:scale-105 transition-all flex items-center gap-4"
                    >
                        PREMIUM 보고서 받기 <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}

function ComparisonBar({ label, value, color, textColor = "text-white/40" }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className={`text-sm font-black uppercase tracking-widest ${textColor}`}>{label}</span>
                <span className={`text-[10px] font-black ${textColor} font-mono italic`}>{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}
