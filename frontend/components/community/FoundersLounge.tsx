"use client";

import { ShieldCheck, Activity, LineChart, ChevronRight } from "lucide-react";

export default function FoundersLounge() {
  return (
    <div className="bg-[#0A0A0B] min-h-screen text-slate-200 font-sans">
      {/* 라운지 전용 헤더 */}
      <header className="p-6 border-b border-amber-900/30 flex justify-between items-center bg-[#111113]/80 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-serif italic text-amber-500 font-bold tracking-tight">
            The Lounge
          </h1>
          <p className="text-[11px] text-slate-400 mt-1 tracking-widest uppercase">
            Exclusive for ozcar Founders
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-500/70" /> Total Asset Guarded
          </span>
          <p className="text-xl font-mono font-bold text-amber-400 bg-amber-900/20 px-3 py-1 rounded-md border border-amber-500/20">
            ₩1,240,500,000
          </p>
        </div>
      </header>

      {/* 실시간 데이터 피드 (서포터즈 전용) */}
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        
        {/* 하이라이트 배너 */}
        <div className="bg-gradient-to-r from-amber-900/40 to-slate-900 rounded-2xl p-6 border border-amber-500/20 shadow-lg">
          <div className="flex gap-2 items-center mb-2">
            <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">Highlight</span>
            <span className="text-slate-400 text-xs">This Week's Best Insight</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">"겨울철 영하 5도 이하에서 LFP 배터리 히팅 효율 분석"</h2>
          <button className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold transition-colors">
            Read Case Study <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="whitespace-nowrap bg-amber-500/10 text-amber-500 border border-amber-500/30 px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-500/20 transition-colors">All Feed</button>
          <button className="whitespace-nowrap bg-slate-800/50 text-slate-300 border border-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-800 transition-colors">#Data_Lab</button>
          <button className="whitespace-nowrap bg-slate-800/50 text-slate-300 border border-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-800 transition-colors">#Asset_Tips</button>
          <button className="whitespace-nowrap bg-slate-800/50 text-slate-300 border border-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-800 transition-colors">#Feedback</button>
        </div>

        {/* 포스트 예시 1 */}
        <div className="bg-[#141417] rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-colors shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 border-2 border-slate-950 shadow-inner" />
              <div>
                <p className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  Founder_Elon
                  <span className="bg-amber-900/50 text-amber-500 text-[9px] px-1.5 py-0.5 rounded border border-amber-500/50 uppercase tracking-wider font-semibold">1st Gen</span>
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>Tesla Model 3 Long Range</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  <span className="flex items-center gap-1 text-amber-500 font-mono"><Activity className="w-3 h-3" /> oz-Index 98</span>
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-500">2 hours ago</span>
          </div>

          <p className="text-sm leading-relaxed mb-5 text-slate-300">
            "겨울철 영하 5도 이하에서 LFP 배터리 히팅 효율을 분석해봤습니다.<br/>
            초기 10분간의 전비 손실이 전체 사이클에 어떤 영향을 미치는지 로그 데이터를 바탕으로 정리했습니다. 프리컨디셔닝 유무에 따라 자산 가치 하락률이 눈에 띄게 다르네요."
          </p>

          {/* 데이터 카드 자동 첨부 */}
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-6 w-full sm:w-auto">
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">State of Health (SOH)</p>
                <p className="text-sm font-bold text-emerald-400">99.2%</p>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Weekly Efficiency</p>
                <p className="text-sm font-bold text-blue-400">115% <span className="text-[10px] font-normal text-slate-500 ml-1">vs Avg</span></p>
              </div>
            </div>
            <button className="text-xs bg-amber-500/10 text-amber-400 px-4 py-2 rounded-lg border border-amber-500/30 hover:bg-amber-500/20 transition-colors font-medium flex items-center gap-2 w-full sm:w-auto justify-center">
              <LineChart className="w-4 h-4" /> View Full Telemetry
            </button>
          </div>
        </div>

        {/* 포스트 예시 2 */}
        <div className="bg-[#141417] rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-colors shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-200 border-2 border-slate-950 shadow-inner" />
              <div>
                <p className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  RPM_Hunter
                  <span className="bg-slate-800 text-slate-400 text-[9px] px-1.5 py-0.5 rounded border border-slate-700 uppercase tracking-wider font-semibold">2nd Gen</span>
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>BMW M340i</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  <span className="flex items-center gap-1 text-emerald-400 font-mono"><Activity className="w-3 h-3" /> oz-Index 94</span>
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-500">5 hours ago</span>
          </div>

          <p className="text-sm leading-relaxed text-slate-300">
            "B58 엔진 오일 온도와 미션 슬립 관계성을 테스트해봤습니다. 데이터랩 피드백 부탁드립니다."
          </p>
        </div>

      </div>
    </div>
  );
}
