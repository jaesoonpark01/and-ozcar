import React from 'react';
import { ShieldCheck, X, ExternalLink } from 'lucide-react';

interface IntegrityData {
    label: string;
    metadata: {
        repair_date: string;
        technician_id: string;
        severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
        parts_replaced?: string[];
        is_genuine_part?: boolean;
    };
    evidence: {
        ipfs_cid: string;
        tx_hash: string;
    }
}

interface IntegrityPopupProps {
    data: IntegrityData;
    onClose: () => void;
}

export const IntegrityPopup: React.FC<IntegrityPopupProps> = ({ data, onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 text-white rounded-t-3xl p-6 backdrop-blur-md animate-in slide-in-from-bottom duration-300 z-50 shadow-2xl border-t border-white/10">
            {/* 1. Header: Status */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs font-bold text-[#10B981] tracking-wide">BLOCKCHAIN VERIFIED</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            {/* 2. Maintenance Details */}
            <h2 className="text-2xl font-black mb-1">{data.label}</h2>
            <div className="flex items-center gap-2 mb-6 text-sm text-slate-400 font-medium">
                <span>{data.metadata.repair_date}</span>
                <span>•</span>
                <span>Tech ID: {data.metadata.technician_id}</span>
                {data.metadata.severity !== 'NONE' && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.metadata.severity === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                        {data.metadata.severity} SEVERITY
                    </span>
                )}
            </div>

            {/* 3. IPFS Evidence */}
            <div className="relative rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/40">
                {/* Mock Image using a placeholder service, typically would serve from IPFS gateway */}
                <div className="aspect-video bg-slate-800 flex items-center justify-center relative group">
                    {/* In a real app, uses <img src={`https://ipfs.io/ipfs/${data.evidence.ipfs_cid}`} /> */}
                    <div className="text-slate-500 text-xs font-mono">IPFS CONTENT LOADED FROM CHAIN</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-white/60 bg-black/40 px-2 py-1 rounded">CID: {data.evidence.ipfs_cid.substring(0, 12)}...</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Proof Footer */}
            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5">
                <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Polygon Transaction</div>
                    <div className="font-mono text-xs text-[#0052FF]">{data.evidence.tx_hash.substring(0, 20)}...</div>
                </div>
                <a
                    href={`https://polygonscan.com/tx/${data.evidence.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#0052FF] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                    View TX <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </div>
    );
};
