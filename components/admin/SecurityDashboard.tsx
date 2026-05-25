
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

export default function SecurityDashboard() {
    const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
    const [sentinelAlerts, setSentinelAlerts] = useState<SentinelAlert[]>([]);
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
        setLoading(false);
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
                            Critical Alerts
                        </CardTitle>
                        <ShieldAlert className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">
                            {alerts.filter(a => a.severity === "CRITICAL" && a.status === "OPEN").length}
                        </div>
                        <p className="text-xs text-red-400/60 mt-1">Requires immediate attention</p>
                    </CardContent>
                </Card>

                <Card className="bg-amber-950/20 border-amber-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-amber-400">
                            Sentinel Detections
                        </CardTitle>
                        <Lock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-500">
                            {sentinelAlerts.length}
                        </div>
                        <p className="text-xs text-amber-400/60 mt-1">AI-driven anomalies</p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            System Health
                        </CardTitle>
                        <Activity className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-500">98.5%</div>
                        <p className="text-xs text-slate-500 mt-1">Operational Uptime</p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">
                            Verified Technicians
                        </CardTitle>
                        <Search className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-300">1,240</div>
                        <p className="text-xs text-slate-500 mt-1">+12 this week</p>
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
                        Sentinel AI: Real-time Threat Monitor
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/20">Active Protection</Badge>
                </div>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-900/50">
                            <TableRow className="border-amber-500/10 hover:bg-transparent">
                                <TableHead className="text-amber-400/70">Severity</TableHead>
                                <TableHead className="text-amber-400/70">Type</TableHead>
                                <TableHead className="text-amber-400/70">Target</TableHead>
                                <TableHead className="text-amber-400/70">Intelligence</TableHead>
                                <TableHead className="text-right text-amber-400/70 py-4">Intervention</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sentinelAlerts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-slate-500 font-medium">
                                        No active sentinel detections. System secure.
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
                                                <Badge className="bg-red-600 text-white font-bold h-8 px-3"><Lock className="w-3 h-3 mr-1" /> AUTO-FROZEN</Badge>
                                            ) : (
                                                <>
                                                    <Button variant="outline" size="sm" className="bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white" onClick={() => handleFreeze(0, s.description)}>
                                                        <Lock className="w-3 h-3 mr-1" /> Freeze
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

            <Card className="col-span-3 bg-slate-900 border-slate-800 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        Compliance & Governance
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Manual intervention for verified technician mining anomalies.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-400">Severity</TableHead>
                                <TableHead className="text-slate-400">Technician</TableHead>
                                <TableHead className="text-slate-400">Reason</TableHead>
                                <TableHead className="text-slate-400">Time</TableHead>
                                <TableHead className="text-right text-slate-400">Action</TableHead>
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
                                                        Slash
                                                    </Button>
                                                </>
                                            ) : (
                                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                    <CheckCircle className="w-3 h-3 mr-1" /> Resolved
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
                <AlertTitle className="text-amber-500">Security & Governance Protocol</AlertTitle>
                <AlertDescription className="text-slate-400">
                    Interventions (Freezes/Slashes) are broadcasted to the Polygon network and recorded in the audit log. Sentinel AI runs continuously to maintain ecosystem integrity.
                </AlertDescription>
            </Alert>
        </div>
    );
}
