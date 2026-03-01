import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface PremiumReportBlurProps {
    isSubscribed: boolean;
    onSubscribeClick: () => void;
}

export default function PremiumReportBlur({ isSubscribed, onSubscribeClick }: PremiumReportBlurProps) {
    const { t } = useI18n();

    return (
        <div className="relative w-full max-w-4xl p-6 mx-auto bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
            {/* 1. 공개 영역 (안전 점수) */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-slate-400 text-sm font-medium">{t('blur_report_title')}</h3>
                    <p className="text-4xl font-bold text-white mt-1">88<span className="text-lg text-slate-500 ml-1">점</span></p>
                </div>
                <div className="px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                    <span className="text-green-500 text-sm font-semibold">{t('blur_report_good')}</span>
                </div>
            </div>

            {/* 2. 유료 영역 (정밀 센서 분석 - 블러 처리) */}
            <div className="relative">
                <div className={`space-y-6 transition-all duration-700 ${!isSubscribed ? 'filter blur-xl opacity-40 select-none pointer-events-none' : ''}`}>
                    <div className="h-40 bg-slate-800 rounded-xl flex items-end p-4 gap-2">
                        {/* 가상의 그래프 막대들 */}
                        {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                            <div key={i} className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                            <p className="text-slate-500 text-xs">{t('blur_report_accel_noise')}</p>
                            <p className="text-xl font-bold text-white">0.024ms <span className="text-sm font-normal text-green-400">({t('blur_report_safe')})</span></p>
                        </div>
                        <div className="p-4 bg-slate-800 rounded-xl border border-amber-500/30">
                            <p className="text-slate-500 text-xs">{t('blur_report_brake_delay')}</p>
                            <p className="text-xl font-bold text-amber-500">+0.12s <span className="text-sm font-normal">({t('blur_report_warning')})</span></p>
                        </div>
                    </div>
                </div>

                {/* 3. 유도 레이어 (구독하지 않은 경우만 노출) */}
                {!isSubscribed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/40 backdrop-blur-sm rounded-xl"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0] }}
                            className="p-4 bg-blue-600 rounded-full mb-4 shadow-lg shadow-blue-500/30 cursor-pointer"
                            onClick={onSubscribeClick}
                        >
                            <Lock className="text-white w-8 h-8" />
                        </motion.div>
                        <h4 className="text-white text-xl font-bold mb-2">{t('blur_report_lock_title')}</h4>
                        <p className="text-slate-300 text-center text-sm mb-6 max-w-xs">
                            {t('blur_report_lock_desc')}
                        </p>
                        <button
                            onClick={onSubscribeClick}
                            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                        >
                            {t('blur_report_cta_btn')} <Zap className="w-4 h-4 fill-black" />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
