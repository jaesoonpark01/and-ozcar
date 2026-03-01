"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Activity,
    Share2,
    MapPin,
    Wrench,
    Calendar,
    ChevronRight,
    Search,
    UserCheck,
    Car
} from "lucide-react";
import { motion } from "framer-motion";

import { useI18n } from '@/hooks/useI18n';

export default function WorkshopMatchingUI() {
    const { t } = useI18n();
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'matching' | 'notified'>('notified');

    const workshops = [
        { id: 1, name: "Ozcar Certified Gangnam-1", distance: "1.2km", specialized: "Electrical/ECU", rating: 4.8 },
        { id: 2, name: "AutoFix Seoul", distance: "2.5km", specialized: "Brake System", rating: 4.9 },
        { id: 3, name: "Elite Mobility Lab", distance: "4.0km", specialized: "General Diagnostics", rating: 4.6 },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-4">
            {/* Context Awareness Section */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex gap-4">
                <div className="p-3 bg-amber-500/20 rounded-full h-fit mt-1">
                    <Activity className="w-6 h-6 text-amber-500" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-amber-500 font-bold text-sm uppercase tracking-wider">{t('hub_workshop_alert_title')}</h3>
                    <div className="text-slate-200 text-sm leading-relaxed">
                        {t('hub_workshop_alert_content')} <br />
                        <span className="font-bold underline decoration-amber-500/50 cursor-pointer">{t('hub_workshop_view_report')}</span>
                    </div>
                </div>
            </div>

            {/* Matching Section */}
            <Card className="bg-slate-900 border-slate-800 border-t-4 border-t-indigo-500 shadow-2xl">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-white text-xl flex items-center gap-2">
                                <Search className="w-5 h-5 text-indigo-400" /> {t('hub_workshop_match_title')}
                            </CardTitle>
                            <CardDescription>{t('hub_workshop_match_desc')}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-indigo-400 border-indigo-500/30">{t('hub_workshop_ai_curated')}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {workshops.map((shop, i) => (
                        <motion.div
                            key={shop.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-xl hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-500/20">
                                    <Wrench className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-100">{shop.name}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                        <MapPin className="w-3 h-3" /> {shop.distance}
                                        <span className="text-slate-700">|</span>
                                        <span className="text-indigo-400 font-medium">{t('hub_workshop_spec')}: {shop.specialized}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400" />
                        </motion.div>
                    ))}

                    <div className="pt-4">
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 gap-2 shadow-lg shadow-indigo-500/20">
                            <Calendar className="w-4 h-4" /> {t('hub_workshop_reserve')}
                        </Button>
                        <p className="text-[10px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1">
                            <UserCheck className="w-3 h-3" /> {t('hub_workshop_reserve_note')}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Founder Insight */}
            <div className="flex items-center gap-4 p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl mt-8">
                <Share2 className="w-6 h-6 text-indigo-400 shrink-0" />
                <div className="space-y-1">
                    <p className="text-[11px] font-bold text-indigo-300">{t('hub_workshop_insight_title')}:</p>
                    <p className="text-[10px] text-indigo-200/70 leading-relaxed italic">
                        "{t('hub_workshop_insight_content')}"
                    </p>
                </div>
            </div>
        </div>
    );
}
