// components/user/AIReservationCard.tsx
"use client";

import React from 'react';
import { Calendar, MapPin, Wrench, Check, ArrowRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface AIRecommendation {
    part: string;
    urgency: 'GOOD' | 'CAUTION' | 'URGENT';
    recommendedShop: {
        id: string;
        name: string;
        distance: number;
        location: string;
        rating: number;
    };
    availableTime: string;
}

export default function AIReservationCard({ aiRecommendation }: { aiRecommendation: AIRecommendation }) {
    const { part, urgency, recommendedShop, availableTime } = aiRecommendation;
    const { t } = useI18n();

    const handleOneTouchBooking = (shopId: string, time: string) => {
        console.log(`Booking confirmed for shop ${shopId} at ${time}`);
        // For demonstration, keep alert but could use a better toast
        alert(`${t('garage_success_title')}!\n${t('comp_shop_recommend')}: ${recommendedShop.name}\n${time}`);
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-blue-50 relative group transition-all hover:shadow-blue-500/10 overflow-hidden">
            {/* Urgency Indicator Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${urgency === 'URGENT' ? 'bg-red-500' : 'bg-[#0052FF]'}`} />

            <div className="flex items-center gap-2 mb-6 text-[#0052FF]">
                <div className="bg-blue-50 p-2.5 rounded-2xl">
                    <Wrench className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{t('comp_ai_guardian')}</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
                {t('comp_ai_urgent_title').replace('{part}', part)}
            </h3>
            <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
                {t('comp_ai_analysis_desc')}
            </p>

            {/* Recommended Shop Summary */}
            <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border border-slate-100 transition-colors group-hover:bg-blue-50/50">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('comp_shop_recommend')}</p>
                        <p className="text-lg font-black text-slate-900">{recommendedShop.name} <span className="text-[#0052FF] ml-1">★ {recommendedShop.rating}</span></p>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] font-black shadow-sm">
                        {recommendedShop.distance}km
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {availableTime}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {recommendedShop.location}
                    </div>
                </div>
            </div>

            {/* One-touch Booking Button */}
            <button
                onClick={() => handleOneTouchBooking(recommendedShop.id, availableTime)}
                className="w-full py-5 bg-[#0052FF] text-white rounded-[1.5rem] font-black text-sm shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-blue-600"
            >
                {t('comp_one_touch_booking')}
                <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-[10px] font-bold text-slate-400 mt-4 opacity-60">
                {t('comp_booking_notice')}
            </p>
        </div>
    );
}
