// components/marketplace/VehicleCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import CertifiedBadge from './CertifiedBadge';
import { TrendingUp, Info } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface VehicleProps {
    id: string; // Token ID
    image: string;
    model: string;
    price: string;
    mileage: number;
    year: number;
    location: string;
    isCertified: boolean;
    dvaPremium?: number;
    trustScore?: number;
}

const VehicleCard: React.FC<{ vehicle: VehicleProps }> = ({ vehicle }) => {
    const { t } = useI18n();
    return (
        <Link href={`/marketplace/${vehicle.id}`} className="group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group-hover:-translate-y-1">
                {/* Image Area */}
                <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                    <img
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                        <CertifiedBadge score={vehicle.trustScore || 98} trustTier={vehicle.trustScore && vehicle.trustScore > 95 ? 'AAA' : 'AA'} />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#0052FF] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xl shadow-blue-500/20 border border-blue-400/30">
                        {vehicle.price} OZC
                    </div>
                </div>

                {/* Info Area */}
                <div className="p-5">
                    <h3 className="text-lg font-black text-slate-800 mb-1">{vehicle.model}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
                        <span>{vehicle.year}</span>
                        <span>•</span>
                        <span>{vehicle.mileage.toLocaleString()} km</span>
                        <span>•</span>
                        <span>{vehicle.location}</span>
                    </div>

                    {vehicle.dvaPremium && vehicle.dvaPremium > 0 && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-600 group-hover:text-white" />
                                <span className="text-[10px] font-black text-blue-600 group-hover:text-white uppercase">{t('market_dva_premium')}</span>
                            </div>
                            <span className="text-xs font-black text-blue-700 group-hover:text-white">+{vehicle.dvaPremium.toLocaleString()} OZC</span>
                        </div>
                    )}

                    <div className="w-full bg-slate-50 text-slate-400 py-3 rounded-xl font-bold text-center text-sm group-hover:bg-slate-950 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                        {t('market_view_details')}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VehicleCard;
