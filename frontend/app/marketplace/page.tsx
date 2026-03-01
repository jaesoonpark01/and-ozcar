// app/marketplace/page.tsx
"use client";

import React from 'react';
import MarketplaceLayout from '../../components/layout/MarketplaceLayout';
import VehicleCard from '../../components/marketplace/VehicleCard';
import { motion, AnimatePresence } from 'framer-motion';
import AIAuctionBidding from '../../components/marketplace/AIAuctionBidding';
import { useI18n } from '../../hooks/useI18n';

// Mock Data for MVP
const MOCK_VEHICLES = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
        model: "Tesla Model 3 Long Range",
        price: "35,000",
        mileage: 12000,
        year: 2023,
        location: "Seoul, Gangnam",
        isCertified: true,
        dvaPremium: 1200,
        trustScore: 99
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
        model: "Porsche Taycan 4S",
        price: "85,000",
        mileage: 5400,
        year: 2022,
        location: "Busan, Haeundae",
        isCertified: true,
        dvaPremium: 3500,
        trustScore: 98
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800",
        model: "Genesis GV60 Performance",
        price: "42,000",
        mileage: 21000,
        year: 2022,
        location: "Seoul, Yongsan",
        isCertified: false,
        dvaPremium: 800,
        trustScore: 85
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
        model: "Hyundai Ioniq 5 Prestige",
        price: "38,000",
        mileage: 15000,
        year: 2023,
        location: "Gyeonggi, Pangyo",
        isCertified: true,
        dvaPremium: 1500,
        trustScore: 97
    }
];

import DataMarketplaceUI from '../../components/admin/DataMarketplaceUI';

export default function MarketplacePage() {
    const { t } = useI18n();
    const [category, setCategory] = React.useState<'vehicle' | 'data'>('vehicle');

    return (
        <MarketplaceLayout>
            <div className="mb-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter" dangerouslySetInnerHTML={{ __html: category === 'vehicle' ? t('market_title') : t('market_data_title') }} />
                        <p className="text-slate-500 font-bold text-lg max-w-2xl leading-relaxed">
                            {category === 'vehicle' ? t('market_desc') : t('market_data_desc')}
                        </p>
                    </div>

                    {/* Category Toggle */}
                    <div className="bg-slate-100 p-1.5 rounded-3xl flex items-center shadow-inner border border-slate-200/50">
                        <button
                            onClick={() => setCategory('vehicle')}
                            className={`px-8 py-3 rounded-[1.25rem] text-sm font-black transition-all duration-300 ${category === 'vehicle' ? 'bg-white text-slate-950 shadow-xl shadow-slate-200/50 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {t('market_toggle_vehicle')}
                        </button>
                        <button
                            onClick={() => setCategory('data')}
                            className={`px-8 py-3 rounded-[1.25rem] text-sm font-black transition-all duration-300 ${category === 'data' ? 'bg-slate-950 text-white shadow-xl shadow-slate-950/20 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {t('market_toggle_data')}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {category === 'vehicle' ? (
                    <motion.div
                        key="vehicles"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        {/* Filters (Visual Only for MVP) */}
                        <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                            {[
                                { key: 'All', label: t('market_filter_all') },
                                { key: 'Certified', label: t('market_filter_certified') },
                                { key: 'Electric', label: t('market_filter_electric') },
                                { key: 'Hybrid', label: t('market_filter_hybrid') },
                                { key: 'Sports', label: t('market_filter_sports') },
                                { key: 'SUV', label: t('market_filter_suv') }
                            ].map((filter, idx) => (
                                <button
                                    key={filter.key}
                                    className={`px-7 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all duration-300 ${idx === 0 ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400 hover:shadow-md'}`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Active Auction Section */}
                        <div className="mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shadow-inner">
                                    <span className="text-2xl">🔥</span>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{t('market_hot_auction')}</h2>
                                    <p className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mt-2 block">{t('market_hot_auction_desc')}</p>
                                </div>
                            </div>
                            <AIAuctionBidding
                                vehicleName="Porsche Taycan 4S (OZ-Verified)"
                                currentBid={85500}
                                trustScore={99.4}
                                endTime="02:14:55"
                            />
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {MOCK_VEHICLES.map(v => (
                                <VehicleCard key={v.id} vehicle={v} />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="data"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="bg-slate-950 p-10 rounded-[3rem] border border-slate-900 shadow-3xl overflow-hidden relative"
                    >
                        {/* Background abstract element */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
                        <DataMarketplaceUI />
                    </motion.div>
                )}
            </AnimatePresence>
        </MarketplaceLayout>
    );
}
