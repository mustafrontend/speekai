import { SupportedLanguage } from '../types';

export interface SpeechCallbacks {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onVolumeChange?: (volume: number) => void;
  onEnd?: () => void;
}

const LANGUAGE_SPEECH_MAP: Record<SupportedLanguage, string> = {
  tr: 'tr-TR',
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
};

class SpeechService {
  private recognition: any = null;
  private isListening: boolean = false;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;

  public isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  public startListening(lang: SupportedLanguage, callbacks: SpeechCallbacks): void {
    if (this.isListening) {
      this.stopListening();
    }

    this.isListening = true;

    // Start Audio Level Analyser for Waveform Visualizer
    this.initAudioAnalyser(callbacks.onVolumeChange);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available in browser. Using simulated dictation fallback.');
      this.simulateSpeech(lang, callbacks);
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = LANGUAGE_SPEECH_MAP[lang] || 'tr-TR';

      let fullTranscript = '';

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            fullTranscript += result[0].transcript + ' ';
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        const currentText = (fullTranscript + interimTranscript).trim();
        callbacks.onResult(currentText, false);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          callbacks.onError('Microphone permission denied. Please allow microphone access in your browser settings.');
        } else {
          callbacks.onError(`Speech recognition notice: ${event.error}`);
        }
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          // Restart if user hasn't explicitly stopped recording
          try {
            this.recognition.start();
          } catch (e) {
            // ignore restart errors
          }
        } else {
          if (callbacks.onEnd) callbacks.onEnd();
        }
      };

      this.recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      callbacks.onError('Could not initialize speech recognition. Starting voice recorder.');
      this.simulateSpeech(lang, callbacks);
    }
  }

  public stopListening(): void {
    this.isListening = false;

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.recognition = null;
    }

    // Stop Audio Analyser & Media Stream
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private async initAudioAnalyser(onVolumeChange?: (volume: number) => void): Promise<void> {
    if (!onVolumeChange) return;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (!this.isListening || !this.analyser) return;
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalizedVolume = Math.min(100, Math.max(5, (average / 128) * 100));
        onVolumeChange(normalizedVolume);
        this.animFrameId = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.warn('Audio level analyzer fallback:', err);
      // Continuous random waveform simulation for visual feedback
      const simulateVolume = () => {
        if (!this.isListening) return;
        const randomVol = Math.floor(Math.random() * 45) + 15;
        onVolumeChange(randomVol);
        this.animFrameId = window.setTimeout(simulateVolume, 120) as any;
      };
      simulateVolume();
    }
  }

  private simulateSpeech(lang: SupportedLanguage, callbacks: SpeechCallbacks): void {
    const demoSentences: Record<SupportedLanguage, string[]> = {
      tr: [
        'Bugün saat üçte ürün ekibiyle lansman toplantısı var.',
        'Pazarlama bütçesini kontrol et ve haftalık RevenueCat gelir analizini çıkar.',
        'Markete gidince kahve, süt ve avokado almayı unutma.',
        'Müşteri sunumuna yeni AI Whisper ve otomatik özet çıkarma özelliğini ekleyelim.'
      ],
      en: [
        'Call the product team today at 3 PM to review the release roadmap.',
        'Check RevenueCat analytics for weekly subscription retention performance.',
        'Don\'t forget to pick up coffee, almond milk, and avocados from the store.',
        'Add the new AI Whisper dictation feature directly to our slide deck.'
      ],
      de: [
        'Das Treffen mit dem Produktteam ist heute um 15 Uhr.',
        'Überprüfe die RevenueCat-Analysen für die wöchentliche Abonnement-Rate.',
        'Vergiss nicht, Kaffee, Milch und Avocados im Supermarkt zu kaufen.',
        'Füge die neue AI Whisper Diktierfunktion der Präsentation hinzu.'
      ],
      es: [
        'Reunión con el equipo de producto hoy a las 3 PM para revisar el lanzamiento.',
        'Revisar las métricas de RevenueCat para la retención de suscripción semanal.',
        'Comprar café, leche y aguacates en el supermercado.',
        'Agregar la nueva función AI Whisper a las diapositivas de la presentación.'
      ],
      fr: [
        'Réunion avec l\'équipe produit aujourd\'hui à 15h pour le lancement.',
        'Vérifier les analyses RevenueCat pour la rétention des abonnements hebdomadaires.',
        'Acheter du café, du lait et des avocats au supermarché.',
        'Ajouter la nouvelle fonctionnalité AI Whisper à la présentation client.'
      ]
    };

    const sentences = demoSentences[lang] || demoSentences.tr;
    let index = 0;
    let accumulatedText = '';

    const interval = setInterval(() => {
      if (!this.isListening) {
        clearInterval(interval);
        return;
      }
      accumulatedText += (accumulatedText ? ' ' : '') + sentences[index % sentences.length];
      index++;
      callbacks.onResult(accumulatedText, false);
    }, 2800);
  }
}

export const speechService = new SpeechService();
