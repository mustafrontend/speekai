import React from 'react';
import { Copy, Share2, Sparkles, Check, Lock, Save, RefreshCw } from 'lucide-react';
import { SubscriptionState, SupportedLanguage } from '../types';
import { getTranslation } from '../i18n/translations';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  rawText: string;
  subState: SubscriptionState;
  copied: boolean;
  onCopy: () => void;
  onShareWhatsApp: () => void;
  onAiSummarize: () => void;
  onSaveNote: () => void;
  onOpenPaywall: () => void;
  currentLang: SupportedLanguage;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  rawText,
  subState,
  copied,
  onCopy,
  onShareWhatsApp,
  onAiSummarize,
  onSaveNote,
  onOpenPaywall,
  currentLang,
}) => {
  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 px-2 sm:px-0">
      
      {/* Backdrop overlay touch close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-Up Bottom Sheet */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl p-6 mb-0 animate-in slide-in-from-bottom duration-300">
        
        {/* Top Handle Pill */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {t.recordingCompletedTitle}
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              {t.recordingCompletedSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md hover:bg-slate-100"
          >
            {t.close}
          </button>
        </div>

        {/* Live Text Preview Box */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 max-h-36 overflow-y-auto mb-5 leading-relaxed shadow-inner">
          {rawText || 'Text preview...'}
        </div>

        {/* Action Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          
          {/* [Metni Kopyala] */}
          <button
            onClick={onCopy}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md btn-kinetic"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.copyToClipboard}</span>
              </>
            )}
          </button>

          {/* [WhatsApp'a At] */}
          <button
            onClick={onShareWhatsApp}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 btn-kinetic"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.whatsApp}</span>
          </button>

        </div>

        {/* PRO / AI Action Banner */}
        <div className="space-y-2">
          <button
            onClick={() => {
              if (subState.isPro) {
                onAiSummarize();
              } else {
                onOpenPaywall();
              }
            }}
            className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all btn-kinetic ${
              subState.isPro
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white shadow-lg shadow-red-500/25'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-300/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-current">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="leading-tight flex items-center gap-1.5">
                  <span>{t.aiSummarizeAndTodo}</span>
                  {!subState.isPro && (
                    <span className="text-[10px] bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded font-black">
                      PRO
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium opacity-80">
                  {t.aiSummarizeSub}
                </div>
              </div>
            </div>

            {subState.isPro ? (
              <RefreshCw className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4 text-amber-600" />
            )}
          </button>

          <button
            onClick={onSaveNote}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs border border-slate-200 btn-kinetic"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.saveToAgenda}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
