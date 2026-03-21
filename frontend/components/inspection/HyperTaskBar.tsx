"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, Battery, Settings, Disc } from "react-feather";

export type InspectionCategory = {
  id: string;
  name: string;
  icon: JSX.Element;
};

const CATEGORIES: InspectionCategory[] = [
  { id: "engine", name: "엔진룸", icon: <Settings size={20} /> },
  { id: "front", name: "전면/외관", icon: <Disc size={20} /> },
  { id: "under", name: "하체(리프트)", icon: <Disc size={20} /> },
  { id: "interior", name: "실내", icon: <Disc size={20} /> },
  { id: "rear", name: "후면", icon: <Disc size={20} /> },
  { id: "driving", name: "최종 시운전", icon: <CheckCircle size={20} /> },
];

export default function HyperTaskBar({ activeCategory }: { activeCategory: string }) {
  return (
    <aside className="w-24 fixed left-0 top-0 h-screen bg-[#0A0C10] border-r border-slate-800 flex flex-col items-center py-6 gap-8 z-50">
      <div className="text-blue-500 font-black text-xl mb-4">OZ</div>
      <div className="flex-1 w-full flex flex-col items-center gap-6 relative">
        {/* 스크롤 위치에 따른 인디케이터 라인 */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-slate-800 z-0"></div>
        
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button 
              key={cat.id} 
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isActive 
                  ? "bg-blue-600 text-white scale-110 shadow-blue-500/50" 
                  : "bg-[#121417] text-slate-500 hover:text-slate-300 border border-slate-800"
              }`}
              title={cat.name}
            >
              {cat.icon}
            </button>
          );
        })}
      </div>
      <div className="mt-auto flex flex-col items-center gap-2">
        <Battery size={20} className="text-green-500" />
        <span className="text-[10px] text-slate-500 font-mono">100%</span>
      </div>
    </aside>
  );
}
