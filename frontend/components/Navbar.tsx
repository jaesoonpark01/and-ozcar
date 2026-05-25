/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWeb3 } from "./Web3Provider";
import { AuthDialog } from "./AuthDialog";
import { CommandPalette } from "./CommandPalette";
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
    Leaf,
    MonitorSmartphone,
    BookOpen,
    BatteryCharging,
    Search
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

    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    const handleMouseEnter = (label: string) => {
        if (dropdownTimeout) clearTimeout(dropdownTimeout);
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setActiveDropdown(null);
        }, 350); // Optimized for UX (350ms)
        setDropdownTimeout(timeout);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

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
            window.removeEventListener("keydown", handleKeyDown);
            subscription.unsubscribe();
        };
    }, []);

    const [session, setSession] = useState<any>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const navLinks = [
        {
            href: "/my-garage",
            label: t('nav_workspace' as any) || "My Garage",
            icon: <Car size={14} />,
        },
        {
            href: "/marketplace",
            label: t('nav_market') || "Marketplace",
            icon: <ShoppingBag size={14} />,
        },
        {
            href: "/governance",
            label: t('nav_dao') || "Community & DAO",
            icon: <Landmark size={14} />,
        },
        {
            href: "/pricing",
            label: t('nav_pricing' as any) || "Pricing",
            icon: <Zap size={14} />,
        },
        {
            href: "/dashboard",
            label: t('nav_analytics' as any) || "Dashboard",
            icon: <LayoutDashboard size={14} />,
        }
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
                        <div className="w-10 h-10 sm:w-14 sm:h-14 relative flex items-center justify-center group-hover:scale-110 transition-transform">
                            <img src="/ozlogo.svg" alt="Ozcar Logo" className="w-full h-full object-contain drop-shadow-md" />
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
                        {/* Command Palette Trigger */}
                        <button
                            onClick={() => setIsCommandPaletteOpen(true)}
                            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/15 transition-all group"
                        >
                            <Search size={14} className="group-hover:text-blue-400 transition-colors" />
                            <span className="text-[10px] font-black tracking-widest flex items-center gap-1.5">
                                SEARCH <span className="opacity-50 px-1.5 py-0.5 bg-white/10 rounded group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">⌘K</span>
                            </span>
                        </button>

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
                            {!session ? (
                                <button
                                    onClick={() => setIsAuthOpen(true)}
                                    type="button"
                                    className="relative group overflow-hidden flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-6 py-1.5 sm:py-3 rounded-full font-black text-[8px] sm:text-[11px] uppercase tracking-normal sm:tracking-widest transition-all bg-white text-black hover:bg-blue-600 hover:text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
                                >
                                    <div className="relative z-10 flex items-center gap-1 sm:gap-3">
                                        <Wallet size={10} />
                                        <span>{t("nav_connect")}</span>
                                    </div>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsAuthOpen(true)} 
                                    type="button"
                                    className="relative group overflow-hidden flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-black text-[8px] sm:text-[11px] uppercase tracking-normal sm:tracking-widest transition-all bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-500/20"
                                >
                                    <div className="flex items-center gap-2">
                                        <User size={12} className="text-emerald-400" />
                                        <span>
                                            {session.user?.user_metadata?.full_name || session.user?.email?.split('@')[0] || "OZ_USER"}
                                        </span>
                                        <span className="opacity-70 border-l border-emerald-500/20 pl-2 ml-1">
                                            $OZ 0.00
                                        </span>
                                    </div>
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
                        className="fixed inset-0 z-[2500] bg-black/95 backdrop-blur-2xl flex flex-col p-6 pt-24"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-3 bg-white/10 rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={22} />
                        </button>
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] no-scrollbar">
                            {/* Mobile Quick Action Grid */}
                            <div className="grid grid-cols-4 gap-2 mb-2">
                                {[
                                    { icon: <Search size={18} />, label: "Search", action: () => { setIsMobileMenuOpen(false); setIsCommandPaletteOpen(true); } },
                                    { icon: <Car size={18} />, label: "Garage", href: "/my-garage" },
                                    { icon: <Wallet size={18} />, label: "Wallet", href: "/wallet" },
                                    { icon: <ShoppingBag size={18} />, label: "Market", href: "/marketplace" }
                                ].map((item, idx) => (
                                    <div key={idx} 
                                        onClick={() => {
                                            if (item.action) item.action();
                                            else if (item.href) {
                                                setIsMobileMenuOpen(false);
                                                window.location.href = item.href;
                                            }
                                        }}
                                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/5 active:bg-blue-600/20 active:border-blue-500/30 transition-colors cursor-pointer"
                                    >
                                        <div className="text-slate-400">{item.icon}</div>
                                        <span className="text-[9px] font-bold text-slate-300">{item.label}</span>
                                    </div>
                                ))}
                            </div>

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
                            <Link href="/my-garage/sentinel" className="p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-900/40 -translate-y-2 hover:scale-105 transition-transform" onClick={() => setIsBottomNavVisible(false)}>
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
            
            <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
        </>
    );
}
