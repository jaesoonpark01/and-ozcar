"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, CheckCircle2, ShieldCheck, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/components/Web3Provider";

export default function ConstitutionPage() {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const [signed, setSigned] = useState(false);
    const { account } = useWeb3();

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 50;
        if (bottom) setHasScrolledToBottom(true);
    };

    const handleSign = () => {
        setIsSigning(true);
        setTimeout(() => {
            setIsSigning(false);
            setSigned(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#050510] text-white">
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-4 text-yellow-500">
                        <ScrollText size={48} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-200">
                        Ozcar Sovereign DAO<br />Constitution
                    </h1>
                    <p className="text-slate-400">오즈카 생태계의 기틀이 될 '주권 DAO 운영 헌장' 동의 프로세스입니다.</p>
                </div>

                <AnimatePresence mode="wait">
                    {!signed ? (
                        <motion.div key="unsigned" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">

                            <div
                                className="bg-black/50 border border-slate-700/50 rounded-2xl p-6 md:p-8 h-[50vh] overflow-y-auto mb-6 text-sm md:text-base leading-relaxed text-slate-300 font-serif"
                                onScroll={handleScroll}
                            >
                                <h2 className="text-xl font-bold text-yellow-500 mb-4 font-sans">전문(Preamble)</h2>
                                <p className="mb-6 italic">
                                    본 헌장은 자동차를 소모품에서 '자산'으로, 드라이버를 데이터의 주인으로 전환하기 위한 오즈카 생태계의 최상위 규범이다. 우리는 코드(Code)를 통해 정의를 구현하고, AI를 통해 효율을 극대화하며, 파운더(Founders)의 헌신에 걸맞은 투명하고 강력한 현금 흐름을 보장함을 목적으로 한다.
                                </p>

                                <h3 className="text-lg font-bold text-white mt-8 mb-2 font-sans">제1조 [데이터 주권 및 무결성]</h3>
                                <ol className="list-decimal pl-5 space-y-2 mb-6">
                                    <li><strong>소유권:</strong> 모든 주행 및 정비 데이터의 일차적 주권은 생성자(드라이버)에게 있다.</li>
                                    <li><strong>자산화:</strong> 오즈카 DAO는 수집된 데이터를 AI 에이전트를 통해 정제하여 'Gold 데이터'로 변환하며, 이를 통해 발생한 모든 수익은 생태계 구성원에게 귀속된다.</li>
                                    <li><strong>무결성:</strong> 데이터 조작은 생태계에 대한 중대한 공격으로 간주하며, 스마트 컨트랙트에 의해 즉각적인 제재(Slashing)를 받는다.</li>
                                </ol>

                                <h3 className="text-lg font-bold text-white mt-8 mb-2 font-sans">제2조 [파운더의 권리와 의무]</h3>
                                <ol className="list-decimal pl-5 space-y-2 mb-6">
                                    <li><strong>수익 배분권:</strong> 다이아몬드 및 플래티넘 파운더는 플랫폼 순매출에 대하여 일반 유저에 우선하여 배당을 받을 권리를 가진다.</li>
                                    <li><strong>거버넌스 의결권:</strong> 파운더는 주요 사업 확장, 수수료율 변경, 예산 집행에 대한 투표권을 가지며, 다이아몬드 등급은 중대 안건에 대한 <strong>거부권(Veto Power)</strong>을 행사할 수 있다.</li>
                                    <li><strong>배심원 의무:</strong> 고액 투자자는 생태계 정화를 위한 '배심원(Jury)'으로서 사건 판결에 성실히 참여할 의무를 지며, 이에 따른 정당한 보상을 수령한다.</li>
                                </ol>

                                <h3 className="text-lg font-bold text-white mt-8 mb-2 font-sans">제3조 [자동 집행 및 자산 보호]</h3>
                                <ol className="list-decimal pl-5 space-y-2 mb-6">
                                    <li><strong>Code is Law:</strong> 모든 리워드의 지급 및 몰수는 사전에 합의된 스마트 컨트랙트 로직에 의해 자동 집행된다.</li>
                                    <li><strong>상환 보장 (Put Option):</strong> 2년 이상 활동한 파운더가 NFT 반납을 희망할 경우, DAO 금고(Treasury)는 최초 투자 원금의 100%에 해당하는 가치를 상환할 책임을 진다.</li>
                                    <li><strong>글로벌 기득권:</strong> 2026년 오리지널 파운더들은 2027년 글로벌 확장 노드에 대한 확정적인 우선 민팅권 및 글로벌 데이터 수수료를 영구 배분받는다.</li>
                                </ol>

                                <p className="mt-12 text-center text-slate-500 font-sans text-xs">스크롤을 끝까지 내려야 동의할 수 있습니다.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => hasScrolledToBottom && setAgreed(!agreed)}
                                        disabled={!hasScrolledToBottom}
                                        className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${agreed ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-slate-500 text-transparent hover:border-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                                    >
                                        <CheckCircle2 size={16} />
                                    </button>
                                    <span className={`text-sm ${hasScrolledToBottom ? 'text-white' : 'text-slate-500'}`}>본인은 오즈카 주권 DAO 헌장에 동의하며, 생태계의 규범을 준수할 것을 서약합니다.</span>
                                </div>

                                <Button
                                    onClick={handleSign}
                                    disabled={!agreed || isSigning || !account}
                                    className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest px-8 h-12 rounded-xl"
                                >
                                    {isSigning ? "지갑 서명 진행 중..." : (account ? "블록체인 서명하기" : "지갑 연결 필요")}
                                    {!isSigning && account && <PenTool size={16} className="ml-2" />}
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="signed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-gradient-to-b from-yellow-900/20 to-black/50 border border-yellow-500/30 rounded-3xl p-12 text-center backdrop-blur-xl">
                            <ShieldCheck size={80} className="text-yellow-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-black italic tracking-tighter text-yellow-400 mb-2">서명 완료</h2>
                            <p className="text-slate-300 mb-8">
                                파운더님 환영합니다.<br />
                                귀하는 이제 오즈카 법전의 수호자이자 수혜자입니다.
                            </p>
                            <div className="bg-black/40 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-500 mb-8 overflow-hidden text-left">
                                <div className="text-yellow-500 mb-1">On-chain Signature Hash:</div>
                                <div className="truncate">0x8a9bf3...e8a21f7</div>
                                <div className="mt-2 text-yellow-500 mb-1">Signed by:</div>
                                <div className="truncate">{account}</div>
                            </div>
                            <Button onClick={() => window.location.href = "/governance"} variant="outline" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 rounded-full px-8">
                                거버넌스 대시보드로 이동
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
