import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Copy, Share2, X, FileText, Check, ListChecks } from 'lucide-react';
import { AIAnalysisResult, SupportedLanguage } from '../types';
import { getTranslation } from '../i18n/translations';

interface AISummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: AIAnalysisResult | null;
  loading: boolean;
  onCopyText: (text: string) => void;
  onShareWhatsApp: (text: string) => void;
  currentLang: SupportedLanguage;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({
  isOpen,
  onClose,
  analysisResult,
  loading,
  onCopyText,
  onShareWhatsApp,
  currentLang,
}) => {
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  const toggleCheck = (idx: number) => {
    setCompletedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyFormatted = () => {
    if (!analysisResult) return;
    const formatted = `📌 ${analysisResult.title}\n\n${t.summaryTitle}:\n${analysisResult.summary}\n\n${t.todoListTitle}:\n${analysisResult.actionItems.map((item) => `- [ ] ${item}`).join('\n')}\n\n${t.polishedTextTitle}:\n${analysisResult.polishedText}`;
    onCopyText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareFormatted = () => {
    if (!analysisResult) return;
    const formatted = `📌 *${analysisResult.title}*\n\n${t.summaryTitle}:\n${analysisResult.summary}\n\n${t.todoListTitle}:\n${analysisResult.actionItems.map((item) => `• ${item}`).join('\n')}`;
    onShareWhatsApp(formatted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400 shadow-inner">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white">
                {t.aiModalTitle}
              </h3>
              <p className="text-xs text-red-300 font-medium">{t.aiModalSub}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center animate-bounce border border-red-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-sm font-extrabold text-slate-800">
                {t.aiProcessing}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {t.aiProcessingSub}
              </p>
            </div>
          ) : analysisResult ? (
            <>
              {/* Title Banner */}
              <div className="p-3.5 bg-red-50/80 rounded-2xl border border-red-200 flex items-center gap-3">
                <FileText className="w-5 h-5 text-red-600 shrink-0" />
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {analysisResult.title}
                </h4>
              </div>

              {/* 3 Action Items / To-Do Checklist */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5 text-xs font-black uppercase tracking-wider text-slate-600">
                  <ListChecks className="w-4 h-4 text-emerald-600" />
                  <span>{t.todoListTitle}</span>
                </div>
                <div className="space-y-2">
                  {analysisResult.actionItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        completedItems[idx]
                          ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm'
                      }`}
                    >
                      <div className="mt-0.5">
                        {completedItems[idx] ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                        )}
                      </div>
                      <span className="text-xs font-bold leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  {t.summaryTitle}
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 leading-relaxed">
                  {analysisResult.summary}
                </div>
              </div>

              {/* High Precision AI Polished Text */}
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  {t.polishedTextTitle}
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 leading-relaxed max-h-40 overflow-y-auto">
                  {analysisResult.polishedText}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer Actions */}
        {!loading && analysisResult && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
            <button
              onClick={handleCopyFormatted}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-md btn-kinetic"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyAllSummary}</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareFormatted}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md btn-kinetic"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.sendWhatsApp}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
