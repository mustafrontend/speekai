import React, { useState, useEffect } from 'react';
import { Copy, Share2, Sparkles, Check, Lock, Save, RefreshCw, Mail, Play, Pause, FastForward } from 'lucide-react';
import { NoteCategory, SubscriptionState, SupportedLanguage, ToneType } from '../types';
import { getTranslation } from '../i18n/translations';
import { geminiService } from '../services/geminiService';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  rawText: string;
  subState: SubscriptionState;
  copied: boolean;
  onCopy: (textToCopy?: string) => void;
  onShareWhatsApp: (textToShare?: string) => void;
  onShareEmail: (textToShare?: string) => void;
  onAiSummarize: () => void;
  onSaveNote: (category?: NoteCategory, customText?: string) => void;
  onOpenPaywall: () => void;
  currentLang: SupportedLanguage;
  selectedCategory?: NoteCategory;
  onSelectCategory?: (cat: NoteCategory) => void;
}

const CATEGORIES: { id: NoteCategory; label: string }[] = [
  { id: 'fikir', label: '💡 Fikir' },
  { id: 'toplanti', label: '💼 Toplantı' },
  { id: 'yapilacak', label: '✅ Yapılacak' },
  { id: 'ozel', label: '🔒 Özel' },
];

const TONES: { id: ToneType; label: string }[] = [
  { id: 'whatsapp', label: '💬 WhatsApp' },
  { id: 'executive', label: '📧 Kurumsal E-Posta' },
  { id: 'bullet', label: '📝 Maddeli Liste' },
  { id: 'clean', label: '✨ AI Cilala' },
];

const PLAYBACK_SPEEDS = [1.0, 1.25, 1.5, 2.0];

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  rawText,
  subState,
  copied,
  onCopy,
  onShareWhatsApp,
  onShareEmail,
  onAiSummarize,
  onSaveNote,
  onOpenPaywall,
  currentLang,
  selectedCategory = 'fikir',
  onSelectCategory,
}) => {
  const [activeTone, setActiveTone] = useState<ToneType | null>(null);
  const [transformedText, setTransformedText] = useState<string>(rawText);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  const [category, setCategory] = useState<NoteCategory>(selectedCategory);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  useEffect(() => {
    setTransformedText(rawText);
    setActiveTone(null);
    setIsPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [rawText, isOpen]);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  const activeText = transformedText || rawText;

  const handleToneSelect = async (tone: ToneType) => {
    if (activeTone === tone) {
      setActiveTone(null);
      setTransformedText(rawText);
      return;
    }
    setActiveTone(tone);
    setIsTransforming(true);
    try {
      const result = await geminiService.transformTone(rawText, tone, currentLang);
      setTransformedText(result);
    } catch (err) {
      console.error('Tone transform error:', err);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCategoryChange = (cat: NoteCategory) => {
    setCategory(cat);
    if (onSelectCategory) onSelectCategory(cat);
    if ('vibrate' in navigator) navigator.vibrate(30);
  };

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      if (!activeText) return;

      const utterance = new SpeechSynthesisUtterance(activeText);
      utterance.rate = playbackSpeed;
      if (currentLang === 'tr') utterance.lang = 'tr-TR';
      else if (currentLang === 'de') utterance.lang = 'de-DE';
      else if (currentLang === 'es') utterance.lang = 'es-ES';
      else if (currentLang === 'fr') utterance.lang = 'fr-FR';
      else utterance.lang = 'en-US';

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSpeedSelect = (speed: number) => {
    setPlaybackSpeed(speed);
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    if (isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (!activeText) return;

      const utterance = new SpeechSynthesisUtterance(activeText);
      utterance.rate = speed;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClose = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 px-2 sm:px-0">
      
      {/* Backdrop overlay touch close */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Slide-Up Bottom Sheet */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl p-5 mb-0 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
        
        {/* Top Handle Pill */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {t.recordingCompletedTitle}
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              {t.recordingCompletedSubtitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md hover:bg-slate-100 active:scale-[0.98] transition-all"
          >
            {t.close}
          </button>
        </div>

        {/* 1. AI Tone Transformer Selector Bar */}
        <div className="mb-3">
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
            🪄 AI Tone Transformer
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {TONES.map((tItem) => {
              const isSelected = activeTone === tItem.id;
              return (
                <button
                  key={tItem.id}
                  onClick={() => handleToneSelect(tItem.id)}
                  disabled={isTransforming}
                  className={`px-2.5 py-2 rounded-xl text-xs font-black transition-all border border-[0.5px] active:scale-[0.98] flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="truncate">{tItem.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Text Preview Box with Loading Indicator */}
        <div className="relative p-3.5 bg-slate-50 rounded-xl border border-[0.5px] border-slate-200 text-sm font-medium text-slate-800 max-h-36 overflow-y-auto mb-3 leading-relaxed shadow-inner">
          {isTransforming ? (
            <div className="py-4 flex items-center justify-center gap-2 text-xs font-extrabold text-slate-500 animate-pulse">
              <Sparkles className="w-4 h-4 text-red-500 animate-spin" />
              <span>AI Ton Dönüştürülüyor...</span>
            </div>
          ) : (
            activeText || 'Text preview...'
          )}
        </div>

        {/* 2. Audio Playback Speed Controller Bar */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-[0.5px] border-slate-200 mb-3 flex items-center justify-between">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-black active:scale-[0.98] transition-all shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Durdur</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Dinle</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 mr-1 flex items-center gap-0.5">
              <FastForward className="w-3 h-3" /> Hız:
            </span>
            {PLAYBACK_SPEEDS.map((speed) => {
              const isSelected = playbackSpeed === speed;
              return (
                <button
                  key={speed}
                  onClick={() => handleSpeedSelect(speed)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all border border-[0.5px] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-red-500 text-white border-red-500 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {speed}x
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Smart Quick Category Tagging */}
        <div className="mb-4">
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
            🏷️ Kategori Seç
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-black transition-all border border-[0.5px] active:scale-[0.98] flex items-center justify-center ${
                    isSelected
                      ? 'bg-red-500 text-white border-red-500 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Action Button Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          
          {/* [Metni Kopyala] */}
          <button
            onClick={() => onCopy(activeText)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md active:scale-[0.98] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyToClipboard}</span>
              </>
            )}
          </button>

          {/* [WhatsApp] */}
          <button
            onClick={() => onShareWhatsApp(activeText)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          {/* [E-Posta] */}
          <button
            onClick={() => onShareEmail(activeText)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>E-Posta</span>
          </button>

        </div>

        {/* PRO / AI Action Banner & Save Button */}
        <div className="space-y-2">
          <button
            onClick={() => {
              if (subState.isPro) {
                onAiSummarize();
              } else {
                onOpenPaywall();
              }
            }}
            className={`flex items-center justify-between w-full py-3 px-4 rounded-xl font-black text-xs transition-all active:scale-[0.98] ${
              subState.isPro
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white shadow-lg shadow-red-500/25'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-[0.5px] border-slate-300/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-current">
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
            onClick={() => onSaveNote(category, activeText)}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs border border-slate-900 active:scale-[0.98] transition-all shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.saveToAgenda}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

