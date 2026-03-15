'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Star } from 'lucide-react';
import MasterLicense from '@/components/user/MasterLicense';
import OzMasterBadge from '@/components/community/OzMasterBadge';

const MOCK_USER = {
    name: 'Jaesoon Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
};

const FEATURES = [
    { icon: ShieldCheck, label: 'ZKP 검증', desc: '모든 정비 기록이 영지식 증명으로 보호됩니다', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Award, label: '명성 보너스', desc: 'Master 등급 이상 OZP 보상 1.5배 적용', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: Zap, label: '우선 매칭', desc: '차주 전용 고속 정비 우선 배정', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Star, label: '거버넌스 표결', desc: 'DAO 안건 투표 시 가중치 부여', color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

export default function MasterLicensePage() {
    return (
        <div className="min-h-screen bg-[#0a0803] text-white font-sans">
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-transparent to-yellow-900/10 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <Award className="text-amber-400" size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">
                                Master License · Phase 12
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                            당신의 전문성이
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                                자산이 됩니다.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            블록체인에 영구 기록된 정비사/드라이버 전문 자격증.
                            카드를 클릭하면 뒤면 검증 데이터를 볼 수 있습니다.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* License Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <MasterLicense user={MOCK_USER} />
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-black text-white mb-8">Master 등급 혜택</h2>
                        {FEATURES.map((f, i) => (
                            <div key={i} className={`${f.bg} border border-white/5 rounded-3xl p-6 flex items-start gap-5`}>
                                <div className={`p-3 rounded-2xl bg-black/30`}>
                                    <f.icon className={f.color} size={22} />
                                </div>
                                <div>
                                    <h3 className="font-black text-white mb-1">{f.label}</h3>
                                    <p className="text-sm text-slate-400">{f.desc}</p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8">
                            <OzMasterBadge badges={{ ecoDriver: true, safetyFirst: true, careTaker: true }} level="Master" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
