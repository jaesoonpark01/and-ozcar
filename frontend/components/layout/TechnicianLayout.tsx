// components/layout/TechnicianLayout.tsx
"use client";

import React from 'react';
import { BarChart3, Users, Wrench, Settings, TrendingUp, DollarSign, Calendar, Activity, Cpu, ShieldCheck, Zap, RefreshCw, Clock, Star } from 'lucide-react';
import { useWeb3 } from '../Web3Provider';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    title: string;
}

const TechnicianLayout: React.FC<Props> = ({ children, title }) => {
    const { balance, reputation, account } = useWeb3();

    return (
        <div className="min-h-screen bg-[#010410] text-white font-sans pb-24 selection:bg-blue-500/30">
            {/* Dashboard Header */}
            <header className="bg-gradient-to-b from-blue-600/20 to-transparent border-b border-white/5 p-6 sm:p-8 relative z-10 backdrop-blur-md">
                <div className="flex justify-between items-center mb-10">
                    <Link href="/" className="text-2xl font-black tracking-tighter italic">OZCAR <span className="text-[10px] opacity-40 font-black not-italic tracking-[0.3em] ml-2">TECH OPS</span></Link>
                    <div className="flex gap-3">
                        <div className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-black border border-white/10 uppercase tracking-widest">
                            REP {reputation}
                        </div>
                        <div className="bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-[9px] font-black border border-blue-500/20 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                            System Online
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] opacity-40 font-black uppercase tracking-[0.2em] mb-2">Total OZC Revenue</p>
                        <h1 className="text-5xl font-black tracking-tighter italic leading-none">{parseFloat(balance).toLocaleString()} <span className="text-xl opacity-20 not-italic ml-2 font-black">OZC</span></h1>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-[9px] opacity-30 font-black uppercase tracking-widest mb-1">STATION ID</p>
                        <p className="text-xs font-mono font-black text-blue-400">{account?.substring(0, 14)}...</p>
                    </div>
                </div>
            </header>

            <main className="p-4 sm:p-8 max-w-7xl mx-auto">
                {title && (
                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-black italic uppercase italic tracking-tighter mb-8 text-white/90"
                    >
                        {title}
                    </motion.h2>
                )}
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-3xl border border-white/10 flex justify-around p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-50 rounded-[2.5rem] w-[90%] max-w-md">
                {[
                    { href: "/technician/dashboard", icon: "🛠️", label: "Mining" },
                    { href: "/maintenance", icon: "📊", label: "Gateway" },
                    { href: "/wallet", icon: "💳", label: "Wallet" },
                    { href: "/governance", icon: "⚖️", label: "Gov" }
                ].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-[1.8rem] transition-all hover:bg-white/5 active:scale-95"
                    >
                        <div className="text-xl">{link.icon}</div>
                        <span className="font-black text-[9px] uppercase tracking-widest opacity-40">{link.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default TechnicianLayout;
