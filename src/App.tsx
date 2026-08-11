import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Waveform } from './components/Waveform';
import { RecordButton } from './components/RecordButton';
import { ActionSheet } from './components/ActionSheet';
import { AISummaryModal } from './components/AISummaryModal';
import { PaywallModal } from './components/PaywallModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ImportAudioModal } from './components/ImportAudioModal';
import { ASOGuideModal } from './components/ASOGuideModal';
import { SettingsModal } from './components/SettingsModal';

import { speechService } from './services/speechService';
import { geminiService } from './services/geminiService';
import { revenueCatService } from './services/revenueCatService';
import { storageService } from './services/storageService';
import { getTranslation } from './i18n/translations';

import { AIAnalysisResult, NoteCategory, ProductivityStats, SubscriptionState, SupportedLanguage, ToneType, UserSettings, VoiceNote } from './types';
import { Sparkles, Mic, CheckCircle2, Lock, Save, Copy, Share2, Mail, Zap, Flame, FileText } from 'lucide-react';

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

export function App() {
  // State
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('tr');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [rawText, setRawText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>('fikir');
  const [activeTone, setActiveTone] = useState<ToneType | null>(null);
  const [isToneTransforming, setIsToneTransforming] = useState<boolean>(false);

  const [subState, setSubState] = useState<SubscriptionState>(() => revenueCatService.getSubscriptionState());
  const [settings, setSettings] = useState<UserSettings>(() => storageService.getSettings());
  const [notes, setNotes] = useState<VoiceNote[]>(() => storageService.getNotes());
  const [stats, setStats] = useState<ProductivityStats>(() => storageService.getStats());

  // Modals & Sheets
  const [actionSheetOpen, setActionSheetOpen] = useState<boolean>(false);
  const [paywallOpen, setPaywallOpen] = useState<boolean>(false);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [importOpen, setImportOpen] = useState<boolean>(false);
  const [asoOpen, setAsoOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // AI Summary State
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // UI Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Timer Ref
  const timerRef = useRef<number | null>(null);

  // Get active translation dictionary
  const t = getTranslation(currentLang);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Synchronize document lang attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Auto-record on launch preference check
  useEffect(() => {
    if (settings.autoRecordOnLaunch) {
      handleStartRecording();
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setDurationSeconds((prev) => prev + 1);
      }, 1000) as any;
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Handle Start Recording
  const handleStartRecording = () => {
    const check = revenueCatService.canRecordNewNote();
    if (!check.allowed) {
      showToast(t.paywallSub);
      setPaywallOpen(true);
      return;
    }

    setRawText('');
    setActiveTone(null);
    setDurationSeconds(0);
    setIsRecording(true);

    speechService.startListening(currentLang, {
      onResult: (transcript) => {
        setRawText(transcript);
      },
      onError: (err) => {
        console.warn(err);
      },
      onVolumeChange: (vol) => {
        setVolumeLevel(vol);
      },
    });

    if (settings.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  // Handle Stop Recording
  const handleStopRecording = () => {
    setIsRecording(false);
    speechService.stopListening();

    revenueCatService.incrementFreeNotesUsed();
    setSubState(revenueCatService.getSubscriptionState());

    if (settings.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate([40, 30, 40]);
    }

    setTimeout(() => {
      setActionSheetOpen(true);
    }, 200);
  };

  // Copy text action
  const handleCopyRaw = (customText?: string) => {
    const textToCopy = customText || rawText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast(t.copied);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share to WhatsApp action
  const handleShareWhatsApp = (textToShare?: string) => {
    const message = textToShare || rawText;
    if (!message) return;
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    showToast('WhatsApp...');
  };

  // Share via Email action
  const handleShareEmail = (textToShare?: string) => {
    const message = textToShare || rawText;
    if (!message) return;
    const subject = encodeURIComponent('SpeekAI Sesli Not');
    const body = encodeURIComponent(message);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    showToast('E-Posta Taslağı Açıldı 📧');
  };

  // AI Tone transform action in live view
  const handleLiveToneTransform = async (tone: ToneType) => {
    if (!rawText.trim()) return;
    if (activeTone === tone) {
      setActiveTone(null);
      return;
    }
    setActiveTone(tone);
    setIsToneTransforming(true);
    try {
      const transformed = await geminiService.transformTone(rawText, tone, currentLang);
      setRawText(transformed);
      showToast('Ton Dönüştürüldü ✨');
    } catch (err) {
      console.error(err);
    } finally {
      setIsToneTransforming(false);
    }
  };

  // Save note action (No DB needed - LocalStorage in browser)
  const handleSaveNote = (categoryOverride?: NoteCategory, customText?: string, customAnalysis?: AIAnalysisResult) => {
    const textToSave = customText || rawText;
    if (!textToSave && !customAnalysis) {
      showToast('Lütfen önce bir not konuşun veya yazın!');
      return;
    }

    const categoryToUse = categoryOverride || selectedCategory;

    const newNote: VoiceNote = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      durationSeconds: durationSeconds || 5,
      rawText: textToSave || 'Voice Note',
      polishedText: customAnalysis?.polishedText || textToSave,
      summary: customAnalysis?.summary,
      actionItems: customAnalysis?.actionItems,
      language: currentLang,
      isAiEnhanced: !!customAnalysis || !!activeTone,
      category: categoryToUse,
      tone: activeTone || undefined,
    };

    const updated = storageService.addNote(newNote);
    setNotes(updated);
    setStats(storageService.getStats());
    showToast('Not kaydedildi! 💾');
    setActionSheetOpen(false);
    setHistoryOpen(true);
  };

  // Trigger Gemini AI Summarize & Action Items
  const handleTriggerAISummary = async (text?: string) => {
    const targetText = text || rawText;
    if (!targetText) return;

    if (!subState.isPro) {
      setPaywallOpen(true);
      return;
    }

    setActionSheetOpen(false);
    setAiModalOpen(true);
    setAiLoading(true);

    try {
      const result = await geminiService.analyzeVoiceNote(targetText, currentLang);
      setAiAnalysis(result);
      handleSaveNote(selectedCategory, targetText, result);
    } catch (err) {
      console.error('AI Summary Error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Handle imported audio file transcript
  const handleAudioImported = (importedText: string) => {
    setRawText(importedText);
    setDurationSeconds(12);
    showToast('Transcribed 🎧');
    setActionSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-red-500 selection:text-white notranslate" translate="no">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-4 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <Header
        currentLang={currentLang}
        onSelectLang={(lang) => {
          setCurrentLang(lang);
          const updated = { ...settings, preferredLanguage: lang };
          setSettings(updated);
          storageService.saveSettings(updated);
          showToast(`Language: ${lang.toUpperCase()}`);
        }}
        subState={subState}
        onOpenPaywall={() => setPaywallOpen(true)}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenImport={() => setImportOpen(true)}
        onOpenASO={() => setAsoOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Single Screen Layout */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 flex flex-col justify-between gap-4">
        
        {/* Top Waveform Visualizer & Live Transcription Container */}
        <section className="w-full space-y-3">
          <Waveform isRecording={isRecording} volumeLevel={volumeLevel} />
          
          {/* Quick Category Selector Bar */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-black uppercase text-slate-400 shrink-0 tracking-wider">
              Kategori:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      if ('vibrate' in navigator) navigator.vibrate(30);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all border border-[0.5px] active:scale-[0.98] shrink-0 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editable Live Transcription Box */}
          <div className="w-full min-h-[160px] p-4 rounded-2xl bg-white border border-[0.5px] border-slate-200 shadow-sm relative flex flex-col justify-between transition-all focus-within:ring-2 focus-within:ring-red-500/20">
            
            {/* Header inside Box */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-red-500" /> {t.liveTranscriptionTitle}
              </span>
              {rawText && (
                <button
                  onClick={() => handleCopyRaw()}
                  className="text-[11px] font-black text-red-600 hover:underline flex items-center gap-1 active:scale-[0.98]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? t.copied : t.copyToClipboard}</span>
                </button>
              )}
            </div>

            {/* Editable Textarea */}
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={isRecording ? t.listeningNotice : t.idleTranscriptionNotice}
              rows={3}
              className="w-full text-sm font-medium text-slate-800 leading-relaxed bg-transparent border-none resize-none focus:outline-none placeholder:text-slate-400 placeholder:italic"
            />

            {/* 1-Tap Tone Selector Bar inside Box */}
            {rawText.trim() && (
              <div className="pt-2 mb-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    🪄 AI Dönüştürücü:
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                  {TONES.map((toneItem) => {
                    const isSelected = activeTone === toneItem.id;
                    return (
                      <button
                        key={toneItem.id}
                        onClick={() => handleLiveToneTransform(toneItem.id)}
                        disabled={isToneTransforming}
                        className={`px-2 py-1 rounded-lg text-[11px] font-black border border-[0.5px] active:scale-[0.98] transition-all text-center truncate ${
                          isSelected
                            ? 'bg-red-500 text-white border-red-500 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {toneItem.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 1-Tap Action Bar inside Live Transcription Box */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleSaveNote()}
                  disabled={!rawText.trim()}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 active:scale-[0.98] transition-all ${
                    rawText.trim()
                      ? 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-[0.5px] border-slate-200'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t.saveToAgenda}</span>
                </button>

                {rawText.trim() && (
                  <>
                    <button
                      onClick={() => handleShareWhatsApp()}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-black hover:bg-emerald-100 border border-[0.5px] border-emerald-200 flex items-center gap-1 active:scale-[0.98] transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleShareEmail()}
                      className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-black hover:bg-blue-100 border border-[0.5px] border-blue-200 flex items-center gap-1 active:scale-[0.98] transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>E-Posta</span>
                    </button>
                  </>
                )}
              </div>

              {rawText.trim() && (
                <button
                  onClick={() => handleTriggerAISummary()}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-black shadow-sm flex items-center gap-1 active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> {t.aiSummarize}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Productivity & Voice Streak Counter Card ("Zaman Tasarrufu Stats") */}
        <section className="w-full">
          <div className="p-3.5 rounded-2xl bg-white border border-[0.5px] border-slate-200 shadow-sm flex items-center justify-between gap-2 active:scale-[0.98] transition-all cursor-default">
            
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
              <span>⚡ {stats.typingTimeSavedMinutes} Dk Tasarruf</span>
            </div>

            <div className="h-4 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <FileText className="w-4 h-4 text-blue-500 shrink-0" />
              <span>📝 {stats.totalWords} Kelime</span>
            </div>

            <div className="h-4 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <Flame className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
              <span>🔥 {stats.streakDays} Gün Seri</span>
            </div>

          </div>
        </section>

        {/* Center Massive Red Pulse Recording Button */}
        <section className="w-full flex-1 flex flex-col justify-center my-2">
          <RecordButton
            isRecording={isRecording}
            durationSeconds={durationSeconds}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            currentLang={currentLang}
          />
        </section>

        {/* Free Usage Limit Footer Counter */}
        {!subState.isPro && (
          <div
            onClick={() => setPaywallOpen(true)}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 border border-[0.5px] border-amber-300/60 flex items-center justify-between cursor-pointer hover:bg-amber-100/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 text-xs font-black text-slate-800">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>
                {subState.freeNotesUsedToday} / {subState.maxFreeNotesPerDay} {t.freeNotesRemaining}
              </span>
            </div>
            <span className="text-[11px] font-black text-red-600 underline">
              {t.unlimitedProBanner}
            </span>
          </div>
        )}

      </main>

      {/* Footer Branding */}
      <footer className="w-full py-2.5 text-center text-[11px] font-bold text-slate-400 border-t border-[0.5px] border-slate-200/50 bg-white/50">
        {t.appName} — Zero Latency Native Dictation & AI Whisper Engine
      </footer>

      {/* Modals & Action Sheets */}
      <ActionSheet
        isOpen={actionSheetOpen}
        onClose={() => setActionSheetOpen(false)}
        rawText={rawText}
        subState={subState}
        copied={copied}
        onCopy={(text) => handleCopyRaw(text)}
        onShareWhatsApp={(text) => handleShareWhatsApp(text)}
        onShareEmail={(text) => handleShareEmail(text)}
        onAiSummarize={() => handleTriggerAISummary()}
        onSaveNote={(cat, customText) => handleSaveNote(cat, customText)}
        onOpenPaywall={() => setPaywallOpen(true)}
        currentLang={currentLang}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <AISummaryModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        analysisResult={aiAnalysis}
        loading={aiLoading}
        onCopyText={(text) => {
          navigator.clipboard.writeText(text);
          showToast(t.copied);
        }}
        onShareWhatsApp={(text) => handleShareWhatsApp(text)}
        currentLang={currentLang}
      />

      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onSubscribed={(newState) => {
          setSubState(newState);
          showToast('PRO Active 🎉');
        }}
        currentLang={currentLang}
      />

      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        notes={notes}
        onDeleteNote={(id) => {
          const updated = storageService.deleteNote(id);
          setNotes(updated);
          showToast('Silindi');
        }}
        onCopyNote={(text) => {
          navigator.clipboard.writeText(text);
          showToast(t.copied);
        }}
        onShareWhatsApp={(text) => handleShareWhatsApp(text)}
        onSelectAiNote={(note) => {
          setAiAnalysis({
            title: note.summary || 'Voice Note',
            polishedText: note.polishedText || note.rawText,
            summary: note.summary || 'No summary',
            actionItems: note.actionItems || ['Review note'],
          });
          setAiModalOpen(true);
        }}
        currentLang={currentLang}
      />

      <ImportAudioModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onAudioImported={handleAudioImported}
        currentLang={currentLang}
      />

      <ASOGuideModal
        isOpen={asoOpen}
        onClose={() => setAsoOpen(false)}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSet) => {
          setSettings(newSet);
          storageService.saveSettings(newSet);
          showToast('Saved');
        }}
        onResetFreeLimits={() => {
          const newState = { ...subState, freeNotesUsedToday: 0 };
          storageService.saveSubscriptionState(newState);
          setSubState(newState);
          showToast('Limits Reset!');
        }}
        currentLang={currentLang}
      />

    </div>
  );
}

