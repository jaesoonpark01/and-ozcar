import React from 'react';
import { Activity, MapPin, Wallet, ArrowUpRight, Shield, Zap, Sparkles, Fingerprint, Layers, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

export default function ThreePillarCards() {
    const { t } = useI18n();
    return (
        <section id="features" className="py-48 bg-white px-6 overflow-hidden relative">
            {/* Subtle Spatial Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
                    <div className="space-y-8 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-900 rounded-full text-white shadow-2xl"
                        >
                            <Sparkles size={14} className="text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">{t('feat_pillar_badge')}</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] text-slate-950">
                            {t('feat_pillar_title').split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}<br />
                                </React.Fragment>
                            ))}
                        </h2>
                    </div>
                    <p className="text-xl text-slate-500 font-medium max-w-sm leading-relaxed border-l-2 border-slate-100 pl-8">
                        {t('feat_pillar_desc')}
                    </p>
                </div>

                {/* 2026 Bento 2.0: Borderless & Depth */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[800px]">

                    {/* Main Focus: Invisible Certainty */}
                    <motion.div
                        whileHover={{ scale: 0.99 }}
                        className="md:col-span-8 bg-[#F8FAFC] rounded-[5rem] p-16 flex flex-col justify-between group cursor-pointer relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.02)]"
                    >
                        <div className="relative z-10 space-y-12">
                            <div className="inline-flex items-center gap-6">
                                <div className="w-24 h-24 bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex items-center justify-center group-hover:rotate-12 transition-transform duration-700">
                                    <Fingerprint size={40} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase mb-1">Standard 01 / Identity</p>
                                    <h3 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight italic">{t('feat_1_title')}</h3>
                                </div>
                            </div>

                            <div className="space-y-6 max-w-xl">
                                <h4 className="text-3xl font-black text-slate-800 leading-tight">
                                    {t('feat_1_subtitle')}
                                </h4>
                                <p className="text-2xl text-slate-400 font-medium leading-relaxed">
                                    {t('feat_1_desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center relative z-10 pt-12">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white" />
                                ))}
                                <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">+12k</div>
                            </div>
                            <motion.div
                                whileHover={{ x: 10 }}
                                onClick={() => document.getElementById('trust')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-4 text-blue-600 font-black text-sm uppercase italic tracking-widest cursor-pointer"
                            >
                                Verify Now <MoveRight />
                            </motion.div>
                        </div>

                        {/* Spatial Graphics Underlay */}
                        <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] border-[40px] border-blue-600/5 rounded-full pointer-events-none" />
                    </motion.div>

                    {/* Right Stack: Liquid Assets & Autonomous Care */}
                    <div className="md:col-span-4 flex flex-col gap-8">

                        {/* Liquid Asset Value */}
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="flex-1 bg-slate-950 rounded-[5rem] p-12 text-white relative overflow-hidden group cursor-pointer shadow-2xl"
                        >
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 bg-white/5 rounded-3xl backdrop-blur-3xl flex items-center justify-center border border-white/10 group-hover:bg-blue-600 transition-colors">
                                        <Layers className="text-white" />
                                    </div>
                                    <ArrowUpRight className="text-white/20 group-hover:text-blue-500 group-hover:rotate-45 transition-all" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase mb-4">Focus 02 / Asset</p>
                                    <h4 className="text-3xl font-black mb-4 tracking-tighter">{t('feat_2_title')}<br /><span className="italic text-white/40">Value.</span></h4>
                                    <p className="text-base text-slate-400 font-medium leading-relaxed">{t('feat_2_desc')}</p>
                                </div>
                            </div>
                            {/* Internal Glow */}
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
                        </motion.div>

                        {/* Autonomous Preservation */}
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="flex-1 bg-blue-600 rounded-[5rem] p-12 text-white relative overflow-hidden group cursor-pointer shadow-2xl shadow-blue-500/20"
                        >
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center shadow-inner">
                                        <Zap size={30} className="fill-current" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase mb-4 font-mono">Focus 03 / Preservation</p>
                                    <h4 className="text-3xl font-black mb-4 tracking-tighter font-mono italic">{t('feat_3_title')}</h4>
                                    <p className="text-base text-white/80 font-medium leading-relaxed">{t('feat_3_desc')}</p>
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 p-8 opacity-10 scale-150">
                                <Activity size={120} />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
