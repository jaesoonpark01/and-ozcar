"use client";

import { useWeb3 } from "@/components/Web3Provider";
import { useI18n } from "@/hooks/useI18n";
import Link from "next/link";
import { PlusCircle, ShoppingBag, Sparkles, Car, Shield, Activity, Cpu, Wallet, Award, TrendingUp } from "lucide-react";
import AIReservationCard from "@/components/user/AIReservationCard";
import AssetOptimizationAlert from "@/components/user/AssetOptimizationAlert";
import WarrantySubscriptionCard from "@/components/user/WarrantySubscriptionCard";
import LiveMaintenanceTimeline from "@/components/user/LiveMaintenanceTimeline";
import DynamicInsuranceCard from "@/components/user/DynamicInsuranceCard";

export default function Dashboard() {
    const { account } = useWeb3();
    const { t } = useI18n();

    // Mock AI Data for demonstration
    const aiRecommendation = {
        part: t("dash_ai_recommend_oil_pads"),
        urgency: "URGENT" as const,
        recommendedShop: {
            id: "SHOP-001",
            name: t("dash_shop_gangnam"),
            distance: 1.2,
            location: "서울 강남구 역삼동",
            rating: 4.9
        },
        availableTime: "오늘 오후 2:00"
    };

    const assetData = {
        currentValue: 26850000,
        premiumValue: 1850000,
        resaleRetention: 72,
        warrantyStatus: t("dash_warranty_expired").replace("{days}", "15")
    };

    return (
        <div className="py-10 pb-32">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-black tracking-tighter text-blue-900">{t("dash_title")}</h1>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/20">
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t("dash_ai_guardian_active")}</span>
                </div>
            </div>

            {!account ? (
                <div className="text-center py-24 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3.5rem] backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200/50">
                        <Wallet className="text-slate-300" size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-400 italic uppercase tracking-tighter">{t("dash_connect")}</h2>
                </div>
            ) : (
                <div className="space-y-10">
                    {/* Command Center: Core Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Wallet size={20} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{t("dash_wallet_balance")}</span>
                            </div>
                            <div className="text-3xl font-black italic tracking-tighter text-slate-900 mb-1">
                                {Number(useWeb3().balance).toLocaleString()} <span className="text-sm font-bold text-blue-600">OZC</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Award size={20} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{t("dash_reputation_score")}</span>
                            </div>
                            <div className="text-3xl font-black italic tracking-tighter text-slate-900 mb-1">
                                {useWeb3().reputation} <span className="text-sm font-bold text-emerald-600">REP</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Car size={20} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Asset Status</span>
                            </div>
                            <div className="text-xl font-black italic tracking-tight text-slate-900 mb-1">
                                Verified <span className="text-sm font-bold text-indigo-600">NFT</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                    <TrendingUp size={20} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Daily ROI</span>
                            </div>
                            <div className="text-3xl font-black italic tracking-tighter text-slate-900 mb-1">
                                +12.5%
                            </div>
                        </div>
                    </div>
                    {/* Phase 3 & 4: AI Intelligent Layer for User */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AIReservationCard aiRecommendation={aiRecommendation} />
                        <AssetOptimizationAlert assetData={assetData} />
                    </div>

                    {/* Secondary Founder Strategy Integration */}
                    <div className="bg-gradient-to-r from-[#0052FF]/20 to-[#00F0FF]/20 border border-[#0052FF]/30 p-8 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#0052FF]/10 blur-[100px] group-hover:bg-[#0052FF]/20 transition-all duration-1000"></div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="p-5 bg-black/40 rounded-3xl border border-[#0052FF]/50 shadow-[0_0_20px_rgba(0,82,255,0.3)]">
                                    <Shield className="text-[#0052FF]" size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-[#0052FF] uppercase tracking-[0.3em]">Specialized Role Available</span>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                    </div>
                                    <h2 className="text-3xl font-black italic uppercase italic tracking-tighter text-blue-900">Secondary Founder <span className="text-[#0052FF]">Portal</span></h2>
                                    <p className="text-slate-500 text-sm mt-1">Unlock sovereign data rights and participate in the Ozcar data economy.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/insight-lab" className="px-8 py-4 bg-[#0052FF] text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-105 transition-all text-xs">
                                    Go to Insight Lab
                                </Link>
                                <Link href="/telemetry" className="p-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl text-slate-700 hover:bg-white transition-all">
                                    <Cpu size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <LiveMaintenanceTimeline />
                        </div>
                        <div className="space-y-8">
                            <WarrantySubscriptionCard vehicleHealthScore={95} basePrice={49000} />
                            <DynamicInsuranceCard basePremium={120000} healthScore={98} drivingBehavior="SAFE" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="glass-panel p-10 rounded-[3rem] border border-slate-100 shadow-sm bg-white">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black tracking-tight">{t("dash_vehicles")}</h2>
                                <div className="flex items-center gap-3">
                                    <Link href="/my-garage" className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs transition-all">
                                        <Car className="w-4 h-4" /> {t("nav_garage")}
                                    </Link>
                                    <Link href="/sell" className="bg-[#0052FF] text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                                        <PlusCircle className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                            <div className="text-slate-400 text-sm font-medium">
                                {t("dash_no_vehicles")}
                                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <div>
                                        <Link href="/marketplace" className="text-[#0052FF] font-black underline underline-offset-4">{t("dash_market_link")}</Link>
                                        <p className="inline ml-1">{t("dash_market_desc")}</p>
                                    </div>
                                    <Link href="/my-garage" className="text-slate-400 hover:text-[#0052FF] flex items-center gap-1 group">
                                        <span className="text-[10px] font-black uppercase tracking-widest">{t("nav_garage")}</span>
                                        <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-10 rounded-[3rem] border border-slate-100 shadow-sm bg-white">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                                    <ShoppingBag className="w-6 h-6 text-[#0052FF]" /> {t("dash_escrows")}
                                </h2>
                            </div>
                            <div className="text-slate-400 text-sm font-medium">
                                <p className="leading-relaxed">{t("dash_escrow_desc")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
