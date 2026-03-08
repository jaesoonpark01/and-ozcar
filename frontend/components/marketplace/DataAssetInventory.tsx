'use client';

import { ShieldCheck, Box, Tag } from 'lucide-react';

interface DataAsset {
    id: string;
    title: string;
    type: 'Diamond' | 'Gold' | 'Silver';
    verified: boolean;
    valueOZC: number;
    period: string;
}

const ASSET_GRADES = {
    Diamond: { color: 'text-cyan-300', bg: 'bg-cyan-950/40', border: 'border-cyan-500/50' },
    Gold: { color: 'text-yellow-400', bg: 'bg-yellow-950/40', border: 'border-yellow-500/50' },
    Silver: { color: 'text-slate-300', bg: 'bg-slate-800', border: 'border-slate-700' }
};

export function DataAssetInventory({ asset, onSellClick }: { asset: DataAsset, onSellClick: (id: string) => void }) {
    const gradeStyle = ASSET_GRADES[asset.type];

    return (
        <div className={`rounded-2xl p-6 border ${gradeStyle.bg} ${gradeStyle.border} shadow-lg relative overflow-hidden flex flex-col justify-between`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />

            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <Box className={gradeStyle.color} size={20} />
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${gradeStyle.color} ${gradeStyle.border}`}>
                            {asset.type} Grade
                        </span>
                    </div>
                    {asset.verified && (
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                            <ShieldCheck size={14} /> HW Verified
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{asset.title}</h3>
                <p className="text-slate-400 text-sm mb-4">수집 기간: {asset.period}</p>
            </div>

            <div className="flex items-end justify-between mt-6">
                <div>
                    <p className="text-slate-500 text-xs font-medium mb-1">예상 판매 가치</p>
                    <p className="text-2xl font-black text-white">{asset.valueOZC.toLocaleString()} <span className="text-sm font-normal text-slate-400">OZP</span></p>
                </div>
                <button
                    onClick={() => onSellClick(asset.id)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-5 rounded-lg transition-colors border border-blue-500"
                >
                    <Tag size={16} /> 시장 배포
                </button>
            </div>
        </div>
    );
}
