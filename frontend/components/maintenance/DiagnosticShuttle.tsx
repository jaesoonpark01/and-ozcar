"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Zap, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export default function DiagnosticShuttle() {
    return (
        <div className="carbon-panel p-6 sm:p-10 rounded-[2.5rem] relative overflow-hidden">
            {/* Data Stream Effect */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-px h-full bg-blue-400 animate-pulse" />
                <div className="absolute top-0 left-2/4 w-px h-full bg-indigo-400 animate-pulse delay-700" />
                <div className="absolute top-0 left-3/4 w-px h-full bg-blue-400 animate-pulse delay-300" />
            </div>

            <div className="relative z-10 flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-600/30">
                            <Activity className="animate-pulse" size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">AI Safety Guardian</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Connection: STM32G4-V01</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Status 1: Anomaly Detection */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4"
                    >
                        <ShieldAlert className="text-amber-500" size={20} />
                        <h4 className="font-black italic uppercase text-xs text-white">이상 징후 감지</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase">엔진 실린더 3번 노이즈 레벨 임계치 초과 (0.85rms)</p>
                        <div className="pt-2">
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    className="h-full bg-amber-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Status 2: Data Shuttle */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-3xl bg-blue-600/10 border border-blue-600/20 space-y-4"
                    >
                        <Zap className="text-blue-400" size={20} />
                        <h4 className="font-black italic uppercase text-xs text-white">데이터 셔틀 가동</h4>
                        <p className="text-[10px] text-blue-300/70 leading-relaxed uppercase">실시간 OBD-II 로그 78kb/s 전송 중... (진단 리포트 생성 완료)</p>
                        <div className="flex justify-between items-center text-[8px] font-black text-blue-400 italic pt-2">
                            <span>TRANSMITTING</span>
                            <span>SYNC 99%</span>
                        </div>
                    </motion.div>

                    {/* Status 3: Match Success */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-3xl bg-emerald-600/10 border border-emerald-600/20 space-y-4"
                    >
                        <CheckCircle2 className="text-emerald-500" size={20} />
                        <h4 className="font-black italic uppercase text-xs text-white">정비사 매칭 완료</h4>
                        <p className="text-[10px] text-emerald-300/70 leading-relaxed uppercase">가장 가까운 마스터 등급 정비소: 강남 오즈카 센터 - 정비사 최진호</p>
                        <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-emerald-500/20 rounded-xl text-[10px] font-black text-emerald-400 uppercase italic transition-all hover:bg-emerald-500/30">
                            리포트 확인 <ArrowRight size={12} />
                        </button>
                    </motion.div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <FileText className="text-slate-500" size={32} />
                        <div className="text-left">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Digital Passport Scan</span>
                            <div className="text-sm font-black italic text-white">KOR-728 가 7129 | 벤츠 C-Class (2021)</div>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 text-center">조회 이력 12건</div>
                        <div className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase italic text-center shadow-lg shadow-blue-600/20">데이터 주권 승인 대기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
