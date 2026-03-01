// app/governance/onboarding/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Shield,
    Award,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Play,
    BookOpen
} from 'lucide-react';

export default function GovernanceOnboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

    const steps = [
        {
            title: "배심원이란?",
            content: (
                <div className="space-y-6">
                    <div className="w-full aspect-video bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl flex items-center justify-center border border-blue-500/20">
                        <Play className="w-16 h-16 text-blue-400" />
                        <p className="text-slate-400 ml-4">튜토리얼 비디오</p>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-slate-300 leading-relaxed">
                            OZCAR 배심원은 <span className="text-blue-400 font-bold">커뮤니티의 신뢰를 지키는 중요한 역할</span>입니다.
                        </p>

                        <ul className="space-y-4 mt-6">
                            <li className="flex items-start gap-3">
                                <Shield className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-white">정비 기록 검증</strong>
                                    <p className="text-slate-400 text-sm mt-1">기술자가 제출한 정비 기록이 정당한지 심사합니다</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-white">분쟁 해결</strong>
                                    <p className="text-slate-400 text-sm mt-1">판매자와 구매자 간의 분쟁을 공정하게 중재합니다</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Award className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-white">보상 획득</strong>
                                    <p className="text-slate-400 text-sm mt-1">정확한 판단을 내릴 때마다 OZC 토큰을 받습니다</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                        <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-3">핵심 원칙</h4>
                        <p className="text-slate-300 leading-relaxed">
                            배심원은 <strong>공정성</strong>과 <strong>정직성</strong>을 최우선으로 합니다.
                            모든 결정은 증거에 기반하여 이루어져야 하며, 개인적 이익보다 커뮤니티 전체의 이익을 고려해야 합니다.
                        </p>
                    </div>

                    <QuizQuestion
                        question="배심원의 주요 역할은 무엇인가요?"
                        options={[
                            "차량을 직접 판매하기",
                            "정비 기록과 분쟁을 공정하게 심사하기",
                            "차량 가격을 결정하기"
                        ]}
                        correctAnswer={1}
                        stepIndex={0}
                        quizAnswers={quizAnswers}
                        setQuizAnswers={setQuizAnswers}
                    />
                </div>
            )
        },
        {
            title: "배심원 등급 시스템",
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                        배심원은 <span className="text-blue-400 font-bold">3가지 등급</span>으로 나뉘며,
                        정확도가 높아질수록 더 높은 등급으로 승급할 수 있습니다.
                    </p>

                    <div className="grid gap-4">
                        {/* Citizen Jury */}
                        <div className="bg-gradient-to-br from-slate-600/20 to-slate-700/20 p-6 rounded-2xl border border-slate-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-slate-600/30 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Citizen Jury</h3>
                                    <p className="text-xs text-slate-400">기본 등급 • 투표력 1x</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✓ 차량 1대 이상 보유</li>
                                <li>✓ 10 OZC 스테이킹</li>
                                <li>✓ 바로 시작 가능</li>
                            </ul>
                        </div>

                        {/* Expert Jury */}
                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 p-6 rounded-2xl border border-blue-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">⭐</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Expert Jury</h3>
                                    <p className="text-xs text-blue-400">중급 등급 • 투표력 3x</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✓ 차량 2대 이상 보유 OR 정확도 85%+</li>
                                <li>✓ 50 OZC 스테이킹</li>
                                <li>✓ 복잡한 케이스 심사 가능</li>
                            </ul>
                        </div>

                        {/* Grand Jury */}
                        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 p-6 rounded-2xl border border-yellow-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-yellow-600/30 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">👑</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Grand Jury</h3>
                                    <p className="text-xs text-yellow-400">최고 등급 • 투표력 5x</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✓ 차량 3대 이상 보유 OR 정확도 95%+</li>
                                <li>✓ 100 OZC 스테이킹</li>
                                <li>✓ 최종 분쟁 심판 참여</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-green-600/10 border border-green-500/30 rounded-2xl p-6">
                        <h4 className="text-sm font-black text-green-400 uppercase tracking-widest mb-3">
                            💡 승급 팁
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            정확하게 투표하면 정확도가 올라갑니다. 정확도 85%를 달성하면 Expert Jury로,
                            95%를 달성하면 Grand Jury로 승급할 수 있습니다!
                        </p>
                    </div>

                    <QuizQuestion
                        question="Expert Jury로 승급하려면?"
                        options={[
                            "차량 1대만 있으면 됨",
                            "차량 2대 이상 OR 정확도 85% 달성",
                            "무조건 차량 5대 필요"
                        ]}
                        correctAnswer={1}
                        stepIndex={1}
                        quizAnswers={quizAnswers}
                        setQuizAnswers={setQuizAnswers}
                    />
                </div>
            )
        },
        {
            title: "투표 방법",
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                        케이스를 검토하고 <span className="text-blue-400 font-bold">정당한지 판단</span>하여 투표하세요.
                    </p>

                    {/* Mock Case Example */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-mono text-slate-500">#AC-501</span>
                            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                정비 기록 검증
                            </span>
                        </div>

                        <h4 className="text-lg font-black text-white mb-2">
                            엔진오일 교체 기록 검증
                        </h4>

                        <p className="text-sm text-slate-400 mb-4">
                            기술자가 2024년 2월 15일에 엔진오일을 교체했다고 보고했습니다.
                        </p>

                        <div className="bg-slate-900/50 p-4 rounded-xl mb-4">
                            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">증거</h5>
                            <ul className="text-sm text-slate-300 space-y-1">
                                <li>✓ 작업 사진 첨부됨</li>
                                <li>✓ 부품 영수증 확인</li>
                                <li>✓ 주행거리 일치</li>
                            </ul>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-3 rounded-xl bg-green-600/10 text-green-400 border border-green-500/20 font-bold">
                                ✅ 정당함
                            </button>
                            <button className="flex-1 py-3 rounded-xl bg-red-600/10 text-red-400 border border-red-500/20 font-bold">
                                ❌ 부정함
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-600/10 border border-green-500/30 p-4 rounded-xl">
                            <h4 className="text-sm font-black text-green-400 mb-2">✅ 정당한 케이스</h4>
                            <ul className="text-xs text-slate-300 space-y-1">
                                <li>• 증거가 명확함</li>
                                <li>• 정비 내역이 일치</li>
                                <li>• 사진/영수증 확인됨</li>
                            </ul>
                        </div>

                        <div className="bg-red-600/10 border border-red-500/30 p-4 rounded-xl">
                            <h4 className="text-sm font-black text-red-400 mb-2">❌ 부정한 케이스</h4>
                            <ul className="text-xs text-slate-300 space-y-1">
                                <li>• 증거가 불충분함</li>
                                <li>• 주행거리 불일치</li>
                                <li>• 조작 흔적 발견</li>
                            </ul>
                        </div>
                    </div>

                    <QuizQuestion
                        question="어떤 경우에 '정당함'으로 투표해야 하나요?"
                        options={[
                            "증거 없이도 기술자를 믿고 투표",
                            "증거가 명확하고 정비 내역이 일치할 때",
                            "무조건 모든 케이스에 정당함으로 투표"
                        ]}
                        correctAnswer={1}
                        stepIndex={2}
                        quizAnswers={quizAnswers}
                        setQuizAnswers={setQuizAnswers}
                    />
                </div>
            )
        },
        {
            title: "보상 체계",
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                        정확한 투표를 할 때마다 <span className="text-green-400 font-bold">OZC 토큰 보상</span>을 받습니다!
                    </p>

                    <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-8 rounded-3xl border border-green-500/30 text-center">
                        <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-4xl font-black text-white mb-2">1000 OZC</h3>
                        <p className="text-green-400 font-bold mb-4">케이스당 보상 풀</p>
                        <p className="text-sm text-slate-300">
                            정확하게 투표한 배심원들이 나눠 가집니다
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">
                                예시 1: 정확한 투표
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>케이스 참여:</span>
                                    <span className="text-white font-bold">10명</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>정확한 투표:</span>
                                    <span className="text-green-400 font-bold">당신 포함 8명</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>개인 보상:</span>
                                    <span className="text-green-400 font-bold">125 OZC</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="text-sm font-black text-red-400 uppercase tracking-widest mb-4">
                                예시 2: 잘못된 투표
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>케이스 참여:</span>
                                    <span className="text-white font-bold">10명</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>정확한 투표:</span>
                                    <span className="text-red-400 font-bold">당신 제외 8명</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>개인 보상:</span>
                                    <span className="text-red-400 font-bold">0 OZC</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6">
                        <h4 className="text-sm font-black text-yellow-400 uppercase tracking-widest mb-3">
                            💰 추가 혜택
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>• 정확도가 높아질수록 투표력 증가 (최대 5x)</li>
                            <li>• 월별 리더보드 1위: 5000 OZC + NFT 뱃지</li>
                            <li>• 연속 정확 투표 시 보너스</li>
                        </ul>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6 text-center">
                        <h4 className="text-lg font-black text-white mb-3">
                            🎉 축하합니다!
                        </h4>
                        <p className="text-slate-300 mb-4">
                            튜토리얼을 완료했습니다. 이제 배심원으로 활동할 준비가 되었습니다!
                        </p>
                        <Link
                            href="/governance"
                            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-black hover:scale-105 transition-all"
                        >
                            배심원 시작하기 →
                        </Link>
                    </div>
                </div>
            )
        }
    ];

    const canProceed = () => {
        if (currentStep < 3) {
            return quizAnswers[currentStep] !== undefined;
        }
        return true;
    };

    return (
        <div className="min-h-screen bg-[#010410] text-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-black text-blue-900 mb-2">
                        배심원 <span className="text-blue-400">온보딩</span>
                    </h1>
                    <p className="text-slate-400">
                        4단계로 배심원 활동을 쉽게 배워보세요
                    </p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center flex-1">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-black text-sm
                                ${index <= currentStep
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/10 text-slate-500'}
                            `}>
                                {index + 1}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`
                                    flex-1 h-1 mx-2
                                    ${index < currentStep ? 'bg-blue-600' : 'bg-white/10'}
                                `} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10 mb-8">
                    <h2 className="text-3xl font-black text-white mb-8">
                        {steps[currentStep].title}
                    </h2>
                    {steps[currentStep].content}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-bold disabled:opacity-30 hover:bg-white/10 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        이전
                    </button>

                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={!canProceed()}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold disabled:opacity-30 hover:bg-blue-700 transition"
                        >
                            다음
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <Link
                            href="/governance"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:scale-105 transition"
                        >
                            시작하기
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

// Quiz Component
function QuizQuestion({
    question,
    options,
    correctAnswer,
    stepIndex,
    quizAnswers,
    setQuizAnswers
}: {
    question: string;
    options: string[];
    correctAnswer: number;
    stepIndex: number;
    quizAnswers: Record<number, number>;
    setQuizAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}) {
    const [selected, setSelected] = useState<number | null>(quizAnswers[stepIndex] ?? null);
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (index: number) => {
        setSelected(index);
        setShowResult(true);
        setQuizAnswers(prev => ({ ...prev, [stepIndex]: index }));
    };

    return (
        <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-6">
            <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-4">
                ✍️ 이해도 확인
            </h4>
            <p className="text-white font-bold mb-4">{question}</p>

            <div className="space-y-3">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        disabled={showResult}
                        className={`
                            w-full text-left p-4 rounded-xl font-medium transition
                            ${selected === index && showResult
                                ? index === correctAnswer
                                    ? 'bg-green-600/20 border-2 border-green-500 text-green-400'
                                    : 'bg-red-600/20 border-2 border-red-500 text-red-400'
                                : selected === index
                                    ? 'bg-white/10 border-2 border-blue-500 text-white'
                                    : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'}
                        `}
                    >
                        {option}
                        {showResult && index === correctAnswer && ' ✅'}
                        {showResult && selected === index && index !== correctAnswer && ' ❌'}
                    </button>
                ))}
            </div>
        </div>
    );
}
