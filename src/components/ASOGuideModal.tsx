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
                App Store & RevenueCat Master Guide
              </h3>
              <p className="text-xs text-slate-400 font-medium">ASO Keywords, Localization & Codemagic</p>
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
            <span>1. ASO & Metadata (5 Dilde)</span>
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
            <span>2. RevenueCat Kurgusu</span>
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
            <span>3. Codemagic YAML</span>
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
                    onClick={() => copyText('en', 'Title: Voice Notes: Speech to Text\nSubtitle: Dictate & Transcribe Audio\nKeywords: speech,text,transcribe,dictation,voice,memo,notes,recorder,audio,whisper,ai,converter')}
                    className="flex items-center gap-1 text-[11px] text-red-600 hover:underline"
                  >
                    {copiedSection === 'en' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Kopyala</span>
                  </button>
                </div>
                <div className="font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  <strong>Title:</strong> Voice Notes: Speech to Text (28/30)<br />
                  <strong>Subtitle:</strong> Dictate & Transcribe Audio (27/30)<br />
                  <strong>Keywords:</strong> speech,text,transcribe,dictation,voice,memo,notes,recorder,audio,whisper,ai,converter
                </div>
              </div>

              {/* TR Metadata */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-black text-slate-900">
                  <span>🇹🇷 Türkçe App Store Metadata</span>
                  <button
                    onClick={() => copyText('tr', 'Title: Voice Notes: Tek Tık Sesli Not\nSubtitle: Konuşmayı Anında Metne Dök\nKeywords: sesli,not,metin,çevirici,dikte,konuşma,yazı,kaydedici,whisper,ai,özet')}
                    className="flex items-center gap-1 text-[11px] text-red-600 hover:underline"
                  >
                    {copiedSection === 'tr' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Kopyala</span>
                  </button>
                </div>
                <div className="font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  <strong>Title:</strong> Voice Notes: Tek Tık Sesli Not (27/30)<br />
                  <strong>Subtitle:</strong> Konuşmayı Anında Metne Dök (26/30)<br />
                  <strong>Keywords:</strong> sesli,not,metin,çevirici,dikte,konuşma,yazı,kaydedici,whisper,ai,özet
                </div>
              </div>

              {/* DE Metadata */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-black text-slate-900">
                  <span>🇩🇪 Deutsch / Sprachnotizen</span>
                </div>
                <div className="font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700">
                  <strong>Title:</strong> Sprachnotizen in Text: Diktat (28/30)<br />
                  <strong>Keywords:</strong> sprachnotizen,text,diktat,transkribieren,audio,memo,ki
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
                  <div><strong>Public API Key:</strong> appl_KYCMWKtHLpIvVfRoVOlwEOgfuRZ</div>
                  <div><strong>Entitlement ID:</strong> pro_access</div>
                  <hr className="my-1" />
                  <div><strong>Weekly Product ID:</strong> com.voicenotes.pro.weekly ($3.99 / week, 3-day trial)</div>
                  <div><strong>Annual Product ID:</strong> com.voicenotes.pro.annual ($29.99 / year)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'codemagic' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-black text-slate-900">🚀 codemagic.yaml CI/CD Script</h4>
                <pre className="font-mono bg-slate-900 text-slate-100 p-3 rounded-xl overflow-x-auto text-[11px] leading-relaxed">
{`workflows:
  ios-release:
    name: Voice Notes iOS Build
    instance_type: mac_mini_m1
    scripts:
      - name: Install dependencies
        script: npm install
      - name: Build web application
        script: npm run build
      - name: Capacitor Sync
        script: npx cap sync ios`}
                </pre>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
