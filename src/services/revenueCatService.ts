import { SubscriptionState } from '../types';
import { storageService } from './storageService';

export const REVENUECAT_PUBLIC_KEY = 'appl_KYCMWKtHLpIvVfRoVOlwEOgfuRZ';
export const ENTITLEMENT_ID = 'pro_access';

export const PRO_PRODUCTS = {
  WEEKLY: {
    id: 'com.voicenotes.pro.weekly',
    packageId: '$rc_weekly',
    price: '$3.99',
    period: 'week',
    trialDays: 3,
    badge: 'Popular for Cash Flow',
  },
  ANNUAL: {
    id: 'com.voicenotes.pro.annual',
    packageId: '$rc_annual',
    price: '$29.99',
    period: 'year',
    savings: 'SAVE 70%',
    badge: 'Best Value',
  },
};

export const revenueCatService = {
  getSubscriptionState(): SubscriptionState {
    return storageService.getSubscriptionState();
  },

  canRecordNewNote(): { allowed: boolean; remaining: number } {
    const state = this.getSubscriptionState();
    if (state.isPro) {
      return { allowed: true, remaining: Infinity };
    }
    const remaining = Math.max(0, state.maxFreeNotesPerDay - state.freeNotesUsedToday);
    return {
      allowed: remaining > 0,
      remaining,
    };
  },

  incrementFreeNotesUsed(): void {
    const state = this.getSubscriptionState();
    if (!state.isPro) {
      state.freeNotesUsedToday += 1;
      storageService.saveSubscriptionState(state);
    }
  },

  async purchasePlan(plan: 'weekly' | 'annual'): Promise<SubscriptionState> {
    // Simulate IAP purchase with RevenueCat SDK backend
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newState: SubscriptionState = {
      isPro: true,
      plan,
      expiresAt: Date.now() + (plan === 'weekly' ? 7 * 86400 * 1000 : 365 * 86400 * 1000),
      freeNotesUsedToday: 0,
      maxFreeNotesPerDay: 3,
    };

    storageService.saveSubscriptionState(newState);
    return newState;
  },

  async restorePurchases(): Promise<SubscriptionState> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const state = this.getSubscriptionState();
    return state;
  },

  async cancelSubscription(): Promise<SubscriptionState> {
    const newState: SubscriptionState = {
      isPro: false,
      freeNotesUsedToday: 0,
      maxFreeNotesPerDay: 3,
    };
    storageService.saveSubscriptionState(newState);
    return newState;
  }
};
