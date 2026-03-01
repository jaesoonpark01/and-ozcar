"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Share2, Zap, Trophy, TrendingUp, Cpu, Battery, Map, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

export default function MiningReportPage() {
    const [ozcCount, setOzcCount] = useState(0);
    const targetOzc = 1250;
    const reportRef = useRef<HTMLDivElement>(null);

    // Animate counter
    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const duration = 2000;

            if (progress < duration) {
                setOzcCount(Math.min(targetOzc, Math.floor((progress / duration) * targetOzc)));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setOzcCount(targetOzc);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const handleShare = async () => {
        if (reportRef.current) {
            const canvas = await html2canvas(reportRef.current);
            const dataUrl = canvas.toDataURL("image/png");

            // Try native share or fallback to download
            if (navigator.share) {
                try {
                    // Convert dataurl to blob for sharing
                    const blob = await (await fetch(dataUrl)).blob();
                    const file = new File([blob], "ozcar-mining-report.png", { type: blob.type });
                    await navigator.share({
                        title: "My Ozcar Mining Report",
                        text: "주행만으로 데이터가 돈이 되는 순간. OZCAR!",
                        files: [file],
                    });
                    // Reward logic can be trigged here
                    alert("공유 완료! 부스트 보상 10%가 지급되었습니다.");
                } catch (err) {
                    console.error(err);
                }
            } else {
                // Fallback: Download
                const link = document.createElement("a");
                link.download = "ozcar-mining-report.png";
                link.href = dataUrl;
                link.click();
                alert("이미지 저장 완료! 캡처 화면을 SNS에 공유하세요.");
            }
        }
    };

    return (
        <div className="min-h-screen pt-12 pb-24 px-4 bg-[#0a0f1d] text-white">
            <motion.div
                ref={reportRef}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md mx-auto relative rounded-[2rem] overflow-hidden bg-white/5 border border-[#00FFC2]/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,255,194,0.1)] p-8"
            >
                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                    <div className="inline-block px-3 py-1 bg-[#00FFC2]/20 text-[#00FFC2] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                        Genesis Mining Report
                    </div>
                    <h1 className="text-3xl font-black italic tracking-tight">첫 번째 주행 데이터<br />채굴 성공!</h1>
                </div>

                {/* Main Card */}
                <div className="bg-black/40 rounded-3xl p-6 mb-8 border border-white/5 text-center relative z-10">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-xs block mb-2">획득한 보상 (Estimated)</span>
                    <div className="flex items-end justify-center gap-2 mb-2">
                        <span className="text-5xl font-black text-[#00FFC2] tabular-nums font-mono drop-shadow-[0_0_15px_rgba(0,255,194,0.5)]">
                            +{ozcCount}
                        </span>
                        <span className="text-2xl font-bold text-[#00FFC2]/80 pb-1">$OZC</span>
                    </div>
                    <div className="text-slate-500 font-bold text-sm">
                        ≈ ₩{(ozcCount * 1.5).toLocaleString()} (KRW)
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col gap-2">
                        <Cpu className="text-blue-400" size={20} />
                        <span className="text-xs text-slate-400 font-bold uppercase">엔진 정밀 진단</span>
                        <span className="text-lg font-black text-white">98% Perfect</span>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col gap-2">
                        <Map className="text-purple-400" size={20} />
                        <span className="text-xs text-slate-400 font-bold uppercase">주행 경로 최적화</span>
                        <span className="text-lg font-black text-white">1.2 MB Sync</span>
                    </div>
                </div>

                {/* ROI Progress */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-2xl p-5 border border-blue-500/30 mb-8 relative z-10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-blue-200 uppercase tracking-widest"><TrendingUp size={12} className="inline mr-1" />ROI Break-Even Track</span>
                        <span className="text-xs font-black text-[#00FFC2]">Wait ~15 Months</span>
                    </div>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-400 to-[#00FFC2]"
                            initial={{ width: "0%" }}
                            animate={{ width: "4%" }}
                            transition={{ delay: 1, duration: 1 }}
                        />
                    </div>
                    <p className="text-[10px] text-blue-300 mt-3 flex items-center gap-1">
                        <Trophy size={10} className="text-yellow-400" />
                        <span className="text-yellow-400 font-bold">Diamond Buff:</span> 리워드 보정률 +50% 적용됨
                    </p>
                </div>

                {/* Ambient Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFC2] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-10 blur-[100px] rounded-full pointer-events-none" />

                {/* Footer info for sharing */}
                <div className="text-center text-[9px] text-slate-600 uppercase tracking-widest font-black mt-4 relative z-10">
                    Ozcar Data Lake System • {new Date().toLocaleDateString()}
                </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="max-w-md mx-auto mt-8 flex gap-4">
                <Button onClick={handleShare} className="flex-1 bg-[#00FFC2] hover:bg-[#00FFC2]/80 text-black font-black uppercase tracking-widest py-6 rounded-2xl shadow-[0_0_20px_#00FFC240]">
                    <Share2 className="mr-2 h-5 w-5" />
                    수익 인증하고 부스트 받기
                </Button>
            </div>

            <p className="max-w-md mx-auto mt-6 text-center text-sm text-slate-500 w-full px-8">
                파운더님, 방금 15분의 주행이 단순한 이동이 아닌 수익으로 변환되었습니다. 안전하게 보관된 데이터는 성장을 멈추지 않습니다.
            </p>
        </div>
    );
}
