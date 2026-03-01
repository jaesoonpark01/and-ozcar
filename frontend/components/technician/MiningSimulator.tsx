
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Coins, Award, Camera, ShieldCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BASE_REWARD = 10;
const OZC_PRICE_USD = 0.5; // Mock price

interface SimulationState {
    grade: "Bronze" | "Silver" | "Gold" | "Master";
    serviceCount: number;
    hasMedia: boolean;
    isVerified: boolean;
    isStaking: boolean;
}

const GRADE_MULTIPLIERS = {
    Bronze: 1.0,
    Silver: 1.2,
    Gold: 1.5,
    Master: 2.0,
};

export default function MiningSimulator() {
    const [state, setState] = useState<SimulationState>({
        grade: "Bronze",
        serviceCount: 10,
        hasMedia: true,
        isVerified: true,
        isStaking: false,
    });

    const [result, setResult] = useState({ token: 0, usd: 0, multiplier: 1.0 });

    useEffect(() => {
        calculate();
    }, [state]);

    const calculate = () => {
        let mult = GRADE_MULTIPLIERS[state.grade];
        if (state.hasMedia) mult += 0.2;
        if (state.isVerified) mult += 0.1;
        if (state.isStaking) mult += 0.3;

        const token = BASE_REWARD * mult * state.serviceCount;
        const usd = token * OZC_PRICE_USD;

        setResult({ token, usd, multiplier: mult });
    };

    return (
        <Card className="w-full max-w-4xl mx-auto border-blue-100 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-slate-900">
                            Technician Earnings Simulator
                        </CardTitle>
                        <CardDescription>
                            Estimate your monthly mining rewards based on activity and reputation.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-8">
                {/* Left: Controls */}
                <div className="space-y-8">
                    {/* Grade Selector */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-700 block">
                            1. Your Reputation Grade
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {(Object.keys(GRADE_MULTIPLIERS) as Array<keyof typeof GRADE_MULTIPLIERS>).map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setState({ ...state, grade: g })}
                                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${state.grade === g
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    {g}
                                    <div className="text-[10px] mt-1 opacity-80">
                                        x{GRADE_MULTIPLIERS[g]}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Service Count Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <label className="text-sm font-bold text-slate-700">
                                2. Monthly Services
                            </label>
                            <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs">
                                {state.serviceCount} Cars / Month
                            </span>
                        </div>
                        <Slider
                            value={[state.serviceCount]}
                            max={100}
                            step={1}
                            onValueChange={(val) => setState({ ...state, serviceCount: val[0] })}
                            className="py-4"
                        />
                    </div>

                    {/* Toggles */}
                    <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        <label className="text-sm font-bold text-slate-700 block mb-4">
                            3. Quality Bonuses
                        </label>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Media Upload</p>
                                    <p className="text-xs text-slate-500">Attach photos/videos (+0.2x)</p>
                                </div>
                            </div>
                            <Switch
                                checked={state.hasMedia}
                                onCheckedChange={(c) => setState({ ...state, hasMedia: c })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <ShieldCheck className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Verification</p>
                                    <p className="text-xs text-slate-500">Cross-check with govt data (+0.1x)</p>
                                </div>
                            </div>
                            <Switch
                                checked={state.isVerified}
                                onCheckedChange={(c) => setState({ ...state, isVerified: c })}
                            />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Coins className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Staking Bonus</p>
                                    <p className="text-xs text-slate-500">Hold &gt;1000 OZC (+0.3x)</p>
                                </div>
                            </div>
                            <Switch
                                checked={state.isStaking}
                                onCheckedChange={(c) => setState({ ...state, isStaking: c })}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Results Display */}
                <div className="flex flex-col justify-center h-full">
                    <motion.div
                        layout
                        className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        <div className="relative z-10 text-center space-y-2 mb-8">
                            <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                                Estimated Monthly Earnings
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                                    {result.token.toLocaleString()}
                                </h2>
                                <span className="text-2xl font-bold text-white">OZC</span>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                                <span className="text-emerald-400 text-sm font-bold">≈ ${result.usd.toLocaleString()} USD</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-slate-400 text-xs mb-1">Status Multiplier</p>
                                <p className="text-xl font-bold text-white">x{result.multiplier.toFixed(1)}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-slate-400 text-xs mb-1">Base Reward</p>
                                <p className="text-xl font-bold text-white">{BASE_REWARD * state.serviceCount} OZC</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 relative z-10 text-center">
                            <p className="text-sm text-slate-400 mb-4">
                                Unlock higher tiers to maximize your earnings.
                            </p>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-lg shadow-lg shadow-blue-900/50 transition-all hover:scale-[1.02]">
                                Start Mining Now <TrendingUp className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-400">
                            *Rewards are distributed automatically via Polygon Smart Contracts.
                            <br />
                            Actual rewards may vary based on market conditions.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
