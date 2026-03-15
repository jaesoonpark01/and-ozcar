"use client";

import { QrCode } from "lucide-react";
import Image from "next/image";

interface User {
  name: string;
  avatar: string;
}

export default function MasterLicense({ user }: { user: User }) {
  return (
    <div className="p-1 bg-gradient-to-b from-amber-400 via-yellow-600 to-amber-900 rounded-2xl shadow-2xl">
      <div className="bg-[#0f1115] rounded-[14px] p-6 relative overflow-hidden">
        {/* 마스터 워터마크 배경 */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-center items-center">
          <span className="text-8xl font-black rotate-12 uppercase text-white whitespace-nowrap tracking-[0.2em]">
            oz-Master
          </span>
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="bg-amber-500/10 text-amber-500 text-[10px] px-2 py-1 rounded border border-amber-500/30 uppercase tracking-tighter font-semibold">
              Elite Guardian Level
            </span>
            <h2 className="text-2xl font-black text-white mt-3 font-serif italic">
              {user?.name || "Member"}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">ID: OZ-MSTR-2026-001</p>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-amber-500 p-1 relative bg-slate-800">
            {user?.avatar && (
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="rounded-full grayscale hover:grayscale-0 transition-all object-cover"
              />
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
          <div className="border-l-2 border-amber-500/50 pl-3">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Specialty</p>
            <p className="text-sm font-bold text-slate-200 mt-1">Tesla/LFP Battery</p>
          </div>
          <div className="border-l-2 border-amber-500/50 pl-3">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Trusted Score</p>
            <p className="text-sm font-bold text-amber-500 mt-1">99.9%</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center relative z-10">
          <p className="text-[10px] text-slate-500 font-mono tracking-tight">
            Verified by ozcar Universal Blockchain
          </p>
          <div className="w-8 h-8 bg-white/5 rounded-md p-1.5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
            <QrCode className="w-full h-full text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
