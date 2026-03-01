
"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { ShieldAlert, Activity, UserMinus, Search, AlertTriangle, CheckCircle, Lock, Unlock, Eye } from "lucide-react";
import { SentinelService, SecurityAlert as SentinelAlert } from "@/services/ai/SentinelService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useI18n } from '@/hooks/useI18n';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SecurityAlert {
    id: string;
    technician_id: string;
    technician_name?: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    reason: string;
    status: "OPEN" | "RESOLVED";
    created_at: string;
}

interface HardwareAlert {
    id: string;
    car_id: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    alert_type: string;
    description: string;
    created_at: string;
}

export default function SecurityDashboard() {
    const { t } = useI18n();
    const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
    const [sentinelAlerts, setSentinelAlerts] = useState<SentinelAlert[]>([]);
    const [hardwareAlerts, setHardwareAlerts] = useState<HardwareAlert[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock initial data fetch - replace with real API/RPC in prod
    useEffect(() => {
        // Creating some mock data for demonstration
        const mockAlerts: SecurityAlert[] = [
            {
                id: "1",
                technician_id: "tech-123",
                technician_name: "AutoFix Seoul",
                severity: "CRITICAL",
                reason: "Abnormal Mining Activity Detected (Rate Limit Exceeded)",
                status: "OPEN",
                created_at: new Date().toISOString(),
            }
        ];
        setAlerts(mockAlerts);
        setSentinelAlerts(SentinelService.getActiveAlerts());

        // Initial fetch for hardware alerts
        const fetchHardwareAlerts = async () => {
            const { data } = await supabase
                .from('anomaly_alerts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);
            if (data) setHardwareAlerts(data);
        };
        fetchHardwareAlerts();

        // Real-time Subscription for Hardware Emergencies
        const channel = supabase
            .channel('hardware-emergencies')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'anomaly_alerts' }, payload => {
                setHardwareAlerts(prev => [payload.new as HardwareAlert, ...prev].slice(0, 5));
            })
            .subscribe();

        setLoading(false);

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSlash = (id: string, severity: string) => {
        console.log(`Slashing technician for alert ${id} with severity ${severity}`);
        setAlerts(alerts.map(a => a.id === id ? { ...a, status: "RESOLVED" } : a));
    };

    const handleFreeze = async (escrowId: number, reason: string) => {
        console.log(`Executing EMERGENCY FREEZE for Escrow ${escrowId}: ${reason}`);
        alert(`Emergency Freeze Transmitted for Escrow #${escrowId}`);
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-red-950/20 border-red-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-400">
                            {t('hub_security_critical')}
                        </CardTitle>
                        <ShieldAlert className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">
                            {alerts.filter(a => a.severity === "CRITICAL" && a.status === "OPEN").length}
                        </div>
                        <p className="text-xs text-red-400/60 mt-1">{t('hub_security_critical_desc')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-amber-950/20 border-amber-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-amber-400">
                            {t('hub_security_sentinel')}
                        </CardTitle>
                        <Lock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-500">
                            {sentinelAlerts.length}
                        </div>
                        <p className="text-xs text-amber-400/60 mt-1">{t('hub_security_sentinel_desc')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t('hub_security_health')}
                        </CardTitle>
                        <Activity className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-500">98.5%</div>
                        <p className="text-xs text-slate-500 mt-1">{t('hub_security_uptime')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">
                            {t('hub_security_techs')}
                        </CardTitle>
                        <Search className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-300">1,240</div>
                        <p className="text-xs text-slate-500 mt-1">{t('hub_security_techs_new')}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Sentinel Real-time Monitor */}
            <Card className="border-amber-500/30 bg-amber-950/5 overflow-hidden">
                <div className="bg-amber-500/10 px-6 py-3 border-b border-amber-500/20 flex justify-between items-center text-amber-400">
                    <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        {t('hub_security_monitor')}
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/20">{t('hub_security_active')}</Badge>
                </div>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-900/50">
                            <TableRow className="border-amber-500/10 hover:bg-transparent">
                                <TableHead className="text-amber-400/70">{t('hub_security_severity')}</TableHead>
                                <TableHead className="text-amber-400/70">{t('hub_marketplace_table_category')}</TableHead>
                                <TableHead className="text-amber-400/70">{t('hub_security_target')}</TableHead>
                                <TableHead className="text-amber-400/70">{t('hub_security_intel')}</TableHead>
                                <TableHead className="text-right text-amber-400/70 py-4">{t('hub_security_intervention')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sentinelAlerts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-slate-500 font-medium">
                                        {t('hub_security_no_alerts')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sentinelAlerts.map((s) => (
                                    <TableRow key={s.id} className="border-amber-500/5 hover:bg-amber-500/5 transition-colors">
                                        <TableCell>
                                            <Badge variant="outline" className={`${s.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                                s.severity === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                                    'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                }`}>
                                                {s.severity}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-slate-300">{s.type}</TableCell>
                                        <TableCell className="font-mono text-xs text-amber-200/80">{s.target}</TableCell>
                                        <TableCell className="text-xs text-slate-400 max-w-xs">{s.description}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {s.status === 'AUTO_FROZEN' ? (
                                                <Badge className="bg-red-600 text-white font-bold h-8 px-3"><Lock className="w-3 h-3 mr-1" /> {t('hub_security_frozen')}</Badge>
                                            ) : (
                                                <>
                                                    <Button variant="outline" size="sm" className="bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white" onClick={() => handleFreeze(0, s.description)}>
                                                        <Lock className="w-3 h-3 mr-1" /> {t('hub_security_freeze')}
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Hardware Integrity & Anomaly Monitor (New Step from Guide) */}
            <Card className="border-red-500/30 bg-red-950/5 overflow-hidden">
                <div className="bg-red-500/10 px-6 py-3 border-b border-red-500/20 flex justify-between items-center text-red-400">
                    <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                        <Activity className="h-4 w-4 text-red-500" />
                        {t('hub_security_integrity')}
                    </div>
                    <Badge variant="outline" className="text-red-400 border-red-500/20">{t('hub_security_edge_ai')}</Badge>
                </div>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-900/50">
                            <TableRow className="border-red-500/10 hover:bg-transparent">
                                <TableHead className="text-red-400/70">{t('hub_security_severity')}</TableHead>
                                <TableHead className="text-red-400/70">Vehicle ID</TableHead>
                                <TableHead className="text-red-400/70">Issue Type</TableHead>
                                <TableHead className="text-red-400/70">{t('hub_marketplace_table_details')}</TableHead>
                                <TableHead className="text-right text-red-400/70 py-4">{t('hub_marketplace_table_date')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hardwareAlerts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-slate-500 font-medium">
                                        {t('hub_security_waiting')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                hardwareAlerts.map((h) => (
                                    <TableRow key={h.id} className="border-red-500/5 hover:bg-red-500/5 transition-colors">
                                        <TableCell>
                                            <Badge className={`${h.severity === 'CRITICAL' ? 'bg-red-600' : 'bg-amber-600'} text-white`}>
                                                {h.severity}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-slate-300">{h.car_id.slice(0, 8)}...</TableCell>
                                        <TableCell className="font-bold text-xs text-red-200/80">{h.alert_type}</TableCell>
                                        <TableCell className="text-xs text-slate-400">{h.description}</TableCell>
                                        <TableCell className="text-right text-xs text-slate-500">
                                            {new Date(h.created_at).toLocaleTimeString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="col-span-3 bg-slate-900 border-slate-800 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        {t('hub_security_governance')}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        {t('hub_security_gov_desc')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-400">{t('hub_security_severity')}</TableHead>
                                <TableHead className="text-slate-400">{t('hub_marketplace_seller')}</TableHead>
                                <TableHead className="text-slate-400">{t('hub_marketplace_table_details')}</TableHead>
                                <TableHead className="text-slate-400">{t('hub_marketplace_table_date')}</TableHead>
                                <TableHead className="text-right text-slate-400">{t('hub_security_intervention')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">Loading compliance data...</TableCell>
                                </TableRow>
                            ) : alerts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                        No active compliance issues.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                alerts.map((alert) => (
                                    <TableRow key={alert.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                                        <TableCell>
                                            <Badge variant={alert.severity === "CRITICAL" ? "destructive" : "secondary"}>
                                                {alert.severity}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-200">
                                            {alert.technician_name || alert.technician_id}
                                        </TableCell>
                                        <TableCell className="text-slate-400">{alert.reason}</TableCell>
                                        <TableCell className="text-slate-500 text-xs font-mono">
                                            {new Date(alert.created_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {alert.status === "OPEN" ? (
                                                <>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleSlash(alert.id, alert.severity)}
                                                    >
                                                        <UserMinus className="w-4 h-4 mr-1" />
                                                        {t('hub_security_slash')}
                                                    </Button>
                                                </>
                                            ) : (
                                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                    <CheckCircle className="w-3 h-3 mr-1" /> {t('hub_security_resolved')}
                                                </Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Alert className="bg-slate-900 border-slate-700">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-500">{t('hub_security_protocol')}</AlertTitle>
                <AlertDescription className="text-slate-400">
                    {t('hub_security_protocol_desc')}
                </AlertDescription>
            </Alert>
        </div>
    );
}
