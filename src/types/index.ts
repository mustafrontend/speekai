export type SupportedLanguage = 'tr' | 'en' | 'de' | 'es' | 'fr';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
  speechCode: string;
}

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
