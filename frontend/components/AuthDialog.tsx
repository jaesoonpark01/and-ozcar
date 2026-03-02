"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { motion } from "framer-motion";

// You should define these in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
    const [session, setSession] = useState<any>(null);
    const { address, isConnected } = useAccount();

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

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#0a0f1d] border-blue-900/50 text-white backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic tracking-tighter text-blue-400">OZCAR UNIVERSAL LOGIN</DialogTitle>
                    <DialogDescription className="text-slate-400 text-sm">
                        한국 특화 소셜 로그인과 Web3 지갑을 연결하여 완전한 플랫폼 권한을 획득하세요.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 mt-4">
                    {/* Step 1: Social Login */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">1. Web2 Identity</h3>
                        {!session ? (
                            <Auth
                                supabaseClient={supabase}
                                appearance={{ theme: ThemeSupa }}
                                providers={["kakao", "google"]}
                                theme="dark"
                                onlyThirdPartyProviders
                                redirectTo={typeof window !== "undefined" ? window.location.origin : undefined}
                            />
                        ) : (
                            <div className="text-emerald-400 text-sm font-bold bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center">
                                ✓ 소셜 로그인 완료 ({session.user?.email})
                            </div>
                        )}
                    </motion.div>

                    {/* Step 2: Web3 Wallet */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">2. Web3 Identity (SIWE)</h3>
                        <div className="flex justify-center flex-col items-center gap-4">
                            <ConnectButton />
                            {isConnected && session && (
                                <div className="text-xs text-blue-400 mt-2 text-center">
                                    Web2 계정과 Web3 지갑 연동이 준비되었습니다.<br />
                                    (프로필 병합 로직 자동 실행 대기 중)
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
