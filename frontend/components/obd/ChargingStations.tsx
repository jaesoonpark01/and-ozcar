"use client";

import React, { useState } from 'react';
import { Zap, MapPin, Navigation, Map } from 'lucide-react';

interface Station {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    is_ultra_fast: boolean;
    distance_km: number;
}

// Mock stations near the user (Seoul, Gangdong area)
const MOCK_STATIONS: Station[] = [
    { id: 1, name: '현대 EV 스테이션 강동', latitude: 37.5332, longitude: 127.1353, is_ultra_fast: true, distance_km: 1.2 },
    { id: 2, name: '차지비 강동구청역점', latitude: 37.5284, longitude: 127.1256, is_ultra_fast: false, distance_km: 2.5 },
    { id: 3, name: 'E-pit 롯데월드타워', latitude: 37.5133, longitude: 127.1025, is_ultra_fast: true, distance_km: 4.1 },
];

export default function ChargingStations() {
    const [stations, setStations] = useState<Station[] | null>(null);
    const [loading, setLoading] = useState(false);

    const findNearbyStations = async () => {
        setLoading(true);
        // Simulate Supabase RPC Call: supabase.rpc('get_nearby_chargers', { user_lat, user_long })
        setTimeout(() => {
            setStations(MOCK_STATIONS);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <Zap className="text-amber-500" /> 스마트 충전소 추천
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">현재 위치({stations ? '강동구 천호동 발견됨' : 'GPS 기반'}) 반경 5km 탐색</p>
                </div>
                <button
                    onClick={findNearbyStations}
                    disabled={loading}
                    className="bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 p-3 rounded-2xl transition-colors border border-slate-200"
                >
                    {loading ? <Zap className="animate-pulse" /> : <Map />}
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                {!stations && !loading ? (
                    <div className="text-center py-8">
                        <MapPin className="mx-auto w-12 h-12 text-slate-200 mb-3" />
                        <p className="font-bold text-slate-600">우측 상단 아이콘을 눌러 충전소를 탐색하세요.</p>
                    </div>
                ) : loading ? (
                    <div className="flex flex-col items-center py-8 gap-4">
                        <div className="w-8 h-8 border-4 border-slate-100 border-t-amber-500 rounded-full animate-spin" />
                        <p className="text-sm font-bold text-slate-500 animate-pulse">PostGIS 기반 반경 5km 초급속 충전소 스캔 중...</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {stations?.map(st => (
                            <div key={st.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors group">
                                <div className="flex gap-3 items-center">
                                    <div className={`p-2 rounded-xl text-white ${st.is_ultra_fast ? 'bg-amber-500' : 'bg-slate-400'}`}>
                                        <Zap size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{st.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${st.is_ultra_fast ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                                                {st.is_ultra_fast ? '초급속 E-pit 800V' : '표준 완속'}
                                            </span>
                                            <span className="text-xs font-bold text-blue-500">{st.distance_km} km</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-white shadow-sm border border-slate-200 p-3 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                                    <Navigation size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
