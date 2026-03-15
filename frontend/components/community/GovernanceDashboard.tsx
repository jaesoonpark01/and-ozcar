import React, { useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { ShieldCheck, Flame, Scale, CheckCircle2, XCircle, MinusCircle, Info, Send, Landmark } from 'lucide-react';

export default function GovernanceDashboard() {
    const { t } = useI18n();
    const [hasVoted, setHasVoted] = useState(false);
    const [voteChoice, setVoteChoice] = useState<'FOR' | 'AGAINST' | 'ABSTAIN' | null>(null);
    const [voteRatio, setVoteRatio] = useState({ for: 68, against: 24, abstain: 8 });

    const handleVote = (choice: 'FOR' | 'AGAINST' | 'ABSTAIN') => {
        if (hasVoted) return;
        setVoteChoice(choice);
        setHasVoted(true);
        
        // 투표 시 비율 가짜 업데이트 효과
        setVoteRatio(prev => {
            if (choice === 'FOR') return { ...prev, for: prev.for + 1 };
            if (choice === 'AGAINST') return { ...prev, against: prev.against + 1 };
            return { ...prev, abstain: prev.abstain + 1 };
        });
    };

    return (
        <div className="flex flex-col gap-6 text-slate-200">
            {/* Top Bar Status */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        <Landmark className="text-white" size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">{t('nav_founder_portal')}</p>
                        <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                            {t('gov_dash_role')}
                        </h2>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-6">
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <Scale size={14} className="text-teal-400" /> {t('gov_dash_voting_power')}
                        </p>
                        <p className="text-2xl font-mono font-bold text-white">1,240 <span className="text-sm font-sans font-medium text-slate-500">VP</span></p>
                    </div>
                    <div className="w-px h-10 bg-slate-800" />
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <ShieldCheck size={14} className="text-emerald-400" /> {t('gov_dash_status_active')}
                        </p>
                        <p className="text-sm font-semibold text-emerald-400">{t('gov_dash_quorum')}</p>
                    </div>
                </div>
            </div>

            {/* Main Proposal Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-teal-900/40 text-teal-400 text-xs font-bold px-3 py-1 rounded-full border border-teal-800">
                                Proposal
                            </span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Flame size={14} className="text-amber-500" /> {t('gov_dash_ends_in')}
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                            {t('gov_dash_oip1_title')}
                        </h3>
                        <p className="text-slate-400 leading-relaxed max-w-3xl">
                            {t('gov_dash_oip1_desc')}
                        </p>
                    </div>
                </div>

                {/* Vote Progress Bar */}
                <div className="mb-8">
                    <p className="text-sm font-bold text-slate-300 mb-3">{t('gov_dash_current_votes')}</p>
                    <div className="flex h-3 rounded-full overflow-hidden mb-2 bg-slate-800">
                        <div style={{ width: `${voteRatio.for}%` }} className="bg-emerald-500 transition-all duration-1000" />
                        <div style={{ width: `${voteRatio.against}%` }} className="bg-rose-500 transition-all duration-1000" />
                        <div style={{ width: `${voteRatio.abstain}%` }} className="bg-slate-500 transition-all duration-1000" />
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                        <span className="text-emerald-500">FOR {voteRatio.for}%</span>
                        <span className="text-slate-500">ABSTAIN {voteRatio.abstain}%</span>
                        <span className="text-rose-500">AGAINST {voteRatio.against}%</span>
                    </div>
                </div>

                {/* Action Buttons */}
                {!hasVoted ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button 
                            onClick={() => handleVote('FOR')}
                            className="bg-emerald-900/30 hover:bg-emerald-600 border border-emerald-800 hover:border-emerald-500 text-emerald-400 hover:text-white transition-all duration-300 py-4 rounded-xl flex items-center justify-center gap-2 font-bold group"
                        >
                            <CheckCircle2 className="group-hover:scale-110 transition-transform" /> 
                            {t('gov_dash_vote_for')}
                        </button>
                        <button 
                            onClick={() => handleVote('AGAINST')}
                            className="bg-rose-900/30 hover:bg-rose-600 border border-rose-800 hover:border-rose-500 text-rose-400 hover:text-white transition-all duration-300 py-4 rounded-xl flex items-center justify-center gap-2 font-bold group"
                        >
                            <XCircle className="group-hover:scale-110 transition-transform" /> 
                            {t('gov_dash_vote_against')}
                        </button>
                        <button 
                            onClick={() => handleVote('ABSTAIN')}
                            className="bg-slate-800 hover:bg-slate-600 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all duration-300 py-4 rounded-xl flex items-center justify-center gap-2 font-bold group"
                        >
                            <MinusCircle className="group-hover:scale-110 transition-transform" /> 
                            {t('gov_dash_vote_abstain')}
                        </button>
                    </div>
                ) : (
                    <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-xl p-5 flex items-center justify-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={24} />
                        <p className="text-emerald-400 font-bold text-lg">
                            투표가 완료되었습니다 (선택: {voteChoice})
                        </p>
                    </div>
                )}
                <div className="mt-4 text-center">
                    <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                        <Info size={12} /> {t('gov_dash_gas_fee')}
                    </p>
                </div>
            </div>

            {/* Debate Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                        <Send size={16} /> FOR {t('gov_dash_debate_title')}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {t('gov_dash_debate_pro')}
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h4 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
                        <Send size={16} /> AGAINST {t('gov_dash_debate_title')}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {t('gov_dash_debate_con')}
                    </p>
                </div>
            </div>
        </div>
    );
}
