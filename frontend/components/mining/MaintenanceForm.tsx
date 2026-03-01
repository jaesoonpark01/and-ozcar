// components/mining/MaintenanceForm.tsx
"use client";

import { useState } from 'react';
import { MiningService } from '../../services/miningService';
import { useWeb3 } from '../../components/Web3Provider';
import { Wrench, ShieldCheck, Zap, History, Clock } from 'lucide-react';

export default function MaintenanceForm() {
    const { account, refreshData } = useWeb3();
    const [status, setStatus] = useState<'IDLE' | 'UPLOADING' | 'MINING' | 'SUCCESS'>('IDLE');
    const [vin, setVin] = useState('');
    const [mileage, setMileage] = useState('');
    const [ownerSecret, setOwnerSecret] = useState('');
    const [isClaiming, setIsClaiming] = useState(false);

    const handleMining = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vin || !mileage || !ownerSecret) {
            alert("Please fill in all fields");
            return;
        }

        setStatus('UPLOADING');
        try {
            // 1. IPFS Upload Simulation
            const mockFile = new File(["foo"], "foo.txt", { type: "text/plain" });
            const ipfsHash = await MiningService.uploadToIPFS(mockFile);

            // 2. Blockchain Mining
            setStatus('MINING');
            await MiningService.recordMaintenance({
                vin,
                mileage,
                ipfsHash,
                ownerSecret
            });

            await refreshData();
            setStatus('SUCCESS');
        } catch (error) {
            console.error(error);
            alert("Mining failed. Please try again.");
            setStatus('IDLE');
        }
    };

    const resetForm = () => {
        setStatus('IDLE');
        setVin('');
        setMileage('');
        setOwnerSecret('');
    };

    if (status === 'SUCCESS') {
        const onClaim = async () => {
            if (!account) return;
            setIsClaiming(true);
            try {
                await MiningService.claimReward(account);
                await refreshData();
                alert("15 OZC successfully claimed!");
                resetForm();
            } catch (error) {
                console.error(error);
                alert("Claim failed.");
            } finally {
                setIsClaiming(false);
            }
        };

        return (
            <div className="bg-[#121212] p-10 rounded-[3rem] text-center shadow-2xl animate-in fade-in zoom-in duration-500 border border-[#00ffc2]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ffc2]/5 to-transparent pointer-events-none"></div>
                <div className="w-24 h-24 bg-[#00ffc2]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#00ffc2]/20 shadow-[0_0_30px_rgba(0,255,194,0.1)]">
                    <span className="text-5xl">💎</span>
                </div>
                <h3 className="text-3xl font-black italic uppercase italic tracking-tighter mb-2 text-white">Record <span className="text-[#00ffc2]">Anchored</span></h3>
                <p className="text-slate-500 mb-10 font-black uppercase text-[10px] tracking-widest">데이터 정박 완료 및 평판 업데이트 대기 중</p>

                <div className="bg-white/5 p-5 rounded-2xl text-[10px] font-mono break-all mb-10 border border-white/5 text-slate-400">
                    <span className="text-blue-400 font-black">PROVED:</span> {vin.substring(0, 14)}...
                </div>

                <button
                    onClick={onClaim}
                    disabled={isClaiming}
                    className="w-full bg-[#0052FF] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-blue-600/20 shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:bg-white/5 disabled:text-slate-600"
                >
                    {isClaiming ? "Processing Reward..." : "+ 15 OZC | Claim Reputation"}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleMining} className="space-y-8">
            <section className="bg-[#121212] p-8 rounded-[2.5rem] shadow-2xl border border-white/5">
                <label className="block text-[10px] font-black mb-4 text-slate-500 uppercase tracking-widest">Vehicle VIN <span className="text-blue-400">#</span></label>
                <div className="flex gap-3">
                    <input
                        className="flex-1 bg-white/5 border border-white/5 rounded-xl p-5 outline-none focus:border-blue-500/30 font-black text-white italic text-xl tracking-tighter placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-600"
                        placeholder="Scan or Enter VIN"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                    />
                    <button type="button" className="bg-white/10 text-white px-8 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
                        SCAN
                    </button>
                </div>
            </section>

            <section className="bg-[#121212] p-8 rounded-[2.5rem] shadow-2xl border border-red-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] px-3 py-1.5 rounded-bl-xl font-black tracking-widest uppercase">Double-Lock</div>
                <label className="block text-[10px] font-black mb-4 text-red-400 uppercase tracking-widest">Authorization Code</label>
                <input
                    type="password"
                    className="w-full bg-red-500/5 border border-red-500/10 rounded-xl p-5 outline-none focus:border-red-500/30 font-black text-white tracking-[1em] text-2xl text-center"
                    placeholder="••••"
                    maxLength={4}
                    value={ownerSecret}
                    onChange={(e) => setOwnerSecret(e.target.value)}
                />
                <p className="text-[10px] text-slate-500 mt-4 font-medium leading-relaxed">차량 소유자로부터 인증 번호를 받아 입력하세요. 이 절차는 무단 데이터 채굴을 방지하고 소유자의 명시적 동의를 증명합니다.</p>
            </section>

            <section className="bg-[#121212] p-8 rounded-[2.5rem] shadow-2xl border border-white/5 space-y-8">
                <div>
                    <label className="block text-[10px] font-black mb-4 text-blue-400 uppercase tracking-widest">Current Mileage (km)</label>
                    <input
                        type="number"
                        className="w-full bg-white/5 border border-white/5 rounded-xl p-5 font-black text-4xl text-white italic tracking-tighter outline-none focus:border-blue-500/30"
                        placeholder="0"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black mb-4 text-slate-500 uppercase tracking-widest">Service Evidence Log</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-white/5 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-white/5 hover:border-blue-500/20 hover:bg-blue-600/5 transition-all cursor-pointer group">
                            <span className="text-3xl text-slate-700 group-hover:text-blue-400 transition-colors">+</span>
                            <span className="text-[9px] font-black text-slate-600 mt-2 uppercase tracking-widest group-hover:text-blue-400">Before Work</span>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-white/5 hover:border-blue-500/20 hover:bg-blue-600/5 transition-all cursor-pointer group">
                            <span className="text-3xl text-slate-700 group-hover:text-blue-400 transition-colors">+</span>
                            <span className="text-[9px] font-black text-slate-600 mt-2 uppercase tracking-widest group-hover:text-blue-400">After Work</span>
                        </div>
                    </div>
                </div>
            </section>

            <button
                type="submit"
                disabled={status !== 'IDLE'}
                className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-blue-600/20 shadow-xl disabled:bg-white/5 disabled:text-slate-600 disabled:shadow-none transition-all active:scale-95 group overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'IDLE' && <><Wrench size={16} /> Record & Mine Record ⛏️</>}
                    {status === 'UPLOADING' && "Analysing Integrity..."}
                    {status === 'MINING' && "Anchoring to Blockchain..."}
                </span>
            </button>
        </form>
    );
}
