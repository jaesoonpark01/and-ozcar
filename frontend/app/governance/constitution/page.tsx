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
                    <p className="text-slate-400">?�즈�??�태계의 기�?????'주권 DAO ?�영 ?�장' ?�의 ?�로?�스?�니??</p>
                </div>

                <AnimatePresence mode="wait">
                    {!signed ? (
                        <motion.div key="unsigned" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">

                            <div
                                className="bg-black/50 border border-slate-700/50 rounded-2xl p-6 md:p-8 h-[50vh] overflow-y-auto mb-6 text-sm md:text-base leading-relaxed text-slate-300 font-serif"
                                onScroll={handleScroll}
                            >
                                <h2 className="text-xl font-bold text-yellow-500 mb-4 font-sans">?�문(Preamble)</h2>
                                <p className="mb-6 italic">
                                    �??�장?� ?�동차�? ?�모?�에??'?�산'?�로, ?�라?�버�??�이?�의 주인?�로 ?�환?�기 ?�한 ?�즈�??�태계의 최상??규범?�다. ?�리??코드(Code)�??�해 ?�의�?구현?�고, AI�??�해 ?�율??극�??�하�? ?�운??Founders)???�신??걸맞?� ?�명?�고 강력???�금 ?�름??보장?�을 목적?�로 ?�다.
                                </p>

                                <h3 className="text-lg font-bold text-white mt-8 mb-2 font-sans">??�?[?�이??주권 �?무결??</h3>
                                <ol className="list-decimal pl-5 space-y-2 mb-6">
                                    <li><strong>?�유�?</strong> 모든 주행 �??�비 ?�이?�의 ?�차??주권?� ?�성???�라?�버)?�게 ?�다.</li>
                                    <li><strong>?�산??</strong> ?�즈�?DAO???�집???�이?��? AI ?�이?�트�??�해 ?�제?�여 'Gold ?�이??�?변?�하�? ?��? ?�해 발생??모든 ?�익?� ?�태�?구성?�에�?귀?�된??</li>
                                    <li><strong>무결??</strong> ?�이??조작?� ?�태계에 ?�??중�???공격?�로 간주?�며, ?�마??컨트?�트???�해 즉각?�인 ?�재(Slashing)�?받는??</li>
                                </ol>

                                <h3 className="text-lg font-bold text-white mt-8 mb-2 font-sans">??�?[?�운?�의 권리?� ?�무]</h3>
                                <ol className="list-decimal pl-5 space-y-2 mb-6">
                                    <li><strong>?�익 배분�?</strong> ?�이?�몬??�??�래?�넘 ?�운?�는 ?�랫???�매출에 ?�?�여 ?�반 ?��????�선?�여 배당??받을 권리�?가진다.</li>
                                    <li><strong>거버?�스 ?�결�?</strong> ?�운?�는 주요 ?�업 ?�장, ?�수료율 변�? ?�산 집행???�???�표권을 가지�? ?�이?�몬???�급?� 중�? ?�건???�??<strong>거�?�?Veto Power)</strong>???�사?????�다.</li>
                                    <li><strong>배심???�무:</strong> 고액 ?�자?�는 ?�태�??�화�??�한 '배심??Jury)'?�로???�건 ?�결???�실??참여???�무�?지�? ?�에 ?�른 ?�당??보상???�령?�다.</li>
                                </ol>

                                <h3 className="text-lg font-bold text-white mt-8 mb-2 font-sans">??�?[?�동 집행 �??�산 보호]</h3>
                                <ol className="list-decimal pl-5 space-y-2 mb-6">
                                    <li><strong>Code is Law:</strong> 모든 리워?�의 지�?�?몰수???�전???�의???�마??컨트?�트 로직???�해 ?�동 집행?�다.</li>
                                    <li><strong>?�환 보장 (Put Option):</strong> 2???�상 ?�동???�운?��? NFT 반납???�망??경우, DAO 금고(Treasury)??최초 ?�자 ?�금??100%???�당?�는 가치�? ?�환??책임??진다.</li>
                                    <li><strong>글로벌 기득�?</strong> 2026???�리지???�운?�들?� 2027??글로벌 ?�장 ?�드???�???�정?�인 ?�선 민팅�?�?글로벌 ?�이???�수료�? ?�구 배분받는??</li>
                                </ol>

                                <p className="mt-12 text-center text-slate-500 font-sans text-xs">?�크롤을 ?�까지 ?�려???�의?????�습?�다.</p>
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
                                    <span className={`text-sm ${hasScrolledToBottom ? 'text-white' : 'text-slate-500'}`}>본인?� ?�즈�?주권 DAO ?�장???�의?�며, ?�태계의 규범??준?�할 것을 ?�약?�니??</span>
                                </div>

                                <Button
                                    onClick={handleSign}
                                    disabled={!agreed || isSigning || !account}
                                    className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest px-8 h-12 rounded-xl"
                                >
                                    {isSigning ? "지�??�명 진행 �?.." : (account ? "블록체인 ?�명?�기" : "지�??�결 ?�요")}
                                    {!isSigning && account && <PenTool size={16} className="ml-2" />}
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="signed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-gradient-to-b from-yellow-900/20 to-black/50 border border-yellow-500/30 rounded-3xl p-12 text-center backdrop-blur-xl">
                            <ShieldCheck size={80} className="text-yellow-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-black italic tracking-tighter text-yellow-400 mb-2">?�명 ?�료</h2>
                            <p className="text-slate-300 mb-8">
                                ?�운?�님 ?�영?�니??<br />
                                귀?�는 ?�제 ?�즈�?법전???�호?�이???�혜?�입?�다.
                            </p>
                            <div className="bg-black/40 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-500 mb-8 overflow-hidden text-left">
                                <div className="text-yellow-500 mb-1">On-chain Signature Hash:</div>
                                <div className="truncate">0x8a9bf3...e8a21f7</div>
                                <div className="mt-2 text-yellow-500 mb-1">Signed by:</div>
                                <div className="truncate">{account}</div>
                            </div>
                            <Button onClick={() => window.location.href = "/governance"} variant="outline" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 rounded-full px-8">
                                거버?�스 ?�?�보?�로 ?�동
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
