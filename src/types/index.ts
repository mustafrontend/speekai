export type SupportedLanguage = 'tr' | 'en' | 'de' | 'es' | 'fr';

export type ToneType = 'whatsapp' | 'executive' | 'email' | 'bullet' | 'clean';

export type NoteCategory = 'fikir' | 'toplanti' | 'yapilacak' | 'ozel';

export interface VoiceNote {
  id: string;
  timestamp: number;
  durationSeconds: number;
  rawText: string;
  polishedText?: string;
  summary?: string;
  actionItems?: string[];
  language: SupportedLanguage;
  isAiEnhanced?: boolean;
  category?: NoteCategory;
  tone?: ToneType;
}

export interface ProductivityStats {
  totalWords: number;
  typingTimeSavedMinutes: number;
  streakDays: number;
  lastActiveDate: string;
}

export interface SubscriptionState {
  isPro: boolean;
  plan?: 'weekly' | 'annual';
  expiresAt?: number;
  freeNotesUsedToday: number;
  maxFreeNotesPerDay: number;
}

export interface AIAnalysisResult {
  title: string;
  polishedText: string;
  summary: string;
  actionItems: string[];
}

export interface UserSettings {
  autoRecordOnLaunch: boolean;
  highPrecisionAiMode: boolean;
  hapticFeedback: boolean;
  preferredLanguage: SupportedLanguage;
}

