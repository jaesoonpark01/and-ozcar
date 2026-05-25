// app/governance/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/components/Web3Provider';
import {
    Shield,
    CheckCircle,
    XCircle,
    Eye,
    Award,
    TrendingUp,
    Users,
    Zap,
    Star,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import GovernanceService, { JuryTier, CaseType, Case, Juror } from '@/services/GovernanceService';
import { ethers } from 'ethers';

export default function CommunityGovernancePage() {
    const { account, signer } = useWeb3();
    const [governanceService, setGovernanceService] = useState<GovernanceService | null>(null);
    const [juror, setJuror] = useState<Juror | null>(null);
    const [pendingCases, setPendingCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);

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

        if (juror?.isActive) {
            loadCases();
        }
    }, [juror, governanceService]);

    // Register as juror
    const handleRegister = async () => {
        if (!governanceService) return;

        setIsRegistering(true);
        try {
            // For demo: assume 1 vehicle owned
            await governanceService.registerAsJuror(1);
            alert('배심원 등록 성공! 이제 케이스를 검토할 수 있습니다.');
            window.location.reload();
        } catch (error) {
            console.error('Registration failed:', error);
            alert('등록 실패. 최소 10 OZC를 스테이킹해야 합니다.');
        } finally {
            setIsRegistering(false);
        }
    };

    // Vote on case
    const handleVote = async (caseId: string, decision: boolean) => {
        if (!governanceService) return;

        try {
            await governanceService.vote(caseId, decision);
            alert(decision ? '✅ 정당한 케이스로 투표했습니다!' : '❌ 부정 케이스로 신고했습니다!');
            // Refresh cases
            window.location.reload();
        } catch (error) {
            console.error('Vote failed:', error);
            alert('투표 실패');
        }
    };

    // Not connected
    if (!account) return (
        <div className="min-h-screen bg-[#010410] text-white py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <Shield className="w-20 h-20 text-blue-400 mb-6" />
                    <h2 className="text-4xl font-black text-white mb-4">지갑 연결 필요</h2>
                    <p className="text-slate-400 max-w-md">
                        OZCAR 커뮤니티 거버넌스에 참여하려면 지갑을 연결해주세요.
                    </p>
                </div>
            </div>
        </div>
    );

    // Not registered
    if (!loading && !juror?.isActive) return (
        <div className="min-h-screen bg-[#010410] text-white py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-[3rem] p-16 text-center">
                    <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Users className="w-12 h-12 text-blue-400" />
                    </div>

                    <h2 className="text-5xl font-black text-white mb-6">
                        배심원으로 참여하세요
                    </h2>

                    <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                        OZCAR 커뮤니티의 중요한 결정에 참여하고 <span className="text-blue-400 font-bold">OZC 토큰 보상</span>을 받으세요.
                        일반 차주라면 누구나 환영합니다!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">케이스 검토</h3>
                            <p className="text-sm text-slate-400">정비 기록, 분쟁 등을 공정하게 심사</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">보상 획득</h3>
                            <p className="text-sm text-slate-400">정확한 투표 시 OZC 토큰 지급</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">등급 상승</h3>
                            <p className="text-sm text-slate-400">정확도에 따라 Expert, Grand Jury로 승급</p>
                        </div>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6 mb-8 text-left">
                        <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">가입 요건</h4>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span>차량 1대 이상 보유 (NFT 소유권)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span>최소 10 OZC 스테이킹 (언제든 회수 가능)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span>공정한 판단 의지</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={handleRegister}
                        disabled={isRegistering}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isRegistering ? '등록 중...' : '배심원 등록하기 →'}
                    </button>

                    <p className="text-xs text-slate-500 mt-6">
                        등록 후 즉시 케이스 검토를 시작할 수 있습니다
                    </p>
                </div>
            </div>
        </div>
    );

    // Active juror dashboard
    return (
        <div className="min-h-screen bg-[#010410] text-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-5xl font-black text-blue-900 tracking-tight">
                                Community <span className="text-blue-400">Governance</span>
                            </h1>
                            <span className="bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase border border-blue-500/30">
                                {governanceService?.getTierName(juror?.tier || JuryTier.CITIZEN)}
                            </span>
                        </div>
                        <p className="text-slate-400 font-medium">
                            커뮤니티의 신뢰를 지키는 배심원이 되어주셔서 감사합니다
                        </p>
                    </div>

                    <Link
                        href="/governance/onboarding"
                        className="flex items-center gap-2 text-blue-400 font-bold hover:underline text-sm"
                    >
                        튜토리얼 보기 <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                        {/* Voting Power */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl">
                            <Zap className="w-8 h-8 mb-4 opacity-80" />
                            <h3 className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">
                                투표력
                            </h3>
                            <div className="text-6xl font-black mb-2">{juror?.votingPower || 1}x</div>
                            <p className="text-xs opacity-80 leading-relaxed">
                                정확도와 등급에 따라 투표력이 결정됩니다
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
                                나의 활동
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between font-bold text-sm">
                                    <span className="text-slate-400">총 투표</span>
                                    <span className="text-white">{juror?.totalVotes || 0}</span>
                                </div>
                                <div className="flex justify-between font-bold text-sm">
                                    <span className="text-slate-400">정확한 투표</span>
                                    <span className="text-green-400">{juror?.correctVotes || 0}</span>
                                </div>
                                <div className="flex justify-between font-bold text-sm">
                                    <span className="text-slate-400">정확도</span>
                                    <span className="text-blue-400">{juror?.accuracy || 0}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Tier Upgrade */}
                        {juror && governanceService?.canUpgradeToExpert(juror) && juror.tier === JuryTier.CITIZEN && (
                            <div className="bg-yellow-600/10 border border-yellow-500/30 p-6 rounded-2xl">
                                <Award className="w-6 h-6 text-yellow-400 mb-3" />
                                <h4 className="text-sm font-black text-white mb-2">승급 가능!</h4>
                                <p className="text-xs text-slate-400 mb-4">
                                    Expert Jury로 업그레이드하여 3배의 투표력을 얻으세요
                                </p>
                                <button className="w-full bg-yellow-600 text-white py-2 rounded-xl text-xs font-black hover:bg-yellow-700 transition">
                                    승급하기
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Cases List */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-4">
                            검토 대기 중인 케이스
                        </h3>

                        {pendingCases.length === 0 ? (
                            <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-[2.5rem] p-16 text-center">
                                <Eye className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400 font-bold">현재 검토 대기 중인 케이스가 없습니다</p>
                                <p className="text-sm text-slate-500 mt-2">새로운 케이스가 등록되면 알림을 받게 됩니다</p>
                            </div>
                        ) : (
                            pendingCases.map((caseData) => (
                                <div
                                    key={caseData.id}
                                    className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-xs font-mono text-slate-500">
                                                    #{caseData.id.slice(0, 8)}...
                                                </span>
                                                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                    {governanceService?.getCaseTypeName(caseData.caseType)}
                                                </span>
                                            </div>

                                            <h4 className="text-xl font-black text-white mb-2">
                                                케이스 검증 요청
                                            </h4>

                                            <p className="text-sm text-slate-400">
                                                제출자: {caseData.submitter.slice(0, 6)}...{caseData.submitter.slice(-4)}
                                            </p>

                                            <div className="mt-4 text-xs text-slate-500">
                                                마감: {new Date(caseData.deadline * 1000).toLocaleString('ko-KR')}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <button
                                                onClick={() => handleVote(caseData.id, true)}
                                                className="flex-1 md:flex-none p-4 rounded-xl bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-500/20"
                                                title="정당한 케이스"
                                            >
                                                <CheckCircle className="w-6 h-6" />
                                            </button>

                                            <button
                                                onClick={() => handleVote(caseData.id, false)}
                                                className="flex-1 md:flex-none p-4 rounded-xl bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-500/20"
                                                title="부정 케이스"
                                            >
                                                <XCircle className="w-6 h-6" />
                                            </button>

                                            <Link
                                                href={`/governance/case/${caseData.id}`}
                                                className="flex-1 md:flex-none p-4 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 transition-all shadow-sm border border-white/10"
                                                title="상세 보기"
                                            >
                                                <Eye className="w-6 h-6" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
