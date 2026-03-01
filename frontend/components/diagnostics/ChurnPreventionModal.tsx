import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

interface ChurnPreventionModalProps {
    isOpen: boolean;
    userStats: { months: number; dataCount: string; points: string };
    onKeep: () => void;
    onConfirmCancel: () => void;
    onClose: () => void; // Standard close without decision
}

export default function ChurnPreventionModal({ isOpen, userStats, onKeep, onConfirmCancel, onClose }: ChurnPreventionModalProps) {
    const { t } = useI18n();
    const [step, setStep] = useState(1);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            >
                <div className="w-full max-w-md p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center shadow-2xl relative overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-[50px] rounded-full point-events-none"></div>

                    {step === 1 && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-20 h-20 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center mb-6 border border-amber-500/30">
                                <span className="text-3xl">⚠️</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{t('churn_modal_title_step1')}</h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {t('churn_modal_desc_step1')
                                    .replace('{months}', userStats.months.toString())
                                    .replace('{dataCount}', userStats.dataCount)
                                    .replace('{points}', userStats.points)
                                    .split(userStats.dataCount).reduce((prev, current, i) => [
                                        ...prev,
                                        <span key={`data-${i}`} className="text-blue-400 font-bold">{userStats.dataCount}</span>,
                                        <span key={`current-${i}`}>{current}</span>
                                    ], [] as any[])
                                    // Notice: simple replace doesn't style the dynamic parts perfectly. Let's do a better replace logic below.
                                }
                            </p>
                            <button
                                onClick={() => {
                                    onKeep();
                                    onClose();
                                }}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mb-3 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
                            >
                                {t('churn_modal_keep_btn')}
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-4 bg-transparent text-slate-500 font-medium hover:text-slate-300 transition-colors"
                            >
                                {t('churn_modal_cancel_btn')}
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                                {t('churn_modal_title_step2')}
                            </h3>
                            <div className="p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl mb-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                <p className="text-blue-400 font-semibold mb-1">{t('churn_modal_offer_title')}</p>
                                <p className="text-white text-lg font-bold">{t('churn_modal_offer_highlight')}</p>
                            </div>
                            <p className="text-slate-400 text-sm mb-6">
                                {t('churn_modal_offer_desc')}
                            </p>
                            <button
                                onClick={() => {
                                    onKeep();
                                    onClose();
                                }}
                                className="w-full py-4 bg-white text-blue-900 font-extrabold rounded-xl mb-3 shadow-xl hover:bg-blue-50 transition-colors"
                            >
                                {t('churn_modal_keep_offer_btn')}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirmCancel();
                                    onClose();
                                }}
                                className="w-full py-4 text-slate-600 text-sm hover:text-slate-400 transition-colors"
                            >
                                {t('churn_modal_final_cancel_btn')}
                            </button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
