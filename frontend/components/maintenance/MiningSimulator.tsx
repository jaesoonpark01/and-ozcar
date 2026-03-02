"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Award, Image as ImageIcon, Zap, Info } from 'lucide-react';

export default function MiningSimulator() {
    const [count, setCount] = useState(5);
    const [isMaster, setIsMaster] = useState(false);
    const [hasMedia, setHasMedia] = useState(true);
    const [isStaking, setIsStaking] = useState(false);

    const BASE_REWARD = 15; // OZC per record
    const MASTER_MULTIPLIER = 2.0;
    const MEDIA_BONUS = 0.2; // 20%
    const STAKING_BONUS = 0.3; // 30%

    const calculateDaily = () => {
        let reward = BASE_REWARD;
        if (isMaster) reward *= MASTER_MULTIPLIER;
        if (hasMedia) reward *= (1 + MEDIA_BONUS);
        if (isStaking) reward *= (1 + STAKING_BONUS);
        return (reward * count).toFixed(1);
    };

    const calculateMonthly = () => {
        return (Number(calculateDaily()) * 30).toLocaleString();
    };

    return (
        <div className="carbon-panel p-6 sm:p-10 rounded-[2.5rem] relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black italic tracking-tighter text-white mb-2 uppercase">Mining Simulator</h3>
                        <p className="text-slate-400 text-sm">기록이 곧 자산이 되는 정직한 마이닝 수익을 확인하세요.</p>
                    </div>
                    <div className={`
                        px-4 py-2 rounded-xl border font-black italic text-xs uppercase transition-all
                        ${isMaster ? 'bg-neon-green/10 border-neon-green/30 text-neon-green neon-glow-text' : 'bg-white/5 border-white/10 text-slate-500'}
                    `}>
                        {isMaster ? 'Master Grade (x2.0)' : 'Normal Grade'}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Controls */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">일일 평균 기록 건수</label>
                                <span className="text-3xl font-black italic text-neon-green neon-glow-text">{count}건</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-green"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button
                                onClick={() => setIsMaster(!isMaster)}
                                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${isMaster ? 'bg-neon-green/10 border-neon-green/40' : 'bg-white/5 border-white/10 opacity-50'}`}
                            >
                                <Award size={20} className={isMaster ? 'text-neon-green' : 'text-white'} />
                                <span className="text-[10px] font-black uppercase italic">Master</span>
                            </button>
                            <button
                                onClick={() => setHasMedia(!hasMedia)}
                                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${hasMedia ? 'bg-neon-green/10 border-neon-green/40' : 'bg-white/5 border-white/10 opacity-50'}`}
                            >
                                <ImageIcon size={20} className={hasMedia ? 'text-neon-green' : 'text-white'} />
                                <span className="text-[10px] font-black uppercase italic">Media +{MEDIA_BONUS}x</span>
                            </button>
                            <button
                                onClick={() => setIsStaking(!isStaking)}
                                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${isStaking ? 'bg-neon-green/10 border-neon-green/40' : 'bg-white/5 border-white/10 opacity-50'}`}
                            >
                                <Zap size={20} className={isStaking ? 'text-neon-green' : 'text-white'} />
                                <span className="text-[10px] font-black uppercase italic">Staking +{STAKING_BONUS}x</span>
                            </button>
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 relative overflow-hidden flex flex-col justify-center items-center text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent pointer-events-none" />
                        <TrendingUp className="text-neon-green mb-6 animate-pulse-neon" size={48} />

                        <div className="space-y-1">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500 italic">Estimated Monthly Revenue</span>
                            <div className="text-6xl sm:text-7xl font-black italic text-white tracking-tighter block">
                                <motion.span
                                    key={calculateMonthly()}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-block"
                                >
                                    {calculateMonthly()}
                                </motion.span>
                                <span className="text-2xl text-neon-green ml-2 uppercase italic font-black">OZC</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 w-full flex justify-around text-xs font-black uppercase italic tracking-widest text-slate-400">
                            <div>Daily: <span className="text-white ml-1">{calculateDaily()} OZC</span></div>
                            <div>Bonus: <span className="text-neon-green ml-1">Active</span></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-600/5 border border-blue-600/10 rounded-2xl">
                    <Info size={16} className="text-blue-400 shrink-0" />
                    <p className="text-[10px] sm:text-xs text-blue-300 leading-relaxed font-medium">
                        * 위 수익은 시뮬레이션 결과이며, 실제 마이닝 보상은 데이터의 정확도와 커뮤니티 평판 점수에 따라 변동될 수 있습니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
