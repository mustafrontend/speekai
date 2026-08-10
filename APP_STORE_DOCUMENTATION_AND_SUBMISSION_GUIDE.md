# 🎙️ SpeekAI: AI Speech to Text — App Store Submission & Localization Guide

> **Project Name:** SpeekAI: AI Speech to Text & Voice Notes  
> **Bundle ID:** `com.speekai.speechtotext.app`  
> **Repository:** https://github.com/mustafrontend/speekai.git  
> **Target Stores:** Apple App Store (iOS/iPadOS/watchOS) & Google Play Console  
> **Framework:** React + Vite + TypeScript + Tailwind CSS + Capacitor  
> **Monetization Model:** Freemium ($3.99/week with 3-day Free Trial or $29.99/year Unlimited)  

---

## 📑 1. App Store Connect Ready Metadata (5 Core Languages)

### 🇺🇸 English (US) Metadata
- **App Name:** `SpeekAI: AI Speech to Text` (25/30 Chars)
- **Subtitle:** `1-Tap Dictate & Summarize` (25/30 Chars)
- **Promotional Text:**
  ```text
  Instantly record voice notes with 1 tap, convert speech to text with 0 latency, and auto-summarize into 3-bullet To-Do action items using AI!
  ```
- **Description:**
  ```text
  Never lose a brilliant idea, panic thought, or meeting memo while walking or driving again! SpeekAI is the ultimate minimalist 1-tap speech-to-text dictation & AI summarizer.

  KEY FEATURES:
  - 1-Tap Instant Speech Dictation: 0-second latency voice-to-text conversion using device-native Speech SDK.
  - Gemini AI Summarizer & To-Do Generator: Automatically transforms long audio recordings into 3 actionable To-Do list items.
  - Instant WhatsApp & Copy Sharing: Send 1-tap WhatsApp voice note transcripts or copy text with haptic confirmation.
  - AI Whisper Polish Mode: Perfectly formats paragraphs, corrects grammar, and inserts punctuation marks effortlessly.
  - External Audio File Import: Import WhatsApp voice messages or external .m4a/.mp3 audio files to transcribe into text.
  - Auto-Record on Launch: Instant voice recording the moment you open the app.
  - Notes History Agenda: Search and organize your past voice memos locally on your device.

  100% Device Privacy & Zero Server Friction!
  ```
- **Keywords (100 Chars):** `speek,ai,speech,text,transcribe,dictation,voice,memo,notes,recorder,audio,whisper,converter`

---

### 🇹🇷 Türkçe Metadata
- **Uygulama Adı:** `SpeekAI: AI Sesli Not` (21/30 Karakter)
- **Alt Başlık:** `Tek Tıkla Konuş ve Kopyala` (26/30 Karakter)
- **Tanıtım Metni:**
  ```text
  Tek tıkla konuşmanızı anında metne dökün, WhatsApp'a atın ve yapay zeka ile 3 maddelik yapılacaklar listesine çevirin!
  ```
- **Açıklama:**
  ```text
  Yürürken veya panik anında aklınıza gelen fikirleri yazmakla zaman kaybetmeyin! SpeekAI, 0 saniye gecikme ile konuşmanızı metne döken ve yapay zeka ile özetleyen en hızlı sesli not aracıdır.

  ÖNE ÇIKAN ÖZELLİKLER:
  - Tek Dokunuşla Canlı Dikte: Kırmızı mikrofona bastığınız an konuşmanız anında metne dönüşür.
  - Yapay Zeka ile 3 Maddelik To-Do Listesi: Ses kaydınızı 3 maddelik eylem planına çevirir.
  - Tek Tıkla WhatsApp & Kopyala: Metni panoya alın veya tek tıkla WhatsApp'a gönderin.
  - Gelişmiş AI Whisper Cilalama: Noktalama işaretlerini ekler, imla ve paragraf düzeni yapar.
  - WhatsApp Sesli Mesajı İçeri Aktar: Dışarıdan gelen .m4a veya .mp3 ses dosyalarını metne çevirin.
  - Açılışta Otomatik Kaydet: Uygulama açılır açılmaz anında kayda başlama opsiyonu.
  - Not Geçmişi & Ajanda: Tüm sesli notlarınızı cihazınızda saklayın ve arama yapın.

  Sıfır Sunucu Gecikmesi & %100 Cihaz İçi Gizlilik!
  ```
- **Anahtar Kelimeler:** `speek,ai,sesli,not,metin,çevirici,dikte,konuşma,yazı,kaydedici,whisper,özet`

---

## 🔒 2. Privacy Policy & App Store Compliance

- **Support URL:** `https://speekai.app/support`
- **Privacy Policy URL:** `https://speekai.app/privacy`
- **Age Rating:** 4+ (Contains no mature content)

---

## 🚀 3. CI/CD & Build Steps (Codemagic)

1. Push codebase to GitHub repository:
   `https://github.com/mustafrontend/speekai.git`
2. Connect Codemagic with `codemagic.yaml`.
3. Run automated iOS build script.
