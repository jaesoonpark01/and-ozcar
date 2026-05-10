"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Wrench, Building2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

// You should define these in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

type Role = "DRIVER" | "MECHANIC" | "EXPORT" | "MUNICIPALITY";

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
    const [session, setSession] = useState<any>(null);
    const [isGeneratingWallet, setIsGeneratingWallet] = useState(false);
    const [walletReady, setWalletReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Zero-Touch Wallet Generation Simulation
    useEffect(() => {
        if (session && !walletReady && !isGeneratingWallet) {
            setIsGeneratingWallet(true);
            // Simulate AA embedded wallet generation delay
            const timer = setTimeout(() => {
                setIsGeneratingWallet(false);
                setWalletReady(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [session, walletReady, isGeneratingWallet]);

    const handleRoleRouting = (role: Role) => {
        onOpenChange(false);
        switch (role) {
            case "DRIVER":
                router.push("/my-garage");
                break;
            case "MECHANIC":
                router.push("/oz-master");
                break;
            case "EXPORT":
                router.push("/corporate/export");
                break;
            case "MUNICIPALITY":
                router.push("/government/disaster");
                break;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#0a0f1d] border-blue-900/50 text-white backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic tracking-tighter text-blue-400">OZCAR UNIVERSAL</DialogTitle>
                    <DialogDescription className="text-slate-400 text-sm">
                        한국 특화 소셜 로그인과 Web3 지갑을 연결하여 완전한 플랫폼 권한을 획득하세요.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 mt-4">
                    {!session ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-white/5 border border-white/10"
                        >
                            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-center">소셜 계정으로 1초 만에 시작하기</h3>
                            <Auth
                                supabaseClient={supabase}
                                appearance={{ theme: ThemeSupa }}
                                providers={["kakao", "google"]}
                                theme="dark"
                                onlyThirdPartyProviders
                                redirectTo={typeof window !== "undefined" ? window.location.origin : undefined}
                            />
                        </motion.div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {!walletReady ? (
                                <motion.div
                                    key="generating"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="p-8 flex flex-col items-center justify-center gap-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                                >
                                    <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                                    <h3 className="text-lg font-bold text-emerald-400">OUI 지갑 자동 생성 중...</h3>
                                    <p className="text-xs text-slate-400 text-center">
                                        카카오 계정 기반으로 가스비 없는<br/>안전한 Web3 지갑을 보이지 않게 생성하고 있습니다.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="roles"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-3"
                                >
                                    <div className="text-emerald-400 text-sm font-bold bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center mb-2">
                                        ✓ 지갑 생성 완료! 로그인할 역할을 선택하세요.
                                    </div>
                                    
                                    <button onClick={() => handleRoleRouting("DRIVER")} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 transition-all text-left">
                                        <Car className="text-blue-400 w-6 h-6" />
                                        <div>
                                            <div className="font-bold text-white">일반 운전자 (Driver)</div>
                                            <div className="text-xs text-slate-400">데이터 기본소득 현황 및 차량 SOH 확인</div>
                                        </div>
                                    </button>

                                    <button onClick={() => handleRoleRouting("MECHANIC")} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-amber-600/20 border border-white/10 hover:border-amber-500/50 transition-all text-left">
                                        <Wrench className="text-amber-400 w-6 h-6" />
                                        <div>
                                            <div className="font-bold text-white">oz-Master 정비사</div>
                                            <div className="text-xs text-slate-400">OBD-II 단말기 관리 및 지역화폐 정산</div>
                                        </div>
                                    </button>

                                    <button onClick={() => handleRoleRouting("EXPORT")} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-500/50 transition-all text-left">
                                        <Building2 className="text-emerald-400 w-6 h-6" />
                                        <div>
                                            <div className="font-bold text-white">수출 기업 (Corporate)</div>
                                            <div className="text-xs text-slate-400">CBAM 대응 B2B 탄소 인증서 관제실</div>
                                        </div>
                                    </button>

                                    <button onClick={() => handleRoleRouting("MUNICIPALITY")} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/50 transition-all text-left">
                                        <ShieldAlert className="text-red-400 w-6 h-6" />
                                        <div>
                                            <div className="font-bold text-white">지자체 방재망 (Municipality)</div>
                                            <div className="text-xs text-slate-400">전기차 화재 재난 방재망 시스템</div>
                                        </div>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
