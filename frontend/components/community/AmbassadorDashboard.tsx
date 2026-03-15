import React, { useState } from 'react';
import { Target, Users, Zap, Gift, CheckCircle } from 'lucide-react';

export default function AmbassadorDashboard() {
  const [isApplied, setIsApplied] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">ozcar Community</p>
            <h1 className="text-4xl md:text-5xl font-black">Ambassador Lounge</h1>
          </div>
          <div className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            제1기 앰버서더 모집 중
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 활동 미션 */}
          <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="text-orange-500" /> 핵심 미션
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-300 mt-1"><Zap size={18} /></div>
                <div>
                  <h4 className="font-bold text-slate-200">Data Logging</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">OBD-II 기기 상시 장착 후 주 3회 이상의 안정적인 OBD 데이터 수집.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-300 mt-1"><Users size={18} /></div>
                <div>
                  <h4 className="font-bold text-slate-200">Brand Evangelism</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">SNS 및 자동차 동호회에 월 1회 이상 사용 꿀팁 관련 콘텐츠 발행.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* 혜택 */}
          <section className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-3xl p-8 border border-blue-800/50 shadow-2xl shadow-blue-900/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Gift className="text-blue-400" /> 전용 혜택
            </h2>
            <div className="space-y-5">
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 hover:bg-black/40 transition-colors cursor-default">
                <h4 className="font-bold text-blue-300 mb-1">🎁 기기 무상 지원</h4>
                <p className="text-sm text-slate-400">초고급 사양의 'ozcar Black Edition' 무상 증정</p>
              </div>
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 hover:bg-black/40 transition-colors cursor-default">
                <h4 className="font-bold text-blue-300 mb-1">⭐ 평생 Premium</h4>
                <p className="text-sm text-slate-400">서포터즈 활동 기간 구독료 100% 면제</p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center bg-slate-900 py-12 px-6 rounded-3xl border border-slate-800 relative overflow-hidden">
          {/* 장식용 블러 */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          {!isApplied ? (
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">지금 바로 오즈카 서포터즈에 도전하세요!</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                oz-Master 명예 졸업생이거나 자동차 데이터 관리에 자신 있다면, 앰버서더가 되어 ozcar 생태계를 이끌어주세요.
              </p>
              <button 
                onClick={() => setIsApplied(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full transition-all active:scale-95 shadow-lg shadow-blue-900/50 outline-none"
              >
                1기 서포터즈 지원하기
              </button>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-500">
              <div className="bg-green-500/10 p-4 rounded-full mb-4">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">지원이 완료되었습니다!</h3>
              <p className="text-slate-400">심사 후 기재해주신 연락처로 개별 안내해 드릴 예정입니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
