"use client";

import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Cpu, Battery, Download, Share2 } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function DataCertificate() {
    const { t, lang } = useI18n();
    const currentDate = new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden text-white flex flex-col h-full shadow-2xl relative">

            {/* 워터마크 배경 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                <ShieldCheck className="w-full h-full text-white rotate-12 scale-150" />
            </div>

            <div className="p-6 relative z-10">
                {/* 헤더 부분 */}
                <div className="border-b border-indigo-900/50 pb-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent mb-1">
                                {t('cert_title')}
                            </h2>
                            <p className="text-slate-400 text-xs tracking-wider uppercase font-mono">Certificate of Battery & Driving Data</p>
                        </div>
                        {/* 엠블럼 뱃지 */}
                        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-amber-400 to-yellow-600 rounded-full w-14 h-14 shadow-lg border-2 border-yellow-200">
                            <ShieldCheck className="text-white drop-shadow-md" size={28} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-indigo-300">ID: OZC-263A-98F1</span>
                        <span>•</span>
                        <span>{t('cert_issue_date')}: {currentDate}</span>
                    </div>
                </div>

                {/* 차량 정보 기본 명세 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{t('cert_car_model')}</p>
                        <p className="font-bold text-white">{lang === 'ko' ? '현대 아이오닉 6 (Long Range)' : 'Hyundai Ioniq 6 (Long Range)'}</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{t('cert_total_distance')}</p>
                        <p className="font-bold text-white font-mono tracking-tight">34,102 <span className="text-xs font-normal text-slate-400">km</span></p>
                    </div>
                </div>

                {/* 1. 배터리 건강 리포트 */}
                <h3 className="text-sm font-bold text-indigo-400 mb-3 flex items-center gap-2">
                    <Battery size={16} /> {t('cert_battery_grade_title')}: <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs">{t('cert_battery_grade_s')}</span>
                </h3>
                <div className="bg-slate-950/50 p-5 rounded-2xl border border-indigo-900/30 mb-6">
                    <div className="flex items-end justify-between border-b border-slate-800 pb-4 mb-4">
                        <div>
                            <p className="text-xs text-slate-400 mb-1">{t('cert_battery_soh')}</p>
                            <p className="text-4xl font-black text-emerald-400">98.2<span className="text-lg font-normal text-emerald-500/50">%</span></p>
                        </div>
                        <p className="text-xs text-emerald-400/80 bg-emerald-900/30 px-3 py-1.5 rounded-lg border border-emerald-800/50">
                            {t('cert_battery_soh_desc')}
                        </p>
                    </div>

                    <ul className="space-y-3">
                        <li className="flex gap-3 text-sm">
                            <CheckCircle2 className="text-indigo-400 shrink-0" size={18} />
                            <span className="text-slate-300">{t('cert_battery_insight_1', { period: lang === 'ko' ? '2년' : '2 years', percent: 95 })}</span>
                        </li>
                        <li className="flex gap-3 text-sm">
                            <CheckCircle2 className="text-indigo-400 shrink-0" size={18} />
                            <span className="text-slate-300">{t('cert_battery_insight_2')}</span>
                        </li>
                    </ul>
                </div>

                {/* 2. 주행 일관성 및 에코 지수 */}
                <h3 className="text-sm font-bold text-indigo-400 mb-3 flex items-center gap-2">
                    <Cpu size={16} /> {t('cert_data_transparency')}
                </h3>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-indigo-900/30 mb-8 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <span className="text-2xl font-black text-blue-400">92</span>
                    </div>
                    <div>
                        <p className="font-bold text-white text-sm mb-1">{t('cert_eco_index', { percent: 5 })}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            {t('cert_eco_index_desc')}
                        </p>
                    </div>
                </div>

                {/* 3. 가치 평가액 하이라이트 (사업성 강조) */}
                <div className="bg-gradient-to-r from-amber-500/20 to-yellow-600/20 p-5 rounded-2xl border border-yellow-500/30 flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-1">{t('cert_extra_value_title')}</p>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="text-yellow-400" size={24} />
                            <p className="text-2xl font-black text-white">{t('cert_extra_value_amount', { amount: lang === 'ko' ? '+150만 원' : '+1.5M KRW' })}</p>
                        </div>
                    </div>
                </div>

                {/* 4. 액션 버튼 (NFT 등록, 공유) */}
                <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2">
                        <Download size={18} /> {t('cert_download_pdf')}
                    </button>
                    <button className="px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors border border-slate-700 flex items-center justify-center">
                        <Share2 size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}
