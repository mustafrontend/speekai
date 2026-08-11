import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';
import { SubscriptionState } from '../types';
import { storageService } from './storageService';

export const REVENUECAT_PUBLIC_KEY = 'appl_kHPiyBFSmFZJchPwOEamDypGadO';
export const ENTITLEMENT_ID = 'pro_access';

export const PRO_PRODUCTS = {
  WEEKLY: {
    id: 'com.voicenotes.speechtotext.app.weekly',
    packageId: '$rc_weekly',
    price: '$3.99',
    period: 'week',
    trialDays: 3,
    badge: 'Popular for Cash Flow',
  },
  ANNUAL: {
    id: 'com.voicenotes.speechtotext.app.annual',
    packageId: '$rc_annual',
    price: '$29.99',
    period: 'year',
    savings: 'SAVE 70%',
    badge: 'Best Value',
  },
};

export const revenueCatService = {
  isInitialized: false,

  async init(): Promise<void> {
    if (this.isInitialized) return;
    if (Capacitor.isNativePlatform()) {
      try {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
        await Purchases.configure({ apiKey: REVENUECAT_PUBLIC_KEY });
        this.isInitialized = true;
        console.log('RevenueCat SDK configured successfully on native device.');
      } catch (e) {
        console.error('Failed to configure RevenueCat SDK:', e);
      }
    }
  },

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
    await this.init();

    if (Capacitor.isNativePlatform()) {
      // REAL NATIVE REVENUECAT APPLE STOREKIT PURCHASE
      try {
        const productId = plan === 'weekly' 
          ? PRO_PRODUCTS.WEEKLY.id
          : PRO_PRODUCTS.ANNUAL.id;

        // 1. Try purchasing via Offerings Package first
        const offerings = await Purchases.getOfferings();
        let customerInfoResult;

        if (offerings.current) {
          const targetPkg = plan === 'weekly' ? offerings.current.weekly : offerings.current.annual;
          if (targetPkg) {
            const res = await Purchases.purchasePackage({ aPackage: targetPkg });
            customerInfoResult = res.customerInfo;
          }
        }

        // 2. Fallback to Store Product purchase if Package was not found
        if (!customerInfoResult) {
          const { products } = await Purchases.getProducts({ productIdentifiers: [productId] });
          if (products && products.length > 0) {
            const res = await Purchases.purchaseStoreProduct({ product: products[0] });
            customerInfoResult = res.customerInfo;
          } else {
            throw new Error(`Product ${productId} StoreKit'ten getirilemedi.`);
          }
        }

        const isPro = typeof customerInfoResult.entitlements.active[ENTITLEMENT_ID] !== 'undefined';
        if (!isPro) {
          throw new Error('Ödeme tamamlanamadı veya kullanıcı iptal etti.');
        }

        const newState: SubscriptionState = {
          isPro: true,
          plan,
          expiresAt: Date.now() + (plan === 'weekly' ? 7 * 86400 * 1000 : 365 * 86400 * 1000),
          freeNotesUsedToday: 0,
          maxFreeNotesPerDay: 3,
        };

        storageService.saveSubscriptionState(newState);
        return newState;
      } catch (err: any) {
        if (err?.userCancelled) {
          throw { userCancelled: true, message: 'Kullanıcı ödeme penceresini iptal etti.' };
        }
        throw new Error(err?.message || 'Apple StoreKit ödeme penceresi açılamadı.');
      }
    } else {
      // Web browser fallback notification - Require Native iOS device for Apple StoreKit
      throw new Error('Canlı Apple StoreKit ödeme penceresi TestFlight / App Store yüklü iPhone cihazlarda açılır.');
    }
  },

  async restorePurchases(): Promise<SubscriptionState> {
    await this.init();

    if (Capacitor.isNativePlatform()) {
      try {
        const { customerInfo } = await Purchases.restorePurchases();
        const isPro = typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined';

        const newState: SubscriptionState = {
          isPro,
          plan: isPro ? 'weekly' : undefined,
          freeNotesUsedToday: isPro ? 0 : storageService.getSubscriptionState().freeNotesUsedToday,
          maxFreeNotesPerDay: 3,
        };

        storageService.saveSubscriptionState(newState);
        return newState;
      } catch (err: any) {
        throw new Error(err?.message || 'Abonelikler geri yüklenemedi.');
      }
    } else {
      return storageService.getSubscriptionState();
    }
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
