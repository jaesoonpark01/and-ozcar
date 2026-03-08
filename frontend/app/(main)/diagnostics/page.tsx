"use client";

import React, { useState, useEffect } from 'react';
import MarketplaceLayout from '../../../components/layout/MarketplaceLayout';
import { ShieldAlert, CheckCircle2, AlertCircle, MapPin, PhoneCall, Activity, Wrench } from 'lucide-react';
import ChargingStations from '../../../components/obd/ChargingStations';

// MOCK DATA for DTCs
const MOCK_DTC_LOGS = [
    { id: 1, code: 'P1B77', unit: 'BMS', desc: '고전압 컨택터 점검 필요', level: 'Critical', date: new Date().toISOString().split('T')[0] },
    { id: 2, code: 'B1601', unit: 'Aircon', desc: '냉각수 펌프 신호 불량', level: 'Medium', date: new Date().toISOString().split('T')[0] }
];

export default function DiagnosticsPage() {
    const [carStatus, setCarStatus] = useState<'safe' | 'warning'>('warning');
    const [diagnosticLogs, setDiagnosticLogs] = useState(MOCK_DTC_LOGS);

    // 시뮬레이션을 위해 "해결됨" 처리하는 함수
    const handleResolve = (id: number) => {
        setDiagnosticLogs(prev => prev.filter(log => log.id !== id));
    };

    useEffect(() => {
        if (diagnosticLogs.length === 0) {
            setCarStatus('safe');
        } else {
            setCarStatus('warning');
        }
    }, [diagnosticLogs]);

    return (
        <MarketplaceLayout>
            <div className="max-w-4xl mx-auto py-10 px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Smart Health Check</h1>
                    <p className="text-slate-500 font-medium mt-2">정밀 진단 및 예측 유지보수 모니터링</p>
                </div>

                {/* 1. 상단 케어 상태 카드 */}
                <div className={`rounded-3xl p-8 mb-8 shadow-xl border transition-all duration-500 ${carStatus === 'warning' ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {carStatus === 'warning' ? (
                                <ShieldAlert className="text-red-500 w-6 h-6" />
                            ) : (
                                <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                            )}
                            {carStatus === 'warning' ? '주의 구간 진입' : '시스템 정상 가동 중'}
                        </h2>
                        <span className="text-xs font-bold bg-white px-3 py-1 rounded-full text-slate-600 shadow-sm border border-slate-100 uppercase tracking-widest">
                            VIN: KR-IONIQ6-2026
                        </span>
                    </div>

                    <div className="flex flex-col items-center py-8">
                        <div className={`text-6xl mb-4 transition-transform ${carStatus === 'warning' ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                            {carStatus === 'warning' ? <AlertCircle size={80} /> : <CheckCircle2 size={80} />}
                        </div>
                        <p className="text-3xl font-black text-slate-900 mb-2">
                            {carStatus === 'warning' ? '즉시 점검이 필요합니다' : '안심 주행이 가능합니다'}
                        </p>
                        <p className="text-slate-500 text-sm font-medium">마지막 스캔: 방금 전</p>
                    </div>
                </div>

                {/* 2. 상세 고장 코드 리스트 */}
                {diagnosticLogs.length > 0 ? (
                    <div className="space-y-4 mb-10">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-wider">감지된 이슈 ({diagnosticLogs.length})</h3>
                        </div>
                        {diagnosticLogs.map((log) => (
                            <div key={log.id} className="bg-white border border-slate-200 p-6 rounded-2xl flex justify-between items-center shadow-sm group">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${log.level === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {log.level}
                                        </span>
                                        <span className="font-mono text-blue-600 font-bold bg-slate-50 px-2 py-1 rounded">{log.code}</span>
                                    </div>
                                    <p className="font-bold text-slate-800 text-lg">{log.desc}</p>
                                    <p className="text-sm text-slate-500 font-medium mt-1">{log.unit} 유닛 | 발생일: {log.date}</p>
                                </div>
                                <button
                                    onClick={() => handleResolve(log.id)}
                                    className="bg-slate-50 p-4 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border border-slate-100"
                                    title="해결됨 마크하기 (시뮬레이션)"
                                >
                                    <Wrench size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 p-8 rounded-2xl mb-10 text-center shadow-sm">
                        <Activity className="mx-auto w-12 h-12 text-slate-300 mb-4" />
                        <p className="text-lg font-bold text-slate-600">현재 감지된 고장/경고 코드가 없습니다.</p>
                    </div>
                )}

                {/* 3. 액션 버튼 (토탈 케어 핵심) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <button className="bg-[#0052FF] hover:bg-blue-600 border border-[#0052FF] text-white p-6 rounded-3xl flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20">
                        <div className="p-3 bg-white/20 rounded-2xl"><MapPin size={24} /></div>
                        <div className="text-left">
                            <span className="block font-black text-lg">가까운 블루핸즈 예약</span>
                            <span className="block text-sm opacity-80 font-medium">현재 위치에서 2.4km 거리</span>
                        </div>
                    </button>
                    <button className="bg-white border text-red-500 hover:bg-red-50 border-red-100 p-6 rounded-3xl flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-sm">
                        <div className="p-3 bg-red-100 rounded-2xl"><PhoneCall size={24} /></div>
                        <div className="text-left">
                            <span className="block font-black text-lg">긴급출동 서비스 호출</span>
                            <span className="block text-sm opacity-80 font-medium">24시간 운영 콜센터 연결</span>
                        </div>
                    </button>
                </div>

                {/* 4. 하단 레이아웃: 예측 유지보수 팁 & 주변 충전소 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="p-6 bg-gradient-to-r from-blue-900 to-[#0f172a] rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-center">
                        <div className="relative z-10 flex gap-6 items-start">
                            <div className="bg-blue-500/20 p-4 rounded-2xl flex-shrink-0">
                                <span className="text-xs text-blue-300 font-black uppercase tracking-widest hidden md:block">Pro-Tip</span>
                                <Activity className="text-blue-300 w-6 h-6 md:hidden" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg mb-2">배터리 최적화 가이드</p>
                                <p className="text-sm text-blue-200/80 leading-relaxed font-medium">
                                    전원 제어 누설이 일부 감지되었습니다. 상시 녹화 블랙박스를 12시간 이하 타이머로 변경하면 BMS 모듈이 정상적으로 딥 슬립에 진입하여 배터리 수명을 대폭 개선할 수 있습니다.
                                </p>
                            </div>
                        </div>
                        {/* Abstract background elements */}
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
                        <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
                    </div>

                    <div className="h-full">
                        <ChargingStations />
                    </div>
                </div>
            </div>
        </MarketplaceLayout>
    );
}
