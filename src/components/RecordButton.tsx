import React from 'react';
import { Mic, Square, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslation } from '../i18n/translations';

interface RecordButtonProps {
  isRecording: boolean;
  durationSeconds: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  disabled?: boolean;
  currentLang: SupportedLanguage;
}

export const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  durationSeconds,
  onStartRecording,
  onStopRecording,
  disabled = false,
  currentLang,
}) => {
  const t = getTranslation(currentLang);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClick = () => {
    if (disabled) return;
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-4">
      {/* Stopwatch Timer Display */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 text-white shadow-md border border-slate-800">
        <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`} />
        <span className="font-mono text-xl font-black tracking-wider">
          {formatTime(durationSeconds)}
        </span>
        {isRecording && (
          <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest ml-1">
            {t.stopwatchRec}
          </span>
        )}
      </div>

      {/* Massive Red Pulse Record Button */}
      <div className="relative flex items-center justify-center p-4">
        {isRecording && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500/25 animate-ping duration-1000" />
            <div className="absolute -inset-4 rounded-full bg-red-400/15 animate-pulse duration-700" />
          </>
        )}

        <button
          onClick={handleClick}
          disabled={disabled}
          className={`relative z-10 w-44 h-44 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-300 transform active:scale-95 ${
            isRecording
              ? 'bg-gradient-to-tr from-red-700 via-red-600 to-rose-600 ring-8 ring-red-300/50 shadow-red-600/50'
              : 'bg-gradient-to-tr from-red-600 via-red-500 to-rose-500 hover:scale-105 shadow-red-500/40 ring-4 ring-red-200'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isRecording ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-red-600 shadow-md">
                <Square className="w-7 h-7 fill-current" />
              </div>
              <span className="text-xs font-black tracking-wider uppercase text-white drop-shadow-sm">
                {t.stopRecording}
              </span>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm shadow-inner">
                <Mic className="w-9 h-9 animate-subtle-float" />
              </div>
              <span className="text-sm font-black tracking-wider uppercase text-white drop-shadow-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {t.tapToSpeak}
              </span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs font-semibold text-slate-500 text-center max-w-xs">
        {isRecording ? t.recordingInstruction : t.idleInstruction}
      </p>
    </div>
  );
};
