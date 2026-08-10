import { SupportedLanguage } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  proBadge: string;
  freeNotesRemaining: string;
  stopwatchRec: string;
  stopRecording: string;
  tapToSpeak: string;
  recordingInstruction: string;
  idleInstruction: string;
  liveTranscriptionTitle: string;
  listeningNotice: string;
  idleTranscriptionNotice: string;
  copyToClipboard: string;
  copied: string;
  whatsApp: string;
  aiSummarize: string;
  unlimitedProBanner: string;
  recordingCompletedTitle: string;
  recordingCompletedSubtitle: string;
  close: string;
  aiSummarizeAndTodo: string;
  aiSummarizeSub: string;
  saveToAgenda: string;
  aiModalTitle: string;
  aiModalSub: string;
  aiProcessing: string;
  aiProcessingSub: string;
  todoListTitle: string;
  summaryTitle: string;
  polishedTextTitle: string;
  copyAllSummary: string;
  sendWhatsApp: string;
  paywallTitle: string;
  paywallSub: string;
  weeklyPlan: string;
  annualPlan: string;
  trialBadge: string;
  cancelAnytime: string;
  bestValue: string;
  savePercent: string;
  startFreeTrial: string;
  startPro: string;
  restorePurchases: string;
  terms: string;
  privacy: string;
  agendaTitle: string;
  agendaSub: string;
  noNotesFound: string;
  delete: string;
  settingsTitle: string;
  settingsSub: string;
  autoRecordTitle: string;
  autoRecordSub: string;
  aiWhisperTitle: string;
  aiWhisperSub: string;
  hapticTitle: string;
  hapticSub: string;
  resetLimitTest: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  tr: {
    appName: 'SpeekAI',
    appSubtitle: 'Tek Tık Sesli Not',
    proBadge: 'PRO',
    freeNotesRemaining: 'Ücretsiz',
    stopwatchRec: 'KAYIT',
    stopRecording: 'Kaydı Durdur',
    tapToSpeak: 'Tek Tık Konuş',
    recordingInstruction: 'Konuşmanız anında metne dökülüyor...',
    idleInstruction: 'Kırmızı mikrofona basıp konuşmaya başlayın',
    liveTranscriptionTitle: 'Canlı Metin Dökümü',
    listeningNotice: 'Konuşmanız dinleniyor...',
    idleTranscriptionNotice: 'Konuşmaya başlamak için aşağıdaki dev kırmızı mikrofona dokunun.',
    copyToClipboard: 'Metni Kopyala',
    copied: 'Kopyalandı!',
    whatsApp: "WhatsApp'a At",
    aiSummarize: 'AI Özetle',
    unlimitedProBanner: 'Sınırsız PRO Al ($3.99)',
    recordingCompletedTitle: 'Sesli Not Tamamlandı 🎙️',
    recordingCompletedSubtitle: 'Metniniz hazır. Ne yapmak istersiniz?',
    close: 'Kapat',
    aiSummarizeAndTodo: 'Yapay Zeka ile Özetle & To-Do Çıkar',
    aiSummarizeSub: '5 dakikalık sesi 3 maddelik yapılacaklar listesine çevir',
    saveToAgenda: 'Notu Hafızaya Kaydet',
    aiModalTitle: 'Gemini AI Whisper & Özet',
    aiModalSub: '3 Maddelik Yapılacaklar & Cilalı Metin',
    aiProcessing: 'Yapay Zeka Sesinizi Çözümleyip Özetliyor...',
    aiProcessingSub: 'Noktalama işaretleri ekleniyor, yapılacaklar listesi oluşturuluyor.',
    todoListTitle: '3 Maddelik Yapılacaklar Listesi (To-Do)',
    summaryTitle: '📝 Özet',
    polishedTextTitle: '✨ Cilalanmış Metin (Whisper Formats)',
    copyAllSummary: 'Tüm Özeti Kopyala',
    sendWhatsApp: "WhatsApp'a Gönder",
    paywallTitle: 'Sınırsız Sesli Not & AI Özet',
    paywallSub: 'Günlük 3 dakika limitini kaldırın, tüm konuşmalarınızı to-do listesine çevirin.',
    weeklyPlan: 'Haftalık Plan',
    annualPlan: 'Yıllık Plan',
    trialBadge: '3 Gün Ücretsiz Deneme',
    cancelAnytime: 'İstediğin an iptal et',
    bestValue: 'En İyi Değer',
    savePercent: '%70 İNDİRİM',
    startFreeTrial: '3 Gün Ücretsiz Dene & Başlat',
    startPro: 'PRO Üyeliği Başlat',
    restorePurchases: 'Satın Alımları Geri Yükle',
    terms: 'Kullanım Koşulları',
    privacy: 'Gizlilik',
    agendaTitle: 'Not Geçmişi & Ajanda',
    agendaSub: 'Kaydedilmiş sesli notlar',
    noNotesFound: 'Henüz Kayıtlı Not Yok',
    delete: 'Sil',
    settingsTitle: 'Uygulama Ayarları',
    settingsSub: 'UX Tercihleri & AI Motoru',
    autoRecordTitle: 'Açılışta Otomatik Kaydet',
    autoRecordSub: 'Uygulama açılır açılmaz mikrofona başlar (0s gecikme)',
    aiWhisperTitle: 'Gelişmiş AI Whisper Modu',
    aiWhisperSub: 'Gemini 1.5 Flash ile otomatik noktalama ve imla',
    hapticTitle: 'Haptic Feedback',
    hapticSub: 'Titreşimli dokunma geri bildirimi',
    resetLimitTest: 'Günlük Ücretsiz Limit Sıfırla (Test)',
  },
  en: {
    appName: 'SpeekAI',
    appSubtitle: '1-Tap Voice Memo',
    proBadge: 'PRO',
    freeNotesRemaining: 'Free',
    stopwatchRec: 'REC',
    stopRecording: 'Stop Recording',
    tapToSpeak: '1-Tap Dictate',
    recordingInstruction: 'Transcribing your speech live...',
    idleInstruction: 'Tap the giant red microphone to start speaking',
    liveTranscriptionTitle: 'Live Speech Transcription',
    listeningNotice: 'Listening to your voice...',
    idleTranscriptionNotice: 'Tap the red mic below to convert your voice to text instantly.',
    copyToClipboard: 'Copy Text',
    copied: 'Copied!',
    whatsApp: 'Share on WhatsApp',
    aiSummarize: 'AI Summarize',
    unlimitedProBanner: 'Get Unlimited PRO ($3.99)',
    recordingCompletedTitle: 'Voice Memo Finished 🎙️',
    recordingCompletedSubtitle: 'Your transcript is ready. What would you like to do?',
    close: 'Close',
    aiSummarizeAndTodo: 'AI Summarize & Extract To-Do',
    aiSummarizeSub: 'Turn 5 mins of audio into a 3-bullet action checklist',
    saveToAgenda: 'Save Note to Agenda',
    aiModalTitle: 'Gemini AI Whisper & Summary',
    aiModalSub: '3 Actionable Items & Formatted Text',
    aiProcessing: 'AI is Analyzing & Summarizing Your Audio...',
    aiProcessingSub: 'Formatting paragraphs, adding punctuation, creating To-Do items.',
    todoListTitle: '3-Bullet Action Items (To-Do List)',
    summaryTitle: '📝 Executive Summary',
    polishedTextTitle: '✨ Polished AI Transcript',
    copyAllSummary: 'Copy Full Summary',
    sendWhatsApp: 'Send via WhatsApp',
    paywallTitle: 'Unlimited Voice Notes & AI Summaries',
    paywallSub: 'Remove the 3-minute daily cap. Convert all voice memos to To-Do lists.',
    weeklyPlan: 'Weekly Plan',
    annualPlan: 'Annual Plan',
    trialBadge: '3-Day Free Trial',
    cancelAnytime: 'Cancel anytime',
    bestValue: 'Best Value',
    savePercent: 'SAVE 70%',
    startFreeTrial: 'Start 3-Day Free Trial',
    startPro: 'Unlock PRO Access',
    restorePurchases: 'Restore Purchases',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    agendaTitle: 'Notes History Agenda',
    agendaSub: 'Saved voice memos',
    noNotesFound: 'No Saved Notes Yet',
    delete: 'Delete',
    settingsTitle: 'App Settings',
    settingsSub: 'UX Preferences & AI Engine',
    autoRecordTitle: 'Auto-Record on Launch',
    autoRecordSub: 'Start mic immediately upon opening app (0s delay)',
    aiWhisperTitle: 'Advanced AI Whisper Mode',
    aiWhisperSub: 'Auto-punctuation & grammar formatting with Gemini',
    hapticTitle: 'Haptic Feedback',
    hapticSub: 'Vibration response on button taps',
    resetLimitTest: 'Reset Daily Free Limits (Test)',
  },
  de: {
    appName: 'Voice Notes',
    appSubtitle: 'Sprachnotiz mit 1 Klick',
    proBadge: 'PRO',
    freeNotesRemaining: 'Kostenlos',
    stopwatchRec: 'AUFNAHME',
    stopRecording: 'Aufnahme Stoppen',
    tapToSpeak: 'Tippen & Sprechen',
    recordingInstruction: 'Ihre Sprache wird live umgewandelt...',
    idleInstruction: 'Tippen Sie auf das rote Mikrofon',
    liveTranscriptionTitle: 'Live-Transkription',
    listeningNotice: 'Höre zu...',
    idleTranscriptionNotice: 'Tippen Sie auf das rote Mikrofon unten, um zu diktieren.',
    copyToClipboard: 'Text Kopieren',
    copied: 'Kopiert!',
    whatsApp: 'Auf WhatsApp Teilen',
    aiSummarize: 'KI-Zusammenfassung',
    unlimitedProBanner: 'Unbegrenzt PRO ($3.99)',
    recordingCompletedTitle: 'Sprachnotiz Fertig 🎙️',
    recordingCompletedSubtitle: 'Ihr Text ist bereit.',
    close: 'Schließen',
    aiSummarizeAndTodo: 'KI-Zusammenfassung & Aufgaben',
    aiSummarizeSub: 'Wandeln Sie Sprache in 3 To-Do-Punkte um',
    saveToAgenda: 'Notiz Speichern',
    aiModalTitle: 'Gemini KI Whisper & Zusammenfassung',
    aiModalSub: '3 Aufgaben & Formatierter Text',
    aiProcessing: 'KI analysiert Ihre Sprachnotiz...',
    aiProcessingSub: 'Satzzeichen und Aufgabenliste werden erstellt.',
    todoListTitle: '3 Aufgaben-Punkte (To-Do-Liste)',
    summaryTitle: '📝 Zusammenfassung',
    polishedTextTitle: '✨ Formatierter KI-Text',
    copyAllSummary: 'Zusammenfassung Kopieren',
    sendWhatsApp: 'Über WhatsApp Senden',
    paywallTitle: 'Unbegrenzte Sprachnotizen & KI',
    paywallSub: 'Heben Sie das tägliche Limit auf.',
    weeklyPlan: 'Wöchentlicher Plan',
    annualPlan: 'Jahresplan',
    trialBadge: '3 Tage Kostenlos Testen',
    cancelAnytime: 'Jederzeit kündbar',
    bestValue: 'Bester Wert',
    savePercent: '70% SPAREN',
    startFreeTrial: '3 Tage Kostenlos Testen & Starten',
    startPro: 'PRO-Zugang Freischalten',
    restorePurchases: 'Käufe Wiederherstellen',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutz',
    agendaTitle: 'Notizen-Archiv',
    agendaSub: 'Gespeicherte Sprachnotizen',
    noNotesFound: 'Noch Keine Notizen',
    delete: 'Löschen',
    settingsTitle: 'Einstellungen',
    settingsSub: 'UX & KI-Optionen',
    autoRecordTitle: 'Auto-Aufnahme beim Start',
    autoRecordSub: 'Startet das Mikrofon direkt beim Öffnen',
    aiWhisperTitle: 'Erweiterter KI-Whisper-Modus',
    aiWhisperSub: 'Automatische Interpunktion mit Gemini',
    hapticTitle: 'Haptisches Feedback',
    hapticSub: 'Vibration bei Klick',
    resetLimitTest: 'Limit Zurücksetzen (Test)',
  },
  es: {
    appName: 'Voice Notes',
    appSubtitle: 'Nota de Voz en 1-Toque',
    proBadge: 'PRO',
    freeNotesRemaining: 'Gratis',
    stopwatchRec: 'GRABANDO',
    stopRecording: 'Detener Grabación',
    tapToSpeak: 'Toca para Hablar',
    recordingInstruction: 'Transcribiendo tu voz en vivo...',
    idleInstruction: 'Toca el micrófono rojo para hablar',
    liveTranscriptionTitle: 'Transcripción en Vivo',
    listeningNotice: 'Escuchando tu voz...',
    idleTranscriptionNotice: 'Toca el micrófono rojo abajo para dictar texto.',
    copyToClipboard: 'Copiar Texto',
    copied: '¡Copiado!',
    whatsApp: 'Enviar por WhatsApp',
    aiSummarize: 'Resumen IA',
    unlimitedProBanner: 'Obtener PRO Ilimitado ($3.99)',
    recordingCompletedTitle: 'Nota de Voz Lista 🎙️',
    recordingCompletedSubtitle: 'Tu texto está listo. ¿Qué deseas hacer?',
    close: 'Cerrar',
    aiSummarizeAndTodo: 'Resumen IA y Lista de Tareas',
    aiSummarizeSub: 'Convierte 5 min en 3 tareas concretas',
    saveToAgenda: 'Guardar Nota',
    aiModalTitle: 'Gemini IA Whisper & Resumen',
    aiModalSub: '3 Puntos de Acción y Texto Formateado',
    aiProcessing: 'La IA está analizando tu voz...',
    aiProcessingSub: 'Agregando puntuación y creando lista de tareas.',
    todoListTitle: '3 Tareas a Realizar (To-Do)',
    summaryTitle: '📝 Resumen Ejecutivo',
    polishedTextTitle: '✨ Texto Formateado por IA',
    copyAllSummary: 'Copiar Resumen',
    sendWhatsApp: 'Enviar por WhatsApp',
    paywallTitle: 'Notas de Voz e IA Ilimitadas',
    paywallSub: 'Elimina el límite diario de 3 minutos.',
    weeklyPlan: 'Plan Semanal',
    annualPlan: 'Plan Anual',
    trialBadge: 'Prueba Gratis de 3 Días',
    cancelAnytime: 'Cancela cuando quieras',
    bestValue: 'Mejor Opción',
    savePercent: 'AHORRA 70%',
    startFreeTrial: 'Probar 3 Días Gratis',
    startPro: 'Iniciar Acceso PRO',
    restorePurchases: 'Restaurar Compras',
    terms: 'Términos de Uso',
    privacy: 'Privacidad',
    agendaTitle: 'Historial de Notas',
    agendaSub: 'Notas de voz guardadas',
    noNotesFound: 'Sin Notas Guardadas',
    delete: 'Eliminar',
    settingsTitle: 'Ajustes',
    settingsSub: 'Preferencias y Motor IA',
    autoRecordTitle: 'Grabación Automática al Abrir',
    autoRecordSub: 'Inicia el micrófono inmediatamente',
    aiWhisperTitle: 'Modo Avanzado IA Whisper',
    aiWhisperSub: 'Puntuación automática con Gemini',
    hapticTitle: 'Vibración Háptica',
    hapticSub: 'Respuesta táctil con vibración',
    resetLimitTest: 'Reiniciar Límite Diario (Prueba)',
  },
  fr: {
    appName: 'Voice Notes',
    appSubtitle: 'Note Vocale en 1 Clic',
    proBadge: 'PRO',
    freeNotesRemaining: 'Gratuit',
    stopwatchRec: 'REC',
    stopRecording: 'Arrêter la Note',
    tapToSpeak: 'Appuyer pour Parler',
    recordingInstruction: 'Transcription en direct de votre voix...',
    idleInstruction: 'Appuyez sur le micro rouge pour parler',
    liveTranscriptionTitle: 'Transcription en Direct',
    listeningNotice: 'Écoute en cours...',
    idleTranscriptionNotice: 'Appuyez sur le micro rouge ci-dessous pour dicter.',
    copyToClipboard: 'Copier le Texte',
    copied: 'Copié !',
    whatsApp: 'Partager sur WhatsApp',
    aiSummarize: 'Résumé IA',
    unlimitedProBanner: 'Accès PRO Illimité ($3.99)',
    recordingCompletedTitle: 'Note Vocale Terminée 🎙️',
    recordingCompletedSubtitle: 'Votre texte est prêt. Que souhaitez-vous faire ?',
    close: 'Fermer',
    aiSummarizeAndTodo: 'Résumé IA & Liste de Tâches',
    aiSummarizeSub: 'Transformez la voix en 3 tâches concrètes',
    saveToAgenda: 'Enregistrer la Note',
    aiModalTitle: 'Gemini IA Whisper & Résumé',
    aiModalSub: '3 Tâches À Faire & Texte Formaté',
    aiProcessing: 'L\'IA analyse votre note vocale...',
    aiProcessingSub: 'Ajout de la ponctuation et génération de la liste.',
    todoListTitle: '3 Tâches À Faire (To-Do List)',
    summaryTitle: '📝 Résumé Exécutif',
    polishedTextTitle: '✨ Texte Formaté par l\'IA',
    copyAllSummary: 'Copier le Résumé',
    sendWhatsApp: 'Envoyer sur WhatsApp',
    paywallTitle: 'Notes Vocales & IA Illimitées',
    paywallSub: 'Supprimez la limite quotidienne de 3 minutes.',
    weeklyPlan: 'Offre Hebdomadaire',
    annualPlan: 'Offre Annuelle',
    trialBadge: 'Essai Gratuit de 3 Jours',
    cancelAnytime: 'Annulable à tout moment',
    bestValue: 'Meilleure Offre',
    savePercent: 'ÉCONOMISEZ 70%',
    startFreeTrial: 'Démarrer l\'Essai Gratuit 3 Jours',
    startPro: 'Débloquer l\'Accès PRO',
    restorePurchases: 'Restaurer les Achats',
    terms: 'Conditions d\'Utilisation',
    privacy: 'Politique de Confidentialité',
    agendaTitle: 'Historique des Notes',
    agendaSub: 'Notes vocales enregistrées',
    noNotesFound: 'Aucune Note Enregistrée',
    delete: 'Supprimer',
    settingsTitle: 'Paramètres',
    settingsSub: 'Préférences & Moteur IA',
    autoRecordTitle: 'Enregistrement Automatique',
    autoRecordSub: 'Active le micro dès l\'ouverture de l\'app',
    aiWhisperTitle: 'Mode IA Whisper Avancé',
    aiWhisperSub: 'Ponctuation automatique avec Gemini',
    hapticTitle: 'Retour Haptique',
    hapticSub: 'Vibration au toucher',
    resetLimitTest: 'Réinitialiser la Limite (Test)',
  },
};

export function getTranslation(lang: SupportedLanguage): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.tr;
}
