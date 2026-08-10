import React, { useState } from 'react';
import { Upload, FileAudio, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface ImportAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAudioImported: (transcript: string) => void;
  currentLang: SupportedLanguage;
}

export const ImportAudioModal: React.FC<ImportAudioModalProps> = ({
  isOpen,
  onClose,
  onAudioImported,
  currentLang,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    setProcessing(true);
    
    // Simulate Whisper AI file transcribing for uploaded audio clip
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fileName = selectedFile.name.toLowerCase();
    let mockTranscript = '';

    if (fileName.includes('whatsapp') || fileName.includes('voice')) {
      mockTranscript = 'Selam, bugünkü toplantı notlarını aldım. Yarın sabah saat 10:00\'da yeni RevenueCat paywall ekranını canlıya alıyoruz. Tasarımdaki kırmızı buton rengini koruyalım.';
    } else {
      mockTranscript = `Ses dosyası (${selectedFile.name}) Gemini AI Whisper motoruyla çözümlendi. Ürün stratejimizdeki haftalık $1.99 abonelik dönüşüm oranını artırmak için 3 günlük ücretsiz denemeyi ön plana çıkarıyoruz.`;
    }

    setProcessing(false);
    onAudioImported(mockTranscript);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center font-bold border border-red-200">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Ses Dosyası İçeri Aktar
              </h3>
              <p className="text-xs text-slate-500 font-medium">WhatsApp Sesli Mesajı & Audio Transcribe</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          <label
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setSelectedFile(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragActive ? 'border-red-500 bg-red-50/50' : 'border-slate-300 hover:border-red-400 bg-slate-50/50'
            }`}
          >
            <input
              type="file"
              accept="audio/*,.m4a,.mp3,.wav,.ogg"
              onChange={handleFileChange}
              className="hidden"
            />

            <FileAudio className="w-10 h-10 text-red-500 mb-2 stroke-1" />

            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-900 truncate max-w-xs">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ses dosyası seçildi ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-black text-slate-800">
                  Ses dosyanızı sürükleyin veya tıklayarak seçin
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  .m4a, .mp3, .wav (WhatsApp sesli mesajları desteklenir)
                </p>
              </div>
            )}
          </label>

          <div className="p-3 bg-red-50/80 rounded-xl border border-red-200 text-xs font-semibold text-red-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
            <span>AI Whisper Motoru dışarıdan gelen sesleri kusursuz metne çevirir.</span>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={handleProcess}
            disabled={!selectedFile || processing}
            className={`w-full py-3 px-4 rounded-xl font-black text-xs text-white shadow-md flex items-center justify-center gap-2 btn-kinetic ${
              selectedFile && !processing
                ? 'bg-red-600 hover:bg-red-700 shadow-red-500/30'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {processing ? (
              <span>AI Whisper Dosyayı Çözümlüyor...</span>
            ) : (
              <>
                <span>Ses Dosyasını Metne Çevir</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
