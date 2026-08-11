import React, { useState } from 'react';
import { FileText, X, Copy, Check, Globe, DollarSign, Cpu } from 'lucide-react';

interface ASOGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ASOGuideModal: React.FC<ASOGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'aso' | 'revenuecat' | 'codemagic'>('aso');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (section: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white">
                SpeekAI App Store & RevenueCat Master Guide
              </h3>
              <p className="text-xs text-slate-400 font-medium">ASO Keywords, Legal Links & RevenueCat</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('aso')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black border-b-2 transition-all ${
              activeTab === 'aso'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>1. ASO & Metadata</span>
          </button>

          <button
            onClick={() => setActiveTab('revenuecat')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black border-b-2 transition-all ${
              activeTab === 'revenuecat'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>2. RevenueCat Map</span>
          </button>

          <button
            onClick={() => setActiveTab('codemagic')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black border-b-2 transition-all ${
              activeTab === 'codemagic'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. Legal Links</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'aso' && (
            <div className="space-y-4 text-xs">
              
              {/* EN Metadata */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-black text-slate-900">
                  <span>🇺🇸 English (US) App Store Metadata</span>
                  <button
                    onClick={() => copyText('en', 'Title: SpeekAI: AI Speech to Text\nSubtitle: 1-Tap Dictate & Summarize\nKeywords: speek,ai,speech,text,transcribe,dictation,voice,memo,notes,recorder,audio,whisper,converter')}
                    className="flex items-center gap-1 text-[11px] text-red-600 hover:underline"
                  >
                    {copiedSection === 'en' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Kopyala</span>
                  </button>
                </div>
                <div className="font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  <strong>Title:</strong> SpeekAI: AI Speech to Text (25/30)<br />
                  <strong>Subtitle:</strong> 1-Tap Dictate & Summarize (25/30)<br />
                  <strong>Keywords:</strong> speek,ai,speech,text,transcribe,dictation,voice,memo,notes,recorder,audio,whisper,converter
                </div>
              </div>

              {/* TR Metadata */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-black text-slate-900">
                  <span>🇹🇷 Türkçe App Store Metadata</span>
                  <button
                    onClick={() => copyText('tr', 'Title: SpeekAI: AI Sesli Not\nSubtitle: Tek Tıkla Konuş ve Kopyala\nKeywords: speek,ai,sesli,not,metin,çevirici,dikte,konuşma,yazı,kaydedici,whisper,özet')}
                    className="flex items-center gap-1 text-[11px] text-red-600 hover:underline"
                  >
                    {copiedSection === 'tr' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Kopyala</span>
                  </button>
                </div>
                <div className="font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  <strong>Title:</strong> SpeekAI: AI Sesli Not (21/30)<br />
                  <strong>Subtitle:</strong> Tek Tıkla Konuş ve Kopyala (26/30)<br />
                  <strong>Keywords:</strong> speek,ai,sesli,not,metin,çevirici,dikte,konuşma,yazı,kaydedici,whisper,özet
                </div>
              </div>

            </div>
          )}

          {activeTab === 'revenuecat' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-black text-slate-900">💳 RevenueCat Offerings & Entitlements Map</h4>
                <div className="font-mono bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                  <div><strong>App Bundle ID:</strong> com.voicenotes.speechtotext.app</div>
                  <div><strong>Public API Key:</strong> appl_kHPiyBFSmFZJchPwOEamDypGadO</div>
                  <div><strong>Entitlement ID:</strong> pro_access</div>
                  <hr className="my-1" />
                  <div><strong>Weekly Product ID:</strong> com.voicenotes.speechtotext.app.weekly ($3.99 / week, 3-day trial)</div>
                  <div><strong>Annual Product ID:</strong> com.voicenotes.speechtotext.app.annual ($29.99 / year)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'codemagic' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-black text-slate-900">🌐 Active GitHub Legal URLs</h4>
                <div className="font-mono bg-white p-3 rounded-xl border border-slate-200 space-y-2 break-all">
                  <div><strong>Privacy Policy:</strong> https://raw.githubusercontent.com/mustafrontend/speekai/main/public/privacy.html</div>
                  <div><strong>Terms of Service:</strong> https://raw.githubusercontent.com/mustafrontend/speekai/main/public/terms.html</div>
                  <div><strong>Support URL:</strong> https://raw.githubusercontent.com/mustafrontend/speekai/main/public/support.html</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
