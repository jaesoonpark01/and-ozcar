import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Zap, ShieldCheck, ChevronRight, Activity, Cpu, Bell, Shield, Gauge } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

export default function HeroSection() {
    const { t } = useI18n();
    const [islandState, setIslandState] = useState<'IDLE' | 'EXPANDED' | 'OUTREACH'>('IDLE');
    const [showAnxietyNodes, setShowAnxietyNodes] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax elements for Spatial UX
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

    useEffect(() => {
        // Initial teaser sequence
        const teaser = setTimeout(() => {
            setIslandState('OUTREACH');
            setShowAnxietyNodes(true);
        }, 5000);

        const idleBack = setTimeout(() => {
            setIslandState('IDLE');
        }, 12000);

        return () => {
            clearTimeout(teaser);
            clearTimeout(idleBack);
        };
    }, []);

    return (
        <section id="hero" ref={containerRef} className="bg-[#010410] text-white pt-48 pb-40 px-6 overflow-visible relative min-h-screen flex items-center">

            {/* 2026 Spatial Background System */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[160px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[140px]" />
                {/* Animated Grid Floor */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-200" />
                <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-blue-600/10 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-32 relative z-10">

                {/* Left Copy: Emotional Brand Storytelling (The Soul) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 space-y-12"
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-6 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full"
                        >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase font-mono">{t('hero_invisible_certainty')}</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-[110px] font-black leading-[1.1] tracking-tight">
                            {t('hero_title').split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}<br />
                                </React.Fragment>
                            ))}
                        </h1>
                    </div>

                    <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-xl leading-relaxed">
                        {t('hero_desc')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            className="relative group bg-white text-black px-14 py-8 rounded-[2.5rem] font-black text-sm transition-all shadow-[0_30px_60px_-15px_rgba(255,255,255,0.15)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3 italic">{t('hero_btn_experience')} <ChevronRight size={18} /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                        </motion.button>
                        <div
                            onClick={() => document.getElementById('delta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center gap-6 px-4 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#010410] bg-slate-800" />
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-black">{t('hero_users_count')}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t('hero_trust_monthly')}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Visual: 2026 Spatial Core (The Body) */}
                <div className="flex-1 relative w-full h-[800px] flex items-center justify-center perspective-[2000px]">

                    {/* Floating Data Nodes (Leaking into Reality) */}
                    <motion.div
                        style={{ y: y1, rotateX: 5, rotateY: -10 }}
                        className="absolute -top-10 -right-20 w-80 h-72 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] z-40 hidden xl:flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
                                <Shield size={28} className="text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">{t('hero_protocol_auth')}</p>
                                <p className="text-xs font-black text-emerald-400 font-mono tracking-tighter">{t('hero_success_stake_active')}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-black mb-3 italic">{t('hero_card_integrity')}</p>
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">
                                {t('hero_node_sync_desc')}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y: y2, rotateX: -5, rotateY: 10 }}
                        className="absolute -bottom-10 -left-20 w-96 h-56 bg-slate-950/40 backdrop-blur-2xl border border-blue-500/10 rounded-[3.5rem] p-10 shadow-2xl z-40 hidden xl:block"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">{t('hero_yield_prediction')}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h4 className="text-4xl font-black tabular-nums tracking-tighter text-white">+₩3,420,000</h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-2 tracking-widest">{t('hero_projected_resale')}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <Gauge className="text-blue-500" size={32} />
                            </div>
                        </div>
                    </motion.div>

                    {/* The 2026 Holographic Core (Replaces the iPhone) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[420px] relative z-20 group"
                    >
                        {/* Spatial Portal Effect */}
                        <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />

                        {/* Glass Interface Core */}
                        <div className="relative aspect-[9/18.5] bg-white/[0.03] backdrop-blur-[60px] rounded-[5rem] border border-white/20 shadow-[0_80px_160px_-20px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col p-4">

                            {/* Inner Glass Edge */}
                            <div className="absolute inset-0 border-[2px] border-white/10 rounded-[5rem] pointer-events-none" />

                            {/* UI Content: Futuristic Telemetry Feed */}
                            <div className="flex-1 rounded-[4.2rem] bg-black/40 border border-white/5 overflow-y-auto no-scrollbar p-8 space-y-10">

                                {/* Dynamic AI Outreach Island */}
                                <div className="absolute top-0 left-0 right-0 h-24 z-50 flex justify-center pt-4 pointer-events-none">
                                    <motion.div
                                        layout
                                        animate={{
                                            width: islandState === 'IDLE' ? 120 : (islandState === 'OUTREACH' ? 340 : 320),
                                            height: islandState === 'IDLE' ? 36 : (islandState === 'OUTREACH' ? 110 : 90),
                                            borderRadius: islandState === 'IDLE' ? 40 : 45,
                                            backgroundColor: islandState === 'OUTREACH' ? '#1E293B' : '#000000',
                                            borderColor: islandState === 'OUTREACH' ? '#3B82F6' : '#1E293B'
                                        }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                        className="border shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-between px-6 overflow-hidden pointer-events-auto cursor-pointer"
                                        onMouseEnter={() => setIslandState('EXPANDED')}
                                        onMouseLeave={() => setIslandState('IDLE')}
                                    >
                                        <AnimatePresence mode="wait">
                                            {islandState === 'IDLE' ? (
                                                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1">
                                                    <div className="w-1 h-3 bg-blue-600 rounded-full animate-[bounce_1s_infinite_0ms]" />
                                                    <div className="w-1 h-3 bg-blue-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
                                                    <div className="w-1 h-3 bg-blue-200 rounded-full animate-[bounce_1s_infinite_400ms]" />
                                                </motion.div>
                                            ) : islandState === 'OUTREACH' ? (
                                                <motion.div key="outreach" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-6 w-full">
                                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center relative shadow-lg">
                                                        <Activity size={28} className="text-white animate-pulse" />
                                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900" />
                                                    </div>
                                                    <div className="text-left flex-1">
                                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{t('hero_island_outreach_badge')}</p>
                                                        <p className="text-[11px] font-black text-white leading-tight">{t('hero_island_outreach')}</p>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div key="expanded" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5 w-full">
                                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                                                        <ShieldCheck size={24} className="text-white" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">{t('hero_ai_guardian_v3')}</p>
                                                        <p className="text-sm font-black text-white tracking-tight">{t('hero_island_guardian')}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>

                                {/* Holographic Anxiety Nodes (Spatial Visualizer) */}
                                <AnimatePresence>
                                    {showAnxietyNodes && (
                                        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{
                                                        opacity: [0, 0.4, 0],
                                                        scale: [0.8, 1.2, 0.8],
                                                        x: Math.sin(i) * 100,
                                                        y: Math.cos(i) * 100
                                                    }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        delay: i * 0.5
                                                    }}
                                                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500/40 rounded-full blur-md"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </AnimatePresence>

                                {/* Main Asset Card */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-4xl font-black italic tracking-tighter">MODEL S</h3>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-500 uppercase">{t('hero_status_label')}</p>
                                            <p className="text-xs font-black text-emerald-400">{t('hero_optimized_label')}</p>
                                        </div>
                                    </div>

                                    {/* Holographic Heartbeat */}
                                    <div className="h-44 bg-gradient-to-br from-white/[0.05] to-transparent rounded-[3rem] border border-white/5 p-8 relative group/heartbeat">
                                        <div className="absolute top-6 left-6 flex items-center gap-3">
                                            <Activity size={16} className="text-blue-500" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('hero_live_health_label')}</span>
                                        </div>
                                        <div className="mt-10 flex items-end gap-1">
                                            {[50, 80, 40, 90, 60, 100, 70, 85, 45, 95].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1, delay: i * 0.1 }}
                                                    className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-full opacity-60"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Orchestration Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-between aspect-square hover:bg-white/[0.08] transition-colors">
                                        <Cpu size={20} className="text-blue-400" />
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase mb-1">{t('hero_rewards_label')}</p>
                                            <p className="text-lg font-black italic">2.8K OZC</p>
                                        </div>
                                    </div>
                                    <div className="bg-blue-600 p-6 rounded-[2.5rem] shadow-2xl flex flex-col justify-between aspect-square">
                                        <ShieldCheck size={20} className="text-white" />
                                        <div>
                                            <p className="text-[9px] font-black text-white/50 uppercase mb-1">{t('hero_trust_label')}</p>
                                            <p className="text-lg font-black italic">S-GRADE</p>
                                        </div>
                                    </div>
                                </div>

                                {/* THE CONVERSATIONAL CTA: Orchestration Response */}
                                <Link href="/vehicle/obd-bridge" className="block pt-4">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-white p-2 rounded-[2rem] shadow-[0_20px_40px_rgba(255,255,255,0.1)] group/cta"
                                    >
                                        <div className="bg-slate-950 rounded-[1.8rem] py-5 px-8 flex justify-between items-center transition-colors group-hover/cta:bg-blue-600">
                                            <div className="text-left">
                                                <p className="text-[12px] font-bold text-slate-500 group-hover/cta:text-white/50 uppercase tracking-widest mb-1">{t('hero_asset_orchestration_label')}</p>
                                                <p className="text-[22px] font-black text-white">{t('hero_cta_orchestration')}</p>
                                            </div>
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>

                            {/* Home Indicator */}
                            <div className="h-6 flex justify-center items-center">
                                <div className="w-24 h-1 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Spatial Background Orbits (Atmospheric) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[1.5, 2.2, 3].map(i => (
                            <motion.div
                                key={i}
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.05, 1],
                                    opacity: [0.1, 0.05, 0.1]
                                }}
                                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                                className="absolute border border-blue-500/20 rounded-full"
                                style={{ width: i * 450, height: i * 450 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
