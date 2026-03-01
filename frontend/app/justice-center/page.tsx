"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, UploadCloud, FileVideo, CheckCircle, Clock, FileWarning, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JusticeCenter() {
    const [fileAttached, setFileAttached] = useState<File | null>(null);
    const [appealText, setAppealText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"frozen" | "appealed">("frozen");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate Supabase Storage upload
        setTimeout(() => {
            setIsSubmitting(false);
            setStatus("appealed");
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#111111] text-white">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-400">The Justice Center</h1>
                    <p className="text-slate-400">오즈카 생태계의 정의와 데이터 무결성을 위한 소명 센터입니다.</p>
                </div>

                <AnimatePresence mode="wait">
                    {status === "frozen" ? (
                        <motion.div key="frozen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-8">

                            {/* Incident Report */}
                            <div className="bg-red-950/20 border border-red-500/30 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl">
                                <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-red-500/20 text-red-400 rounded-2xl"><FileWarning size={32} /></div>
                                    <div>
                                        <h2 className="text-2xl font-bold flex items-center gap-2">
                                            Incident Report <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-md font-bold uppercase tracking-widest">Frozen</span>
                                        </h2>
                                        <p className="text-slate-400 text-sm mt-1">AI Sentinel에 의해 비정상적인 주행 데이터가 감지되었습니다.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-black/40 p-4 rounded-xl border border-red-900/30">
                                    <div>
                                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] block">적발 사유</span>
                                        <span className="text-white font-medium">GPS 경로와 실제 휠 속도 불일치 (15% 초과)</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] block">적발 시각</span>
                                        <span className="text-white font-medium font-mono">2026. 03. 01. 14:22:15</span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] block">현재 상태</span>
                                        <span className="text-red-400 font-bold">리워드 1,250 OZC 동결 (Frozen), 리더보드 제외</span>
                                    </div>
                                </div>
                            </div>

                            {/* Appeal Form */}
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                                    소명 자료 제출 <span className="text-xs text-orange-400 font-normal">DAO 배심원 심사용</span>
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">1. 블랙박스 영상 업로드 (필수)</label>
                                        <div className="border-2 border-dashed border-slate-700 hover:border-orange-500/50 transition-colors rounded-2xl p-8 text-center bg-black/30 cursor-pointer relative">
                                            <input type="file" accept="video/mp4" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFileAttached(e.target.files?.[0] || null)} />
                                            {fileAttached ? (
                                                <div className="flex flex-col items-center text-orange-400">
                                                    <FileVideo size={32} className="mb-2" />
                                                    <span className="font-bold">{fileAttached.name}</span>
                                                    <span className="text-xs text-slate-500 mt-1">{(fileAttached.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center text-slate-500">
                                                    <UploadCloud size={32} className="mb-2" />
                                                    <span className="font-medium">이곳을 클릭하여 영상을 업로드하세요</span>
                                                    <span className="text-xs mt-1 text-slate-600">적발 시간대 전후 5분 파일 (.mp4)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">2. 소명 내용</label>
                                        <textarea
                                            placeholder="예: 터널 진입 혹은 지하주차장으로 인한 일시적인 GPS 음영 및 오차입니다."
                                            value={appealText}
                                            onChange={(e) => setAppealText(e.target.value)}
                                            className="w-full bg-black/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 outline-none focus:border-orange-500 transition-colors h-32 resize-none"
                                        />
                                    </div>

                                    <div className="p-4 bg-orange-900/10 border border-orange-500/20 rounded-xl text-sm text-orange-400">
                                        <AlertOctagon size={16} className="inline mr-2 -mt-1" />
                                        제출된 데이터는 프라이버시 보호를 위해 11명의 다이아몬드 배심원에게만 마스킹 처리되어 익명으로 제공되며 판결 후 파기됩니다.
                                    </div>

                                    <Button type="submit" disabled={!fileAttached || !appealText || isSubmitting} className="w-full h-14 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase tracking-widest text-lg">
                                        {isSubmitting ? "증거 해시 저장 중..." : "배심원 심사 요청"}
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="appealed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
                            <CheckCircle size={64} className="text-orange-400 mx-auto mb-6" />
                            <h2 className="text-3xl font-black italic mb-4">소명 접수 완료</h2>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                증거 자료가 블록체인에 연동되어 DAO 배심원들에게 무작위 배정되었습니다.
                                결과는 48시간 내에 투표 다수결 원칙에 따라 투명하게 결정됩니다.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm bg-black/40 p-6 rounded-2xl max-w-lg mx-auto border border-slate-800">
                                <div className="flex flex-col items-center opacity-50">
                                    <UploadCloud size={20} className="mb-2" />
                                    <span>증거 제출</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-600" />
                                <div className="flex flex-col items-center text-orange-400 font-bold">
                                    <Clock size={20} className="mb-2 animate-pulse" />
                                    <span>배심원 투표 중</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-600" />
                                <div className="flex flex-col items-center opacity-50">
                                    <CheckCircle size={20} className="mb-2" />
                                    <span>최종 판결</span>
                                </div>
                            </div>

                            <Button onClick={() => window.location.href = "/dashboard"} variant="outline" className="mt-8 border-slate-700 hover:bg-slate-800">
                                대시보드로 돌아가기
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
