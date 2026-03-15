/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWeb3 } from "./Web3Provider";
import { AuthDialog } from "./AuthDialog";
import { useI18n } from "@/hooks/useI18n";
import { createClient } from "@supabase/supabase-js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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
    ChevronDown,
    Activity,
    Landmark,
    User,
    LogOut,
    Cpu,
    Zap,
    IdCard,
    Users,
    Trophy,
    Leaf
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
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (label: string) => {
        if (dropdownTimeout) clearTimeout(dropdownTimeout);
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setActiveDropdown(null);
        }, 200); // Optimized for UX (200ms)
        setDropdownTimeout(timeout);
    };

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

    const [session, setSession] = useState<any>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const navLinks = [
        {
            href: "/my-garage",
            label: t('nav_workspace' as any) || "Workspace",
            icon: <Car size={14} />,
            categories: [
                {
                    title: "Vehicle Management",
                    items: [
                        { href: "/my-garage", label: t('nav_garage'), desc: t('nav_garage_desc' as any), icon: <Car size={16} /> },
                        { href: "/maintenance", label: t('nav_maintenance'), desc: t('nav_maintenance_desc' as any), icon: <Wrench size={16} /> },
                        { href: "/technician/pro-check", label: t('nav_pro_check'), desc: t('nav_pro_check_desc' as any), icon: <Zap size={16} /> },
                    ]
                },
                {
                    title: "Live Tracking",
                    items: [
                        { href: "/sentinel", label: t('nav_telemetry'), desc: t('nav_telemetry_desc' as any), icon: <Activity size={16} /> },
                        { href: "/thermal-guard", label: t('nav_thermal_guard' as any), desc: t('nav_thermal_guard_desc' as any), icon: <Shield size={16} /> },
                    ]
                }
            ]
        },
        {
            href: "/dashboard",
            label: t('nav_analytics' as any) || "Analytics",
            icon: <LayoutDashboard size={14} />,
            categories: [
                {
                    title: "Overview & Identity",
                    items: [
                        { href: "/dashboard", label: t('nav_overview'), desc: t('nav_overview_desc' as any), icon: <LayoutDashboard size={16} /> },
                        { href: "/master-profile", label: t('nav_master_profile'), desc: t('nav_master_profile_desc' as any), icon: <User size={16} /> },
                        { href: "/vehicle-nft", label: t('nav_vehicle_nft' as any), desc: t('nav_vehicle_nft_desc' as any), icon: <IdCard size={16} /> },
                    ]
                },
                {
                    title: "Finance & Admin",
                    items: [
                        { href: "/wallet", label: t('nav_wallet'), desc: t('nav_wallet_desc' as any), icon: <Wallet size={16} /> },
                        { href: "/admin/hub", label: t('nav_dev_hub' as any), desc: t('nav_dev_hub_desc' as any), icon: <Cpu size={16} /> },
                    ]
                }
            ]
        },
        {
            href: "/marketplace",
            label: t('nav_market'),
            icon: <ShoppingBag size={14} />,
            categories: [
                {
                    title: "Trading",
                    items: [
                        { href: "/marketplace", label: t('nav_data_nft_trade' as any), desc: t('nav_data_nft_trade_desc' as any), icon: <ShoppingBag size={16} /> },
                        { href: "/sell", label: t('nav_onboarding'), desc: t('nav_onboarding_desc' as any), icon: <Car size={16} /> },
                        { href: "/orders", label: t('nav_orders'), desc: t('nav_orders_desc' as any), icon: <LayoutDashboard size={16} /> },
                    ]
                },
                {
                    title: "Data Economy",
                    items: [
                        { href: "/insight-lab", label: t('nav_insight_lab'), desc: t('nav_insight_lab_desc' as any), icon: <Activity size={16} /> },
                        { href: "/v2g-market", label: t('nav_v2g_market' as any), desc: t('nav_v2g_market_desc' as any), icon: <Zap size={16} /> },
                        { href: "/marketplace/data", label: t('nav_data_market' as any), desc: t('nav_data_market_desc' as any), icon: <Cpu size={16} /> },
                    ]
                }
            ]
        },
        {
            href: "/governance",
            label: t('nav_dao'),
            icon: <Landmark size={14} />,
            categories: [
                {
                    title: "Governance",
                    items: [
                        { href: "/governance", label: t('nav_governance'), desc: t('nav_governance_desc' as any), icon: <Landmark size={16} /> },
                        { href: "/governance/constitution", label: t('nav_constitution' as any), desc: t('nav_constitution_desc' as any), icon: <Shield size={16} /> },
                        { href: "/jury", label: t('nav_justice'), desc: t('nav_justice' as any), icon: <Shield size={16} /> },
                    ]
                },
                {
                    title: "Community",
                    items: [
                        { href: "/social-league", label: t('nav_social_league' as any), desc: t('nav_social_league_desc' as any), icon: <Trophy size={16} /> },
                        { href: "/eco-lab", label: t('nav_eco_lab' as any), desc: t('nav_eco_lab_desc' as any), icon: <Leaf size={16} /> },
                        { href: "/ambassador", label: t('nav_ambassador' as any), desc: t('nav_ambassador_desc' as any), icon: <Users size={16} /> },
                        { href: "/lounge", label: t('nav_founders_lounge'), desc: t('nav_founders_lounge_desc' as any), icon: <User size={16} /> },
                    ]
                }
            ]
        },
    ];

    const [isBottomNavVisible, setIsBottomNavVisible] = useState(false);

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
                    <div className="hidden lg:flex items-center gap-2 xl:gap-4 bg-white/5 p-1.5 rounded-full border border-white/5 mx-4 overflow-visible">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="relative group"
                                onMouseEnter={() => link.categories && handleMouseEnter(link.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-1.5 xl:gap-2 px-4 xl:px-6 py-2.5 rounded-full text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-all italic whitespace-nowrap ${activeDropdown === link.label ? 'text-blue-400 bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {link.icon}
                                    <span className="ml-1.5 line-clamp-1">{link.label}</span>
                                    {link.categories && <ChevronDown size={12} className={`ml-1 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                                </Link>

                                {link.categories && activeDropdown === link.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[500px] w-max max-w-[800px] bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-[3000] overflow-hidden"
                                    >
                                        <div className="grid grid-cols-2 gap-8 relative z-10">
                                            {link.categories.map((cat, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    <h4 className="text-[9px] font-black italic text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">{cat.title}</h4>
                                                    <div className="grid gap-2">
                                                        {cat.items.map((sub) => (
                                                            <Link
                                                                key={sub.href}
                                                                href={sub.href}
                                                                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group/item"
                                                            >
                                                                <div className="mt-0.5 p-2 bg-white/5 rounded-xl group-hover/item:bg-blue-600/20 group-hover/item:text-blue-400 transition-colors shrink-0">
                                                                    {sub.icon}
                                                                </div>
                                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                                    <span className="text-[11px] font-black uppercase tracking-wider italic text-slate-200 group-hover/item:text-white truncate">{sub.label}</span>
                                                                    <span className="text-[10px] text-gray-500 line-clamp-1 group-hover/item:text-gray-400 transition-colors">{sub.desc}</span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />
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
                            <ConnectButton.Custom>
                                {({
                                    account,
                                    chain,
                                    openAccountModal,
                                    openChainModal,
                                    openConnectModal,
                                    authenticationStatus,
                                    mounted,
                                }) => {
                                    const ready = mounted && authenticationStatus !== 'loading';
                                    const connected =
                                        ready &&
                                        account &&
                                        chain &&
                                        (!authenticationStatus ||
                                            authenticationStatus === 'authenticated');

                                    return (
                                        <div
                                            {...(!ready && {
                                                'aria-hidden': true,
                                                'style': {
                                                    opacity: 0,
                                                    pointerEvents: 'none',
                                                    userSelect: 'none',
                                                },
                                            })}
                                        >
                                            {(() => {
                                                if (!connected) {
                                                    return (
                                                        <button
                                                            onClick={openConnectModal}
                                                            type="button"
                                                            className="relative group overflow-hidden flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-6 py-1.5 sm:py-3 rounded-full font-black text-[8px] sm:text-[11px] uppercase tracking-normal sm:tracking-widest transition-all bg-white text-black hover:bg-blue-600 hover:text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
                                                        >
                                                            <div className="relative z-10 flex items-center gap-1 sm:gap-3">
                                                                <Wallet size={10} />
                                                                <span>{t("nav_connect")}</span>
                                                            </div>
                                                        </button>
                                                    );
                                                }

                                                if (chain.unsupported) {
                                                    return (
                                                        <button onClick={openChainModal} type="button" className="px-4 py-2 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                                            Wrong network
                                                        </button>
                                                    );
                                                }

                                                return (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={openChainModal}
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                            type="button"
                                                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                                                        >
                                                            {chain.hasIcon && (
                                                                <div
                                                                    style={{
                                                                        background: chain.iconBackground,
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 999,
                                                                        overflow: 'hidden',
                                                                        marginRight: 4,
                                                                    }}
                                                                >
                                                                    {chain.iconUrl && (
                                                                        <img
                                                                            alt={chain.name ?? 'Chain icon'}
                                                                            src={chain.iconUrl}
                                                                            style={{ width: 14, height: 14 }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            )}
                                                            <span className="text-[10px] font-bold text-slate-300">{chain.name}</span>
                                                        </button>

                                                        <button
                                                            onClick={openAccountModal}
                                                            type="button"
                                                            className="relative group overflow-hidden flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-black text-[8px] sm:text-[11px] uppercase tracking-normal sm:tracking-widest transition-all bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-500/20"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <User size={12} className="text-emerald-400" />
                                                                <span>
                                                                    {account.displayName}
                                                                </span>
                                                                {account.displayBalance && (
                                                                    <span className="hidden opacity-70 border-l border-emerald-500/20 pl-2 ml-1">
                                                                        {account.displayBalance}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    );
                                }}
                            </ConnectButton.Custom>
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
                        className="fixed inset-0 z-[2500] bg-black/95 backdrop-blur-2xl flex flex-col p-6 pt-24"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-3 bg-white/10 rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={22} />
                        </button>
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] no-scrollbar">
                            {navLinks.map((link) => (
                                <div key={link.label} className="flex flex-col gap-2">
                                    <div
                                        onClick={() => {
                                            if (link.categories) {
                                                setActiveDropdown(activeDropdown === link.label ? null : link.label);
                                            } else {
                                                setIsMobileMenuOpen(false);
                                                window.location.href = link.href;
                                            }
                                        }}
                                        className={`flex items-center justify-between group p-4 rounded-3xl border transition-all ${activeDropdown === link.label ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 transition-transform group-active:scale-95">
                                                {link.icon}
                                            </div>
                                            <span className="text-xl font-black italic uppercase tracking-tighter text-white">{link.label}</span>
                                        </div>
                                        {link.categories ? (
                                            <ChevronDown className={`text-white transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180 text-blue-400' : 'opacity-40'}`} />
                                        ) : (
                                            <ChevronRight className="text-white/20 group-hover:text-blue-400 transition-colors" />
                                        )}
                                    </div>

                                    {link.categories && activeDropdown === link.label && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden bg-black/40 rounded-3xl border border-white/5 mt-1"
                                        >
                                            <div className="p-3 space-y-4">
                                                {link.categories.map((cat, idx) => (
                                                    <div key={idx} className="space-y-2">
                                                        <h4 className="text-[9px] font-black italic text-blue-400/80 uppercase tracking-widest px-3">{cat.title}</h4>
                                                        <div className="grid gap-1">
                                                            {cat.items.map((sub) => (
                                                                <Link
                                                                    key={sub.href}
                                                                    href={sub.href}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 active:bg-blue-600/20 transition-colors relative overflow-hidden"
                                                                >
                                                                    <div className="w-8 h-8 shrink-0 bg-black/40 rounded-xl flex items-center justify-center text-slate-400">
                                                                        {React.cloneElement(sub.icon as React.ReactElement, { size: 14 } as any)}
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <span className="text-sm font-black italic uppercase text-slate-200 line-clamp-1">{sub.label}</span>
                                                                        <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{sub.desc}</span>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
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
                                {account ? t('nav_connected') : t("nav_connect")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />

            {/* Mobile Bottom Navigation Bar (Toggleable for better visibility) */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] flex flex-col items-center gap-4 w-[90%] max-w-md">
                <AnimatePresence>
                    {isBottomNavVisible && (
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-around p-2 shadow-[0_15px_30px_rgba(0,0,0,0.5)] w-full"
                        >
                            <Link href="/" className="p-3 text-slate-400 hover:text-white transition-colors" onClick={() => setIsBottomNavVisible(false)}>
                                <Globe size={20} />
                            </Link>
                            <Link href="/sentinel" className="p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-900/40 -translate-y-2 hover:scale-105 transition-transform" onClick={() => setIsBottomNavVisible(false)}>
                                <Activity size={24} />
                            </Link>
                            <Link href="/dashboard" className="p-3 text-slate-400 hover:text-white transition-colors" onClick={() => setIsBottomNavVisible(false)}>
                                <LayoutDashboard size={20} />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button/Handle */}
                <button
                    onClick={() => setIsBottomNavVisible(!isBottomNavVisible)}
                    className={`
                        p-4 rounded-full border shadow-2xl transition-all duration-300
                        ${isBottomNavVisible
                            ? 'bg-red-500/20 border-red-500/30 text-red-400 rotate-45'
                            : 'bg-blue-600 border-blue-400/50 text-white hover:scale-110 active:scale-90'}
                    `}
                >
                    {isBottomNavVisible ? <X size={24} /> : <Activity size={24} className="animate-pulse" />}
                </button>
            </div>
        </>
    );
}
