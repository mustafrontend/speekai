import React, { useState } from 'react';
import { X, Search, Trash2, Copy, Share2, Sparkles, FileText, Calendar, Clock, Check, Filter } from 'lucide-react';
import { NoteCategory, SupportedLanguage, VoiceNote } from '../types';
import { getTranslation } from '../i18n/translations';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: VoiceNote[];
  onDeleteNote: (id: string) => void;
  onCopyNote: (text: string) => void;
  onShareWhatsApp: (text: string) => void;
  onSelectAiNote: (note: VoiceNote) => void;
  currentLang: SupportedLanguage;
}

const CATEGORY_LABELS: Record<NoteCategory, string> = {
  fikir: '💡 Fikir',
  toplanti: '💼 Toplantı',
  yapilacak: '✅ Yapılacak',
  ozel: '🔒 Özel',
};

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  onDeleteNote,
  onCopyNote,
  onShareWhatsApp,
  onSelectAiNote,
  currentLang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      (n.rawText || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.summary || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'all' || n.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (id: string, text: string) => {
    onCopyNote(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop overlay touch close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-In Side Drawer */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header with generous top notch & status bar clearance */}
        <div className="pt-20 pb-4 px-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                {t.agendaTitle}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {notes.length} {t.agendaSub}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 active:scale-[0.98] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input & Category Filters */}
        <div className="p-3.5 border-b border-slate-100 space-y-2.5 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Notlarda ara..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[0.5px] border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black shrink-0 border border-[0.5px] active:scale-[0.98] transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Tümü
            </button>
            {(Object.keys(CATEGORY_LABELS) as NoteCategory[]).map((catKey) => {
              const isSelected = selectedCategoryFilter === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategoryFilter(catKey)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black shrink-0 border border-[0.5px] active:scale-[0.98] transition-all ${
                    isSelected
                      ? 'bg-red-500 text-white border-red-500 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {CATEGORY_LABELS[catKey]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <FileText className="w-10 h-10 mx-auto stroke-1 text-slate-300" />
              <p className="text-sm font-extrabold text-slate-700">{t.noNotesFound}</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-2xl bg-white border border-[0.5px] border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2.5"
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    {note.category && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-[0.5px] border-slate-200 font-black">
                        {CATEGORY_LABELS[note.category] || note.category}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {formatDate(note.timestamp)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {note.durationSeconds}s
                    </span>
                  </div>

                  <span className="uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-black">
                    {note.language.toUpperCase()}
                  </span>
                </div>

                {/* Text snippet */}
                <p className="text-xs font-medium text-slate-800 line-clamp-3 leading-relaxed">
                  {note.polishedText || note.rawText}
                </p>

                {/* AI Summary Badge if present */}
                {note.summary && (
                  <div
                    onClick={() => onSelectAiNote(note)}
                    className="p-2.5 bg-red-50/80 rounded-xl border border-[0.5px] border-red-200 text-xs font-bold text-red-700 flex items-center justify-between cursor-pointer hover:bg-red-100/70"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-red-600" />
                      <span className="truncate">{note.summary}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(note.id, note.polishedText || note.rawText)}
                      className="flex items-center gap-1 text-[11px] font-black text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg border border-[0.5px] border-slate-200 active:scale-[0.98] transition-all"
                    >
                      {copiedId === note.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>{t.copyToClipboard}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onShareWhatsApp(note.polishedText || note.rawText)}
                      className="flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-[0.5px] border-emerald-200 active:scale-[0.98] transition-all"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 active:scale-[0.98] transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

