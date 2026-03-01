"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Zap, Hexagon, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockLeaderboard = [
    { id: 1, nickname: "Seoulracer", car: "Porsche 911 (Diamond)", ozc: 125400, rank: 1, roi: 88, power: 1.5 },
    { id: 2, nickname: "CyberPunk_00", car: "Tesla Cybertruck (Diamond)", ozc: 108200, rank: 2, roi: 76, power: 1.5 },
    { id: 3, nickname: "M3_Power", car: "BMW M3 (Platinum)", ozc: 95300, rank: 3, roi: 65, power: 1.2 },
    { id: 4, nickname: "EvoX_Driver", car: "Lancer Evo X (Gold)", ozc: 82000, rank: 4, roi: 54, power: 1.0 },
    { id: 5, nickname: "Eco_King", car: "Hyundai Ioniq 5 (Gold)", ozc: 78500, rank: 5, roi: 52, power: 1.0 },
    { id: 6, nickname: "SpeedyGonzales", car: "Audi RS6 (Diamond)", ozc: 75000, rank: 6, roi: 49, power: 1.5 },
];

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState("all");

    const getRankBadge = (rank: number) => {
        switch (rank) {
            case 1: return <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black"><Crown size={16} /></div>;
            case 2: return <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-black font-black">2</div>;
            case 3: return <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-black font-black">3</div>;
            default: return <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 font-bold">{rank}</div>;
        }
    };

    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#0a0f1d] text-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#00FFC2]">The King of Mining</h1>
                    <p className="text-slate-400">데이터가 자산이 된 세상, 최고의 드라이버 명예의 전당</p>
                </div>

                {/* Top 3 Podium area */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4">
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="order-2 md:order-1 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-slate-300/20 mb-4 border-2 border-slate-300 flex items-center justify-center text-slate-300">
                            <Hexagon size={40} className="opacity-50" />
                        </div>
                        <div className="text-xl font-bold">{mockLeaderboard[1].nickname}</div>
                        <div className="text-sm text-[#00FFC2] font-mono">{mockLeaderboard[1].ozc.toLocaleString()} OZC</div>
                        <div className="w-24 h-32 bg-gradient-to-t from-slate-300/20 to-transparent rounded-t-xl mt-4 border-t-2 border-slate-300 text-center pt-2 font-black text-2xl text-slate-300">2</div>
                    </motion.div>

                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="order-1 md:order-2 flex flex-col items-center">
                        <Crown size={48} className="text-yellow-400 mb-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        <div className="w-28 h-28 rounded-full bg-yellow-400/20 mb-4 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full rounded-full" />
                        </div>
                        <div className="text-2xl font-black text-yellow-400 italic">{mockLeaderboard[0].nickname}</div>
                        <div className="text-lg text-[#00FFC2] font-mono font-bold font-mono">{mockLeaderboard[0].ozc.toLocaleString()} OZC</div>
                        <div className="w-32 h-40 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-t-xl mt-4 border-t-2 border-yellow-400 text-center pt-2 font-black text-4xl text-yellow-400">1</div>
                    </motion.div>

                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="order-3 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-amber-600/20 mb-4 border-2 border-amber-600 flex items-center justify-center text-amber-600">
                            <Hexagon size={40} className="opacity-50" />
                        </div>
                        <div className="text-xl font-bold">{mockLeaderboard[2].nickname}</div>
                        <div className="text-sm text-[#00FFC2] font-mono">{mockLeaderboard[2].ozc.toLocaleString()} OZC</div>
                        <div className="w-24 h-24 bg-gradient-to-t from-amber-600/20 to-transparent rounded-t-xl mt-4 border-t-2 border-amber-600 text-center pt-2 font-black text-2xl text-amber-600">3</div>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
                    <Button variant="ghost" onClick={() => setActiveTab('all')} className={`font-bold uppercase tracking-widest text-xs px-6 py-2 rounded-full ${activeTab === 'all' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Global Rank</Button>
                    <Button variant="ghost" onClick={() => setActiveTab('diamond')} className={`font-bold uppercase tracking-widest text-xs px-6 py-2 rounded-full ${activeTab === 'diamond' ? 'bg-[#00FFC2]/20 text-[#00FFC2]' : 'text-slate-500'}`}>Diamond Only</Button>
                    <Button variant="ghost" onClick={() => setActiveTab('local')} className={`font-bold uppercase tracking-widest text-xs px-6 py-2 rounded-full ${activeTab === 'local' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>South Korea</Button>
                </div>

                {/* List */}
                <div className="space-y-3">
                    {mockLeaderboard.slice(3).map((user, idx) => (
                        <motion.div key={user.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                {getRankBadge(user.rank)}
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center"><Hexagon size={20} className="text-blue-400" /></div>
                                <div>
                                    <div className="font-bold text-lg group-hover:text-blue-400 transition-colors">{user.nickname}</div>
                                    <div className="text-xs text-slate-400">{user.car}</div>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center text-right">
                                <div className="hidden sm:block">
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Mining Power</div>
                                    <div className="text-sm text-yellow-400 items-center justify-end flex gap-1"><Zap size={12} />{user.power}x</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Total OZC</div>
                                    <div className="text-lg font-black text-[#00FFC2] font-mono">{user.ozc.toLocaleString()}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Sticky Bottom Bar (My Current Rank) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
                <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 flex items-center justify-between pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-bold text-slate-400">내 현재 순위</div>
                        <div className="text-xl font-black italic">Rank 1,402</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-[#00FFC2]">다음 등급(Top 1000)까지</div>
                        <div className="text-sm font-bold text-white font-mono">1,450 OZC 남음</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
