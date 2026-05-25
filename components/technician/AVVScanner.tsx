// components/technician/AVVScanner.tsx
"use client";

import React, { useState } from 'react';
import { Camera, RefreshCw, ShieldCheck, AlertTriangle, Image as ImageIcon, CheckCircle2, ChevronRight } from 'lucide-react';

interface AVVScannerProps {
    repairId: string;
}

export default function AVVScanner({ repairId }: AVVScannerProps) {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'verified' | 'rejected'>('idle');
    const [confidence, setConfidence] = useState(0);

    const handleAnalysis = async () => {
        setStatus('analyzing');
        // Simulate AI Vision API Processing (Object Detection & Feature Mapping)
        setTimeout(() => {
            setStatus('verified');
            setConfidence(98.4);
        }, 4000);
    };

    return (
        <div className="bg-slate-950 rounded-[3rem] p-10 text-white overflow-hidden shadow-2xl relative border border-white/5">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Vision Integrity Engine</span>
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">AI 정비 완료 인증 (AVV)</h3>
                    </div>
                    <div className="px-4 py-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Edge AI Node #07</span>
                    </div>
                </div>

                {/* Before/After Comparison Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Before (Storage)</p>
                        <div className="relative aspect-[4/3] bg-slate-900 rounded-[2rem] overflow-hidden border border-white/5 flex items-center justify-center group">
                            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-black text-slate-400">
                                VERIFIED HASH: 0x8a2...
                            </div>
                            <div className="text-slate-700">
                                <ImageIcon className="w-12 h-12 opacity-20" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            {/* In a real app: <img src={beforeImg} className="w-full h-full object-cover grayscale opacity-60" /> */}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest text-center">After (Live Camera)</p>
                        <div className={`relative aspect-[4/3] bg-slate-900 rounded-[2rem] overflow-hidden border-2 transition-all duration-500 flex items-center justify-center ${status === 'verified' ? 'border-green-500 shadow-lg shadow-green-500/20' :
                                status === 'analyzing' ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-blue-500/30'
                            }`}>
                            {status === 'idle' && (
                                <div className="text-blue-500/40 animate-pulse">
                                    <Camera className="w-12 h-12" />
                                </div>
                            )}

                            {status === 'analyzing' && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-blue-600/10 backdrop-blur-[2px]">
                                    <RefreshCw className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Analyzing Object Mesh...</p>

                                    {/* Scanning line animation */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan"></div>
                                </div>
                            )}

                            {status === 'verified' && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-green-600/10 animate-in fade-in zoom-in duration-500">
                                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                                    <div className="bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Verification Success
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results / Insight Card */}
                <div className="mb-10 min-h-[100px]">
                    {status === 'verified' ? (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-[2rem] p-6 animate-in slide-in-from-bottom duration-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500 p-2 rounded-xl">
                                        <ShieldCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-green-400">부품 무결성 확인됨 (Confidence {confidence}%)</h4>
                                        <p className="text-[10px] text-green-300 font-bold uppercase tracking-widest mt-0.5">Proof of Repair (PoR) Generated</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-green-100/70 font-medium leading-relaxed">
                                실시간 대조 결과, 교체 부품의 규격 및 질감이 신규 제품(OEM Grade)과 98% 일치하며, 차대번호(VIN) 매핑 데이터가 일치합니다.
                            </p>
                        </div>
                    ) : status === 'analyzing' ? (
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 animate-progress"></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <span>Comparing Texture Map</span>
                                <span>Stage 2/3</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 p-6 bg-white/5 rounded-[2rem] border border-white/5">
                            <AlertTriangle className="w-5 h-5 text-orange-400 mt-1" />
                            <p className="text-xs font-medium text-slate-400 leading-relaxed">
                                정비 완료 사진을 업로드하면 AI가 이전 상태와 대조하여 부품의 신규성 및 정비 품질을 인증합니다. <br />
                                <span className="text-white">인증 완료 시 추가 OZC 기술 보너스가 지급됩니다.</span>
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleAnalysis}
                    disabled={status === 'analyzing' || status === 'verified'}
                    className={`w-full py-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all ${status === 'verified' ? 'bg-green-600 text-white shadow-xl shadow-green-500/20' :
                            status === 'analyzing' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                                'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20 active:scale-[0.98]'
                        }`}
                >
                    {status === 'verified' ? (
                        <>블록체인 인증 완료 (PoR) <ChevronRight className="w-5 h-5" /></>
                    ) : status === 'analyzing' ? (
                        <>AI 심층 분석 중...</>
                    ) : (
                        <>분석 및 정비 인증 시작</>
                    )}
                </button>
            </div>

            <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .animate-progress {
          animation: progress 4s linear;
        }
      `}</style>
        </div>
    );
}
