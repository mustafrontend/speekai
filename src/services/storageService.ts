import { SubscriptionState, UserSettings, VoiceNote } from '../types';

const NOTES_KEY = 'vn_saved_notes_v1';
const SETTINGS_KEY = 'vn_user_settings_v1';
const SUB_KEY = 'vn_sub_state_v1';
const LAST_RESET_KEY = 'vn_last_reset_date';

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
  }
};
