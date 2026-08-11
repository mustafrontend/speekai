import React, { useState } from 'react';
import {
  Globe,
  Crown,
  History,
  Settings,
  Upload,
  ChevronDown,
  FileText,
} from 'lucide-react';
import { SupportedLanguage, SubscriptionState } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeaderProps {
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  subState: SubscriptionState;
  onOpenPaywall: () => void;
  onOpenHistory: () => void;
  onOpenImport: () => void;
  onOpenASO: () => void;
  onOpenSettings: () => void;
}

const LANGUAGES: { code: SupportedLanguage; name: string; flag: string }[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  subState,
  onOpenPaywall,
  onOpenHistory,
  onOpenImport,
  onOpenASO,
  onOpenSettings,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const t = getTranslation(currentLang);

  const remainingFree = Math.max(0, subState.maxFreeNotesPerDay - subState.freeNotesUsedToday);

  return (
    // Floating Top Bar with generous top offset for mobile notch & dynamic island
    <header className="w-full sticky top-0 z-30 pt-16 pb-2 px-2.5 sm:pt-10 sm:px-6 bg-slate-50/90 backdrop-blur-md transition-all notranslate" translate="no">
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-md p-2.5 sm:p-3 flex items-center justify-between gap-1.5 overflow-hidden">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.png"
            alt="SpeekAI Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-md ring-2 ring-red-500/30 object-cover shrink-0"
          />
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-xs sm:text-sm font-black tracking-tight text-slate-900 leading-tight">
                {t.appName}
              </h1>
              <span className="text-[8px] sm:text-[9px] font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {t.proBadge}
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] font-medium text-slate-500 hidden sm:block">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-[11px] font-bold text-slate-800 btn-kinetic shadow-sm"
            >
              <span className="text-xs">{activeLangObj.flag}</span>
              <span className="text-[10px] font-extrabold uppercase">{activeLangObj.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold text-left transition-colors ${
                      currentLang === lang.code ? 'bg-red-50 text-red-600 font-black' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subscription Badge */}
          {subState.isPro ? (
            <button
              onClick={onOpenPaywall}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black shadow-sm btn-kinetic"
            >
              <Crown className="w-3 h-3 fill-current" />
              <span>PRO</span>
            </button>
          ) : (
            <button
              onClick={onOpenPaywall}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[10px] font-extrabold hover:bg-red-100/70 btn-kinetic"
            >
              <Crown className="w-3 h-3 shrink-0" />
              <span>{remainingFree}/{subState.maxFreeNotesPerDay}</span>
            </button>
          )}

          {/* Action Icons */}
          <button
            onClick={onOpenImport}
            title="Import Voice File"
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 btn-kinetic"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenHistory}
            title="Saved Notes"
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 btn-kinetic"
          >
            <History className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenSettings}
            title="Settings & Guide"
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 btn-kinetic"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
};
