"use client";

import { useI18n } from "@/hooks/useI18n";
import { motion } from "framer-motion";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    History,
    Trophy,
    PieChart,
    Repeat
} from "lucide-react";

export default function OZPWallet() {
    const { t } = useI18n();

    return (
        <div className="bg-gray-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-2xl h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-tr from-[#0052FF] to-[#00F0FF] rounded-2xl shadow-[0_0_15px_rgba(0,82,255,0.4)]">
                    <Wallet className="text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">{t("hw_wallet_title")}</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Node Wallet: 0x71...f92a</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                {/* Balance Section */}
                <div className="space-y-6">
                    <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                        <span className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                            <PieChart size={14} />
                            {t("hw_wallet_balance")}
                        </span>
                        <div className="text-4xl font-black text-white mb-1">
                            1,240.85 <span className="text-xl font-bold text-[#0052FF]">OIP</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            ≈ {t("hw_wallet_conversion")} 1,842,000₩
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-4 bg-gray-800/30 rounded-2xl border border-white/5 hover:border-[#0052FF]/30 transition-all group">
                            <ArrowUpRight className="text-gray-400 group-hover:text-[#0052FF] mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 group-hover:text-white">{t("hw_wallet_withdraw")}</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-gray-800/30 rounded-2xl border border-white/5 hover:border-[#00F0FF]/30 transition-all group">
                            <Repeat className="text-gray-400 group-hover:text-[#00F0FF] mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 group-hover:text-white">Convert Asset</span>
                        </button>
                    </div>
                </div>

                {/* Staking & History Area */}
                <div className="space-y-4">
                    <div className="p-5 bg-gradient-to-br from-[#0052FF]/10 to-transparent rounded-2xl border border-[#0052FF]/20 relative overflow-hidden">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <span className="text-[10px] text-[#0052FF] font-bold uppercase tracking-widest">{t("hw_wallet_staking")}</span>
                                <div className="text-2xl font-bold text-white mt-1">450.0 OIP</div>
                                <p className="text-[10px] text-gray-500 mt-1">Founding Reputation Power: +12%</p>
                            </div>
                            <Trophy className="text-yellow-500/50" size={24} />
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest mb-2 px-2">
                            <span className="flex items-center gap-1"><History size={10} /> {t("hw_wallet_history")}</span>
                            <span>More</span>
                        </div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                        <ArrowDownLeft size={16} className="text-green-500" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-white uppercase tracking-tighter">Drive Session Award</div>
                                        <div className="text-[9px] text-gray-500 italic">March {i + 1}, 2026</div>
                                    </div>
                                </div>
                                <div className="text-xs font-black text-green-400">+{(i * 2.5).toFixed(1)} OIP</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
