"use client";

import React, { useState, useEffect } from 'react';
import { DigitalIdentityService, IdentityMetadata } from '@/services/DigitalIdentityService';
import { ZKPService, PrivacyProof } from '@/services/ZKPService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Shield,
    CheckCircle2,
    Lock,
    FileCheck,
    Award,
    Zap,
    ExternalLink,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useI18n } from '@/hooks/useI18n';

export default function VehiclePassportUI() {
    const { t } = useI18n();
    const [identity, setIdentity] = useState<IdentityMetadata | null>(null);
    const [proof, setProof] = useState<PrivacyProof | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        DigitalIdentityService.getVehiclePassport('OZ-777').then(setIdentity);
    }, []);

    const handleGenerateProof = async () => {
        setIsGenerating(true);
        const p = await ZKPService.generateSafeDriverProof('OZ-777', 30);
        setProof(p);
        setIsGenerating(false);
    };

    if (!identity) return null;

    const trustScore = DigitalIdentityService.calculateTrustFactor(identity);

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-6 bg-black text-slate-100 min-h-screen">
            {/* Passport Header */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <Shield className="w-12 h-12 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic">ozcar <span className="text-emerald-500">{t('hub_passport_title')}</span></h1>
                            <p className="text-slate-400 font-mono text-sm tracking-widest">{t('hub_passport_vin')}: OZ-DE-S32K3-777-BETA</p>
                            <div className="flex gap-2 mt-3">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{t('hub_passport_hw_secure')}</Badge>
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">{t('hub_passport_asil')}</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('hub_passport_trust_index')}</p>
                        <p className="text-6xl font-black text-emerald-500 tabular-nums">{trustScore.toFixed(1)}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Identity Metrics */}
                <Card className="bg-slate-950/50 border-slate-800 shadow-xl backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" /> {t('hub_passport_metrics')}
                        </CardTitle>
                        <CardDescription>{t('hub_passport_metrics_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { label: t('hub_passport_veracity'), value: identity.veracityScore, color: 'bg-emerald-500' },
                            { label: t('hub_passport_maintenance'), value: identity.maintenanceIndex, color: 'bg-blue-500' },
                            { label: t('hub_passport_safety'), value: identity.safetyRating, color: 'bg-indigo-500' }
                        ].map((metric, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">{metric.label}</span>
                                    <span className="font-mono font-bold text-slate-200">{metric.value}%</span>
                                </div>
                                <Progress value={metric.value} className={`h-2 bg-slate-800`} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* ZKP Proof Generator */}
                <Card className="bg-slate-950/50 border-slate-800 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                        <Lock className="w-5 h-5 text-slate-700 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-indigo-400" /> {t('hub_passport_zkp_title')}
                        </CardTitle>
                        <CardDescription>{t('hub_passport_zkp_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg text-xs text-indigo-300 leading-relaxed italic">
                            "{t('hub_passport_zkp_note')}"
                        </div>

                        {!proof && (
                            <Button
                                onClick={handleGenerateProof}
                                disabled={isGenerating}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        {t('hub_passport_zkp_computing')}
                                    </>
                                ) : (
                                    <>
                                        <FileCheck className="w-5 h-5 mr-2" /> {t('hub_passport_zkp_gen')}
                                    </>
                                )}
                            </Button>
                        )}

                        <AnimatePresence>
                            {proof && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3"
                                >
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                                        <CheckCircle2 className="w-5 h-5" /> {t('hub_passport_zkp_sealed')}
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[11px] text-slate-300 font-medium leading-tight">
                                            {proof.fact}
                                        </p>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{t('hub_passport_zkp_hash')}</span>
                                            <span className="text-[9px] font-mono text-emerald-500/70 truncate bg-black/40 p-2 rounded border border-emerald-500/10">
                                                {proof.proofHash}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="w-full h-8 text-[10px] text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                                        {t('hub_passport_zkp_share')} <ExternalLink className="w-3 h-3 ml-2" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Insight */}
            <div className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-white font-bold">{t('hub_passport_note_title')}:</span> {t('hub_passport_note_content')}
                </p>
            </div>
        </div>
    );
}
