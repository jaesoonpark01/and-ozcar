'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, 
    Zap, 
    Award, 
    Activity, 
    BarChart3, 
    BadgeCheck, 
    ExternalLink,
    Box,
    Globe
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import Navbar from '@/components/Navbar';

export default function MasterProfilePage() {
    const { t } = useI18n();

    // Mock Master Data
    const masterStats = {
        rank: "Legendary",
        score: 98.4,
        totalData: "15.8 TB",
        verifiedTrips: 1242,
        reputation: 4850,
        badges: [
            { id: 1, name: "Eco Warden", icon: <Globe size={20} />, color: "text-green-400", bg: "bg-green-500/10" },
            { id: 2, name: "Safety Sentinel", icon: <ShieldCheck size={20} />, color: "text-blue-400", bg: "bg-blue-500/10" },
            { id: 3, name: "Zero Latency", icon: <Zap size={20} />, color: "text-amber-400", bg: "bg-amber-500/10" }
        ]
    };

    return (
        <div className="min-h-screen bg-[#010410] text-white">
            <Navbar />
            
            <main className="max-w-7xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="relative mb-16 h-80 rounded-[3rem] overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-950/40 to-black z-0"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-end p-12">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                            <div className="flex items-center gap-8">
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-1 flex items-center justify-center relative overflow-hidden group"
                                >
                                    <img 
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
                                        alt="Avatar" 
                                        className="w-full h-full rounded-2xl object-cover"
                                    />
                                    <div className="absolute inset-0 bg-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <BadgeCheck className="text-white w-10 h-10" />
                                    </div>
                                </motion.div>
                                
                                <div className="mb-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Jaesoon <span className="text-blue-500">Park</span></h1>
                                        <div className="px-3 py-1 bg-blue-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Oz-Master PRO</div>
                                    </div>
                                    <p className="text-slate-400 font-medium flex items-center gap-2">
                                        <span className="flex items-center gap-1"><ExternalLink size={14} className="text-blue-400" /> 0x4f...8821</span>
                                        <span className="text-slate-700">|</span>
                                        <span>Seoul, South Korea</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 mb-2">
                                <button className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-blue-50 transition-all shadow-xl">
                                    Edit Neural Link
                                </button>
                                <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
                                    <Activity size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "OZC Reputation", value: masterStats.reputation, icon: <Award className="text-blue-400" /> },
                        { label: "Trust Score", value: masterStats.score + "%", icon: <ShieldCheck className="text-green-400" /> },
                        { label: "Data Contributed", value: masterStats.totalData, icon: <Box className="text-amber-400" /> },
                        { label: "Verified Trips", value: masterStats.verifiedTrips, icon: <BarChart3 className="text-indigo-400" /> }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0a0f1e] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all"
                        >
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                {React.cloneElement(stat.icon as any, { size: 100 })}
                            </div>
                            <div className="mb-4 p-3 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</h4>
                            <p className="text-3xl font-black italic uppercase tracking-tighter text-white">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel: Badges & Rewards */}
                    <div className="lg:col-span-1 space-y-8">
                        <section className="bg-[#121212] p-8 rounded-[3rem] border border-white/5">
                            <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3">
                                <Award className="text-blue-500" /> Master Badges
                            </h3>
                            <div className="space-y-4">
                                {masterStats.badges.map(badge => (
                                    <div key={badge.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                                        <div className={`p-3 rounded-xl ${badge.bg} ${badge.color} group-hover:scale-110 transition-transform`}>
                                            {badge.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-black uppercase tracking-widest text-white">{badge.name}</p>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase">Acquired 2026-01-15</p>
                                        </div>
                                        <BadgeCheck size={16} className="text-blue-500" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-gradient-to-br from-indigo-600/20 to-transparent p-8 rounded-[3rem] border border-indigo-500/20 relative overflow-hidden">
                            <Zap className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5 rotate-12" />
                            <h3 className="text-xl font-black italic uppercase mb-2 relative z-10">Power Boost</h3>
                            <p className="text-xs text-slate-400 mb-6 relative z-10">Your Gold subscription is active. All oz-Points are currently boosted by <span className="text-white font-black">1.25x</span>.</p>
                            <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl relative z-10">
                                View Boost History
                            </button>
                        </section>
                    </div>

                    {/* Right Panel: Activity Feed & Insights */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-[#0a0f1e] p-10 rounded-[3rem] border border-white/5">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-2xl font-black italic uppercase">Neural <span className="text-blue-500">Activity</span></h3>
                                <div className="flex bg-white/5 p-1 rounded-xl">
                                    <button className="px-4 py-2 bg-blue-600 text-[9px] font-black uppercase rounded-lg">Recent</button>
                                    <button className="px-4 py-2 text-slate-500 text-[9px] font-black uppercase rounded-lg">High Value</button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] hover:border-blue-500/20 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 transition-colors">
                                                    <Activity size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-black text-white">Urban Stealth Extraction</h4>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tesla Model 3 • 4.2 GB Dataset</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-blue-500 font-black italic">+85 <span className="text-[9px]">OZP</span></p>
                                                <p className="text-[9px] text-slate-600 uppercase font-black">2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "85%" }}
                                                className="h-full bg-blue-600"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-4 bg-white/5 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                                View Full Contribution Log
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
