'use client';

import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export function VerifiedBadge({ isVerified }: { isVerified: boolean }) {
    const [showTooltip, setShowTooltip] = useState(false);

    if (!isVerified) return null;

    return (
        <div className="relative inline-flex items-center gap-1">
            <div
                className="flex items-center gap-2 bg-emerald-900/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-800 cursor-pointer transition-all hover:bg-emerald-800/40"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <ShieldCheck size={14} className="text-emerald-500" />
                Verified by ozcar
            </div>

            {showTooltip && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 text-slate-300 text-xs p-3 rounded-lg shadow-xl z-50">
                    <p className="font-bold text-white mb-1">엔드투엔드 무결성 검증</p>
                    <p>이 데이터는 위변조 방지 처리가 완료된 신뢰할 수 있는 실시간 데이터 스트림입니다.</p>
                </div>
            )}
        </div>
    );
}
