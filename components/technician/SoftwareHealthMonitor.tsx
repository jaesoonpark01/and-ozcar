import React from 'react';
import { Cpu, Zap, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SoftwareHealthMonitorProps {
    vehicleData?: any;
}

export default function SoftwareHealthMonitor({ vehicleData }: SoftwareHealthMonitorProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* 1. ADAS & Firmware Version Status */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                    펌웨어 및 OS 상태 (Firmware Indexing)
                </h3>
                <div className="space-y-4">
                    <VersionRow
                        label="인포테인먼트 OS"
                        current="v3.2.1"
                        status="Latest"
                        icon={<Cpu className="w-4 h-4 text-slate-400" />}
                    />
                    <VersionRow
                        label="자율주행 제어기 (ADAS)"
                        current="v2.0.4"
                        status="Update Required"
                        urgent
                        icon={<Zap className="w-4 h-4 text-orange-400" />}
                    />
                    <VersionRow
                        label="배터리 관리 시스템 (BMS)"
                        current="v4.1.0"
                        status="Latest"
                        icon={<Activity className="w-4 h-4 text-blue-400" />}
                    />
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-1">Blockchain Verification</p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                        각 인덱싱 정보는 **Polygon Mainnet**에 앵커링되어 무결성이 검증되었습니다. 위변조가 불가능한 소프트웨어 이력 관리를 지원합니다.
                    </p>
                </div>
            </div>

            {/* 2. AI Error Code Prediction */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Activity className="w-32 h-32" />
                </div>

                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
                    <div className="animate-pulse w-2 h-2 bg-blue-400 rounded-full" />
                    AI Sentinel 실시간 로그 분석
                </h3>

                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <p className="text-xs text-slate-400 mb-2">예측 알고리즘 탐지 결과 (Predictive Maintenance)</p>
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
                            <p className="text-sm font-medium leading-relaxed">
                                "조향각 센서의 데이터 오차 범위가 점진적으로 증가 중. <span className="text-orange-400 font-bold">향후 14일 이내 C1260 오류 발생 확률 89%</span> 예상됩니다."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="text-[10px] text-slate-500 mb-1">배터리 SOH</div>
                            <div className="text-xl font-black text-green-400">82%</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="text-[10px] text-slate-500 mb-1">예상 정비 주기</div>
                            <div className="text-xl font-black text-blue-400">3,200km</div>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    선제적 정비 리포트 생성
                </button>
            </div>
        </div>
    );
}

function VersionRow({ label, current, status, urgent, icon }: any) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm text-slate-600 font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400">{current}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${urgent ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                    {urgent ? <AlertCircle className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                    {status}
                </span>
            </div>
        </div>
    );
}
