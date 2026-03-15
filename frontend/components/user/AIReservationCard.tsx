"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Wrench, Check, ArrowRight, ShieldCheck, Cpu, CreditCard, Lock, Zap, Star, AlertTriangle } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { motion, AnimatePresence } from 'framer-motion';

interface AIRecommendation {
    part: string;
    urgency: 'GOOD' | 'CAUTION' | 'URGENT';
    recommendedShop: {
        id: string;
        name: string;
        distance: number;
        location: string;
        rating: number;
        isMaster?: boolean;
    };
    availableTime: string;
}

export default function AIReservationCard({ aiRecommendation }: { aiRecommendation: AIRecommendation }) {
    const { part, urgency, recommendedShop, availableTime } = aiRecommendation;
    const { t } = useI18n();
    const [step, setStep] = useState<'info' | 'payment' | 'success'>(urgency === 'URGENT' ? 'payment' : 'info');
    
    const handleOneTouchBooking = () => {
        setStep('payment');
    };

    // Wagmi Hook 시뮬레이션 (실제 구현 시 import { useContractWrite } from 'wagmi' 활용)
    const simulatePayment = async () => {
        console.log("Initiating OZC Transaction via Wagmi...");
        // const { write } = useContractWrite({ ...config });
        await new Promise(r => setTimeout(r, 1500));
        setStep('success');
    };

    return (
        <div className={`rounded-[3rem] p-8 md:p-10 border relative group transition-all shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between ${
            urgency === 'URGENT' ? 'bg-[#1a0a0c] border-rose-500/30' : 'bg-[#141417] border-white/5'
        }`}>
            {/* Background Neural Grid / Siren for Urgent */}
            <div className={`absolute top-0 left-0 right-0 h-2 ${urgency === 'URGENT' ? 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.6)] animate-pulse' : 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]'}`} />
            
            <AnimatePresence mode="wait">
                {step === 'info' && (
                    <motion.div 
                        key="info"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative z-10"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3 text-blue-400">
                                <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20 shadow-inner">
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('comp_ai_guardian')}</span>
                            </div>
                            <div className="px-5 py-2 bg-black/40 rounded-full border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                Match Reliability: 99.2%
                            </div>
                        </div>

                        <h3 className="text-3xl font-black italic text-white mb-3 tracking-tighter leading-tight uppercase">
                            {t('comp_ai_urgent_title').replace('{part}', part)}
                        </h3>
                        <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed uppercase">
                            {t('comp_ai_analysis_desc')}
                        </p>

                        <div className="bg-black/40 rounded-[2.5rem] p-8 mb-10 border border-white/5 group-hover:bg-black/60 transition-colors">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{t('comp_shop_recommend')}</p>
                                        {recommendedShop.isMaster && (
                                            <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black px-2 py-0.5 rounded border border-amber-500/20 tracking-tighter uppercase">Master Center</span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-black italic text-white tracking-tighter group-hover:text-blue-400 transition-colors">
                                        {recommendedShop.name} 
                                        <span className="text-amber-500 ml-3 flex items-center gap-1 inline-flex text-sm not-italic align-middle">
                                            <Star size={14} className="fill-current" /> {recommendedShop.rating}
                                        </span>
                                    </p>
                                </div>
                                <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-black text-slate-400">
                                    {recommendedShop.distance}KM
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    {availableTime}
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    {recommendedShop.location}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleOneTouchBooking}
                            className="w-full py-6 bg-blue-600 text-white rounded-[1.8rem] font-black italic tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-blue-500 group/btn"
                        >
                            {t('comp_one_touch_booking')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {step === 'payment' && (
                    <motion.div 
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative z-10 flex flex-col h-full"
                    >
                        <div className={`flex items-center gap-3 mb-10 ${urgency === 'URGENT' ? 'text-rose-500' : 'text-amber-500'}`}>
                            {urgency === 'URGENT' ? <AlertTriangle className="w-6 h-6 animate-pulse" /> : <CreditCard className="w-6 h-6" />}
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                                {urgency === 'URGENT' ? 'Emergency Dispatch' : 'Secure Deposit'}
                            </h3>
                        </div>

                        <div className="space-y-6 mb-12">
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex justify-between items-center">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Base Deposit</span>
                                <span className="text-xl font-black italic text-white tracking-tighter">5.00 OZC</span>
                            </div>
                            {urgency === 'URGENT' ? (
                                <div className="bg-rose-500/10 p-6 rounded-3xl border border-rose-500/20 flex justify-between items-center">
                                    <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Priority Surcharge</span>
                                    <span className="text-xl font-black italic text-rose-500 tracking-tighter">+1.50 OZC</span>
                                </div>
                            ) : (
                                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex justify-between items-center">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Loyalty Discount</span>
                                    <span className="text-xl font-black italic text-emerald-400 tracking-tighter">-0.50 OZC</span>
                                </div>
                            )}
                            <div className={`p-8 bg-black/40 rounded-[2rem] border flex flex-col items-center gap-4 relative overflow-hidden ${
                                urgency === 'URGENT' ? 'border-rose-500/30' : 'border-blue-500/20'
                            }`}>
                                <div className={`absolute inset-0 blur-3xl rounded-full ${urgency === 'URGENT' ? 'bg-rose-500/10' : 'bg-blue-500/5'}`}></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] relative z-10">Total Required</span>
                                <span className="text-5xl font-black italic text-white tracking-tighter relative z-10">
                                    {urgency === 'URGENT' ? '6.50' : '4.50'} <span className={`${urgency === 'URGENT' ? 'text-rose-500' : 'text-blue-500'} text-2xl`}>OZC</span>
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={simulatePayment}
                                className={`w-full py-6 text-white rounded-[1.8rem] font-black italic tracking-[0.2em] text-[11px] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${
                                    urgency === 'URGENT' ? 'bg-rose-600 hover:bg-rose-500 animate-pulse' : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                                }`}
                            >
                                <Lock size={16} />
                                Confirm with Wallet
                            </button>
                            <button
                                onClick={() => setStep('info')}
                                className="w-full py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Cancel Transaction
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div 
                        key="success"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-10 flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                            <ShieldCheck size={48} className="animate-pulse" />
                        </div>
                        <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-4">Reservation Locked</h3>
                        <p className="text-sm text-slate-500 font-medium uppercase tracking-[0.2em] mb-10">
                            Neural Node <span className="text-blue-500">#{recommendedShop.id.slice(0,4)}</span> Synchronized.
                        </p>
                        <div className="bg-white/5 px-8 py-5 rounded-2xl border border-white/5 flex items-center gap-3">
                            <Zap size={14} className="text-amber-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Receipt generated in My Garage</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="text-center text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-8 opacity-40">
                {t('comp_booking_notice')}
            </p>
        </div>
    );
}
