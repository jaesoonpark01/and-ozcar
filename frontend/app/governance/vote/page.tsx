"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote, Users, Flame, Landmark, Activity, Coins, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/components/Web3Provider";

const options = [
    { id: "A", label: "공격적 생태계 확장", desc: "소각 20% / 트레저리 80%", icon: <Users size={24} />, color: "text-blue-400" },
    { id: "B", label: "가치 보존 (현재 유지)", desc: "소각 50% / 트레저리 50%", icon: <Landmark size={24} />, color: "text-emerald-400" },
    { id: "C", label: "가치 상승 극대화", desc: "소각 80% / 트레저리 20%", icon: <Flame size={24} />, color: "text-red-400" },
];

export default function GovernanceVotePage() {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCasting, setIsCasting] = useState(false);
    const [voteCasted, setVoteCasted] = useState(false);
    const { account } = useWeb3();

    // Mock results for UI display
    const results = { A: 15, B: 30, C: 55 };

    const handleCasting = () => {
        setIsCasting(true);
        setTimeout(() => {
            setIsCasting(false);
            setVoteCasted(true);
        }, 2500);
    };

    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#050510] text-white">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Proposal Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none" />

                        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-widest mb-4">
                            <Vote size={18} /> OIP-1 (Ozcar Improvement Proposal #1)
                        </div>

                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 text-white">플랫폼 순수익금 배분 규정안</h1>

                        <div className="flex items-center gap-4 mb-6 text-sm text-slate-400 border-y border-slate-800 py-3">
                            <span>제안자: <strong>Ozcar Core Team</strong></span>
                            <span>상태: <strong className="text-emerald-400 animate-pulse">투표 진행 중</strong></span>
                            <span>남은 시간: <strong className="font-mono">14h 22m</strong></span>
                        </div>

                        <div className="prose prose-invert prose-slate max-w-none text-sm leading-relaxed mb-6">
                            <p>
                                오즈카 파운더 여러분, 본 안건은 데이터 판매 및 구독 모델에서 발생하는 분기별 잉여 수익(현금 흐름)에 대한 처리 방안을 확정하기 위함입니다.
                                스마트 컨트랙트를 통해 자동 집행될 자금의 비율(토큰 소각 vs DAO 금고 저장)을 직접 결정해 주십시오.
                                플로어 프라이스를 높이기 위해 강도를 높일 것인지(C안), 향후 마케팅 및 그랜트를 위해 금고를 채울 것인지(A안) 파운더들의 의지가 필요합니다.
                            </p>
                        </div>

                        <div className="bg-black/60 rounded-2xl p-4 border border-slate-800 flex gap-4 text-slate-300">
                            <Activity size={24} className="text-purple-400 flex-shrink-0" />
                            <div className="text-xs">
                                <strong>정족수 및 가결 조건:</strong> 전체 다이아몬드/플래티넘 파운더의 30% 이상 참석. 최다 득표 안건 자동 채택.<br />
                                투표 후 변경 불가하며, OZC 토큰 1개가 소모됩니다 (가스비 제외).
                            </div>
                        </div>
                    </div>

                    {/* Voting Options */}
                    <AnimatePresence mode="wait">
                        {!voteCasted ? (
                            <motion.div key="voting" className="space-y-4">
                                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">Your Decision</h3>
                                {options.map((opt) => (
                                    <div
                                        key={opt.id}
                                        onClick={() => setSelected(opt.id)}
                                        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${selected === opt.id ? 'bg-purple-900/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-black/40 border-slate-800 hover:border-slate-600'}`}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-black/50 border border-slate-700 ${opt.color}`}>
                                                {opt.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold mb-1">안건 {opt.id}: {opt.label}</h4>
                                                <p className="text-sm text-slate-400">{opt.desc}</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === opt.id ? 'border-purple-400 bg-purple-500/20' : 'border-slate-700'}`}>
                                            {selected === opt.id && <div className="w-3 h-3 bg-purple-400 rounded-full" />}
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    onClick={handleCasting}
                                    disabled={!selected || isCasting || !account}
                                    className="w-full h-16 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest text-lg rounded-2xl mt-4"
                                >
                                    {isCasting ? "온체인 트랜잭션 전송 중..." : "투표 제출 확정"}
                                </Button>
                                {!account && <p className="text-xs text-red-400 text-center mt-2">투표를 위해 지갑을 연결하세요.</p>}
                            </motion.div>
                        ) : (
                            <motion.div key="voted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-950/30 border border-emerald-500/50 rounded-3xl p-12 text-center backdrop-blur-xl">
                                <Check className="text-emerald-400 mx-auto mb-6 bg-emerald-500/20 p-4 rounded-full" size={80} />
                                <h2 className="text-3xl font-black italic tracking-tighter text-emerald-400 mb-2">투표가 블록체인에 기록되었습니다</h2>
                                <p className="text-slate-300 mb-8 max-w-sm mx-auto">
                                    파운더님의 결정이 시스템에 반영되었습니다. 마감 후 온체인 로직에 따라 자금이 자동 분배/소각됩니다.
                                </p>
                                <div className="bg-black/40 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-500 overflow-hidden text-left mb-8 max-w-md mx-auto">
                                    <div className="text-emerald-500 mb-1">TxHash:</div>
                                    <div className="truncate text-slate-300">0x3f...92d1a (Polygon PoS)</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Col: Info / Results Sidebar */}
                <div className="space-y-6">
                    <div className="bg-black/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                            <Coins size={14} /> 현재 여론 (실시간)
                        </h3>

                        <div className="space-y-6">
                            {options.map((opt) => (
                                <div key={opt.id}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-white">{opt.id}: {opt.label}</span>
                                        <strong className="text-purple-400 font-mono">{results[opt.id as keyof typeof results]}%</strong>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-purple-500`}
                                            style={{ width: `${results[opt.id as keyof typeof results]}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-800 text-center">
                            투표가 완료되면 결과에 따라 DAO 금고에서 자동으로 자금이 움직입니다 (OzcarTreasury.sol 활용).
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/10 border border-purple-500/20 rounded-3xl p-6 relative overflow-hidden text-center">
                        <Flame size={32} className="text-red-500 mx-auto mb-2 opacity-50" />
                        <div className="text-sm font-bold text-purple-300 mb-1">현재 누적 소각량</div>
                        <div className="text-2xl font-black font-mono text-white mb-4">4,204,115 OZC</div>
                        <button className="text-xs uppercase tracking-widest px-4 py-2 border border-slate-600 rounded-full hover:bg-slate-800 transition-colors w-full text-slate-300">
                            소각 내역 보기 (Polygonscan)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
