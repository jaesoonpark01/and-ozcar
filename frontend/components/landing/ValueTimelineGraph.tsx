import React from 'react';
import { TrendingUp, MousePointer2, Award, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValueTimelineGraph() {
    return (
        <section id="value" className="py-48 bg-white px-6 overflow-hidden relative">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 px-8 py-3 rounded-full text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] italic shadow-sm"
                >
                    <Sparkles size={16} /> Data Asset Appreciation Protocol
                </motion.div>
                <h2 className="text-6xl md:text-[100px] font-black tracking-tight leading-[1.1] text-slate-950">
                    관리가 수입이 되는<br />
                    <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">상위 1%의 자산 관리</span>
                </h2>
                <p className="text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                    단순한 자동차를 '수익형 자산'으로 치환하는 단 하나의 방법. 오즈카의 검증된 데이터가 당신의 지갑을 보호합니다.
                </p>
            </div>

            <div className="max-w-6xl mx-auto relative group">

                {/* Dynamic Canvas Container: Spatial Shadow Depth */}
                <div className="bg-[#020617] rounded-[5rem] p-12 md:p-24 relative shadow-[0_60px_130px_-20px_rgba(0,0,0,0.4)] overflow-hidden">

                    <div className="flex flex-col md:flex-row justify-between items-start mb-24 relative z-20 gap-12">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] italic">Certified Asset Value</p>
                            <motion.h3
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-6xl md:text-8xl font-black text-white tracking-tight tabular-nums"
                            >
                                ₩42,850,000 <span className="text-blue-500 text-4xl">.</span>
                            </motion.h3>
                        </div>
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[3.5rem] flex items-center gap-8 shadow-2xl">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic opacity-60">Verified Premium</p>
                                <p className="text-3xl font-black text-emerald-400">+₩4,200,000</p>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10" />
                            <div className="p-4 bg-emerald-500 rounded-2xl shadow-lg animate-bounce">
                                <Zap className="text-white fill-current" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* High-Fi SVG Path Animation v2: Physics-Based */}
                    <div className="h-96 w-full relative z-10 scale-110">
                        <svg viewBox="0 0 1000 240" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="pathGradientv2" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#2563EB" />
                                    <stop offset="50%" stopColor="#818CF8" />
                                    <stop offset="100%" stopColor="#FFFFFF" />
                                </linearGradient>
                                <filter id="glowv2" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="10" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* The Value Evolution Path */}
                            <motion.path
                                d="M0,200 Q200,230 400,160 T700,100 T950,20"
                                fill="none"
                                stroke="url(#pathGradientv2)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                filter="url(#glowv2)"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                            />

                            {/* Milestone Points: Spatial Interaction */}
                            <ValueMilestone x={400} y={160} label="AI SENSOR SYNC" delay={1} />
                            <ValueMilestone x={700} y={100} label="MASTER OATH" delay={1.8} />
                            <ValueMilestone x={950} y={20} label="CERTIFIED GOLD" active delay={2.5} />
                        </svg>
                    </div>

                    {/* High-End Time Ticker */}
                    <div className="mt-20 border-t border-white/10 pt-12 flex justify-between text-[11px] font-black text-white/30 uppercase tracking-[0.4em] italic font-mono">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-slate-800" />
                            <span>Market Standard</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                            <span>Predictive Peak</span>
                        </div>
                        <div className="flex items-center gap-4 text-white">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span>Ozcar Premium Elevation</span>
                        </div>
                    </div>

                    {/* Background Overlay: Grid Mesh */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
                </div>

                {/* Floating Interactive CTA */}
                <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById('delta')?.scrollIntoView({ behavior: 'smooth' })}
                    className="absolute bottom-[-45px] left-1/2 -translate-x-1/2 bg-white text-black px-12 py-8 rounded-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] flex items-center gap-6 cursor-pointer border border-white/10 group"
                >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:rotate-180 duration-700">
                        <MousePointer2 size={24} className="-rotate-90 fill-current text-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-black uppercase tracking-widest italic">Asset Appraisal v3</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">실시간 자산 가치 산출하기</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ValueMilestone({ x, y, label, active = false, delay }: any) {
    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: 'spring', stiffness: 100 }}
        >
            <circle cx={x} cy={y} r="16" fill={active ? "#2563EB" : "#0F172A"} stroke="white" strokeWidth="3" shadow-2xl />
            {active && (
                <motion.circle
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    cx={x} cy={y} r="25" stroke="#2563EB" strokeWidth="2"
                />
            )}
            <foreignObject x={x - 100} y={y - 60} width="200" height="40">
                <div className="flex justify-center">
                    <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest italic border ${active ? 'bg-blue-600 border-white text-white' : 'bg-slate-900 border-white/20 text-white/60'} shadow-2xl`}>
                        {label}
                    </span>
                </div>
            </foreignObject>
        </motion.g>
    );
}
