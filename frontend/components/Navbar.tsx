"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWeb3 } from "./Web3Provider";
import { AuthDialog } from "./AuthDialog";
import { useI18n } from "@/hooks/useI18n";
import { createClient } from "@supabase/supabase-js";
import {
    Wallet,
    Globe,
    Menu,
    X,
    ChevronRight,
    LayoutDashboard,
    ShoppingBag,
    Car,
    Wrench,
    Shield,
    Share2,
    Star,
    ChevronDown,
    Activity,
    Target,
    Vote,
    Landmark,
    User,
    LogOut,
    Cpu,
    BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Navbar() {
    const { account, connectWallet, reputation } = useWeb3();
    const { lang, toggleLanguage, t } = useI18n();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        // Supabase session management
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const navLinks = [
        { href: "/marketplace", label: t('nav_market'), icon: <ShoppingBag size={14} /> },
        {
            href: "#",
            label: t('nav_ecosystem'),
            icon: <Globe size={14} />,
            subLinks: [
                { href: "/vehicle/onboarding", label: t('nav_onboarding'), icon: <Car size={14} /> },
                { href: "/vehicle/mining-report", label: t('nav_mining_report'), icon: <Star size={14} /> },
                { href: "/leaderboard", label: t('nav_leaderboard'), icon: <Activity size={14} /> },
                { href: "/justice-center", label: t('nav_justice'), icon: <Shield size={14} /> },
                { href: "/jury", label: t('nav_jury'), icon: <Target size={14} /> },
                { href: "/governance/vote", label: t('nav_gov_vote'), icon: <Vote size={14} /> },
                { href: "/governance/report", label: t('nav_gov_report'), icon: <Landmark size={14} /> },
            ]
        },
        {
            href: "#",
            label: t('nav_founder_portal'),
            icon: <Shield size={14} />,
            subLinks: [
                { href: "/insight-lab", label: t('nav_insight_lab'), icon: <Activity size={14} /> },
                { href: "/telemetry", label: t('nav_telemetry'), icon: <Cpu size={14} /> },
                { href: "/technician/dashboard", label: t('nav_mining_sim'), icon: <BarChart3 size={14} /> },
            ]
        },
        { href: "/governance", label: t('nav_governance'), icon: <Shield size={14} /> },
        { href: "/maintenance", label: t('nav_maintenance'), icon: <Wrench size={14} /> },
        { href: "/admin/hub", label: t('nav_hub'), icon: <LayoutDashboard size={14} /> },
        { href: "/dashboard", label: t('dash_title'), icon: <Star size={14} /> },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-0 right-0 z-[2000] px-4"
            >
                <div className={`
                    max-w-7xl mx-auto transition-all duration-500
                    relative flex items-center justify-between px-3 sm:px-8 py-2 sm:py-4 
                    rounded-[1.25rem] sm:rounded-[2.5rem] border overflow-hidden
                    ${isScrolled
                        ? 'bg-black/60 backdrop-blur-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                        : 'bg-white/5 backdrop-blur-xl border-white/5'}
                `}>
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-white font-black text-lg sm:text-xl italic">O</span>
                        </div>
                        <span className="text-lg sm:text-2xl font-black tracking-tighter italic text-white group-hover:text-blue-400 transition-colors">OZCAR</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/5 p-1.5 rounded-full border border-white/5 mx-4 overflow-visible">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() => link.subLinks && setActiveDropdown(link.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-1.5 xl:gap-2 px-4 xl:px-6 py-2.5 rounded-full text-[10px] xl:text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all italic whitespace-nowrap"
                                >
                                    {link.icon}
                                    {link.label}
                                    {link.subLinks && <ChevronDown size={12} className={`ml-1 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                                </Link>

                                {link.subLinks && activeDropdown === link.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-2xl z-[3000]"
                                    >
                                        <div className="grid gap-2">
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-white transition-all group"
                                                >
                                                    <span className="p-2 bg-white/5 rounded-xl group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                                                        {sub.icon}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest italic">{sub.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <button
                            onClick={toggleLanguage}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/15 transition-all"
                        >
                            <Globe size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{lang === 'ko' ? 'EN' : 'KO'}</span>
                        </button>

                        {/* Wallet / Portal Access */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className={`
                                    relative group overflow-hidden flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-6 py-1.5 sm:py-3 rounded-full 
                                    font-black text-[8px] sm:text-[11px] uppercase tracking-normal sm:tracking-widest transition-all
                                    ${(account || session)
                                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                        : 'bg-white text-black hover:bg-blue-600 hover:text-white'}
                                `}
                            >
                                <div className="relative z-10 flex items-center gap-1 sm:gap-3">
                                    {(account || session) ? (
                                        session?.user?.email ? (
                                            <div className="flex items-center gap-2">
                                                <User size={12} className="text-emerald-400" />
                                                <span className="truncate max-w-[60px] xs:max-w-[100px] border-r border-emerald-500/20 pr-2">
                                                    {session.user.email.split('@')[0]}
                                                </span>
                                                {account ? (
                                                    <span className="text-[7px] sm:text-[9px] opacity-70">
                                                        {account.substring(0, 4)}...
                                                    </span>
                                                ) : (
                                                    <span className="text-[7px] sm:text-[9px] text-blue-400 italic">지갑미연결</span>
                                                )}
                                            </div>
                                        ) : (
                                            <>
                                                <Wallet size={10} className="text-emerald-400" />
                                                <span className="truncate max-w-[40px] xs:max-w-[60px] sm:max-w-none">
                                                    {account ? `${account.substring(0, 4)}...` : '연결됨'}
                                                </span>
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <Wallet size={10} />
                                            <span>{t("nav_connect")}</span>
                                        </>
                                    )}
                                    {account && reputation && (
                                        <span className="hidden xs:inline-block px-1 py-0.5 bg-emerald-500/20 rounded-md text-[7px] sm:text-[9px]">REP {reputation}</span>
                                    )}
                                </div>
                            </button>

                            {(account || session) && (
                                <button
                                    onClick={async () => {
                                        await supabase.auth.signOut();
                                        // Wagmi logout is tricky with pure vanilla button, usually handled in ConnectButton
                                        // or via disconnect() from useDisconnect
                                    }}
                                    className="p-2 sm:p-3 bg-white/5 rounded-full border border-white/10 text-white/40 hover:text-red-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={14} />
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2.5 sm:p-3 bg-white/5 rounded-2xl border border-white/10 text-white shrink-0"
                        >
                            {isMobileMenuOpen ? <X size={isScrolled ? 18 : 20} /> : <Menu size={isScrolled ? 18 : 20} />}
                        </button>
                    </div>

                    {/* Glow Effect Overlay */}
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-blue-600/5 via-transparent to-indigo-600/5 pointer-events-none opacity-50" />
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[1900] bg-black/95 backdrop-blur-2xl flex flex-col p-6 pt-24"
                    >
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] no-scrollbar">
                            {navLinks.map((link) => (
                                <div key={link.label} className="flex flex-col gap-2">
                                    <div
                                        onClick={() => {
                                            if (link.subLinks) {
                                                setActiveDropdown(activeDropdown === link.label ? null : link.label);
                                            } else {
                                                setIsMobileMenuOpen(false);
                                                window.location.href = link.href;
                                            }
                                        }}
                                        className="flex items-center justify-between group p-4 rounded-3xl bg-white/5 border border-white/5"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 transition-transform group-active:scale-95">
                                                {link.icon}
                                            </div>
                                            <span className="text-xl font-black italic uppercase tracking-tighter">{link.label}</span>
                                        </div>
                                        {link.subLinks ? (
                                            <ChevronDown className={`text-white/20 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                        ) : (
                                            <ChevronRight className="text-white/20 group-hover:text-blue-400 transition-colors" />
                                        )}
                                    </div>

                                    {link.subLinks && activeDropdown === link.label && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="grid gap-2 pl-6 overflow-hidden"
                                        >
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                                                >
                                                    <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                                        {sub.icon}
                                                    </div>
                                                    <span className="text-sm font-black italic uppercase text-slate-300">{sub.label}</span>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 pb-8">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center justify-center gap-2 p-4 rounded-[1.5rem] bg-white/5 border border-white/10 text-sm font-black uppercase italic"
                            >
                                <Globe size={16} />
                                {lang === 'ko' ? 'EN' : 'KO'}
                            </button>
                            <button
                                onClick={() => { setIsAuthOpen(true); setIsMobileMenuOpen(false); }}
                                className="p-4 rounded-[1.5rem] bg-blue-600 text-white text-sm font-black uppercase italic shadow-lg shadow-blue-600/20"
                            >
                                {account ? (lang === 'ko' ? '연결됨' : 'LINKED') : t("nav_connect")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
        </>
    );
}
