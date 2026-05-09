'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Bluetooth, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GenesisMintPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [vehicleData, setVehicleData] = useState<any>(null);
    const [isSimulating, setIsSimulating] = useState(false);

    // Step 1: Vehicle Lookup
    const handleVehicleLookup = async () => {
        if (!vehicleNumber || !ownerName) return;
        setIsSimulating(true);
        // Simulate API call to 국토교통부/보험개발원
        setTimeout(() => {
            setVehicleData({
                model: 'Tesla Model 3 Long Range',
                year: '2022',
                fuel: 'Electric',
                expectedValue: 'Gold Tier (High Data Value)'
            });
            setIsSimulating(false);
            setStep(2);
        }, 2000);
    };

    // Step 2: Bluetooth Pairing
    const handleDonglePairing = async () => {
        setIsSimulating(true);
        // Simulate BLE Pairing with STN2120
        setTimeout(() => {
            setIsSimulating(false);
            setStep(3);
        }, 2500);
    };

    // Step 3: Minting NFT
    const handleMintNFT = async () => {
        setIsSimulating(true);
        // Simulate Minting
        setTimeout(() => {
            setIsSimulating(false);
            setStep(4);
        }, 3000);
    };

    const handleDashboardEntry = () => {
        router.push('/dashboard/mining-report'); // Will create this next
    };

    return (
        <div className="min-h-screen bg-[#07070d] text-white flex flex-col items-center pt-24 px-4 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                        THE GENESIS JOURNEY
                    </h1>
                    <p className="text-slate-400">당신의 차량이 수익 창출 자산으로 전환되는 순간입니다.</p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-12 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full" />
                    <motion.div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-400 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((step - 1) / 3) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= i ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 'bg-slate-800 text-slate-500 border border-white/10'}`}>
                            {step > i ? <CheckCircle2 size={20} /> : i}
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {/* Step 1 */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="text-center mb-2">
                                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                                        <Car className="text-blue-400" size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">차량 식별 (Vehicle ID)</h2>
                                    <p className="text-sm text-slate-400">공공데이터 API를 통해 차량 제원을 안전하게 불러옵니다.</p>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="차량번호 (예: 12가 3456)" 
                                    value={vehicleNumber}
                                    onChange={(e) => setVehicleNumber(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                                />
                                <input 
                                    type="text" 
                                    placeholder="소유주 성함" 
                                    value={ownerName}
                                    onChange={(e) => setOwnerName(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                                />
                                <button 
                                    onClick={handleVehicleLookup}
                                    disabled={!vehicleNumber || !ownerName || isSimulating}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black font-black uppercase tracking-wider py-4 rounded-xl mt-4 disabled:opacity-50 transition-all flex justify-center items-center"
                                >
                                    {isSimulating ? '데이터 조회 중...' : '제원 및 데이터 가치 조회'}
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="text-center mb-2">
                                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                                        <Bluetooth className="text-blue-400 animate-pulse" size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">STN2120 동글 페어링</h2>
                                    <p className="text-sm text-slate-400">차량의 OBD-II 포트에 동글을 장착하고 블루투스를 연결하세요.</p>
                                </div>
                                
                                <div className="bg-black/30 border border-emerald-500/20 rounded-2xl p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-slate-400">인식된 차량</span>
                                        <span className="text-sm font-bold text-emerald-400">{vehicleData?.model}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-slate-400">연식/유종</span>
                                        <span className="text-sm font-bold text-white">{vehicleData?.year} / {vehicleData?.fuel}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-400">데이터 등급</span>
                                        <span className="text-sm font-bold text-amber-400 flex items-center gap-1"><Zap size={14}/> {vehicleData?.expectedValue}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleDonglePairing}
                                    disabled={isSimulating}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black uppercase tracking-wider py-4 rounded-xl mt-2 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                >
                                    {isSimulating ? 'BLE 페어링 및 VIN 대조 중...' : '동글 페어링 시작'}
                                </button>
                            </motion.div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col gap-6 text-center"
                            >
                                <div className="w-24 h-24 mx-auto relative">
                                    <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" />
                                    <div className="relative w-full h-full bg-purple-500/30 border border-purple-500/50 rounded-full flex items-center justify-center">
                                        <ShieldCheck className="text-purple-400" size={40} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Sovereign NFT 발급</h2>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        VIN 검증이 완료되었습니다.<br/>
                                        차량의 고유 정보와 등급이 결합된 NFT를 생성합니다.
                                    </p>
                                </div>

                                <button 
                                    onClick={handleMintNFT}
                                    disabled={isSimulating}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-black uppercase tracking-wider py-4 rounded-xl mt-4 disabled:opacity-50 transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                                >
                                    {isSimulating ? '스마트 컨트랙트 민팅 진행 중...' : 'PFP NFT 민팅 (Generate Avatar)'}
                                </button>
                            </motion.div>
                        )}

                        {/* Step 4 */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-6 text-center"
                            >
                                <div className="w-24 h-24 bg-emerald-500/20 rounded-3xl border border-emerald-500/50 flex items-center justify-center mb-2 shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                                    <Car className="text-emerald-400" size={48} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black mb-3">축하합니다!</h2>
                                    <p className="text-slate-300 leading-relaxed">
                                        당신의 차량이 <span className="text-emerald-400 font-bold">Sovereign 노드</span>로 성공적으로 등록되었습니다.<br/>
                                        지금부터 실시간 데이터 채굴이 시작됩니다.
                                    </p>
                                </div>

                                <button 
                                    onClick={handleDashboardEntry}
                                    className="w-full bg-emerald-400 hover:bg-emerald-300 text-black font-black uppercase tracking-wider py-4 rounded-xl mt-6 transition-all"
                                >
                                    대시보드 입장 (수익 창출 시작)
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
