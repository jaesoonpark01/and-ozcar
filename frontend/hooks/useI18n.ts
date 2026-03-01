"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../lib/translations';

interface I18nContextType {
    lang: Language;
    toggleLanguage: () => void;
    t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('ko');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('ozcar_lang');
            if (savedLang === 'ko' || savedLang === 'en') {
                setLang(savedLang as Language);
            }
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === 'ko' ? 'en' : 'ko';
        setLang(newLang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('ozcar_lang', newLang);
        }
    };

    const t = (key: TranslationKey, variables?: Record<string, string | number>): string => {
        try {
            if (!translations || !translations[lang]) return String(key);
            // @ts-ignore
            const dict = translations[lang];
            // @ts-ignore
            let text = dict[key] || String(key);

            if (variables) {
                Object.entries(variables).forEach(([vKey, vValue]) => {
                    text = text.replace(new RegExp(`{${vKey}}`, 'g'), String(vValue));
                });
            }
            return text;
        } catch (e) {
            return String(key);
        }
    };

    // Use React.createElement to avoid any JSX mangling issues
    return React.createElement(
        I18nContext.Provider,
        { value: { lang, toggleLanguage, t } },
        children
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
