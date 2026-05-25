// app/technician/dashboard/page.tsx
"use client";

import React, { useState } from 'react';
import TechnicianLayout from '../../../components/layout/TechnicianLayout';
import MaintenanceForm from '../../../components/mining/MaintenanceForm';
import SoftwareHealthMonitor from '../../../components/technician/SoftwareHealthMonitor';
import DigitalTwinViewer from '../../../components/technician/DigitalTwinViewer';
import DiagnosticGateway from '../../../components/technician/DiagnosticGateway';
import LiveDiagnosticMonitor from '../../../components/technician/LiveDiagnosticMonitor';
import AVVScanner from '../../../components/technician/AVVScanner';
import { BarChart3, Users, Wrench, Settings, TrendingUp, DollarSign, Calendar, Activity, Cpu, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export default function TechnicianDashboard() {
    const [view, setView] = useState<'WORK' | 'ANALYTICS' | 'SDV'>('WORK');
    const [isMinting, setIsMinting] = useState(false);
    const [isMinted, setIsMinted] = useState(false);

    const handleMintNFT = () => {
        setIsMinting(true);
        // Simulate Blockchain Minting Delay
        setTimeout(() => {
            setIsMinting(false);
            setIsMinted(true);
        }, 3000);
    };

    return (
        <TechnicianLayout title={
            view === 'WORK' ? "Service Operations" :
                view === 'ANALYTICS' ? "Business Intelligence" :
                    "SDV Diagnostic Insight"
        }>
            {/* View Switcher */}
            <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-2xl w-fit">
                <button
                    onClick={() => setView('WORK')}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${view === 'WORK' ? 'bg-white text-[#0052FF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Live Operations
                </button>
                <button
                    onClick={() => setView('ANALYTICS')}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${view === 'ANALYTICS' ? 'bg-white text-[#0052FF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Analytics Engine
                </button>
                <button
                    onClick={() => setView('SDV')}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${view === 'SDV' ? 'bg-white text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    SDV Insight
                </button>
            </div>

            {view === 'WORK' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MaintenanceForm />
                    </div>
                    <div className="space-y-6">
                        {/* Queue / Status Card */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Service Queue</h3>
                            <div className="space-y-4">
                                {[
                                    { id: 'OZ-702', model: 'Tesla Model 3', status: 'IN_PROGRESS' },
                                    { id: 'OZ-703', model: 'GV60 Electrified', status: 'WAITING' },
                                    { id: 'OZ-704', model: 'Ioniq 5', status: 'WAITING' }
                                ].map((job) => (
                                    <div key={job.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                                        <div>
                                            <div className="text-[10px] font-black text-[#0052FF]">{job.id}</div>
                                            <div className="text-sm font-black text-slate-900">{job.model}</div>
                                        </div>
                                        <div className={`text-[9px] font-black px-2 py-1 rounded-full ${job.status === 'IN_PROGRESS' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-slate-200 text-slate-400'}`}>
                                            {job.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : view === 'ANALYTICS' ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <div className="flex justify-between mb-4">
                                <TrendingUp className="text-[#10B981] w-6 h-6" />
                                <span className="text-[10px] font-black text-[#10B981]">+12.4%</span>
                            </div>
                            <div className="text-4xl font-black text-slate-900">142</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Monthly Inspections</div>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <div className="flex justify-between mb-4">
                                <DollarSign className="text-[#0052FF] w-6 h-6" />
                                <span className="text-[10px] font-black text-[#0052FF]">New High</span>
                            </div>
                            <div className="text-4xl font-black text-slate-900">4,210</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Revenue Trailing OZC</div>
                        </div>
                        <div className="bg-[#0052FF] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                            <div className="flex justify-between mb-4">
                                <Users className="opacity-60 w-6 h-6" />
                                <span className="text-[10px] font-black opacity-60">TOP 1%</span>
                            </div>
                            <div className="text-4xl font-black">99.8</div>
                            <div className="text-[10px] font-black opacity-60 uppercase tracking-widest mt-1">Customer Satisfaction</div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-8">Asset Performance Matrix</h3>
                        <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-100 pb-2">
                            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div
                                        style={{ height: `${h}%` }}
                                        className="bg-slate-100 group-hover:bg-[#0052FF] rounded-t-lg transition-all duration-300 w-full"
                                    />
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h * 42}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Jan</span>
                            <span>Jun</span>
                            <span>Dec</span>
                        </div>
                    </div>

                    <div className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden mt-8">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-blue-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">B2B Data Monetization</span>
                                    </div>
                                    <h3 className="text-2xl font-black">Data Marketing Revenue</h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-white italic">₩12,450,000</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Accumulated Profit</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { partner: 'BOSCH Korea', data: 'Brake Wear Logs', revenue: '₩2.4M' },
                                    { partner: 'Michelin', data: 'Tire Pressure Trends', revenue: '₩1.8M' },
                                    { partner: 'Hyundai Mobis', data: 'Inverter Thermal Data', revenue: '₩5.2M' }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <p className="text-[10px] font-black text-blue-400 uppercase mb-2">{item.partner}</p>
                                        <p className="text-sm font-bold mb-4">{item.data}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] text-slate-500 font-black uppercase">Payout</span>
                                            <span className="text-xs font-black text-white">{item.revenue}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in slide-in-from-bottom duration-500 space-y-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 transition-transform group-hover:scale-110">
                            <Cpu className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 flex-1">
                            <h2 className="text-2xl font-black mb-2">SDV-Ready Diagnostic Engine</h2>
                            <p className="opacity-80 text-sm font-medium">차량의 모든 소프트웨어 로그와 실시간 센서 데이터를 분석하여 미래 지향적인 선제적 정비를 지원합니다.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="text-[10px] uppercase font-bold opacity-60 mb-1">AI Trust Score</div>
                                <div className="text-2xl font-black">98.2%</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <LiveDiagnosticMonitor vehicleId="VIN-777-DEMO" />
                        <AVVScanner repairId="REP-999" />
                    </div>

                    <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest">NFT Certification</span>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">Issue Software Performance NFT</h3>
                                <p className="text-slate-400 text-sm max-w-md">업데이트된 소프트웨어 성능과 정합성을 블록체인에 영구 기록하여 차량 가치를 증명하세요.</p>
                            </div>
                            <button
                                onClick={handleMintNFT}
                                disabled={isMinting || isMinted}
                                className={`px-10 py-5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center gap-3 ${isMinted ? 'bg-green-600 text-white shadow-green-500/20' :
                                    isMinting ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                                        'bg-[#0052FF] text-white shadow-blue-600/20 hover:scale-105 active:scale-95'
                                    }`}
                            >
                                {isMinted ? (
                                    <><ShieldCheck className="w-5 h-5" /> 발급 완료 (PoP)</>
                                ) : isMinting ? (
                                    <><RefreshCw className="w-5 h-5 animate-spin" /> 민팅 중...</>
                                ) : (
                                    <><Zap className="w-5 h-5 fill-current" /> 퍼포먼스 인증 NFT 발행</>
                                )}
                            </button>
                        </div>
                    </div>

                    <SoftwareHealthMonitor />
                    <DigitalTwinViewer />
                    <DiagnosticGateway />
                </div>
            )}
        </TechnicianLayout>
    );
}

