// components/user/DynamicInsuranceCard.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingDown, Activity, ArrowRight, Zap } from 'lucide-react';

interface InsuranceProps {
    basePremium: number;
    healthScore: number;
    drivingBehavior: 'SAFE' | 'NORMAL' | 'AGGRESSIVE';
}

export default function DynamicInsuranceCard({ basePremium = 120000, healthScore = 98, drivingBehavior = 'SAFE' }: InsuranceProps) {
    const [discount, setDiscount] = useState(0);
    const [currentPremium, setCurrentPremium] = useState(basePremium);

    useEffect(() => {
        // AI Logic: Health Score adds up to 25% discount, SAFE driving adds 15%
        let totalDiscount = 0;
        if (healthScore > 90) totalDiscount += (healthScore - 90) * 1.5 + 10;
        if (drivingBehavior === 'SAFE') totalDiscount += 15;

        setDiscount(totalDiscount);
        setCurrentPremium(basePremium * (1 - totalDiscount / 100));
    }, [healthScore, drivingBehavior, basePremium]);

    return (
        <div className="bg-[#0052FF] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 opacity-50"></div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
                <header className="flex justify-between items-start mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-blue-200 fill-blue-200" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">AI-Driven Fintech</span>
                        </div>
                        <h3 className="text-2xl font-black">Dynamic Insurance</h3>
                    </div>
                    <ShieldCheck className="w-12 h-12 text-white/40" />
                </header>

                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                        <p className="text-[10px] font-black text-blue-200 uppercase mb-1">Current Monthly Premium</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black italic">₩{Math.floor(currentPremium).toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-green-300 font-bold mt-2 flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" />
                            AI DISCOUNT {discount.toFixed(1)}% APPLIED
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <p className="text-[9px] font-black text-blue-100 uppercase mb-3 text-center">Health & behavior Index</p>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="opacity-60 flex items-center gap-1"><Activity className="w-3 h-3" /> SDV Health</span>
                                <span className="font-black text-blue-200">{healthScore}%</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                <div className="bg-blue-300 h-full" style={{ width: `${healthScore}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="opacity-60">Driving Style</span>
                                <span className="font-black text-green-300">{drivingBehavior}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-[11px] leading-relaxed opacity-80 italic">
                        "Your maintenance logs are AI-verified. High integrity repairs have saved you ₩15,400 this month."
                    </div>
                    <button className="w-full py-4 bg-white text-[#0052FF] rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:bg-slate-50 transition-colors">
                        Insurance Details <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
