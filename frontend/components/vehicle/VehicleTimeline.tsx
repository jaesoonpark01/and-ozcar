'use client';

import { motion } from 'framer-motion';
import { MaintenanceRecord } from '@/services/VehicleService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, CheckCircle2, MapPin, Gauge, Upload } from 'lucide-react';

interface VehicleTimelineProps {
    vin: string;
    history: MaintenanceRecord[];
}

export default function VehicleTimeline({ vin, history }: VehicleTimelineProps) {
    if (history.length === 0) {
        return (
            <div className="text-center p-12 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-400">No maintenance records found for this vehicle.</p>
            </div>
        );
    }

    return (
        <div className="relative space-y-8">
            {/* Central Line */}
            <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 via-slate-700 to-transparent hidden md:block" />

            {history.sort((a, b) => b.timestamp - a.timestamp).map((record, index) => (
                <motion.div
                    key={record.timestamp + index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="relative md:pl-20 group">
                        {/* Dot */}
                        <div className="absolute left-7 top-10 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] border-2 border-slate-900 z-10 hidden md:block group-hover:scale-125 transition-transform" />

                        <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-all shadow-xl overflow-hidden">
                            <div className="md:flex">
                                {/* Side Info */}
                                <div className="p-6 bg-slate-900/50 md:w-48 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-1">
                                        <Gauge className="w-4 h-4" />
                                        {record.mileage.toLocaleString()} km
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(record.timestamp * 1000).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Main Content */}
                                <CardContent className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
                                                Periodic Maintenance
                                            </h4>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <MapPin className="w-3 h-3" />
                                                <span>Verified Service center • {record.technician.substring(0, 6)}...</span>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Blockchain Verified
                                        </Badge>
                                    </div>

                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        {record.description}
                                    </p>

                                    {/* IPFS Images Mock (In real case, fetch from CID) */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="aspect-square rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center group/img relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                                <Upload className="w-6 h-6 text-slate-600 group-hover/img:scale-110 transition-transform" />
                                                <div className="absolute bottom-2 left-2 text-[10px] text-slate-300 opacity-0 group-hover/img:opacity-100">
                                                    IPFS: {record.ipfsHash.substring(0, 10)}...
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                                        <span className="font-mono">CID: {record.ipfsHash}</span>
                                        <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                                            View Source <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
