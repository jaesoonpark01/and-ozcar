// components/user/LiveMaintenanceTimeline.tsx
"use client";

import React from 'react';
import { CheckCircle2, Clock, Camera, ShieldCheck, ChevronRight } from 'lucide-react';

interface TimelineStep {
    id: string;
    title: string;
    time: string;
    status: 'COMPLETED' | 'CURRENT' | 'WAITING';
    description: string;
    isAiVerified?: boolean;
}

export default function LiveMaintenanceTimeline() {
    const steps: TimelineStep[] = [
        { id: '1', title: 'OBD-II 원격 진단 완료', time: '10:15 AM', status: 'COMPLETED', description: '차량 모니터링 시스템에서 엔진오일 교체 주기를 감지했습니다.', isAiVerified: true },
        { id: '2', title: '정비 입고 및 점검', time: '11:30 AM', status: 'COMPLETED', description: '마스터 정비사가 입고된 차량의 물리적 상태를 확인 중입니다.' },
        { id: '3', title: '부품 교체 및 클리닝', time: '12:45 PM', status: 'CURRENT', description: '신규 에어필터 및 오일필터 장착 단계입니다.', isAiVerified: false },
        { id: '4', title: 'AI 비전 품질 검증 (AVV)', time: '-', status: 'WAITING', description: '교체된 부품의 정품 여부와 조립 상태를 AI가 최종 스캔합니다.' },
    ];

    return (
        <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">실시간 정비 타임라인</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live from Master Center</p>
                </div>
                <div className="bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-[#0052FF]">OZ-702-TRANS</span>
                </div>
            </div>

            <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[21px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                {steps.map((step) => (
                    <div key={step.id} className="relative flex gap-8 group">
                        <div className={`z-10 w-11 h-11 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-all ${step.status === 'COMPLETED' ? 'bg-[#0052FF]' :
                                step.status === 'CURRENT' ? 'bg-orange-400 animate-pulse' : 'bg-slate-200'
                            }`}>
                            {step.status === 'COMPLETED' ? (
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : step.status === 'CURRENT' ? (
                                <Clock className="w-5 h-5 text-white" />
                            ) : (
                                <div className="w-2 h-2 bg-slate-400 rounded-full" />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className={`text-sm font-black transition-colors ${step.status === 'WAITING' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                                <span className="text-[10px] font-black text-slate-400">{step.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{step.description}</p>

                            {step.isAiVerified && (
                                <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100">
                                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                    <span className="text-[9px] font-black text-green-600 uppercase tracking-tight">AI Verified</span>
                                </div>
                            )}

                            {step.status === 'CURRENT' && (
                                <div className="mt-4 flex gap-3 overflow-hidden rounded-2xl">
                                    <div className="w-24 aspect-square bg-slate-100 flex items-center justify-center text-slate-300">
                                        <Camera className="w-6 h-6" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-10 py-5 bg-slate-50 text-slate-600 rounded-[1.5rem] font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                상세 정비 리포트 보기 (PDF)
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
