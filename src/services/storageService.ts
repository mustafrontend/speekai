import { ProductivityStats, SubscriptionState, UserSettings, VoiceNote } from '../types';

const NOTES_KEY = 'vn_saved_notes_v1';
const SETTINGS_KEY = 'vn_user_settings_v1';
const SUB_KEY = 'vn_sub_state_v1';
const LAST_RESET_KEY = 'vn_last_reset_date';
const STATS_KEY = 'vn_productivity_stats_v1';

const DEFAULT_SETTINGS: UserSettings = {
  autoRecordOnLaunch: false,
  highPrecisionAiMode: true,
  hapticFeedback: true,
  preferredLanguage: 'tr',
};

const DEFAULT_SUB_STATE: SubscriptionState = {
  isPro: false,
  freeNotesUsedToday: 0,
  maxFreeNotesPerDay: 3,
};

const DEFAULT_STATS: ProductivityStats = {
  totalWords: 450,
  typingTimeSavedMinutes: 15,
  streakDays: 3,
  lastActiveDate: '',
};

export const storageService = {
  getNotes(): VoiceNote[] {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveNotes(notes: VoiceNote[]): void {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes to LocalStorage:', e);
    }
  },

  addNote(note: VoiceNote): VoiceNote[] {
    const notes = this.getNotes();
    const updated = [note, ...notes];
    this.saveNotes(updated);
    this.recordNoteStats(note.rawText || note.polishedText || '');
    return updated;
  },

  deleteNote(id: string): VoiceNote[] {
    const notes = this.getNotes().filter((n) => n.id !== id);
    this.saveNotes(notes);
    return notes;
  },

  getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },

  getSubscriptionState(): SubscriptionState {
    // Check if daily limit counter should reset (new calendar day)
    const todayStr = new Date().toDateString();
    const lastReset = localStorage.getItem(LAST_RESET_KEY);

    let state = DEFAULT_SUB_STATE;
    try {
      const data = localStorage.getItem(SUB_KEY);
      if (data) {
        state = { ...DEFAULT_SUB_STATE, ...JSON.parse(data) };
      }
    } catch {
      state = DEFAULT_SUB_STATE;
    }

    if (lastReset !== todayStr) {
      state.freeNotesUsedToday = 0;
      localStorage.setItem(LAST_RESET_KEY, todayStr);
      this.saveSubscriptionState(state);
    }

    return state;
  },

  saveSubscriptionState(state: SubscriptionState): void {
    try {
      localStorage.setItem(SUB_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save sub state:', e);
    }
  },

  getStats(): ProductivityStats {
    try {
      const data = localStorage.getItem(STATS_KEY);
      if (!data) return DEFAULT_STATS;
      const stats: ProductivityStats = { ...DEFAULT_STATS, ...JSON.parse(data) };
      return stats;
    } catch {
      return DEFAULT_STATS;
    }
  },

  saveStats(stats: ProductivityStats): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats:', e);
    }
  },

  recordNoteStats(text: string): ProductivityStats {
    const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const currentStats = this.getStats();

    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    let newStreak = currentStats.streakDays || 1;
    if (currentStats.lastActiveDate === today) {
      // Already recorded today
      newStreak = currentStats.streakDays || 1;
    } else if (currentStats.lastActiveDate === yesterday) {
      newStreak = (currentStats.streakDays || 0) + 1;
    } else if (!currentStats.lastActiveDate) {
      newStreak = 3; // Default starter streak
    } else {
      newStreak = 1;
    }

    const newTotalWords = (currentStats.totalWords || 0) + wordCount;
    // 30 words ~ 1 minute typing
    const newSavedMinutes = Math.max(1, Math.round(newTotalWords / 30));

    const updated: ProductivityStats = {
      totalWords: newTotalWords,
      typingTimeSavedMinutes: newSavedMinutes,
      streakDays: newStreak,
      lastActiveDate: today,
    };

    this.saveStats(updated);
    return updated;
  },

  clearAllData(): void {
    try {
      localStorage.removeItem(NOTES_KEY);
      localStorage.removeItem(SETTINGS_KEY);
      localStorage.removeItem(SUB_KEY);
      localStorage.removeItem(LAST_RESET_KEY);
      localStorage.removeItem(STATS_KEY);
    } catch (e) {
      console.error('Failed to clear all data:', e);
    }
  }
};

