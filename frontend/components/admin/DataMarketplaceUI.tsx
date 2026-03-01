"use client";

import React, { useState, useEffect } from 'react';
import { PricingEngine, PricingFactors } from '@/services/PricingEngine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, CheckCircle, ShieldCheck, DollarSign, ArrowRight, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DataPack {
    id: string;
    title: string;
    type: 'SAFETY' | 'BATTERY' | 'TRAFFIC';
    records: number;
    sizeKb: number;
    baseFactors: PricingFactors;
}

import { useI18n } from '@/hooks/useI18n';

export default function DataMarketplaceUI() {
    const { t } = useI18n();
    const [availablePacks, setAvailablePacks] = useState<DataPack[]>([
        {
            id: 'dp-001',
            title: 'January Safe Driving Proof',
            type: 'SAFETY',
            records: 25400,
            sizeKb: 1250,
            baseFactors: { reliability: 1.0, scarcity: 1.5, fidelity: 0.9, demand: 2.0 }
        },
        {
            id: 'dp-002',
            title: 'Winter EV Battery Performance',
            type: 'BATTERY',
            records: 12000,
            sizeKb: 800,
            baseFactors: { reliability: 1.0, scarcity: 3.2, fidelity: 1.0, demand: 1.8 }
        }
    ]);

    const [sellingId, setSellingId] = useState<string | null>(null);
    const [soldPacks, setSoldPacks] = useState<string[]>([]);

    const handleSell = (id: string) => {
        setSellingId(id);
        setTimeout(() => {
            setSoldPacks(prev => [...prev, id]);
            setSellingId(null);
        }, 2500);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-100 tracking-tight">{t('market_data_title')}</h2>
                    <p className="text-slate-400 text-sm font-medium">{t('market_data_desc')}</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 font-black shadow-lg shadow-emerald-500/10">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> {t('market_data_seller')}
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <AnimatePresence>
                    {availablePacks.map((pack) => {
                        const isSold = soldPacks.includes(pack.id);
                        const isSelling = sellingId === pack.id;
                        const value = PricingEngine.calculateValue(pack.records, pack.sizeKb, pack.baseFactors);

                        return (
                            <motion.div
                                key={pack.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <Card className={`relative overflow-hidden border-slate-800 transition-all duration-500 group ${isSold ? 'bg-slate-900/40 opacity-60 grayscale' : 'bg-slate-950 shadow-2xl hover:border-indigo-500/30'}`}>
                                    {isSelling && (
                                        <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md z-10 flex flex-col items-center justify-center text-white p-6 text-center">
                                            <div className="relative w-16 h-16 mb-6">
                                                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
                                                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-400 animate-spin"></div>
                                            </div>
                                            <p className="font-black text-lg tracking-tight mb-2">{t('market_data_generating_zkp')}</p>
                                            <p className="text-indigo-300/60 text-xs font-bold uppercase tracking-widest">{t('market_data_selling')}</p>
                                        </div>
                                    )}

                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className={`px-2 py-0.5 font-black text-[10px] ${pack.type === 'SAFETY' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                                                    pack.type === 'BATTERY' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                                                        'text-blue-400 border-blue-500/20 bg-blue-500/5'
                                                    }`}>
                                                    {pack.type}
                                                </Badge>
                                                <span className="text-[10px] font-mono text-slate-600 font-bold tracking-widest leading-none mt-0.5 italic">ID: {pack.id}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-baseline justify-end gap-1">
                                                    <span className="text-xs font-bold text-slate-500">$</span>
                                                    <p className="text-3xl font-black text-slate-100 tracking-tighter">{value.toFixed(2)}</p>
                                                </div>
                                                <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mt-1">{t('market_data_value')}</p>
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl font-black text-slate-100 mt-4 leading-tight group-hover:text-indigo-400 transition-colors">
                                            {pack.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-3 gap-3 text-center">
                                            <div className="p-3 bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border border-slate-800/50 group-hover:border-slate-800 transition-colors">
                                                <span className="text-[9px] uppercase font-black text-slate-600 tracking-widest mb-1.5">{t('market_data_records')}</span>
                                                <span className="text-sm font-black text-slate-300 font-mono tracking-tighter">{pack.records.toLocaleString()}</span>
                                            </div>
                                            <div className="p-3 bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border border-slate-800/50 group-hover:border-slate-800 transition-colors">
                                                <span className="text-[9px] uppercase font-black text-slate-600 tracking-widest mb-1.5">{t('market_data_reliability')}</span>
                                                <span className="text-sm font-black text-emerald-500 font-mono tracking-tighter">100%</span>
                                            </div>
                                            <div className="p-3 bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border border-slate-800/50 group-hover:border-slate-800 transition-colors">
                                                <span className="text-[9px] uppercase font-black text-slate-600 tracking-widest mb-1.5">{t('market_data_scarcity')}</span>
                                                <span className="text-sm font-black text-amber-500 font-mono tracking-tighter">x{pack.baseFactors.scarcity}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                <Lock className="w-3.5 h-3.5 text-slate-600" />
                                                <span className="opacity-80">{t('market_data_signed_sealed')}</span>
                                            </div>
                                            {isSold ? (
                                                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-1 font-black text-xs">
                                                    <CheckCircle className="w-3.5 h-3.5 mr-2" /> {t('market_data_sold')}
                                                </Badge>
                                            ) : (
                                                <Button
                                                    onClick={() => handleSell(pack.id)}
                                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs px-6 shadow-xl shadow-indigo-600/20 transition-all active:scale-95 group-hover:px-8"
                                                >
                                                    <ShoppingBag className="w-3.5 h-3.5 mr-2" /> {t('market_data_sell_btn')}
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>

                                    {/* Glass reflection effect */}
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
