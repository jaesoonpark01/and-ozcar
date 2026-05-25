import React from 'react';
import { ShieldCheck, Eye, Database, Lock, Cpu, CheckCircle, Fingerprint, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrustProofSection() {
    return (
        <section id="trust" className="py-48 bg-[#010410] relative px-6 overflow-hidden">
            {/* Visual Depth Decor: Spatial Void */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px]" />
                <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-indigo-900/5 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">

                {/* Left Graphics: The Proof Core (Spatial) */}
                <div className="flex-1 relative w-full flex justify-center lg:justify-start perspective-[1500px]">
                    <motion.div
                        animate={{
                            rotateY: [-5, 5, -5],
                            rotateX: [2, -2, 2]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative w-full max-w-lg aspect-square flex items-center justify-center transform-style-3d"
                    >

                        {/* Central Pulse: The Verification Engine */}
                        <div className="w-56 h-56 bg-slate-900 rounded-[3rem] border border-white/10 flex items-center justify-center relative z-20 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                            <Fingerprint
                                size={120}
                                strokeWidth={1.5}
                                className="text-white group-hover:scale-110 group-hover:text-blue-400 transition-all duration-700 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-blue-500 rounded-full"
                            />
                        </div>

                        {/* Floating Spatial Nodes: Glassmorphism 2.0 */}
                        <SpatialNode
                            x="-160px" y="-160px" delay={0.2}
                            icon={<Search className="text-emerald-400" />}
                            label="AI SENSOR SCAN"
                        />
                        <SpatialNode
                            x="160px" y="-180px" delay={0.4}
                            icon={<Database className="text-blue-400" />}
                            label="BLOCKCHAIN OATH"
                        />
                        <SpatialNode
                            x="200px" y="120px" delay={0.6}
                            icon={<Lock className="text-amber-400" />}
                            label="ENCRYPTED HISTORY"
                        />
                        <SpatialNode
                            x="-220px" y="100px" delay={0.8}
                            icon={<ShieldCheck className="text-indigo-400" />}
                            label="MASTER VERIFIED"
                        />

                        {/* Connecting Data Threads */}
                        <svg className="absolute inset-0 w-full h-full -z-10 opacity-5">
                            <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                            <line x1="50%" y1="50%" x2="85%" y2="18%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                            <line x1="50%" y1="50%" x2="90%" y2="75%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                            <line x1="50%" y1="50%" x2="10%" y2="70%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                        </svg>
                    </motion.div>
                </div>

                {/* Right Content: Masterful Storytelling */}
                <div className="flex-1 space-y-16">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] italic bg-white/5 border border-white/10 px-6 py-2 rounded-full"
                        >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                            Ecosystem Integrity Protocol
                        </motion.div>
                        <h2 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tight">
                            기록은 곧<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-blue-600">절대적인 증명</span>
                        </h2>
                    </div>

                    <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
                        기술자의 양심을 데이터로 치환합니다. AI Vision이 공정을 감시하고 블록체인이 이를 박제하는 순간, 당신의 차량은 시장에서 '완벽히 증명된 상위 1%'의 지위를 획득합니다.
                    </p>

                    <div className="space-y-8 border-t border-white/5 pt-12">
                        <VerificationDetail
                            title="AI Vision 동조화"
                            desc="정비사의 모든 손짓을 AI가 실시간으로 분석하여 데이터의 진위성을 99.9% 보증합니다."
                        />
                        <VerificationDetail
                            title="위변조 불가 증명 (Immutable)"
                            desc="수정 불가능한 온체인 기록은 차량 매각 시 '디지털 보증서'로서 실질적 프리미엄을 형성합니다."
                        />
                        <VerificationDetail
                            title="마스터 실명제 & 디지털 서명"
                            desc="대한민국 1% 마스터 정비사의 '디지털 서명'은 곧 그 차량의 격을 상징합니다."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SpatialNode({ x, y, delay, icon, label }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, translateZ: -100 }}
            whileInView={{ opacity: 1, translateZ: 0 }}
            transition={{ type: 'spring', damping: 20, delay }}
            style={{ left: `calc(50% + ${x})`, top: `calc(50% + ${y})` }}
            className="absolute p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] flex flex-col items-center gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group hover:bg-white/10 transition-colors"
        >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap opacity-40 group-hover:opacity-100 transition-opacity font-mono italic">
                {label}
            </span>
        </motion.div>
    );
}

function VerificationDetail({ title, desc }: any) {
    return (
        <div className="group cursor-pointer flex gap-10 items-start">
            <div className="pt-2">
                <div className="w-3 h-3 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
            </div>
            <div className="space-y-3">
                <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight italic uppercase">{title}</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                    {desc}
                </p>
            </div>
        </div>
    );
}
