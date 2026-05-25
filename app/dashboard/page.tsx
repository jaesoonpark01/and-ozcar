"use client";

import { useWeb3 } from "@/components/Web3Provider";
import { useI18n } from "@/hooks/useI18n";
import Link from "next/link";
import { PlusCircle, ShoppingBag, Sparkles } from "lucide-react";
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
        part: "엔진오일 & 브레이크 패드",
        urgency: "URGENT" as const,
        recommendedShop: {
            id: "SHOP-001",
            name: "마스터 정비센터 강남점",
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
        warrantyStatus: "보증 만료 15일 전"
    };

    return (
        <div className="py-10 pb-32">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-black tracking-tighter text-blue-900">{t("dash_title")}</h1>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/20">
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Guardian Active</span>
                </div>
            </div>

            {!account ? (
                <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <h2 className="text-xl font-bold text-gray-400">{t("dash_connect")}</h2>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Phase 3 & 4: AI Intelligent Layer for User */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AIReservationCard aiRecommendation={aiRecommendation} />
                        <AssetOptimizationAlert assetData={assetData} />
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
                                <Link href="/sell" className="bg-[#0052FF] text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                                    <PlusCircle className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="text-slate-400 text-sm font-medium">
                                {t("dash_no_vehicles")}
                                <div className="mt-4 pt-4 border-t border-slate-50">
                                    <Link href="/marketplace" className="text-[#0052FF] font-black underline underline-offset-4">{t("dash_market_link")}</Link>
                                    <p className="inline ml-1">{t("dash_market_desc")}</p>
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
                                <p className="leading-relaxed">진행 중인 모든 에스크로 안전 거래 내역을 실시간으로 확인하고 합의를 진행할 수 있습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
