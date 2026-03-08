'use client';

import { useState } from 'react';
import { DataAssetInventory } from '@/components/marketplace/DataAssetInventory';
import { Database, ShieldAlert, ArrowRight } from 'lucide-react';

const MOCK_ASSETS = [
    {
        id: 'dt-1001',
        title: 'Safe Driver Pack (무사고 1,000km)',
        type: 'Diamond' as const,
        verified: true,
        valueOZC: 12500,
        period: '2026.02.01 - 2026.02.28'
    },
    {
        id: 'dt-1002',
        title: '겨울철 EV 배터리 효율 로그',
        type: 'Gold' as const,
        verified: true,
        valueOZC: 8400,
        period: '2026.01.15 - 2026.02.15'
    }
];

export default function DataMarketplacePage() {
    const [sellingId, setSellingId] = useState<string | null>(null);

    const handleSell = (id: string) => {
        setSellingId(id);
        // 향후 Web3 / Supabase RPC 연동: 판매 서명 및 ZKP(영지식) 마스킹 처리 시뮬레이션
        setTimeout(() => {
            alert('데이터가 익명화되어 대상 기관에 성공적으로 전송되었습니다! 지갑 보상을 확인하세요.');
            setSellingId(null);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-cyan-500/30">

            <header className="mb-12 border-b border-slate-800 pb-6">
                <h1 className="text-3xl font-extrabold flex items-center gap-3 text-white">
                    <Database className="text-cyan-400" size={32} />
                    Data Marketplace
                </h1>
                <p className="text-slate-400 mt-2">안전 주행 데이터가 디지털 자본이 되는 공간. 내 데이터를 필요로 하는 기관에 직접 판매하세요.</p>
            </header>

            <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">내 데이터 창고 <span className="text-slate-500 text-lg font-normal">(Asset Inventory)</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_ASSETS.map(asset => (
                        <DataAssetInventory
                            key={asset.id}
                            asset={asset}
                            onSellClick={handleSell}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    실시간 구매 수요 현황 <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded border border-red-500/30">HOT</span>
                </h2>

                <div className="flex flex-col gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-white mb-1">AIG 안전운전 데이터(90점↑) 집중 매입</h3>
                            <p className="text-sm text-slate-400">조건: STM32 HW 검증 완료된 최근 3개월 데이터. (개인정보 완벽 마스킹 조건)</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-xs font-semibold text-slate-500">지급 단가 (Multiplier)</p>
                                <p className="text-xl font-black text-emerald-400">1.5x Premium</p>
                            </div>
                            <button className="bg-slate-800 p-3 rounded-full hover:bg-slate-700 transition">
                                <ArrowRight size={20} className="text-cyan-400" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-50">
                        <div>
                            <h3 className="font-bold text-lg text-slate-300 mb-1">한국전기차연구원 겨울철 전비 로그</h3>
                            <p className="text-sm text-slate-500">조건: 평균 영하 5도 지역에서의 주행 배터리 히팅 데이터. (모집 마감 임박)</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right text-slate-500">
                                <p className="text-xs font-semibold">지급 단가</p>
                                <p className="text-xl font-bold">1.0x Base</p>
                            </div>
                            <button className="bg-slate-800 p-3 rounded-full cursor-not-allowed">
                                <ArrowRight size={20} className="text-slate-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {sellingId && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-cyan-900 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
                        <ShieldAlert size={48} className="text-cyan-400 mb-4 animate-pulse" />
                        <h3 className="text-xl font-bold text-white mb-2">프라이버시 봉인 중...</h3>
                        <p className="text-sm text-slate-400 font-mono mb-6">데이터 위변조 서명 확인 및 익명화(ZKP) 절차 진행 중입니다.</p>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 w-2/3 h-full animate-[pulse_1s_ease-in-out_infinite]" />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
