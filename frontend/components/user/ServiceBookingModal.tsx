import React, { useState } from 'react';
import { X, CreditCard, Zap, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { PaymentBridge } from '@/services/blockchain/PaymentBridge';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;
    estimatedPrice: number;
}

export default function ServiceBookingModal({ isOpen, onClose, serviceName, estimatedPrice }: BookingModalProps) {
    const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'COMPLETE'>('DETAILS');
    const [payMethod, setPayMethod] = useState<'STRIPE' | 'OZC'>('STRIPE');

    const handlePayment = async () => {
        const result = await PaymentBridge.processPayment(estimatedPrice, payMethod);
        if (result.success) {
            setStep('COMPLETE');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden relative"
            >
                <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={20} />
                </button>

                <div className="p-10">
                    <AnimatePresence mode="wait">
                        {step === 'DETAILS' && (
                            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 className="text-3xl font-black mb-2">{serviceName}</h2>
                                <p className="text-slate-500 text-sm mb-8">마스터 정비사가 고객님의 계신 곳으로 찾아갑니다.</p>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                            <Star className="text-amber-400 fill-current" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black">정비장인 김오즈 마스터</p>
                                            <p className="text-[10px] text-slate-400">평점 4.9 | 완료 1,250건</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex justify-between items-center">
                                        <span className="text-xs font-bold text-blue-600">예상 결제 금액</span>
                                        <span className="text-xl font-black text-blue-600">₩{estimatedPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button onClick={() => setStep('PAYMENT')} className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                                    결제 단계로 이동 <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 'PAYMENT' && (
                            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 className="text-3xl font-black mb-8">결제 방식 선택</h2>

                                <div className="space-y-4 mb-10">
                                    <PaymentOption
                                        isActive={payMethod === 'STRIPE'}
                                        onClick={() => setPayMethod('STRIPE')}
                                        icon={<CreditCard className="text-blue-600" />}
                                        title="신용카드 / Stripe"
                                        desc="현대, 비씨, 삼성 등 모든 카드 지원"
                                    />
                                    <PaymentOption
                                        isActive={payMethod === 'OZC'}
                                        onClick={() => setPayMethod('OZC')}
                                        icon={<Zap className="text-indigo-600" />}
                                        title="OZC 토큰 결제"
                                        desc="현재 보유: 125.50 OZC"
                                        tag="5% 할인"
                                    />
                                </div>

                                <button onClick={handlePayment} className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                                    {payMethod === 'OZC' ? '토탈케어 토큰 승인 및 결제' : '카드 결제하기'}
                                </button>
                                <button onClick={() => setStep('DETAILS')} className="w-full mt-4 text-xs font-bold text-slate-400">
                                    이전 단계로
                                </button>
                            </motion.div>
                        )}

                        {step === 'COMPLETE' && (
                            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                                    <CheckCircle2 size={48} className="text-emerald-500" />
                                </div>
                                <h2 className="text-3xl font-black mb-2">예약 완료!</h2>
                                <p className="text-slate-500 text-sm mb-10 leading-relaxed">
                                    정비사님이 지정하신 장소로<br />
                                    30분 이내에 도착할 예정입니다.
                                </p>
                                <button onClick={onClose} className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black text-sm">
                                    내 차 관리 현황 보기
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

function PaymentOption({ icon, title, desc, tag, isActive, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 p-5 rounded-[2rem] border transition-all text-left ${isActive ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-black">{title}</p>
                    {tag && <span className="text-[8px] font-black bg-indigo-600 text-white px-1.5 py-0.5 rounded-md">{tag}</span>}
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-blue-600 bg-blue-600' : 'border-slate-200'}`}>
                {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
            </div>
        </button>
    );
}
