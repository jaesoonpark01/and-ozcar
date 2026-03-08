"use client";

import React from 'react';
import { X, Award, Leaf, BatteryCharging, Zap, Map } from 'lucide-react';

interface TripSummaryProps {
    score: number;
    distance: number;
    efficiency: number;
    savedMoney: number;
    onClose: () => void;
}

export default function TripSummary({ score, distance, efficiency, savedMoney, onClose }: TripSummaryProps) {
    // 모의 주행 분석 데이터
    const mockAnalysis = {
        drivingPercent: 70,
        hvacPercent: 20,
        electronicsPercent: 10,
        regenDistance: 4.5
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-slate-900 w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-slate-800 relative animate-in fade-in zoom-in duration-300">

                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-black/20 text-white/60 hover:text-white hover:bg-black/40 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    {/* 1. 상단 점수 카드 */}
                    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-center shadow-[0_0_40px_rgba(79,70,229,0.3)] mb-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 opacity-10 font-black text-9xl -mr-10 -mt-10 italic transform group-hover:scale-110 transition-transform duration-700">WIN</div>

                        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-2 flex justify-center items-center gap-2">
                            <Award size={16} /> Driving Score
                        </p>
                        <h1 className="text-8xl font-black mb-4 text-white drop-shadow-md">
                            {score}
                        </h1>

                        <div className="inline-flex flex-col items-center gap-2">
                            <div className="bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-bold text-white flex items-center gap-2 border border-white/20">
                                <span>🏆 상위 3%의 부드러운 주행!</span>
                            </div>
                            <p className="text-blue-100/80 text-xs">지구를 아끼는 마음이 느껴져요! 🌿</p>
                        </div>
                    </div>

                    {/* 2. 주요 수치 그리드 */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                            <p className="text-slate-400 text-xs mb-1 font-medium flex items-center gap-1"><Map size={14} /> 주행 거리</p>
                            <p className="text-2xl font-bold text-white">{distance} <span className="text-sm font-normal text-slate-500">km</span></p>
                        </div>
                        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 relative overflow-hidden">
                            <div className="absolute -right-2 -bottom-2 opacity-5"><Zap size={48} /></div>
                            <p className="text-slate-400 text-xs mb-1 font-medium flex items-center gap-1"><BatteryCharging size={14} /> 평균 전비</p>
                            <p className="text-2xl font-bold text-emerald-400">{efficiency.toFixed(1)} <span className="text-sm font-normal text-slate-500">km/kWh</span></p>
                        </div>
                    </div>

                    {/* 3. 절약 리포트 섹션 */}
                    <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800 rounded-2xl p-6 border border-emerald-800/30 mb-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-xs font-bold text-emerald-500 mb-1 flex items-center gap-1 uppercase tracking-wider">
                                <Leaf size={14} /> Benefit Report
                            </h3>
                            <p className="text-3xl font-black text-white mt-2">+{savedMoney.toLocaleString()}원</p>
                            <p className="text-xs text-slate-400 mt-1">동급 내연기관차 대비 연료비 절감액</p>
                        </div>
                        <div className="text-5xl opacity-80">☕</div>
                    </div>

                    {/* 분석 디테일 (에너지 분포) */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-slate-300 mb-3">에너지 사용 분포</p>
                        <div className="w-full h-3 bg-slate-800 rounded-full flex overflow-hidden mb-2">
                            <div className="h-full bg-blue-500" style={{ width: `${mockAnalysis.drivingPercent}%` }} title="주행" />
                            <div className="h-full bg-amber-500" style={{ width: `${mockAnalysis.hvacPercent}%` }} title="공조" />
                            <div className="h-full bg-purple-500" style={{ width: `${mockAnalysis.electronicsPercent}%` }} title="전장" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                            <span className="text-blue-400">주행 {mockAnalysis.drivingPercent}%</span>
                            <span className="text-amber-400">공조 {mockAnalysis.hvacPercent}%</span>
                            <span className="text-purple-400">전장 {mockAnalysis.electronicsPercent}%</span>
                        </div>
                        <p className="text-xs text-emerald-400 mt-3 text-center bg-emerald-900/10 py-2 rounded-lg border border-emerald-900/30">
                            ⚡ 회생 제동으로 주행거리를 <strong>{mockAnalysis.regenDistance}km</strong>나 더 늘렸어요!
                        </p>
                    </div>

                    {/* 4. 하단 버튼 액션 */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-xl font-bold text-sm transition-colors cursor-not-allowed opacity-50">
                            상세 지도 보기
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-900/20">
                            리포트 자랑하기
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
