import React, { useState } from 'react';
import { Crown, X, Sparkles, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRO_PRODUCTS, revenueCatService } from '../services/revenueCatService';
import { SubscriptionState, SupportedLanguage } from '../types';
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

  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const newState = await revenueCatService.purchasePlan(selectedPlan);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      onSubscribed(newState);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setRestoreStatus('...');
    const state = await revenueCatService.restorePurchases();
    if (state.isPro) {
      setRestoreStatus('PRO!');
      onSubscribed(state);
      setTimeout(() => onClose(), 1200);
    } else {
      setRestoreStatus('Not found.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Hero */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-rose-600 p-6 text-white text-center overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-3 text-white shadow-lg">
            <Crown className="w-8 h-8 fill-amber-300 text-amber-300" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-widest mb-2 shadow-sm">
            RevenueCat Pro Unlocked
          </span>

          <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
            {t.paywallTitle}
          </h2>
          <p className="text-xs text-red-100 font-medium mt-1">
            {t.paywallSub}
          </p>
        </div>

        {/* Feature List */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="space-y-2.5">
            {[
              { icon: Zap, text: 'Unlimited Recordings & Duration' },
              { icon: Sparkles, text: 'AI Summary & 3 To-Do Action Items' },
              { icon: ShieldCheck, text: 'Import WhatsApp Audio Notes (.m4a/.mp3)' },
              { icon: Crown, text: 'Advanced AI Whisper Mode (Formatting & Punctuation)' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-xs font-extrabold text-slate-800">
                <div className="w-6 h-6 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <f.icon className="w-3.5 h-3.5" />
                </div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Pricing Options */}
          <div className="space-y-3 pt-2">
            
            {/* Weekly Subscription Option */}
            <div
              onClick={() => setSelectedPlan('weekly')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                selectedPlan === 'weekly'
                  ? 'border-red-600 bg-red-50/50 shadow-md ring-2 ring-red-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] uppercase tracking-wider shadow">
                {PRO_PRODUCTS.WEEKLY.badge}
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-900">{t.weeklyPlan}</h4>
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      {t.trialBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{t.cancelAnytime}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">
                    {PRO_PRODUCTS.WEEKLY.price}
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">/ week</div>
                </div>
              </div>
            </div>

            {/* Annual Subscription Option */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                selectedPlan === 'annual'
                  ? 'border-red-600 bg-red-50/50 shadow-md ring-2 ring-red-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                {t.savePercent}
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900">{t.annualPlan}</h4>
                  <p className="text-xs text-slate-500 font-medium">{t.bestValue}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">
                    {PRO_PRODUCTS.ANNUAL.price}
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">/ year ($2.49/mo)</div>
                </div>
              </div>
            </div>

          </div>

          {restoreStatus && (
            <p className="text-center text-xs font-bold text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-200">
              {restoreStatus}
            </p>
          )}

        </div>

        {/* Action Button & Terms */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2.5">
          <button
            onClick={handlePurchase}
            disabled={purchasing}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-base shadow-lg shadow-red-500/30 btn-kinetic flex items-center justify-center gap-2"
          >
            {purchasing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Crown className="w-5 h-5 fill-amber-300 text-amber-300" />
                <span>
                  {selectedPlan === 'weekly' ? t.startFreeTrial : t.startPro}
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-2">
            <button onClick={handleRestore} className="hover:underline hover:text-slate-800">
              {t.restorePurchases}
            </button>
            <span>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Use: Daily 3 free limit, unlimited with PRO."); }} className="hover:underline hover:text-slate-800">
              {t.terms}
            </a>
            <span>•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: All voice and text data remain stored locally on device."); }} className="hover:underline hover:text-slate-800">
              {t.privacy}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
