"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Crosshair, Target, BrainCircuit, PlayCircle, Vote, Check, X, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JuryDashboard() {
    const [voted, setVoted] = useState<"innocent" | "guilty" | "inconclusive" | null>(null);

    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#121212] text-white font-mono md:font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header - Case Metadata */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-black/50 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-black/40">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldAlert className="text-red-500" size={24} />
                            <h1 className="text-2xl font-black italic tracking-tight">Case #OZ-2026-0301-77</h1>
                        </div>
                        <p className="text-slate-400">대상 차량: <span className="text-white font-bold">Tesla Model 3 (Sovereign Diamond Edition)</span></p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <div className="text-sm font-bold text-red-400 uppercase tracking-widest animate-pulse">투표 마감 임박</div>
                        <div className="text-3xl font-black font-mono">23:45:12</div>
                        <div className="text-xs text-[#00FFC2] mt-1">판결 보상: 50 OZC 예정</div>
                    </div>
                </div>

                {/* 2-Column Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Left: AI Prosecution */}
                    <div className="bg-[#1a1c23] border border-blue-900/40 rounded-3xl p-6 relative overflow-hidden flex flex-col h-full">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full" />

                        <div className="flex items-center gap-2 text-blue-400 mb-6">
                            <BrainCircuit size={20} />
                            <h2 className="text-lg font-black uppercase tracking-widest">AI Sentinel (Prosecution)</h2>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="bg-black/40 border border-blue-500/20 rounded-xl p-4">
                                <span className="text-xs text-blue-300 font-bold uppercase block mb-3">Telemetry Mismatch</span>
                                {/* Mock Graph Layout */}
                                <div className="relative w-full h-32 border-b border-l border-slate-700 mb-2">
                                    <div className="absolute bottom-20 left-0 w-full border-t-2 border-dashed border-blue-400 opacity-60">
                                        <span className="absolute -top-5 right-2 text-[10px] text-blue-400">GPS SPD (80km/h)</span>
                                    </div>
                                    <div className="absolute bottom-4 left-0 w-full border-t-2 border-red-500">
                                        <span className="absolute -top-5 right-2 text-[10px] text-red-500">OBD SPD (0km/h)</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-500">
                                    <span>12:05:01</span>
                                    <span className="text-red-400">격차 149초 지속구간</span>
                                    <span>12:07:30</span>
                                </div>
                            </div>

                            <div className="p-4 bg-red-900/10 border-l-4 border-red-500 rounded-r-xl">
                                <p className="text-sm text-red-200">
                                    "물리적 이동 데이터와 휠 회전 데이터가 일치하지 않음. типич(전형적)인 GPS 시뮬레이션(Spoofing) 패턴으로 분석됨."
                                </p>
                                <div className="mt-3 text-xs font-bold text-red-400">Anomaly Score (신뢰도): 98% (매우 높음)</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: User Defense */}
                    <div className="bg-[#231a1a] border border-orange-900/40 rounded-3xl p-6 relative overflow-hidden flex flex-col h-full">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 blur-[80px] rounded-full" />

                        <div className="flex items-center gap-2 text-orange-400 mb-6">
                            <Target size={20} />
                            <h2 className="text-lg font-black uppercase tracking-widest">Driver Defense (User)</h2>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="w-full h-48 bg-black border border-slate-800 rounded-xl relative flex items-center justify-center group cursor-pointer overflow-hidden">
                                {/* Fake Thumbnail */}
                                <img src="https://images.unsplash.com/photo-1621303254972-20c74fb91e3e?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition" alt="Dashcam Thumbnail" />
                                <PlayCircle size={48} className="text-orange-400 relative z-10 opacity-80 group-hover:scale-110 transition" />
                                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-white/50 z-10">03.01 12:05 15F/S H.264</div>
                            </div>

                            <div className="p-4 bg-orange-900/20 border-l-4 border-orange-500 rounded-r-xl mt-4">
                                <p className="text-sm text-orange-200">
                                    "터널 진입 후 GPS 신호 튐 현상 발생. 실제로는 주행 중이었으나 OBD 데이터 전송 오류 가능성 있음. T맵 기록도 첨부합니다."
                                </p>
                                <button className="mt-2 text-xs font-bold text-orange-400 hover:underline">T-Map 주행기록 보조 로그.jpg (첨부 1)</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Panel & AI Agent Aid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">Verdict Panel (판결)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <Button onClick={() => setVoted("innocent")} disabled={voted !== null} className={`h-full flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all ${voted === "innocent" ? "bg-emerald-500/20 border-emerald-500" : "bg-black/50 border-emerald-900/30 hover:border-emerald-500"}`}>
                                <ShieldCheck size={36} className="text-emerald-400" />
                                <div className="text-center">
                                    <div className="font-black text-emerald-400 italic text-lg leading-none mb-1">정상 주행</div>
                                    <div className="text-[10px] text-slate-400 leading-tight">Dismiss Case<br />(동결 해제 및 복구)</div>
                                </div>
                            </Button>

                            <Button onClick={() => setVoted("guilty")} disabled={voted !== null} className={`h-full flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all ${voted === "guilty" ? "bg-red-500/20 border-red-500" : "bg-black/50 border-red-900/30 hover:border-red-500"}`}>
                                <Crosshair size={36} className="text-red-500" />
                                <div className="text-center">
                                    <div className="font-black text-red-500 italic text-lg leading-none mb-1">부정 징후</div>
                                    <div className="text-[10px] text-slate-400 leading-tight">Uphold Penalty<br />(리워드 소각 및 패널티)</div>
                                </div>
                            </Button>

                            <Button onClick={() => setVoted("inconclusive")} disabled={voted !== null} className={`h-full flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all ${voted === "inconclusive" ? "bg-amber-500/20 border-amber-500" : "bg-black/50 border-amber-900/30 hover:border-amber-500"}`}>
                                <AlertTriangle size={36} className="text-amber-500" />
                                <div className="text-center">
                                    <div className="font-black text-amber-500 italic text-lg leading-none mb-1">증거 부족</div>
                                    <div className="text-[10px] text-slate-400 leading-tight">Inconclusive<br />(재심사 요청)</div>
                                </div>
                            </Button>

                        </div>

                        <AnimatePresence>
                            {voted && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-4 bg-emerald-900/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold flex items-center justify-between">
                                    <span>투표가 암호화되어 블록체인에 전송되었습니다. (Commit 완료)</span>
                                    <Check size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-blue-950/20 border border-blue-500/30 rounded-3xl p-6 relative">
                        <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                            <BrainCircuit size={16} /> Jury AI Aid
                        </h3>
                        <p className="text-xs text-blue-200 leading-relaxed font-mono">
                            "배심원님, 제출된 블랙박스 영상 속 속도계는 움직이고 있으나 STN2120 OBD 데이터는 0을 가리킵니다. 이는 '동글 접촉 불량'이거나 '고의적 차단' 중 하나입니다.<br /><br />
                            과거 이 유저의 [정비 이력]을 분석한 결과 동글 교체나 관련 수리 기록이 전혀 존재하지 않습니다. 장비 불량보다는 인위적 훼손 가능성에 주의 깊게 살펴주세요."
                        </p>
                        <div className="mt-6 flex justify-between items-center px-4 py-2 bg-black/50 rounded-lg border border-slate-700 font-bold text-xs uppercase tracking-widest text-slate-400">
                            My Justice Score <span className="text-yellow-400 tabular-nums">1,240 PT</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
