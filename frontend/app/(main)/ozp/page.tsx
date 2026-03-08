'use client';

import { Wallet, ArrowRightLeft, ArrowUpRight, ArrowDownToLine, RefreshCw, BarChart2, Shield } from 'lucide-react';
import { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// 모의 가치 성장 데이터
const mockPerformanceData = [
    { day: 'Mon', value: 32000 },
    { day: 'Tue', value: 34500 },
    { day: 'Wed', value: 34100 },
    { day: 'Thu', value: 38900 },
    { day: 'Fri', value: 41200 },
    { day: 'Sat', value: 45000 },
    { day: 'Sun', value: 48500 }
];

export default function WalletPage() {
    const [balanceOZP, setBalanceOZP] = useState(48500);

    // 현재 OZP의 가치 (예: 1 OZP = 1원 가치로 단순 치환)
    const krwValue = (balanceOZP * 1).toLocaleString();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-purple-500/30">

            <header className="mb-10 border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold flex items-center gap-3 text-white">
                        <Wallet className="text-purple-400" size={32} />
                        Digital Asset Vault
                    </h1>
                    <p className="text-slate-400 mt-2">안전 운전과 데이터 제공으로 채굴한 OZP 자산을 관리하세요.</p>
                </div>

                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
                    <Shield className="text-emerald-500" size={18} />
                    <span className="text-sm font-semibold text-slate-300">HW 서명 지갑 (보안 레벨: 최상)</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 잔액 요약 (Dynamic Balance Card) */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-8 rounded-3xl shadow-2xl border border-purple-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
                        <p className="text-purple-200/80 font-semibold mb-2 flex items-center gap-2">
                            <RefreshCw size={14} className="animate-spin-slow" /> 실시간 보유 자산
                        </p>
                        <h2 className="text-5xl font-black text-white mb-1">
                            {balanceOZP.toLocaleString()} <span className="text-2xl font-bold text-purple-300">OZP</span>
                        </h2>
                        <p className="text-xl text-purple-200/60 font-medium mb-8">≈ ₩ {krwValue}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/10 backdrop-blur-sm">
                                <ArrowDownToLine size={18} /> 출금 (환전)
                            </button>
                            <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <ArrowRightLeft size={18} /> 송금 / 결제
                            </button>
                        </div>
                    </div>

                    {/* Asset Health Index */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <BarChart2 className="text-blue-400" /> 데이터 품질 등급 (Asset Health)
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-black text-cyan-400">Diamond</span>
                            <span className="text-sm text-slate-400">상위 5%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
                            <div className="bg-cyan-400 w-[95%] h-full rounded-full" />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            HW 보안 서명이 완료된 CAN FD 고해상도 로그를 지속 제공하여 최상위 등급을 유지 중입니다. (마켓플레이스 판매 시 1.5배 가중치 적용)
                        </p>
                    </div>
                </div>

                {/* 차트 및 이력 */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl h-[350px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">최근 수익 성장 추이</h3>
                            <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                                +15.2% (이번 주)
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={mockPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="day" stroke="#64748b" axisLine={false} tickLine={false} />
                                <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                                    itemStyle={{ color: '#a855f7', fontWeight: 'bold' }}
                                    formatter={(val: any) => [`${Number(val).toLocaleString()} OZP`]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#a855f7"
                                    strokeWidth={4}
                                    dot={{ fill: '#0f172a', stroke: '#a855f7', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: '#a855f7', stroke: '#fff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                        <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
                            <h3 className="font-bold text-white">최근 토큰 이력</h3>
                        </div>
                        <div className="divide-y divide-slate-800">
                            <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <ArrowUpRight size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-200">데이터 판매 완료</p>
                                        <p className="text-xs text-slate-500">2026.03.08 14:30 • AIG 안심화재 매입</p>
                                    </div>
                                </div>
                                <p className="font-black text-emerald-400 text-lg">+ 12,500 OZP</p>
                            </div>

                            <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <RefreshCw size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-200">주행 데이터 채굴 (Sentinel)</p>
                                        <p className="text-xs text-slate-500">2026.03.08 09:12 • 강변북로 15km</p>
                                    </div>
                                </div>
                                <p className="font-black text-blue-400 text-lg">+ 450 OZP</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
