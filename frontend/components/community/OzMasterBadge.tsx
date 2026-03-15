import React from 'react';
import { Award, ShieldCheck, Leaf, Star } from 'lucide-react';

export interface OzMasterBadgeProps {
  badges: {
    ecoDriver: boolean;
    safetyFirst: boolean;
    careTaker: boolean;
  };
  level: 'None' | 'Pro' | 'Master' | 'Legend';
}

export default function OzMasterBadge({ badges, level }: OzMasterBadgeProps) {
  const isGraduate = badges.ecoDriver && badges.safetyFirst && badges.careTaker;

  const levelStyles = {
    None: 'bg-slate-800 text-slate-400 border-slate-700',
    Pro: 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg border-white/20',
    Master: 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-yellow-500/50 border-yellow-200',
    Legend: 'bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl shadow-white/10 border-gray-600',
  };

  return (
    <div className="p-6 bg-[#0f172a] rounded-3xl border border-slate-800 text-white font-sans max-w-sm">
      <h3 className="text-xl font-black mb-4 flex items-center gap-2">
        <Award className="text-blue-400" />
        oz-Master Profile
      </h3>

      <div className={`p-4 rounded-2xl border mb-6 flex flex-col items-center justify-center text-center transition-all ${levelStyles[level]}`}>
        {level === 'Legend' && <Star className="w-12 h-12 text-yellow-500 mb-2 fill-current drop-shadow-md" />}
        {level === 'Master' && <Star className="w-12 h-12 text-white mb-2 drop-shadow-md" />}
        {level === 'Pro' && <Award className="w-12 h-12 text-white mb-2" />}
        
        <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Expert Certification</p>
        <h2 className="text-3xl font-black italic">{level.toUpperCase()}</h2>
      </div>

      <div className="space-y-3">
        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${badges.ecoDriver ? 'bg-green-900/20 border-green-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
          <div className={`p-2 rounded-full ${badges.ecoDriver ? 'bg-green-500 text-white shadow-lg shadow-green-900/50' : 'bg-slate-700 text-slate-500'}`}>
            <Leaf size={20} />
          </div>
          <div>
            <p className={`font-bold ${badges.ecoDriver ? 'text-green-400' : 'text-slate-500'}`}>Eco-Driver</p>
            <p className="text-xs text-slate-400">상위 20% 전비 유지</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${badges.safetyFirst ? 'bg-blue-900/20 border-blue-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
          <div className={`p-2 rounded-full ${badges.safetyFirst ? 'bg-blue-500 text-white shadow-lg shadow-blue-900/50' : 'bg-slate-700 text-slate-500'}`}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className={`font-bold ${badges.safetyFirst ? 'text-blue-400' : 'text-slate-500'}`}>Safety-First</p>
            <p className="text-xs text-slate-400">안전 주행 기준 충족</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${badges.careTaker ? 'bg-purple-900/20 border-purple-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
          <div className={`p-2 rounded-full ${badges.careTaker ? 'bg-purple-500 text-white shadow-lg shadow-purple-900/50' : 'bg-slate-700 text-slate-500'}`}>
            <Award size={20} />
          </div>
          <div>
            <p className={`font-bold ${badges.careTaker ? 'text-purple-400' : 'text-slate-500'}`}>Care-Taker</p>
            <p className="text-xs text-slate-400">소모품 100% 점검 완료</p>
          </div>
        </div>
      </div>

      {isGraduate && level === 'None' && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-center cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-blue-900/50">
          <p className="font-bold text-white mb-1">🎉 명예 졸업을 축하합니다!</p>
          <p className="text-xs text-blue-200">이제 전문가(Pro) 심사를 신청하세요.</p>
        </div>
      )}
    </div>
  );
}
