// app/governance/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/components/Web3Provider';
import { useI18n } from '@/hooks/useI18n';
import {
    Shield,
    CheckCircle,
    XCircle,
    Award,
    TrendingUp,
    Users,
    Zap,
    Star,
    ArrowUpRight,
    Flame,
    Share2,
    Layout,
    Landmark,
    TrendingDown,
    Gavel
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GovernanceService, { JuryTier, Case, Juror } from '@/services/GovernanceService';
import { JurySection, GenesisSection, PromotionSection, ConstitutionSection } from '@/components/governance/DAOSections';

type TabType = 'constitution' | 'jury' | 'genesis' | 'promotion';

export default function GovernancePage() {
    const { t, lang } = useI18n();
    const { account, signer } = useWeb3(); // Retaining 'signer' as per original logic, 'governanceService' would conflict with useState
    const [activeTab, setActiveTab] = useState<TabType>('constitution');
    const [governanceService, setGovernanceService] = useState<GovernanceService | null>(null);
    const [juror, setJuror] = useState<Juror | null>(null);
    const [pendingCases, setPendingCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);
    const [hasGenesisNFT] = useState(true); // Mocking Genesis NFT ownership for demo
    const [previewMode, setPreviewMode] = useState(false);

    const votingPowerBonus = hasGenesisNFT ? 1.1 : 1.0;
    const adjustedVotingPower = (juror?.votingPower || 1) * votingPowerBonus;

    // Initialize service
    useEffect(() => {
        if (signer) {
            const service = new GovernanceService(signer);
            setGovernanceService(service);
        }
    }, [signer]);

    // Load juror data
    useEffect(() => {
        async function loadJurorData() {
            if (!account || !governanceService) return;

            try {
                const stats = await governanceService.getJurorStats(account);
                setJuror(stats);
            } catch (error) {
                console.error('Failed to load juror data:', error);
                setJuror(null);
            } finally {
                setLoading(false);
            }
        }

        loadJurorData();
    }, [account, governanceService]);

    // Load pending cases
    useEffect(() => {
        async function loadCases() {
            if (!governanceService) return;

            try {
                const caseIds = await governanceService.getPendingCases();
                const cases = await Promise.all(
                    caseIds.map(id => governanceService.getCase(id))
                );
                setPendingCases(cases);
            } catch (error) {
                console.error('Failed to load cases:', error);
            }
        }

        if (juror?.isActive || previewMode) {
            loadCases();
        }
    }, [juror, previewMode, governanceService]);

    // Register as validator
    const handleRegister = async () => {
        if (!governanceService) return;

        setIsRegistering(true);
        try {
            // Attempt blockchain registration
            await governanceService.registerAsJuror(1);
            alert(t('success'));
            window.location.reload();
        } catch (error) {
            console.error('Registration failed:', error);
            // Graceful fallback: Suggest preview mode
            if (confirm(t('gov_fallback_confirm'))) {
                setPreviewMode(true);
                setJuror({
                    wallet: account || 'Guest',
                    tier: JuryTier.CITIZEN,
                    votingPower: 1.0,
                    accuracy: 0,
                    totalVotes: 0,
                    correctVotes: 0,
                    ownedVehicles: 0,
                    stakingAmount: '0',
                    isActive: false,
                    isTrial: true
                });
            }
        } finally {
            setIsRegistering(false);
        }
    };

    // Vote on case
    const handleVote = async (caseId: string, decision: boolean) => {
        if (!governanceService) return;

        try {
            await governanceService.vote(caseId, decision);
            alert(decision ? t('gov_vote_success_positive') : t('gov_vote_success_negative'));
            window.location.reload();
        } catch (error) {
            console.error('Vote failed:', error);
            alert(t('error'));
        }
    };

    // Tabs configuration
    const tabs = [
        { id: 'constitution', label: t('gov_tab_constitution'), icon: <Landmark size={16} /> },
        { id: 'jury', label: t('gov_tab_jury'), icon: <Shield size={16} /> },
        { id: 'genesis', label: t('nav_genesis'), icon: <Flame size={16} /> },
        { id: 'promotion', label: t('nav_promotion'), icon: <Share2 size={16} /> },
    ];

    if (!account) return (
        <div className="min-h-screen bg-[#010410] text-white py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <Shield className="w-20 h-20 text-blue-400 mb-6" />
                    <h2 className="text-4xl font-black text-white mb-4">{t('gov_wallet_required')}</h2>
                    <p className="text-slate-400 max-w-md">{t('gov_wallet_desc')}</p>
                </div>
            </div>
        </div>
    );

    if (!loading && !juror?.isActive && !previewMode) return (
        <div className="min-h-screen bg-[#010410] text-white py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">
                                {t('gov_onboard_title').split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}<br />
                                    </React.Fragment>
                                ))}
                            </h2>
                        </div>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed">
                            {t('gov_onboard_desc')}
                        </p>

                        <div className="space-y-4">
                            {[
                                { title: t('gov_onboard_feat1_title'), desc: t('gov_onboard_feat1_desc'), icon: <Award className="text-blue-400" /> },
                                { title: t('gov_onboard_feat2_title'), desc: t('gov_onboard_feat2_desc'), icon: <Shield className="text-blue-400" /> },
                                { title: t('gov_onboard_feat3_title'), desc: t('gov_onboard_feat3_desc'), icon: <TrendingUp className="text-blue-400" /> }
                            ].map((feat, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                                >
                                    <div className="p-2 bg-blue-500/10 rounded-xl">{feat.icon}</div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{feat.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={handleRegister}
                                disabled={isRegistering}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                {isRegistering ? t('gov_onboard_registering') : t('gov_onboard_register_btn')} <ArrowUpRight size={18} />
                            </button>
                            <button
                                onClick={() => setPreviewMode(true)}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10 transition-all"
                            >
                                {t('gov_onboard_preview_btn')}
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all"></div>
                        <div className="relative bg-[#121212] border border-white/5 rounded-[3.5rem] p-10 shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('gov_global_status')}</p>
                                    <p className="text-xl font-black text-white italic tracking-tighter uppercase">{t('gov_dao_active')}</p>
                                </div>
                                <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/30">
                                    <Zap size={24} className="fill-current" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('gov_active_juries')}</p>
                                        <p className="text-3xl font-black text-white italic tracking-tighter">1,204+</p>
                                    </div>
                                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('gov_total_rewards')}</p>
                                        <p className="text-3xl font-black text-blue-500 italic tracking-tighter">482K</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-blue-500/10 rounded-[2.5rem] border border-blue-500/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{t('gov_realtime_node')}</p>
                                    </div>
                                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                        {t('gov_onboard_node_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white pt-32 pb-20 font-sans overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">
                                DAO <span className="text-[#00ffc2] glow-text">{t('gov_portal')}</span>
                            </h1>
                            <div className="flex gap-2">
                                <span className="bg-[#00ffc2]/10 text-[#00ffc2] px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-[#00ffc2]/30 flex items-center gap-2">
                                    <Star size={12} className="fill-current" /> {t('gov_founder_prestige')}: {t('gov_tier_diamond')}
                                </span>
                                <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-blue-500/30 flex items-center gap-2">
                                    <Shield size={12} /> {t('gov_jury_honor')}: {t('gov_tier_master')}
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">{t('gov_dao_hub_desc')}</p>
                    </div>

                    {/* OIP-1 Spotlight Alert */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-r from-[#00ffc2]/20 to-transparent border-l-4 border-[#00ffc2] p-6 rounded-r-[2rem] max-w-md hidden lg:block"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Flame size={16} className="text-[#00ffc2] animate-pulse" />
                            <span className="text-[10px] font-black text-[#00ffc2] uppercase tracking-widest">{t('gov_oip_proposal_title')}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                            {t('gov_oip_proposal_desc')}
                        </p>
                        <button className="mt-3 text-[10px] font-black text-[#00ffc2] uppercase tracking-widest flex items-center gap-2 hover:underline">
                            {t('gov_vote_participation')} <ArrowUpRight size={14} />
                        </button>
                    </motion.div>

                    {/* Premium Tab Switcher */}
                    <div className="flex items-center p-1.5 bg-[#121212] rounded-[1.8rem] border border-white/5 shadow-2xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`
                                    relative flex items-center gap-3 px-8 py-4 rounded-[1.4rem] text-[11px] font-black uppercase tracking-widest transition-all
                                    ${activeTab === tab.id ? 'text-black' : 'text-slate-500 hover:text-white'}
                                `}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#00ffc2] rounded-[1.4rem] shadow-[0_0_20px_rgba(0,255,194,0.3)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.icon}</span>
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area with Animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {activeTab === 'constitution' && <ConstitutionSection />}
                        {activeTab === 'jury' && (
                            <JurySection
                                juror={juror}
                                pendingCases={pendingCases}
                                handleVote={handleVote}
                                getTierName={(tier) => governanceService?.getTierName(tier) || ''}
                                getCaseTypeName={(type) => governanceService?.getCaseTypeName(type) || ''}
                            />
                        )}
                        {activeTab === 'genesis' && <GenesisSection />}
                        {activeTab === 'promotion' && <PromotionSection />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
