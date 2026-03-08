"use client";

import React, { useState } from 'react';
import { Trophy, Medal, Star, Flame, Target, ChevronRight } from 'lucide-react';

// 모의 데이터
const LEAGUES = ['브론즈', '실버', '골드', '플래티넘'];
const MOCK_RANKINGS = [
    { rank: 1, name: "오즈의마법사", car: "아이오닉 6", score: 98, isMe: false },
    { rank: 2, name: "전비왕제이", car: "아이오닉 6", score: 95, isMe: false },
    { rank: 3, name: "에코부스터", car: "아이오닉 6", score: 91, isMe: false },
    { rank: 4, name: "EV마스터", car: "아이오닉 6", score: 88, isMe: false },
    { rank: 5, name: "칠공이엄마", car: "아이오닉 6", score: 85, isMe: true }, // 본인
    { rank: 6, name: "조용한질주", car: "아이오닉 6", score: 82, isMe: false },
];

export default function CommunityRanking() {
    const [activeTab, setActiveTab] = useState<'league' | 'model'>('model');

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden text-white flex flex-col h-full shadow-2xl">

            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-6 pb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <h2 className="text-2xl font-black flex items-center gap-2">
                            <Trophy className="text-yellow-400" size={26} /> ozcar 챌린지
                        </h2>
                        <p className="text-blue-300/80 text-sm mt-1">시즌 1: 에코 드라이버를 찾아라</p>
                    </div>
                    <div className="bg-slate-950/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/5 flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">My League</span>
                        <span className="text-amber-500 font-black text-sm flex items-center gap-1"><Star size={12} /> 골드</span>
                    </div>
                </div>

                {/* 탭 메뉴 */}
                <div className="flex gap-2 mt-6 bg-slate-950/30 p-1.5 rounded-2xl w-max border border-white/5 backdrop-blur-md relative z-10">
                    <button
                        onClick={() => setActiveTab('model')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'model' ? 'bg-blue-600 shadow-md text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        동일 차종 (아이오닉6)
                    </button>
                    <button
                        onClick={() => setActiveTab('league')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'league' ? 'bg-indigo-600 shadow-md text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        전체 (골드 리그)
                    </button>
                </div>
            </div>

            {/* 미션 배너 */}
            <div className="px-6 -mt-4 relative z-20">
                <div className="bg-gradient-to-r from-orange-500/20 to-rose-500/20 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-4 flex justify-between items-center shadow-lg">
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 shrink-0">
                            <Flame size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-orange-300 font-bold uppercase tracking-wider mb-0.5">주간 미션</p>
                            <p className="font-bold text-sm">급가속 0회 달성하기</p>
                        </div>
                    </div>
                    <button className="text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-500/20 transition-colors">
                        보상 2,000P
                    </button>
                </div>
            </div>

            {/* 랭킹 리스트 */}
            <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
                <div className="flex flex-col gap-2 relative pb-20">
                    {MOCK_RANKINGS.map((row) => {
                        const isTop3 = row.rank <= 3;
                        // 1위 금, 2위 은, 3위 동
                        const medalColor =
                            row.rank === 1 ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' :
                                row.rank === 2 ? 'text-slate-300' :
                                    row.rank === 3 ? 'text-amber-600' : 'text-slate-500';

                        return (
                            <div
                                key={row.rank}
                                className={`flex items-center justify-between p-4 rounded-2xl transition-all
                  ${row.isMe ? 'bg-blue-600/20 border border-blue-500/40 shadow-inner' : 'bg-slate-800/40 border border-transparent hover:bg-slate-800'}
                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 text-center font-black ${isTop3 ? medalColor : 'text-slate-500'} flex justify-center`}>
                                        {isTop3 ? <Medal size={24} className={medalColor} /> : row.rank}
                                    </div>

                                    {/* 프로필 이미지 (임시 목업 아바타 대신 로고류) */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${row.isMe ? 'bg-blue-600 border-blue-400' : 'bg-slate-700 border-slate-600'}`}>
                                        {row.isMe ? '나' : row.name.charAt(0)}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className={`font-bold text-sm ${row.isMe ? 'text-blue-300' : 'text-white'}`}>
                                                {row.name}
                                            </p>
                                            {row.isMe && <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded uppercase font-black tracking-widest leading-none">Me</span>}
                                        </div>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{row.car}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-black font-mono tracking-tighter text-[#00ffcc]">{row.score}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">oz-Score</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 내 현황 고정 패널 하단 */}
            {/* 랭킹 밖으로 벗어났을 때를 대비한 Sticky Bottom 역할 */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full border-2 border-slate-950 shadow-lg flex items-center justify-center font-bold text-xl relative -mt-8 -ml-1">
                        나
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">나의 oz-Score</p>
                        <p className="font-black text-lg text-white">85 <span className="text-xs font-normal text-slate-500">점</span></p>
                    </div>
                </div>
                <button className="flex items-center gap-1 text-sm font-bold text-blue-400 hover:text-blue-300">
                    내 전비 팁 설정 <ChevronRight size={16} />
                </button>
            </div>

        </div>
    );
}
