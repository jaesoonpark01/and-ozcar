"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    TrendingUp,
    ArrowUpRight,
    ArrowDownLeft,
    Zap,
    ShieldCheck,
    History,
    CreditCard,
    PieChart
} from "lucide-react";
import { motion } from "framer-motion";

import { useI18n } from '@/hooks/useI18n';

export default function OZPWalletUI() {
    const { t } = useI18n();
    const [balance, setBalance] = useState(12450.75); // OZP
    const [assetGrade, setAssetGrade] = useState<'Diamond' | 'Gold' | 'Silver'>('Diamond');

    const transactions = [
        { id: 1, type: 'EARN', amount: 45.5, label: t('hub_vault_earn') + ': Safe Drive Reward', date: 'Just now' },
        { id: 2, type: 'EARN', amount: 120.0, label: t('hub_vault_earn') + ': Data Sale: Winter Pack', date: '2h ago' },
        { id: 3, type: 'SPEND', amount: 25.0, label: t('hub_vault_spend') + ': ZKP Verification Fee', date: '5h ago' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-4">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter italic">ozcar <span className="text-emerald-500 font-normal">{t('hub_vault_title')}</span></h1>
                    <p className="text-slate-400 text-sm">{t('hub_vault_desc')}</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 font-mono uppercase tracking-widest text-[10px]">
                    <ShieldCheck className="w-3 h-3 mr-1" /> {t('hub_vault_secure')}
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Main Balance Card - Glassmorphism */}
                <Card className="md:col-span-12 bg-gradient-to-br from-indigo-900 via-slate-900 to-black border-slate-800 shadow-2xl relative overflow-hidden h-[240px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -ml-32 -mb-32"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                            <Wallet className="w-4 h-4" /> {t('hub_vault_total')}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-2">
                        <h2 className="text-6xl font-black text-white flex items-baseline gap-3">
                            {balance.toLocaleString()}
                            <span className="text-2xl font-normal text-emerald-400">OZP</span>
                        </h2>
                        <div className="flex items-center gap-2 text-slate-400">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="font-mono text-sm leading-none">≈ ${(balance * 0.12).toLocaleString()} USD</span>
                            <Badge variant="outline" className="text-[10px] text-emerald-500 py-0 h-4">+12.4% Today</Badge>
                        </div>

                        <div className="flex gap-4 pt-8">
                            <Button className="bg-white text-black hover:bg-slate-200 font-bold px-8">
                                <ArrowUpRight className="w-4 h-4 mr-2" /> {t('hub_vault_send')}
                            </Button>
                            <Button className="bg-slate-800 text-white hover:bg-slate-700 font-bold px-8">
                                <Zap className="w-4 h-4 mr-2" /> {t('hub_vault_swap')}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sub Cards */}
                <Card className="md:col-span-5 bg-slate-900/50 border-slate-800 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-slate-100 text-sm flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-purple-400" /> {t('hub_vault_health')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-400 uppercase">{t('hub_vault_grade')}</p>
                            <Badge className={`${assetGrade === 'Diamond' ? 'bg-indigo-500 text-white' :
                                assetGrade === 'Gold' ? 'bg-amber-500 text-black' :
                                    'bg-slate-500 text-white'
                                } font-black italic`}>
                                {assetGrade}
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-500">
                                <span>{t('hub_vault_integrity')}</span>
                                <span>100%</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    className="h-full bg-emerald-500"
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-indigo-400 border border-indigo-500/20 p-2 rounded bg-indigo-500/5 italic">
                            "{t('hub_vault_premium_note')}"
                        </p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-7 bg-slate-900/50 border-slate-800 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-slate-100 text-sm flex items-center gap-2">
                            <History className="w-4 h-4 text-blue-400" /> {t('hub_vault_activity')}
                        </CardTitle>
                        <Button variant="ghost" className="text-[10px] text-slate-500 h-6">{t('hub_vault_view_all')}</Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between border-b border-slate-800/50 pb-2 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-full ${tx.type === 'EARN' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                                        {tx.type === 'EARN' ? <ArrowDownLeft className="w-3 h-3 text-emerald-400" /> : <ArrowUpRight className="w-3 h-3 text-red-400" />}
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-200">{tx.label}</p>
                                        <p className="text-[9px] text-slate-500">{tx.date}</p>
                                    </div>
                                </div>
                                <p className={`text-[11px] font-mono font-bold ${tx.type === 'EARN' ? 'text-emerald-400' : 'text-slate-400'}`}>
                                    {tx.type === 'EARN' ? '+' : '-'}{tx.amount.toFixed(1)} OZP
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
