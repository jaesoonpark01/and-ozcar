"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Bluetooth, Hexagon, CheckCircle2, Loader2, ArrowRight, Wallet } from "lucide-react";
import { useWeb3 } from "@/components/Web3Provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingSequence() {
    const [step, setStep] = useState<number>(1);
    const { account } = useWeb3();

    // Step 1: Vehicle Info
    const [plateNum, setPlateNum] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [vehicleData, setVehicleData] = useState<any>(null);

    // Step 2: Bluetooth Pairing
    const [isPairing, setIsPairing] = useState(false);
    const [paired, setPaired] = useState(false);

    // Step 3: NFT Minting
    const [isMinting, setIsMinting] = useState(false);
    const [mintStatus, setMintStatus] = useState("");

    const handleVehicleSearch = () => {
        setIsSearching(true);
        // Simulate API call to 국토교통부 or 보험개발원
        setTimeout(() => {
            setVehicleData({
                model: "Tesla Model 3 Dual Motor (2025)",
                fuel: "EV",
                score: "Diamond (Tier 1)",
            });
            setIsSearching(false);
            setStep(2);
        }, 2000);
    };

    const handlePairDongle = () => {
        setIsPairing(true);
        // Simulate BLE search and pair
        setTimeout(() => {
            setIsPairing(false);
            setPaired(true);
            setTimeout(() => setStep(3), 1500);
        }, 3000);
    };

    const handleMintNFT = () => {
        setIsMinting(true);
        setMintStatus("Generating Vehicle Persona...");
        setTimeout(() => {
            setMintStatus("Connecting to Polygon Edge Function...");
            setTimeout(() => {
                setMintStatus("Tx Approved. Minting Genesis NFT...");
                setTimeout(() => {
                    setIsMinting(false);
                    setStep(4);
                }, 2000);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 relative text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-[#00FFC2]/5 rounded-[3rem] blur-3xl -z-10" />

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00FFC2]">The Genesis Journey</h1>
                <p className="text-slate-400">당신의 차량을 완전한 디지털 자산으로 전환합니다.</p>

                {/* Progress Tracker */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= s ? 'bg-[#00FFC2] border-[#00FFC2] text-black shadow-[0_0_15px_#00FFC250]' : 'bg-transparent border-slate-700 text-slate-500'}`}>
                                {s}
                            </div>
                            {s < 4 && (
                                <div className={`w-12 h-1 mx-2 rounded-full transition-colors ${step > s ? 'bg-[#00FFC2]' : 'bg-slate-800'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400"><Car size={24} /></div>
                            <div>
                                <h2 className="text-2xl font-bold">1. Vehicle Identification</h2>
                                <p className="text-slate-400 text-sm">차량 정보를 입력하면 제원 데이터를 자동으로 로드합니다.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">차량 번호</label>
                                <Input placeholder="예: 123가 4567" value={plateNum} onChange={(e) => setPlateNum(e.target.value)} className="bg-black/50 border-slate-700 h-14 text-lg" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">소유주 성명</label>
                                <Input placeholder="실명 입력" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="bg-black/50 border-slate-700 h-14 text-lg" />
                            </div>
                            <Button onClick={handleVehicleSearch} disabled={isSearching || !plateNum || !ownerName} className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-lg font-bold">
                                {isSearching ? <Loader2 className="animate-spin mr-2" /> : "데이터베이스 조회"}
                                {!isSearching && <ArrowRight className="ml-2" />}
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Bluetooth size={24} /></div>
                                <div>
                                    <h2 className="text-2xl font-bold">2. Hardware Activation</h2>
                                    <p className="text-slate-400 text-sm">STN2120 OBD-II 동글과 블루투스로 페어링합니다.</p>
                                </div>
                            </div>
                            {vehicleData && (
                                <div className="text-right">
                                    <span className="text-xs font-bold text-slate-500 block uppercase">연결 차량</span>
                                    <span className="text-emerald-400 font-bold">{vehicleData.model}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-700 rounded-2xl bg-black/30">
                            {paired ? (
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center text-emerald-400">
                                    <CheckCircle2 size={64} className="mb-4" />
                                    <h3 className="text-2xl font-black italic">PAIRED SUCCESSFULLY</h3>
                                    <p className="text-emerald-500/70 mt-2">VIN 검증 및 데이터 스트림 안정화 완료</p>
                                </motion.div>
                            ) : (
                                <>
                                    <Bluetooth size={48} className={`mb-6 ${isPairing ? 'text-blue-500 animate-pulse' : 'text-slate-600'}`} />
                                    <Button onClick={handlePairDongle} disabled={isPairing} className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest px-8 py-6 rounded-2xl">
                                        {isPairing ? <span className="flex items-center"><Loader2 className="animate-spin mr-2" /> 페어링 중...</span> : "OBD-II 동글 연결 (BLE)"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#00FFC2]/20 text-[#00FFC2] mx-auto mb-6">
                            <Hexagon size={40} className={isMinting ? "animate-spin" : ""} />
                        </div>
                        <h2 className="text-3xl font-black italic mb-2">3. Sovereign NFT Minting</h2>
                        <p className="text-slate-400 mb-8">차량의 제원과 등급 프리미엄이 결합된 PFP NFT를 발급합니다.</p>

                        <div className="bg-black/50 p-6 rounded-2xl mb-8 flex flex-col items-center justify-center min-h-[150px] border border-slate-800">
                            {isMinting ? (
                                <div className="text-blue-400 font-mono flex items-center gap-3">
                                    <Loader2 className="animate-spin" /> {mintStatus}
                                </div>
                            ) : (
                                <div className="text-[#00FFC2] text-xl font-bold font-mono">Ready to Mint</div>
                            )}
                        </div>

                        <Button onClick={handleMintNFT} disabled={isMinting || !account} className="w-full h-14 bg-gradient-to-r from-[#00FFC2] to-blue-500 text-black hover:opacity-90 text-lg font-black uppercase">
                            {account ? "Mint Genesis NFT" : "지갑 연결이 필요합니다"}
                        </Button>
                        {!account && <p className="text-xs text-red-400 mt-4">오른쪽 상단의 Connect Wallet을 먼저 진행하세요.</p>}
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-[#00FFC2]/20 to-blue-900/40 border border-[#00FFC2]/30 rounded-3xl p-12 text-center backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,194,0.1)]">
                        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="w-24 h-24 bg-[#00FFC2] text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_#00FFC2]">
                            <CheckCircle2 size={48} />
                        </motion.div>
                        <h2 className="text-4xl font-black italic mb-4 text-[#00FFC2]">NODE ACTIVATED</h2>
                        <p className="text-xl text-slate-300 mb-8">축하합니다! 당신의 차량이 Ozcar Sovereign 노드로 등록되었습니다.<br />이제 이동하는 모든 순간이 수익으로 치환됩니다.</p>

                        <Button onClick={() => window.location.href = "/dashboard"} className="bg-white text-black hover:bg-slate-200 px-8 py-6 rounded-full font-black text-lg uppercase tracking-widest shadow-xl">
                            대시보드로 이동
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
