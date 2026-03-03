"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Coins,
    Image as ImageIcon,
    BarChart3,
    ShieldCheck,
    ChevronRight,
    Flame
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export const MiningSimulator = () => {
    const { t } = useI18n();
    const [dailyRecords, setDailyRecords] = useState(5);
    const [useHighRes, setUseHighRes] = useState(true);
    const [isStaking, setIsStaking] = useState(true);
    const [estimatedReward, setEstimatedReward] = useState(0);

    // Multipliers based on strategy doc
    const BASE_REWARD_PER_RECORD = 12.5; // OZC
    const HIGH_RES_MULTIPLIER = 1.2;
    const STAKING_MULTIPLIER = 1.3;
    const RANK_MULTIPLIER = 2.0; // Master Tier assumed for tech

    useEffect(() => {
        let reward = dailyRecords * BASE_REWARD_PER_RECORD * 30; // Monthly base
        if (useHighRes) reward *= HIGH_RES_MULTIPLIER;
        if (isStaking) reward *= STAKING_MULTIPLIER;
        reward *= RANK_MULTIPLIER;
        setEstimatedReward(Math.round(reward));
    }, [dailyRecords, useHighRes, isStaking]);

    return (
        <div className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffc2]/5 blur-[80px] -mr-32 -mt-32 group-hover:bg-[#00ffc2]/10 transition-colors duration-500" />

            <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Flame size={16} className="text-[#00ffc2] animate-pulse" />
                            <span className="text-[10px] font-black text-[#00ffc2] uppercase tracking-[0.2em]">Live Simulation</span>
                        </div>
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">
                            {t('sim_mining_title')}
                        </h2>
                        <p className="text-slate-500 text-xs font-medium max-w-md">
                            {t('sim_mining_desc')}
                        </p>
                    </div>
                    <div className="bg-[#00ffc2]/10 border border-[#00ffc2]/20 px-4 py-2 rounded-xl">
                        <span className="text-[10px] font-black text-[#00ffc2] uppercase tracking-widest block mb-1">Rank</span>
                        <span className="text-xs font-black text-white italic uppercase">Master (x2.0)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        {/* Daily Records Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <BarChart3 size={14} /> {t('sim_mining_daily_records')}
                                </label>
                                <span className="text-2xl font-black text-white italic tracking-tighter">{dailyRecords} 건</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={dailyRecords}
                                onChange={(e) => setDailyRecords(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#00ffc2]"
                            />
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => setUseHighRes(!useHighRes)}
                                className={`p-4 rounded-2xl border transition-all flex items-center justify-between group/opt ${useHighRes
                                        ? 'bg-[#00ffc2]/5 border-[#00ffc2]/30 text-[#00ffc2]'
                                        : 'bg-white/5 border-white/5 text-slate-500'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <ImageIcon size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('sim_mining_high_res_media')}</span>
                                </div>
                                <ShieldCheck size={16} className={useHighRes ? 'opacity-100' : 'opacity-0'} />
                            </button>

                            <button
                                onClick={() => setIsStaking(!isStaking)}
                                className={`p-4 rounded-2xl border transition-all flex items-center justify-between group/opt ${isStaking
                                        ? 'bg-blue-500/5 border-blue-500/30 text-blue-400'
                                        : 'bg-white/5 border-white/5 text-slate-500'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Coins size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-left leading-tight">{t('sim_mining_staking_bonus')}</span>
                                </div>
                                <ShieldCheck size={16} className={isStaking ? 'opacity-100' : 'opacity-0'} />
                            </button>
                        </div>
                    </div>

                    {/* Reward Calculation View */}
                    <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group/calc">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffc2]/5 to-transparent pointer-events-none" />

                        <Zap size={32} className="text-[#00ffc2] mb-6 drop-shadow-[0_0_15px_rgba(0,255,194,0.5)]" />

                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                            {t('sim_mining_est_monthly')}
                        </p>

                        <div className="text-6xl font-black italic text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            {estimatedReward.toLocaleString()} <span className="text-xl not-italic text-[#00ffc2]">OZC</span>
                        </div>

                        <button className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest italic text-xs hover:bg-[#00ffc2] transition-colors flex items-center justify-center gap-3">
                            {t('sim_mining_cta')}
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
