// components/marketplace/AIAuctionBidding.tsx
"use client";

import React, { useState } from 'react';
import { Gavel, TrendingUp, ShieldCheck, Timer, CreditCard } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface AuctionProps {
    vehicleName: string;
    currentBid: number;
    trustScore: number;
    endTime: string;
}

export default function AIAuctionBidding({ vehicleName, currentBid, trustScore, endTime }: AuctionProps) {
    const { t } = useI18n();
    const [bidAmount, setBidAmount] = useState(currentBid + 500);
    const [status, setStatus] = useState<'IDLE' | 'BIDDING' | 'SUCCESS'>('IDLE');

    const handleBid = () => {
        setStatus('BIDDING');
        setTimeout(() => setStatus('SUCCESS'), 2000);
    };

    return (
        <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl border border-white/5 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>

            <header className="flex justify-between items-center mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Gavel className="w-4 h-4 text-orange-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('auction_ai_certified')}</span>
                    </div>
                    <h3 className="text-2xl font-black">{vehicleName}</h3>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-black">AAA TRUST</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">{t('auction_reliability_score').replace('{score}', trustScore.toString())}</div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{t('auction_current_bid')}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white italic">{currentBid.toLocaleString()}</span>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">OZC</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">{t('auction_ends_in')}</p>
                        <div className="flex items-center gap-3 text-orange-400">
                            <Timer className="w-5 h-5 animate-pulse" />
                            <span className="text-xl font-black tracking-widest">{endTime}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-4 text-center">{t('auction_place_bid_title')}</p>
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(Number(e.target.value))}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-6 text-xl font-black text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500 uppercase">OZC</span>
                        </div>
                        <button
                            onClick={handleBid}
                            disabled={status !== 'IDLE'}
                            className={`w-full py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${status === 'SUCCESS' ? 'bg-green-600 text-white shadow-green-500/20' :
                                status === 'BIDDING' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                                    'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
                                }`}
                        >
                            {status === 'SUCCESS' ? <><ShieldCheck className="w-5 h-5" /> {t('auction_bid_success')}</> :
                                status === 'BIDDING' ? t('auction_processing') :
                                    <><Gavel className="w-5 h-5" /> {t('auction_place_bid_btn')}</>}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 p-5 bg-white/5 rounded-2xl border border-white/5">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-[11px] text-slate-400 leading-relaxed text-wrap">
                    {t('auction_dva_desc')}
                </p>
            </div>
        </div>
    );
}
