"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, Battery, Target, CarFront, Lock, ShieldCheck, ChevronRight, Activity, Cpu } from "lucide-react";

export default function InsightLabPage() {
    const [hasInsightPass, setHasInsightPass] = useState(true);

    return (
        <div className="min-h-screen bg-[#050811] text-white pt-28 pb-20 px-4 sm:px-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-4">
                            <Network size={14} />
                            Sub-DAO / Secondary Founders
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-2">
                            Insight Lab
                        </h1>
                        <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                            방대한 차량 데이터 레이크에 기반하여 새로운 B2B 가치를 창출하는 오즈카의 두뇌. 오직 검증된 파운더들만이 접근 가능한 프라이빗 연구소입니다.
                        </p>
                    </div>
                    
                    {/* Insight Pass Status */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Access Level</div>
                            {hasInsightPass ? (
                                <div className="text-sm font-black text-purple-400">INSIGHT PASS [VERIFIED]</div>
                            ) : (
                                <div className="text-sm font-black text-red-400 flex items-center gap-1"><Lock size={14}/> ACCESS DENIED</div>
                            )}
                        </div>
                    </div>
                </div>

                {!hasInsightPass ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Lock size={64} className="text-slate-700 mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">인사이트 랩 접근 권한이 없습니다</h2>
                        <p className="text-slate-400 max-w-md">상위 1% 마스터 등급 파운더 및 OZC 스테이킹 조건을 충족하여 Insight Pass NFT를 발급받으세요.</p>
                        <button onClick={() => setHasInsightPass(true)} className="mt-8 px-6 py-2 border border-slate-700 rounded-full text-xs text-slate-400 hover:text-white hover:border-slate-500">
                            [데모용] 권한 활성화 테스트
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Data Projects */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                    <Activity size={20} className="text-purple-400" /> Active Insight Projects
                                </h2>
                                <button className="text-xs text-purple-400 font-bold hover:text-purple-300">View All Projects</button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Project 1 */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Battery size={24} /></div>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">LIVE (B-aaS)</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">전생애 주기 배터리 수명 진단</h3>
                                    <p className="text-xs text-slate-400 mb-6 flex-1">
                                        AI가 수집한 전기차 전압/전류 데이터를 기반으로 노후화에 따른 가치 산정 표준 설계 및 알고리즘 라이선싱.
                                    </p>
                                    <div className="space-y-4 border-t border-white/10 pt-4 mt-auto">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">타겟 기업</span>
                                            <span className="font-bold">EV 제조사, 폐배터리 기업</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">누적 라이선스 수익</span>
                                            <span className="font-bold text-emerald-400">$142,500</span>
                                        </div>
                                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 group-hover:text-purple-400">
                                            프로젝트 참여하기 <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Project 2 */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Target size={24} /></div>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">BETA (SaaS)</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">하이퍼-로컬 정비 수요 예측</h3>
                                    <p className="text-xs text-slate-400 mb-6 flex-1">
                                        특정 지역의 차량 부품 소모 패턴을 분석하여 부품 제조사 및 유통사에 최적의 재고 관리 전략 컨설팅 데이터 제공.
                                    </p>
                                    <div className="space-y-4 border-t border-white/10 pt-4 mt-auto">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">타겟 기업</span>
                                            <span className="font-bold">자동차 부품 유통망</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">누적 구독 수익</span>
                                            <span className="font-bold text-emerald-400">$48,200</span>
                                        </div>
                                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 group-hover:text-purple-400">
                                            프로젝트 참여하기 <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Project 3 */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl"><CarFront size={24} /></div>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-md">PLANNING</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">자율주행 '엣지 시나리오' 셋</h3>
                                    <p className="text-xs text-slate-400 mb-6 flex-1">
                                        사고 직전의 특이 주행 패턴, 혹한기/폭우 등 극한 환경의 원시 데이터를 선별하여 자율주행 학습용 고단가 데이터셋 가공.
                                    </p>
                                    <div className="space-y-4 border-t border-white/10 pt-4 mt-auto">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">타겟 기업</span>
                                            <span className="font-bold">글로벌 자율주행 연구소</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">예상 단가</span>
                                            <span className="font-bold text-blue-400">$10,000 / Set</span>
                                        </div>
                                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 group-hover:text-purple-400">
                                            프로젝트 참여하기 <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* ROI Structure */}
                        <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-black border border-purple-500/20 rounded-[3rem] p-8 md:p-12 relative">
                            <Cpu className="absolute top-8 right-8 text-purple-500/20" size={120} />
                            
                            <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-8 relative z-10">
                                Investment & ROI Structure
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">데이터 파운더 수익</div>
                                    <div className="text-3xl font-black text-purple-400 italic mb-2">50%</div>
                                    <p className="text-xs text-slate-400">비즈니스 모델 설계 및 가공 참여자 직접 배당 (USDC 즉시 정산)</p>
                                </div>
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">오리지널 파운더 로열티</div>
                                    <div className="text-3xl font-black text-blue-400 italic mb-2">20%</div>
                                    <p className="text-xs text-slate-400">데이터 인프라를 구축한 플랫폼 초기 기여자 배분</p>
                                </div>
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">메인 DAO Treasury</div>
                                    <div className="text-3xl font-black text-emerald-400 italic mb-2">20%</div>
                                    <p className="text-xs text-slate-400">전체 생태계 인프라 확장을 위한 재투자 재원 귀속</p>
                                </div>
                                <div className="bg-black/50 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">OZC 토큰 소각</div>
                                    <div className="text-3xl font-black text-rose-400 italic mb-2">10%</div>
                                    <p className="text-xs text-slate-400">토큰 가치 상승을 위한 시장가 매수 후 자동 소각 집행</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
