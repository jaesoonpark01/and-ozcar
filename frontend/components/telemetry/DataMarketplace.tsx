"use client";

import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { motion } from "framer-motion";
import {
    Diamond,
    Coins,
    TrendingUp,
    ShieldCheck,
    ExternalLink,
    ChevronRight,
    Target
} from "lucide-react";

const OFFERS = [
    { id: 1, type: 'insurance', buyer: 'Samsung Fire', reward: '5.2 OZC', grade: 'GOLD' },
    { id: 2, type: 'research', buyer: 'KAIST Lab', reward: '12.8 OZC', grade: 'DIAMOND' },
    { id: 3, type: 'mfg', buyer: 'Hyundai Motor', reward: '8.5 OZC', grade: 'DIAMOND' },
];

export default function DataMarketplace() {
    const { t } = useI18n();
    const [sellingId, setSellingId] = useState<number | null>(null);

    const handleSell = (id: number) => {
        setSellingId(id);
        setTimeout(() => setSellingId(null), 2000);
    };

    return (
        <div className="bg-gray-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-2xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t("hw_market_title")}</h2>
                    <p className="text-gray-400 text-sm">{t("hw_market_subtitle")}</p>
                </div>
                <div className="flex items-center gap-2 bg-[#0052FF]/10 border border-[#0052FF]/30 px-4 py-2 rounded-full">
                    <TrendingUp size={16} className="text-[#0052FF]" />
                    <span className="text-xs font-bold text-[#0052FF]">Data Demand: HIGH</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Asset Summary Area */}
                <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-gray-800/50 to-black/50 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#0052FF]/10 blur-3xl group-hover:bg-[#0052FF]/20 transition-all duration-700"></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{t("hw_market_asset_diamond")}</span>
                                <h3 className="text-3xl font-bold mt-1 text-white">428.5 <span className="text-sm font-normal text-gray-500">MB</span></h3>
                            </div>
                            <div className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                                <Diamond className="text-cyan-400 animate-pulse" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-cyan-400/80">
                            <ShieldCheck size={14} />
                            <span>HW-Signed (STM32G4 / S32K3)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-800/30 rounded-xl border border-white/5">
                            <span className="text-[10px] text-gray-500 uppercase italic">{t("hw_market_asset_gold")}</span>
                            <div className="text-lg font-bold text-yellow-500">1.2 GB</div>
                        </div>
                        <div className="p-4 bg-gray-800/30 rounded-xl border border-white/5">
                            <span className="text-[10px] text-gray-500 uppercase italic">{t("hw_market_asset_silver")}</span>
                            <div className="text-lg font-bold text-gray-300">8.4 GB</div>
                        </div>
                    </div>
                </div>

                {/* Offers Area */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Target size={16} />
                        {t("hw_market_offer_title")}
                    </h3>

                    <div className="space-y-3">
                        {OFFERS.map((offer) => (
                            <motion.div
                                key={offer.id}
                                whileHover={{ x: 5 }}
                                className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-[#0052FF]/40 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${offer.type === 'insurance' ? 'bg-blue-500/10' : offer.type === 'research' ? 'bg-purple-500/10' : 'bg-green-500/10'}`}>
                                        <ExternalLink size={18} className={offer.type === 'insurance' ? 'text-blue-400' : offer.type === 'research' ? 'text-purple-400' : 'text-green-400'} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white group-hover:text-[#0052FF] transition-colors">{offer.buyer}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${offer.grade === 'DIAMOND' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {offer.grade}
                                            </span>
                                            <span className="text-[10px] text-gray-500">{offer.reward} / Sess</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSell(offer.id)}
                                    disabled={sellingId !== null}
                                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                                >
                                    {sellingId === offer.id ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            <Coins size={20} className="text-yellow-500" />
                                        </motion.div>
                                    ) : (
                                        <ChevronRight size={20} className="text-gray-500 group-hover:text-white" />
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full py-4 bg-[#0052FF]/10 text-[#0052FF] rounded-2xl border border-[#0052FF]/20 text-xs font-bold uppercase tracking-widest hover:bg-[#0052FF]/20 transition-all flex items-center justify-center gap-2">
                        {t("hw_market_sell_button")}
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
