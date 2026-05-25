import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wrench, Calendar, CreditCard, ChevronRight, Zap, TrendingUp, Info, Wallet } from 'lucide-react';
import { AssetValueService, ValuationMetric } from '@/services/valuation/AssetValueService';
import { CarManagerService, CarAlert } from '@/services/ai/CarManagerService';
import { RewardService } from '@/services/rewards/RewardService';
import ServiceBookingModal from '@/components/user/ServiceBookingModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function TotalCareDashboard({ carName = "Tesla Model 3", healthScore = 98 }) {
    const [valuation, setValuation] = useState<ValuationMetric | null>(null);
    const [alerts, setAlerts] = useState<CarAlert[]>([]);
    const [ozcBalance, setOzcBalance] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const [bookingState, setBookingState] = useState<{ isOpen: boolean; serviceName: string; price: number }>({
        isOpen: false,
        serviceName: "",
        price: 0
    });

    useEffect(() => {
        // Simulate Data Loading
        const loadData = async () => {
            const val = AssetValueService.calculateCurrentValue(carName, 25400, 12);
            const alr = await CarManagerService.getPersonalizedAlerts("KR-VIN-2026", 25400);
            const bal = await RewardService.getPendingBalance("0x07A5...81B66d");

            setValuation(val);
            setAlerts(alr);
            setOzcBalance(bal);
            setIsLoaded(true);
        };
        loadData();
    }, [carName]);

    const openBooking = (alert: CarAlert) => {
        setBookingState({
            isOpen: true,
            serviceName: alert.title,
            price: alert.type === 'MAINTENANCE' ? 120000 : 50000
        });
    };

    return (
        <div className="bg-[#F8FAFC] min-h-screen p-6 font-sans text-slate-900">
            <div className="max-w-md mx-auto space-y-6">

                {/* 1. Premium Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/10 border border-slate-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                        <ShieldCheck size={180} className="text-blue-600" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-3xl font-black tracking-tight">{carName}</h2>
                            <div className="bg-blue-600 p-2 rounded-2xl shadow-lg shadow-blue-500/40">
                                <Zap className="text-white w-5 h-5 fill-current" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Care Level: Master</span>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                건강 점수: {healthScore}점
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <NavButton icon={<Wrench size={20} />} label="정비 예약" active />
                            <NavButton icon={<Calendar size={20} />} label="케어 일정" />
                        </div>
                    </div>
                </motion.div>

                {/* 1.1 Rewards Balance (OZC) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black opacity-70 uppercase tracking-widest">OZC Rewards</p>
                            <p className="text-xl font-black">{ozcBalance.toFixed(2)} OZC</p>
                        </div>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-colors">
                        Swap
                    </button>
                </motion.div>

                {/* 2. Asset Value (Smart Wallet) Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[2rem] p-6 flex justify-between items-center border border-slate-100 shadow-sm"
                >
                    <div>
                        <div className="flex items-center gap-1.5 mb-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Asset Value</p>
                            <Info size={10} className="text-slate-300" />
                        </div>
                        <p className="text-2xl font-black text-slate-900">
                            {valuation ? AssetValueService.formatCurrency(valuation.estimatedValue) : '₩0'}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-emerald-600 font-bold text-sm">
                            <TrendingUp size={14} />
                            <span>+ {valuation ? AssetValueService.formatCurrency(valuation.valueChange) : '₩0'}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">정비 이력 반영됨</p>
                    </div>
                </motion.div>

                {/* 3. Personalized Alerts Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-lg font-black text-slate-900">오늘의 맞춤 케어</h3>
                        <button className="text-xs font-bold text-blue-600 flex items-center">전체보기 <ChevronRight size={14} /></button>
                    </div>

                    <AnimatePresence>
                        {alerts.map((alert, idx) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                className={`rounded-[2rem] p-6 shadow-xl relative overflow-hidden ${alert.severity === 'HIGH'
                                    ? 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white'
                                    : 'bg-white border border-slate-100 text-slate-900'
                                    }`}
                            >
                                {alert.severity === 'HIGH' && (
                                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                                )}

                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${alert.severity === 'HIGH' ? 'opacity-70' : 'text-blue-600'}`}>
                                            {alert.type} Service
                                        </p>
                                        <h4 className="text-xl font-black leading-tight">{alert.title}</h4>
                                    </div>
                                    {alert.severity !== 'HIGH' && (
                                        <div className="bg-slate-50 p-2 rounded-xl">
                                            <Zap size={16} className="text-indigo-500" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-end gap-4">
                                    <p className={`text-xs leading-relaxed font-medium ${alert.severity === 'HIGH' ? 'opacity-90' : 'text-slate-500'}`}>
                                        {alert.description}
                                    </p>
                                    <button
                                        onClick={() => openBooking(alert)}
                                        className={`shrink-0 px-5 py-2.5 rounded-2xl text-xs font-black transition-transform active:scale-95 shadow-lg ${alert.severity === 'HIGH'
                                            ? 'bg-white text-blue-600 shadow-blue-900/20'
                                            : 'bg-indigo-600 text-white shadow-indigo-200'
                                            }`}>
                                        {alert.actionLabel}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* 4. Quick Triage Banner */}
                <button
                    onClick={() => setBookingState({ isOpen: true, serviceName: "긴급 현장 출동", price: 50000 })}
                    className="w-full bg-slate-900 rounded-[2rem] p-6 text-white flex items-center justify-between border border-white/5 hover:bg-slate-800 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                            <Zap size={24} className="text-amber-400 fill-current" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black">현장 긴급 출동</p>
                            <p className="text-[10px] text-slate-400">가까운 마스터 정비사 매칭</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-500" />
                </button>

            </div>

            {/* Booking Modal Integration */}
            <ServiceBookingModal
                isOpen={bookingState.isOpen}
                onClose={() => setBookingState({ ...bookingState, isOpen: false })}
                serviceName={bookingState.serviceName}
                estimatedPrice={bookingState.price}
            />
        </div>
    );
}

function NavButton({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`flex flex-col items-center p-5 rounded-[2rem] transition-all border ${active
            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-200'
            : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:shadow-md'
            }`}>
            <div className="mb-2">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
        </button>
    );
}
