import React from 'react';

interface WaveformProps {
  isRecording: boolean;
  volumeLevel: number; // 0 to 100
}

export const Waveform: React.FC<WaveformProps> = ({ isRecording, volumeLevel }) => {
  const barCount = 28;

  return (
    <div className="w-full flex items-center justify-center gap-1 h-16 py-2 px-4 bg-slate-100/80 rounded-2xl border border-slate-200 shadow-inner overflow-hidden">
      {Array.from({ length: barCount }).map((_, index) => {
        // Create smooth parabolic height multipliers across bars
        const centerOffset = Math.abs(index - barCount / 2) / (barCount / 2);
        const curveFactor = Math.cos(centerOffset * Math.PI * 0.4);
        
        let heightPct = 12;
        if (isRecording) {
          const pseudoRandom = Math.sin(index * 0.8 + Date.now() * 0.005) * 15;
          const dynamicVol = (volumeLevel + pseudoRandom) * curveFactor;
          heightPct = Math.min(95, Math.max(15, dynamicVol));
        }

        return (
          <div
            key={index}
            className={`w-1 rounded-full transition-all duration-100 ${
              isRecording
                ? 'bg-gradient-to-t from-red-600 via-red-500 to-rose-400 shadow-sm shadow-red-500/30'
                : 'bg-slate-300'
            }`}
            style={{
              height: `${heightPct}%`,
            }}
          />
        );
      })}
    </div>
  );
};
