import { ShieldCheck, Box, Tag, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface DataAsset {
    id: string;
    title: string;
    type: 'Diamond' | 'Gold' | 'Silver';
    verified: boolean;
    valueOZC: number;
    period: string;
    packets?: number;
}

const ASSET_GRADES = {
    Diamond: { color: 'text-cyan-300', bg: 'bg-cyan-950/20', border: 'border-cyan-500/30', accent: 'bg-cyan-500' },
    Gold: { color: 'text-yellow-400', bg: 'bg-yellow-950/20', border: 'border-yellow-500/30', accent: 'bg-yellow-500' },
    Silver: { color: 'text-slate-300', bg: 'bg-slate-900/40', border: 'border-slate-700/50', accent: 'bg-slate-500' }
};

export function DataAssetInventory({ asset, onSellClick }: { asset: DataAsset, onSellClick: (id: string) => void }) {
    const gradeStyle = ASSET_GRADES[asset.type];

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className={`rounded-[2.5rem] p-8 border ${gradeStyle.bg} ${gradeStyle.border} shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-500`}
        >
            {/* Holographic Finish */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 ${gradeStyle.accent} opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity`} />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${gradeStyle.color}`}>
                            <Box size={20} />
                        </div>
                        <div>
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${gradeStyle.color} ${gradeStyle.border} bg-black/20`}>
                                {asset.type} Grade Asset
                            </span>
                        </div>
                    </div>
                    {asset.verified && (
                        <div className="flex items-center gap-1.5 text-emerald-400 text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            <ShieldCheck size={12} /> HW Secure
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2 leading-none">{asset.title}</h3>
                <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><TrendingUp size={12} /> {(asset.packets ?? 0).toLocaleString()} Pkts</span>
                    <span className="text-slate-800">|</span>
                    <span>{asset.period}</span>
                </div>

                <div className="mt-8 p-4 bg-black/30 rounded-2xl border border-white/5 flex items-center gap-3">
                    <Info size={14} className="text-slate-500 shrink-0" />
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                        이 데이터셋은 <span className="text-white font-bold">{asset.type} 등급</span> 품질이며, 하드웨어 검증을 통해 <span className="text-blue-400">+150%</span> 보너스 가치가 적용되었습니다.
                    </p>
                </div>
            </div>

            <div className="flex items-end justify-between mt-10 relative z-10">
                <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Market Estimated Value</p>
                    <p className="text-3xl font-black italic uppercase tracking-tighter text-white">
                        {asset.valueOZC.toLocaleString()} <span className="text-sm font-normal text-slate-500 not-italic ml-1">OZP</span>
                    </p>
                </div>
                <button
                    onClick={() => onSellClick(asset.id)}
                    className="flex items-center gap-2 bg-white text-black font-black uppercase tracking-widest text-[10px] py-4 px-6 rounded-2xl transition-all border border-white hover:bg-transparent hover:text-white group/btn"
                >
                    <Tag size={16} className="group-hover:rotate-12 transition-transform" />
                    List on Market
                </button>
            </div>
        </motion.div>
    );
}
