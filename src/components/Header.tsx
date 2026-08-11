import React, { useState } from 'react';
import { Mic, Crown, History, Settings, Upload, FileText, ChevronDown } from 'lucide-react';
import { LanguageOption, SubscriptionState, SupportedLanguage } from '../types';
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

const LANGUAGES: LanguageOption[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', speechCode: 'tr-TR' },
  { code: 'en', name: 'English', flag: '🇺🇸', speechCode: 'en-US' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE' },
  { code: 'es', name: 'Español', flag: '🇪🇸', speechCode: 'es-ES' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', speechCode: 'fr-FR' },
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
    // Floating Top Bar with generous top offset for mobile notch
    <header className="w-full sticky top-0 z-30 pt-12 pb-2 px-3 sm:pt-8 sm:px-6 bg-slate-50/90 backdrop-blur-md transition-all notranslate" translate="no">
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-md p-3 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="SpeekAI Logo"
            className="w-9 h-9 rounded-xl shadow-md ring-2 ring-red-500/30 object-cover shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-black tracking-tight text-slate-900 leading-tight">
                {t.appName}
              </h1>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {t.proBadge} AI
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-500">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-1.5">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 btn-kinetic shadow-sm"
            >
              <span className="text-sm">{activeLangObj.flag}</span>
              <span className="text-xs font-extrabold">{activeLangObj.code.toUpperCase()}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-left transition-colors ${
                      currentLang === lang.code ? 'bg-red-50 text-red-600 font-black' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm">{lang.flag}</span>
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
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black shadow-sm btn-kinetic"
            >
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span>PRO</span>
            </button>
          ) : (
            <button
              onClick={onOpenPaywall}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[11px] font-extrabold hover:bg-red-100/70 btn-kinetic"
            >
              <Crown className="w-3.5 h-3.5 shrink-0" />
              <span>{remainingFree}/{subState.maxFreeNotesPerDay}</span>
            </button>
          )}

          {/* Action Icons */}
          <button
            onClick={onOpenImport}
            title="Import Voice File"
            className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 btn-kinetic"
          >
            <Upload className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenHistory}
            title="Saved Notes"
            className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 btn-kinetic"
          >
            <History className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenASO}
            title="ASO & Guide"
            className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 btn-kinetic"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSettings}
            title="Settings"
            className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 btn-kinetic"
          >
            <Settings className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
};
