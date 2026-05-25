import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface Props {
    brand: string;
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

export default function ManufacturerHealthBadge({ brand, status }: Props) {
    const config = {
        HEALTHY: {
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            icon: <CheckCircle2 className="w-3 h-3" />,
            label: 'Manufacturer Verified'
        },
        WARNING: {
            color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            icon: <AlertCircle className="w-3 h-3" />,
            label: 'Brand Caution'
        },
        CRITICAL: {
            color: 'text-red-400 bg-red-500/10 border-red-500/20',
            icon: <XCircle className="w-3 h-3" />,
            label: 'Critical Tampering Detected'
        }
    };

    const { color, icon, label } = config[status];

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${color} transition-all`}>
            {icon}
            <span className="text-[10px] font-bold uppercase tracking-wider">{brand}: {label}</span>
        </div>
    );
}
