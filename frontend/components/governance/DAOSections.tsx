"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Zap,
    ChevronRight,
    CheckCircle,
    Flame,
    Star,
    Instagram,
    Twitter,
    Share2,
    AlertCircle,
    Eye,
    Users,
    TrendingUp,
    XCircle,
    Award,
    Car,
    Target,
    Vote,
    Landmark,
    Shield,
    Activity
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { NotificationService } from '@/services/NotificationService';
import { useWeb3 } from '@/components/Web3Provider';
import { promotionService } from '@/services/PromotionService';
import { JuryTier, Case } from '@/services/GovernanceService';

// --- Genesis Drive Section ---
export const GenesisSection = () => {
    const { account, connectWallet } = useWeb3();
    const [step, setStep] = useState(1);
    const [isMinting, setIsMinting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleStart = () => {
        if (!account) {
            connectWallet();
            return;
        }
        setStep(2);
    };

    const handleMint = async () => {
        setIsMinting(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsMinting(false);
        setIsComplete(true);
        NotificationService.sendGenesisLaunchAlimTalk("010-1234-5678", account ? account.substring(0, 6) : "Ozcar Driver");
    };

    return (
        <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ffc2]/10 border border-[#00ffc2]/30 text-[#00ffc2] text-[10px] font-black uppercase tracking-widest mb-6">
                    <Flame size={14} className="animate-pulse" />
                    <span>Ozcar DAO Genesis Drive</span>
                </div>
                <h2 className="text-5xl font-black italic uppercase italic mb-4">Genesis <span className="text-[#00ffc2]">Founder NFT</span></h2>
                <p className="text-slate-400 font-medium max-w-2xl mx-auto">
                    드라이버의 시대가 열렸습니다. Ozcar DAO의 첫 번째 파운더가 되어 투표권 가중치 혜택을 누리세요.
                </p>
            </motion.div>

            <div className="bg-[#121212]/50 border border-white/5 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="g1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black italic uppercase">DAO 출범 선언문</h3>
                                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-slate-300 space-y-4 max-h-60 overflow-y-auto custom-scrollbar text-sm leading-relaxed">
                                    <p className="text-white font-bold">&quot;본 데이터의 주권은 드라이버에게 있음을 선언합니다.&quot;</p>
                                    <p>본인은 Ozcar DAO의 멤버로서 차량 데이터의 투명한 기록과 정직한 거버넌스 참여를 통해 생태계의 가치를 높이는 데 기여할 것을 선언합니다.</p>
                                    <p>1. 모든 데이터는 위변조 없이 블록체인에 기록됩니다.</p>
                                    <p>2. 평판 시스템에 따른 권한과 의무를 성실히 수행합니다.</p>
                                </div>
                            </div>
                            <button onClick={handleStart} className="w-full py-5 rounded-xl bg-[#00ffc2] text-black font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 hover:scale-[1.01]">
                                {account ? '선언문에 동의하고 시작하기' : '지갑 연결하고 시작하기'}
                                <ChevronRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && !isComplete && (
                        <motion.div key="g2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center space-y-10">
                            <div className="relative w-48 h-60 mx-auto">
                                <div className="absolute inset-0 bg-[#00ffc2]/20 blur-[40px] animate-pulse" />
                                <div className="relative w-full h-full bg-gradient-to-br from-[#121212] to-black rounded-[2rem] border border-[#00ffc2]/30 p-5 flex flex-col justify-between overflow-hidden shadow-2xl">
                                    <ShieldCheck className="text-[#00ffc2]/10 absolute -right-4 -bottom-4 w-32 h-32" />
                                    <Star size={18} className="text-[#00ffc2]" />
                                    <div className="text-left">
                                        <p className="text-[10px] text-[#00ffc2] font-black uppercase tracking-widest">Genesis Founder</p>
                                        <p className="text-xl font-black italic uppercase leading-none">Founder<br />NFT</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleMint} disabled={isMinting} className={`w-full py-5 rounded-xl font-black uppercase transition-all ${isMinting ? 'bg-white/5 text-slate-500' : 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20'}`}>
                                {isMinting ? '블록체인 기록 중...' : 'GENESIS FOUNDER NFT 민팅'}
                            </button>
                        </motion.div>
                    )}

                    {isComplete && (
                        <motion.div key="g3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/20">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-3xl font-black italic uppercase">Welcome, Founder!</h3>
                            <p className="text-slate-400 font-medium">거버넌스 투표 가중치 +10% 혜택이 즉시 적용되었습니다.</p>
                            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-left text-xs space-y-2">
                                <p>• 투표권 가중치 +10% 즉시 적용</p>
                                <p>• 파트너 정비소 우선 예약권 활성화</p>
                                <p>• VIP 커뮤니티 접근 권한</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Promotion Section ---
export const PromotionSection = () => {
    const { account } = useWeb3();
    const [shareUrl, setShareUrl] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [message, setMessage] = useState('');

    const handleClaim = async () => {
        if (!shareUrl) return;
        setStatus('PROCESSING');
        try {
            const result = await promotionService.claimShareReward('MOCK-NFT-ID', shareUrl);
            if (result.success) {
                setStatus('SUCCESS');
                setMessage(result.message);
            } else {
                setStatus('ERROR');
                setMessage(result.message);
            }
        } catch (error) {
            setStatus('ERROR');
            setMessage('처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <h2 className="text-5xl font-black italic uppercase mb-2">Share & <span className="text-[#00ffc2]">Earn</span></h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">내 차의 가치를 공유하고 OZC 토큰을 받으세요</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="bg-[#121212] border border-white/5 p-1 rounded-[2.5rem] aspect-[3/4.5] relative overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffc2]/5 to-transparent"></div>
                    <div className="p-8 h-full flex flex-col justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <ShieldCheck className="w-6 h-6 text-[#00ffc2]" />
                            <span className="text-[9px] font-black bg-[#00ffc2]/10 text-[#00ffc2] px-2 py-1 rounded-md uppercase">Certified NFT</span>
                        </div>
                        <div className="space-y-4">
                            <div className="w-full h-32 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-[10px] font-black italic text-slate-700">PREVIEW</div>
                            <div>
                                <p className="text-[9px] text-slate-500 font-black uppercase">Market Value</p>
                                <p className="text-xl font-black italic text-[#00ffc2]">32,400 OZC</p>
                            </div>
                        </div>
                    </div>
                    <Share2 className="absolute bottom-6 right-6 w-5 h-5 text-[#00ffc2]/30 group-hover:text-[#00ffc2] transition-colors" />
                </div>

                <div className="space-y-6">
                    <div className="bg-[#121212] border border-white/5 p-8 rounded-[2rem]">
                        <h4 className="text-sm font-black uppercase italic mb-4">홍보 링크 제출</h4>
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="https://instagram.com/p/..."
                                    value={shareUrl}
                                    onChange={(e) => setShareUrl(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xs font-medium focus:outline-none focus:border-[#00ffc2]/50"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                    <Instagram size={14} className="text-slate-600" />
                                    <Twitter size={14} className="text-slate-600" />
                                </div>
                            </div>
                            <button onClick={handleClaim} disabled={status === 'PROCESSING' || !shareUrl} className="w-full bg-[#00ffc2] text-black py-4 rounded-xl font-black uppercase italic text-xs tracking-[0.1em] hover:scale-[1.02] disabled:opacity-50 transition-all">
                                {status === 'PROCESSING' ? 'AI 분석 중...' : '리워드 받기 →'}
                            </button>
                        </div>
                        {status === 'SUCCESS' && <p className="mt-4 text-[10px] text-green-400 font-bold">{message}</p>}
                        {status === 'ERROR' && <p className="mt-4 text-[10px] text-red-400 font-bold">{message}</p>}
                    </div>

                    <div className="bg-[#00ffc2]/5 border border-[#00ffc2]/10 p-6 rounded-2xl flex items-center gap-4">
                        <AlertCircle className="w-5 h-5 text-[#00ffc2]" />
                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">AI 모델이 활동의 진위 여부를 분석합니다. 비정상 접근 시 평판이 하락할 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Jury Section (Current Governance) ---
export const JurySection = ({
    juror,
    pendingCases,
    handleVote,
    getTierName,
    getCaseTypeName
}: {
    juror: any,
    pendingCases: Case[],
    handleVote: (id: string, decision: boolean) => void,
    getTierName: (tier: JuryTier) => string,
    getCaseTypeName: (type: number) => string
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="space-y-6">
                <div className="bg-[#121212] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <Zap className="w-8 h-8 text-[#00ffc2]" />
                        {juror?.isTrial && (
                            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-black rounded-full uppercase tracking-widest animate-pulse">
                                수습 대원 (Trial)
                            </span>
                        )}
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.1em] mb-2 text-slate-500">참여 가치 (Score)</h3>
                    <div className="flex items-baseline gap-2">
                        <div className="text-6xl font-black italic text-white tracking-tighter">{(juror?.votingPower || 1).toFixed(1)}</div>
                        <div className="text-xl font-black text-[#00ffc2] italic text-xs">P</div>
                    </div>
                    <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#00ffc2] h-full" style={{ width: '75%' }}></div>
                    </div>
                </div>

                <div className="bg-[#121212] border border-white/5 p-8 rounded-[2rem]">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">검증 성과</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase italic">전체 참여</span>
                            <span className="text-sm font-black text-white">{juror?.totalVotes || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase italic">정확도</span>
                            <span className="text-sm font-black text-[#00ffc2]">{juror?.correctVotes || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
                <div className="flex justify-between items-center px-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">검증 대기 열</h3>
                </div>

                {pendingCases.length === 0 ? (
                    <div className="bg-[#121212] border border-dashed border-white/10 rounded-[2.5rem] p-20 text-center">
                        <Eye className="w-8 h-8 text-slate-700 mx-auto mb-4" />
                        <p className="text-white font-black uppercase italic text-sm">대기 중인 케이스 없음</p>
                    </div>
                ) : (
                    pendingCases.map((caseData) => (
                        <div key={caseData.id} className="bg-[#121212]/50 border border-white/5 p-8 rounded-[2.5rem] hover:border-[#00ffc2]/30 transition-all">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-white/5 text-slate-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/5">ID: {caseData.id.slice(0, 8)}</span>
                                        <span className="text-[#00ffc2] text-[8px] font-black uppercase tracking-widest">{getCaseTypeName(caseData.caseType)}</span>
                                    </div>
                                    <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">검증 요청</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Users size={12} /> {caseData.submitter.slice(0, 6)}...
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleVote(caseData.id, true)} className="w-12 h-12 rounded-xl bg-white/5 text-white hover:bg-[#00ffc2] hover:text-black transition-all flex items-center justify-center">
                                        <CheckCircle size={18} />
                                    </button>
                                    <button onClick={() => handleVote(caseData.id, false)} className="w-12 h-12 rounded-xl bg-white/5 text-white hover:bg-red-500 transition-all flex items-center justify-center">
                                        <XCircle size={18} />
                                    </button>
                                    <Link href={`/governance/case/${caseData.id}`} className="px-6 py-4 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 transition-all text-[9px] font-black uppercase tracking-widest">상세</Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// --- Portal Apps Section ---
export const PortalAppsSection = () => {
    const { t } = useI18n();

    const apps = [
        { href: '/vehicle/onboarding', title: t('nav_onboarding'), desc: '차량 정보를 등록하고 Genesis NFT를 발급받으세요.', icon: <Car size={24} className="text-[#00ffc2]" /> },
        { href: '/vehicle/mining-report', title: t('nav_mining_report'), desc: '주행 데이터를 인증하고 달성한 보상을 확인하세요.', icon: <Star size={24} className="text-[#00ffc2]" /> },
        { href: '/leaderboard', title: t('nav_leaderboard'), desc: 'Sovereign 랭킹을 확인하고 톱 플레이어들을 만나보세요.', icon: <Activity size={24} className="text-[#00ffc2]" /> },
        { href: '/justice-center', title: t('nav_justice'), desc: 'AI 제재 내역을 확인하고 증빙을 등록해 소명할 수 있습니다.', icon: <Shield size={24} className="text-[#00ffc2]" /> },
        { href: '/jury', title: t('nav_jury'), desc: '검증 대원의 자격으로 유저 소명을 평가하고 보상을 얻으세요.', icon: <Target size={24} className="text-[#00ffc2]" /> },
        { href: '/governance/vote', title: t('nav_gov_vote'), desc: '생태계의 주요 정책과 OZC 보상률 결정에 투표하세요.', icon: <Vote size={24} className="text-[#00ffc2]" /> },
        { href: '/governance/report', title: t('nav_gov_report'), desc: '파운더 대상의 B2B 수익 및 재무 현황을 브리핑합니다.', icon: <Landmark size={24} className="text-[#00ffc2]" /> },
    ];

    return (
        <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <h2 className="text-5xl font-black italic uppercase mb-2">Ecosystem <span className="text-[#00ffc2]">Portal</span></h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">오즈카 생태계의 모든 핵심 기능에 접근하세요</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={app.href}
                    >
                        <Link href={app.href} className="group block h-full bg-[#121212]/50 border border-white/5 hover:border-[#00ffc2]/30 p-8 rounded-[2.5rem] transition-all hover:bg-[#121212]/80 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#00ffc2]/0 to-[#00ffc2]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-4 bg-white/5 w-fit rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                                    {app.icon}
                                </div>
                                <h3 className="text-xl font-black italic text-white mb-3 group-hover:text-[#00ffc2] transition-colors uppercase">{app.title}</h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 flex-1">
                                    {app.desc}
                                </p>
                                <div className="flex items-center gap-2 mt-auto">
                                    <span className="text-[9px] font-black uppercase text-[#00ffc2] tracking-widest">Explore</span>
                                    <ChevronRight size={14} className="text-[#00ffc2] group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
