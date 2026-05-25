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
            title: "Î∞∞Ïã¨?êÏù¥?Ä?",
            content: (
                <div className="space-y-6">
                    <div className="w-full aspect-video bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl flex items-center justify-center border border-blue-500/20">
                        <Play className="w-16 h-16 text-blue-400" />
                        <p className="text-slate-400 ml-4">?úÌÜ†Î¶¨Ïñº ÎπÑÎîî??/p>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-slate-300 leading-relaxed">
                            OZCAR Î∞∞Ïã¨?êÏ? <span className="text-blue-400 font-bold">Ïª§Î??àÌã∞???†Î¢∞Î•?ÏßÄ?§Îäî Ï§ëÏöî????ï†</span>?ÖÎãà??
                        </p>

                        <ul className="space-y-4 mt-6">
                            <li className="flex items-start gap-3">
                                <Shield className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-white">?ïÎπÑ Í∏∞Î°ù Í≤ÄÏ¶?/strong>
                                    <p className="text-slate-400 text-sm mt-1">Í∏∞Ïà†?êÍ? ?úÏ∂ú???ïÎπÑ Í∏∞Î°ù???ïÎãπ?úÏ? ?¨ÏÇ¨?©Îãà??/p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-white">Î∂ÑÏüÅ ?¥Í≤∞</strong>
                                    <p className="text-slate-400 text-sm mt-1">?êÎß§?êÏ? Íµ¨Îß§??Í∞ÑÏùò Î∂ÑÏüÅ??Í≥µÏ†ï?òÍ≤å Ï§ëÏû¨?©Îãà??/p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Award className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="text-white">Î≥¥ÏÉÅ ?çÎìù</strong>
                                    <p className="text-slate-400 text-sm mt-1">?ïÌôï???êÎã®???¥Î¶¥ ?åÎßà??OZC ?†ÌÅ∞??Î∞õÏäµ?àÎã§</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                        <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-3">?µÏã¨ ?êÏπô</h4>
                        <p className="text-slate-300 leading-relaxed">
                            Î∞∞Ïã¨?êÏ? <strong>Í≥µÏ†ï??/strong>Í≥?<strong>?ïÏßÅ??/strong>??ÏµúÏö∞?†ÏúºÎ°??©Îãà??
                            Î™®Îì† Í≤∞Ï†ï?Ä Ï¶ùÍ±∞??Í∏∞Î∞ò?òÏó¨ ?¥Î£®?¥Ï†∏???òÎ©∞, Í∞úÏù∏???¥ÏùµÎ≥¥Îã§ Ïª§Î??àÌã∞ ?ÑÏ≤¥???¥Ïùµ??Í≥†Î†§?¥Ïïº ?©Îãà??
                        </p>
                    </div>

                    <QuizQuestion
                        question="Î∞∞Ïã¨?êÏùò Ï£ºÏöî ??ï†?Ä Î¨¥Ïóá?∏Í???"
                        options={[
                            "Ï∞®Îüâ??ÏßÅÏ†ë ?êÎß§?òÍ∏∞",
                            "?ïÎπÑ Í∏∞Î°ùÍ≥?Î∂ÑÏüÅ??Í≥µÏ†ï?òÍ≤å ?¨ÏÇ¨?òÍ∏∞",
                            "Ï∞®Îüâ Í∞ÄÍ≤©ÏùÑ Í≤∞Ï†ï?òÍ∏∞"
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
            title: "Î∞∞Ïã¨???±Í∏â ?úÏä§??,
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                        Î∞∞Ïã¨?êÏ? <span className="text-blue-400 font-bold">3Í∞ÄÏßÄ ?±Í∏â</span>?ºÎ°ú ?òÎâòÎ©?
                        ?ïÌôï?ÑÍ? ?íÏïÑÏßàÏàòÎ°????íÏ? ?±Í∏â?ºÎ°ú ?πÍ∏â?????àÏäµ?àÎã§.
                    </p>

                    <div className="grid gap-4">
                        {/* Citizen Jury */}
                        <div className="bg-gradient-to-br from-slate-600/20 to-slate-700/20 p-6 rounded-2xl border border-slate-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-slate-600/30 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">?ë§</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Citizen Jury</h3>
                                    <p className="text-xs text-slate-400">Í∏∞Î≥∏ ?±Í∏â ???¨Ìëú??1x</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>??Ï∞®Îüâ 1?Ä ?¥ÏÉÅ Î≥¥Ïú†</li>
                                <li>??10 OZC ?§ÌÖå?¥ÌÇπ</li>
                                <li>??Î∞îÎ°ú ?úÏûë Í∞Ä??/li>
                            </ul>
                        </div>

                        {/* Expert Jury */}
                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 p-6 rounded-2xl border border-blue-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">‚≠?/span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Expert Jury</h3>
                                    <p className="text-xs text-blue-400">Ï§ëÍ∏â ?±Í∏â ???¨Ìëú??3x</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>??Ï∞®Îüâ 2?Ä ?¥ÏÉÅ Î≥¥Ïú† OR ?ïÌôï??85%+</li>
                                <li>??50 OZC ?§ÌÖå?¥ÌÇπ</li>
                                <li>??Î≥µÏû°??ÏºÄ?¥Ïä§ ?¨ÏÇ¨ Í∞Ä??/li>
                            </ul>
                        </div>

                        {/* Grand Jury */}
                        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 p-6 rounded-2xl border border-yellow-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-yellow-600/30 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">?ëë</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Grand Jury</h3>
                                    <p className="text-xs text-yellow-400">ÏµúÍ≥† ?±Í∏â ???¨Ìëú??5x</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>??Ï∞®Îüâ 3?Ä ?¥ÏÉÅ Î≥¥Ïú† OR ?ïÌôï??95%+</li>
                                <li>??100 OZC ?§ÌÖå?¥ÌÇπ</li>
                                <li>??ÏµúÏ¢Ö Î∂ÑÏüÅ ?¨Ìåê Ï∞∏Ïó¨</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-green-600/10 border border-green-500/30 rounded-2xl p-6">
                        <h4 className="text-sm font-black text-green-400 uppercase tracking-widest mb-3">
                            ?í° ?πÍ∏â ??
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            ?ïÌôï?òÍ≤å ?¨Ìëú?òÎ©¥ ?ïÌôï?ÑÍ? ?¨ÎùºÍ∞ëÎãà?? ?ïÌôï??85%Î•??¨ÏÑ±?òÎ©¥ Expert JuryÎ°?
                            95%Î•??¨ÏÑ±?òÎ©¥ Grand JuryÎ°??πÍ∏â?????àÏäµ?àÎã§!
                        </p>
                    </div>

                    <QuizQuestion
                        question="Expert JuryÎ°??πÍ∏â?òÎ†§Î©?"
                        options={[
                            "Ï∞®Îüâ 1?ÄÎß??àÏúºÎ©???,
                            "Ï∞®Îüâ 2?Ä ?¥ÏÉÅ OR ?ïÌôï??85% ?¨ÏÑ±",
                            "Î¨¥Ï°∞Í±?Ï∞®Îüâ 5?Ä ?ÑÏöî"
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
            title: "?¨Ìëú Î∞©Î≤ï",
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                        ÏºÄ?¥Ïä§Î•?Í≤Ä?†ÌïòÍ≥?<span className="text-blue-400 font-bold">?ïÎãπ?úÏ? ?êÎã®</span>?òÏó¨ ?¨Ìëú?òÏÑ∏??
                    </p>

                    {/* Mock Case Example */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-mono text-slate-500">#AC-501</span>
                            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                ?ïÎπÑ Í∏∞Î°ù Í≤ÄÏ¶?
                            </span>
                        </div>

                        <h4 className="text-lg font-black text-white mb-2">
                            ?îÏßÑ?§Ïùº ÍµêÏ≤¥ Í∏∞Î°ù Í≤ÄÏ¶?
                        </h4>

                        <p className="text-sm text-slate-400 mb-4">
                            Í∏∞Ïà†?êÍ? 2024??2??15?ºÏóê ?îÏßÑ?§Ïùº??ÍµêÏ≤¥?àÎã§Í≥?Î≥¥Í≥†?àÏäµ?àÎã§.
                        </p>

                        <div className="bg-slate-900/50 p-4 rounded-xl mb-4">
                            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Ï¶ùÍ±∞</h5>
                            <ul className="text-sm text-slate-300 space-y-1">
                                <li>???ëÏóÖ ?¨ÏßÑ Ï≤®Î???/li>
                                <li>??Î∂Ä???ÅÏàòÏ¶??ïÏù∏</li>
                                <li>??Ï£ºÌñâÍ±∞Î¶¨ ?ºÏπò</li>
                            </ul>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-3 rounded-xl bg-green-600/10 text-green-400 border border-green-500/20 font-bold">
                                ???ïÎãπ??
                            </button>
                            <button className="flex-1 py-3 rounded-xl bg-red-600/10 text-red-400 border border-red-500/20 font-bold">
                                ??Î∂Ä?ïÌï®
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-600/10 border border-green-500/30 p-4 rounded-xl">
                            <h4 className="text-sm font-black text-green-400 mb-2">???ïÎãπ??ÏºÄ?¥Ïä§</h4>
                            <ul className="text-xs text-slate-300 space-y-1">
                                <li>??Ï¶ùÍ±∞Í∞Ä Î™ÖÌôï??/li>
                                <li>???ïÎπÑ ?¥Ïó≠???ºÏπò</li>
                                <li>???¨ÏßÑ/?ÅÏàòÏ¶??ïÏù∏??/li>
                            </ul>
                        </div>

                        <div className="bg-red-600/10 border border-red-500/30 p-4 rounded-xl">
                            <h4 className="text-sm font-black text-red-400 mb-2">??Î∂Ä?ïÌïú ÏºÄ?¥Ïä§</h4>
                            <ul className="text-xs text-slate-300 space-y-1">
                                <li>??Ï¶ùÍ±∞Í∞Ä Î∂àÏ∂©Î∂ÑÌï®</li>
                                <li>??Ï£ºÌñâÍ±∞Î¶¨ Î∂àÏùºÏπ?/li>
                                <li>??Ï°∞Ïûë ?îÏ†Å Î∞úÍ≤¨</li>
                            </ul>
                        </div>
                    </div>

                    <QuizQuestion
                        question="?¥Îñ§ Í≤ΩÏö∞??'?ïÎãπ???ºÎ°ú ?¨Ìëú?¥Ïïº ?òÎÇò??"
                        options={[
                            "Ï¶ùÍ±∞ ?ÜÏù¥??Í∏∞Ïà†?êÎ? ÎØøÍ≥† ?¨Ìëú",
                            "Ï¶ùÍ±∞Í∞Ä Î™ÖÌôï?òÍ≥† ?ïÎπÑ ?¥Ïó≠???ºÏπò????,
                            "Î¨¥Ï°∞Í±?Î™®Îì† ÏºÄ?¥Ïä§???ïÎãπ?®ÏúºÎ°??¨Ìëú"
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
            title: "Î≥¥ÏÉÅ Ï≤¥Í≥Ñ",
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                        ?ïÌôï???¨ÌëúÎ•????åÎßà??<span className="text-green-400 font-bold">OZC ?†ÌÅ∞ Î≥¥ÏÉÅ</span>??Î∞õÏäµ?àÎã§!
                    </p>

                    <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-8 rounded-3xl border border-green-500/30 text-center">
                        <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-4xl font-black text-white mb-2">1000 OZC</h3>
                        <p className="text-green-400 font-bold mb-4">ÏºÄ?¥Ïä§??Î≥¥ÏÉÅ ?Ä</p>
                        <p className="text-sm text-slate-300">
                            ?ïÌôï?òÍ≤å ?¨Ìëú??Î∞∞Ïã¨?êÎì§???òÎà† Í∞ÄÏßëÎãà??
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">
                                ?àÏãú 1: ?ïÌôï???¨Ìëú
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>ÏºÄ?¥Ïä§ Ï∞∏Ïó¨:</span>
                                    <span className="text-white font-bold">10Î™?/span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>?ïÌôï???¨Ìëú:</span>
                                    <span className="text-green-400 font-bold">?πÏã† ?¨Ìï® 8Î™?/span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Í∞úÏù∏ Î≥¥ÏÉÅ:</span>
                                    <span className="text-green-400 font-bold">125 OZC</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="text-sm font-black text-red-400 uppercase tracking-widest mb-4">
                                ?àÏãú 2: ?òÎ™ª???¨Ìëú
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>ÏºÄ?¥Ïä§ Ï∞∏Ïó¨:</span>
                                    <span className="text-white font-bold">10Î™?/span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>?ïÌôï???¨Ìëú:</span>
                                    <span className="text-red-400 font-bold">?πÏã† ?úÏô∏ 8Î™?/span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Í∞úÏù∏ Î≥¥ÏÉÅ:</span>
                                    <span className="text-red-400 font-bold">0 OZC</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6">
                        <h4 className="text-sm font-black text-yellow-400 uppercase tracking-widest mb-3">
                            ?í∞ Ï∂îÍ? ?úÌÉù
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>???ïÌôï?ÑÍ? ?íÏïÑÏßàÏàòÎ°??¨Ìëú??Ï¶ùÍ? (ÏµúÎ? 5x)</li>
                            <li>???îÎ≥Ñ Î¶¨ÎçîÎ≥¥Îìú 1?? 5000 OZC + NFT Î±ÉÏ?</li>
                            <li>???∞ÏÜç ?ïÌôï ?¨Ìëú ??Î≥¥ÎÑà??/li>
                        </ul>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6 text-center">
                        <h4 className="text-lg font-black text-white mb-3">
                            ?éâ Ï∂ïÌïò?©Îãà??
                        </h4>
                        <p className="text-slate-300 mb-4">
                            ?úÌÜ†Î¶¨Ïñº???ÑÎ£å?àÏäµ?àÎã§. ?¥Ï†ú Î∞∞Ïã¨?êÏúºÎ°??úÎèô??Ï§ÄÎπÑÍ? ?òÏóà?µÎãà??
                        </p>
                        <Link
                            href="/governance"
                            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-black hover:scale-105 transition-all"
                        >
                            Î∞∞Ïã¨???úÏûë?òÍ∏∞ ??
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
                        Î∞∞Ïã¨??<span className="text-blue-400">?®Î≥¥??/span>
                    </h1>
                    <p className="text-slate-400">
                        4?®Í≥ÑÎ°?Î∞∞Ïã¨???úÎèô???ΩÍ≤å Î∞∞ÏõåÎ≥¥ÏÑ∏??
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
                        ?¥Ï†Ñ
                    </button>

                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={!canProceed()}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold disabled:opacity-30 hover:bg-blue-700 transition"
                        >
                            ?§Ïùå
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <Link
                            href="/governance"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:scale-105 transition"
                        >
                            ?úÏûë?òÍ∏∞
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
                ?çÔ∏è ?¥Ìï¥???ïÏù∏
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
                        {showResult && index === correctAnswer && ' ??}
                        {showResult && selected === index && index !== correctAnswer && ' ??}
                    </button>
                ))}
            </div>
        </div>
    );
}
