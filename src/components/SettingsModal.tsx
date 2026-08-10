import React from 'react';
import { Settings, X, Zap, Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import { SupportedLanguage, UserSettings } from '../types';
import { getTranslation } from '../i18n/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onResetFreeLimits: () => void;
  currentLang: SupportedLanguage;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetFreeLimits,
  currentLang,
}) => {
  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  const toggleField = (field: keyof UserSettings) => {
    onUpdateSettings({
      ...settings,
      [field]: !settings[field],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                {t.settingsTitle}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t.settingsSub}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggles List */}
        <div className="p-5 space-y-4">
          
          {/* Auto-Record on Launch */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">{t.autoRecordTitle}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{t.autoRecordSub}</p>
              </div>
            </div>

            <button
              onClick={() => toggleField('autoRecordOnLaunch')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.autoRecordOnLaunch ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  settings.autoRecordOnLaunch ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* High Precision AI Mode */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">{t.aiWhisperTitle}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{t.aiWhisperSub}</p>
              </div>
            </div>

            <button
              onClick={() => toggleField('highPrecisionAiMode')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.highPrecisionAiMode ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  settings.highPrecisionAiMode ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Haptic Feedback */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">{t.hapticTitle}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{t.hapticSub}</p>
              </div>
            </div>

            <button
              onClick={() => toggleField('hapticFeedback')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                settings.hapticFeedback ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  settings.hapticFeedback ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Test & Debug Actions */}
          <div className="pt-2">
            <button
              onClick={onResetFreeLimits}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 btn-kinetic"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.resetLimitTest}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
