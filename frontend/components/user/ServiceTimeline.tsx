import React from 'react';
import { Circle, CheckCircle2, Clock, Calendar, ShieldCheck } from 'lucide-react';

interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    type: 'COMPLETED' | 'UPCOMING' | 'RECOMMENDED';
    description: string;
}

export default function ServiceTimeline() {
    const events: TimelineEvent[] = [
        { id: '1', title: '엔진오일 교체', date: '2024-02-15', type: 'COMPLETED', description: '오즈카 마스터 정비소 (강남점) 완료' },
        { id: '2', title: '브레이크 패드 점검', date: '2024-05-20', type: 'RECOMMENDED', description: '주행 데이터 기반 AI 분석 권장' },
        { id: '3', title: '정기 검사 대행', date: '2024-07-15', type: 'UPCOMING', description: '검사 대행 예약 대기 중' },
    ];

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-black mb-6">차량 생애주기 타임라인</h3>
            <div className="space-y-8">
                {events.map((event, idx) => (
                    <div key={event.id} className="relative flex gap-4">
                        {/* Connecting Line */}
                        {idx !== events.length - 1 && (
                            <div className="absolute left-[11px] top-6 w-[2px] h-10 bg-slate-100"></div>
                        )}

                        <div className="relative z-10">
                            {event.type === 'COMPLETED' ? (
                                <CheckCircle2 className="text-emerald-500 w-6 h-6 bg-white" />
                            ) : event.type === 'UPCOMING' ? (
                                <Clock className="text-blue-500 w-6 h-6 bg-white" />
                            ) : (
                                <Circle className="text-amber-500 w-6 h-6 bg-white fill-current opacity-20" />
                            )}
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400">{event.date}</span>
                                <Badge text={event.type} />
                            </div>
                            <h4 className="text-sm font-black mt-0.5">{event.title}</h4>
                            <p className="text-xs text-slate-500 mt-1">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Badge({ text }: { text: string }) {
    const colors: Record<string, string> = {
        COMPLETED: 'bg-emerald-50 text-emerald-600',
        UPCOMING: 'bg-blue-50 text-blue-600',
        RECOMMENDED: 'bg-amber-50 text-amber-600'
    };
    return (
        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md ${colors[text]}`}>
            {text}
        </span>
    );
}
