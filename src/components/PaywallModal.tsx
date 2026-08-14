import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionState, SupportedLanguage } from '../types';
import { PRO_PRODUCTS, revenueCatService } from '../services/revenueCatService';
import { getTranslation } from '../i18n/translations';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: (state: SubscriptionState) => void;
  currentLang: SupportedLanguage;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onSubscribed,
  currentLang,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'annual'>('weekly');
  const [purchasing, setPurchasing] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);

  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  const handleDismiss = () => {
    // Strictly close modal without granting any PRO privileges or mutating state
    onClose();
  };

  const handlePurchase = async () => {
    setPurchasing(true);
    setErrorPopup(null);
    try {
      const newState = await revenueCatService.purchasePlan(selectedPlan);
      
      // Strict Verification: Only grant PRO if RevenueCat verified purchase as true
      if (newState && newState.isPro) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        onSubscribed(newState);
        onClose();
      } else {
        setErrorPopup('Ödeme doğrulaması tamamlanamadı.');
      }
    } catch (err: any) {
      console.error('RevenueCat purchase error:', err);
      
      // Check if user cancelled Apple payment sheet
      const isUserCancelled = err?.userCancelled || err?.code === 'USER_CANCELLED' || err?.message?.includes('cancelled');
      if (isUserCancelled) {
        // User cancelled Apple payment - DO NOT grant PRO and DO NOT show error popup
        console.log('Kullanıcı ödeme penceresini iptal etti.');
      } else {
        setErrorPopup(err?.message || 'RevenueCat ödeme hatası oluştu.');
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setRestoreStatus('...');
    setErrorPopup(null);
    try {
      const state = await revenueCatService.restorePurchases();
      if (state.isPro) {
        setRestoreStatus('PRO!');
        onSubscribed(state);
        setTimeout(() => onClose(), 1200);
      } else {
        setRestoreStatus('Bulunamadı');
        setErrorPopup('Geçerli bir RevenueCat PRO aboneliği bulunamadı.');
      }
    } catch (err: any) {
      console.error('RevenueCat restore error:', err);
      setErrorPopup(err?.message || 'Abonelik geri yüklenirken hata oluştu.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      {/* Error Alert Popup Modal */}
      {errorPopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 animate-in zoom-in-95">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-red-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">RevenueCat Ödeme Uyarısı</h4>
              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">{errorPopup}</p>
            </div>
            <button
              onClick={() => setErrorPopup(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs active:scale-[0.98] transition-all shadow-md"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Hero */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-rose-600 p-6 text-white text-center overflow-hidden">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>

          <img
            src="/logo.png"
            alt="SpeekAI Logo"
            className="w-16 h-16 rounded-2xl mx-auto mb-3 shadow-xl ring-4 ring-white/30 object-cover"
          />

          <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-widest mb-2 shadow-sm">
            RevenueCat PRO Unlocked
          </span>

          <h2 className="text-2xl font-black tracking-tight leading-tight mb-1">
            {t.paywallTitle}
          </h2>
          <p className="text-xs font-medium text-red-100 opacity-90 max-w-xs mx-auto">
            {t.paywallSub}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Features List */}
          <div className="space-y-3">
            {[
              t.feature1,
              t.feature2,
              t.feature3,
              t.feature4,
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing Options Selector */}
          <div className="space-y-3">
            
            {/* Weekly Plan */}
            <div
              onClick={() => setSelectedPlan('weekly')}
              className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                selectedPlan === 'weekly'
                  ? 'border-red-500 bg-red-50/50 shadow-md ring-1 ring-red-500/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
              }`}
            >
              <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                {t.trialBadge}
              </div>

              <div>
                <div className="text-sm font-black text-slate-900">{t.weeklyPlan}</div>
                <div className="text-[11px] font-semibold text-slate-500">
                  {PRO_PRODUCTS.WEEKLY.price} / Hafta
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-red-600">{PRO_PRODUCTS.WEEKLY.price}</div>
                <div className="text-[10px] font-bold text-emerald-600">3 Gün Ücretsiz</div>
              </div>
            </div>

            {/* Annual Plan */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                selectedPlan === 'annual'
                  ? 'border-red-500 bg-red-50/50 shadow-md ring-1 ring-red-500/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
              }`}
            >
              <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm">
                {t.savePercent}
              </div>

              <div>
                <div className="text-sm font-black text-slate-900">{t.annualPlan}</div>
                <div className="text-[11px] font-semibold text-slate-500">
                  {PRO_PRODUCTS.ANNUAL.price} / Yıl
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-slate-900">{PRO_PRODUCTS.ANNUAL.price}</div>
                <div className="text-[10px] font-bold text-slate-500">~$2.49 / ay</div>
              </div>
            </div>

          </div>

          {/* Subscribe CTA Button */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handlePurchase}
              disabled={purchasing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white font-black text-base shadow-xl shadow-red-500/30 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {purchasing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>RevenueCat Bağlanıyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>
                    {selectedPlan === 'weekly' ? 'Devam Et (3 Gün Ücretsiz)' : 'Devam Et (Yıllık Abonelik)'}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1 pt-1">
              <button
                onClick={handleRestore}
                className="hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.restorePurchases}</span>
                {restoreStatus && <span className="text-red-600 font-extrabold">({restoreStatus})</span>}
              </button>

              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t.cancelAnytime}</span>
              </span>
            </div>

            {/* Legal Links for App Store Guideline 3.1.1 */}
            <div className="pt-2 flex items-center justify-center gap-3 text-[10px] font-bold text-slate-400">
              <a
                href="https://raw.githubusercontent.com/mustafrontend/speekai/main/public/privacy.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-600"
              >
                {t.privacy}
              </a>
              <span>•</span>
              <a
                href="https://raw.githubusercontent.com/mustafrontend/speekai/main/public/terms.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-600"
              >
                {t.terms}
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
