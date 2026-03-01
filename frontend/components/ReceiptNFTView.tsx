"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Share2, ArrowRight } from 'lucide-react';

interface OrderData {
    orderId: string;
    carModel: string;
    price: string;
    txHash: string;
}

interface ReceiptNFTViewProps {
    orderData: OrderData;
}

export default function ReceiptNFTView({ orderData }: ReceiptNFTViewProps) {
    const [step, setStep] = useState(1); // 1: 확인 중, 2: 발행 중, 3: 완료

    useEffect(() => {
        // 실제 환경에서는 실시간 상태 업데이트에 따라 구동됩니다.
        const timer1 = setTimeout(() => setStep(2), 3000);
        const timer2 = setTimeout(() => setStep(3), 6000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-[#F8FAFC]">
            <AnimatePresence mode="wait">
                {step < 3 ? (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <Loader2 className="w-full h-full text-blue-600 animate-spin opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-black text-blue-600">{step === 1 ? '75%' : '99%'}</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">
                            {step === 1 ? '결제 무결성 검증 중...' : '영수증 NFT 발행 중...'}
                        </h2>
                        <p className="text-slate-500 font-medium">블록체인 네트워크에 데이터를 기록하고 있습니다.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md"
                    >
                        {/* --- NFT 디지털 카드 --- */}
                        <div className="relative group perspective-1000">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-white relative overflow-hidden transition-transform duration-500 hover:rotate-y-12">
                                {/* 배경 장식 */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                                <div className="flex justify-between items-start mb-12">
                                    <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                                        Genesis Transaction
                                    </div>
                                    <CheckCircle className="text-green-500 w-6 h-6" />
                                </div>

                                <div className="space-y-6 mb-12">
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase mb-1">Vehicle Model</p>
                                        <h3 className="text-2xl font-black text-slate-900">{orderData.carModel}</h3>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-slate-400 text-xs font-bold uppercase mb-1">Price</p>
                                            <p className="text-lg font-bold text-slate-900">{orderData.price} USDC</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-xs font-bold uppercase mb-1">Tx Hash</p>
                                            <p className="text-xs font-mono text-blue-600 truncate w-24">
                                                <a href={`https://polygonscan.com/tx/${orderData.txHash}`} target="_blank" rel="noopener noreferrer">
                                                    {orderData.txHash}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <p className="text-[10px] font-mono text-slate-400">ID: {orderData.orderId}</p>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                                            <Share2 className="w-4 h-4 text-slate-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- 하단 상태 안내 --- */}
                        <div className="mt-10 space-y-4">
                            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-slate-200 flex items-center gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">소유권 이전 대기 중</p>
                                    <p className="text-xs text-slate-500 font-medium">관리자가 서류를 검토 중입니다. (예상 24시간 내 완료)</p>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all group">
                                내 차고로 이동하기
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
