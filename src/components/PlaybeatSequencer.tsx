import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Sparkles,
  Sliders,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Shuffle,
  Music,
  Radio,
  Share2,
  Download,
  Settings,
  Disc,
  Layers,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { INITIAL_TRACKS, TrackPattern, soundEngine } from '../lib/audioEngine';

interface PlaybeatSequencerProps {
  isCompact?: boolean;
  onOpenFullStudio?: () => void;
}

export const PlaybeatSequencer: React.FC<PlaybeatSequencerProps> = ({
  isCompact = false,
  onOpenFullStudio,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120.0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [tracks, setTracks] = useState<TrackPattern[]>(INITIAL_TRACKS);
  const [activeTrackId, setActiveTrackId] = useState<string>('track-kick');
  const [swing, setSwing] = useState(15);
  const [activePreset, setActivePreset] = useState('Cyber Beat 01');

  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentStepRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);
  const bpmRef = useRef(bpm);
  const tracksRef = useRef(tracks);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  // Audio Sequencer Clock Loop
  useEffect(() => {
    if (isPlaying) {
      const stepDurationMs = (60 / bpm) * 1000 * 0.25; // 16th notes
      const interval = setInterval(() => {
        const step = (currentStepRef.current + 1) % 16;
        currentStepRef.current = step;
        setCurrentStep(step);

        // Trigger sounds for active tracks at this step
        const currentTracks = tracksRef.current;
        const hasSolo = currentTracks.some(t => t.isSolo);

        currentTracks.forEach(track => {
          const isAudible = hasSolo ? track.isSolo : !track.isMuted;
          if (isAudible && track.steps[step]) {
            const vel = track.velocity[step] * track.volume;
            soundEngine.triggerSound(track.soundType, vel, track.pitch);
          }
        });
      }, stepDurationMs);

      stepTimerRef.current = interval;
      return () => clearInterval(interval);
    } else {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }
    }
  }, [isPlaying, bpm]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleStop = () => {
    setIsPlaying(false);
    currentStepRef.current = 0;
    setCurrentStep(0);
  };

  const toggleStep = (trackId: string, stepIndex: number) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === trackId) {
          const newSteps = [...t.steps];
          newSteps[stepIndex] = !newSteps[stepIndex];
          // Preview sound on trigger enable
          if (newSteps[stepIndex]) {
            soundEngine.triggerSound(t.soundType, t.velocity[stepIndex] * t.volume, t.pitch);
          }
          return { ...t, steps: newSteps };
        }
        return t;
      })
    );
  };

  const handleRandomizeRhythm = () => {
    setTracks(prev =>
      prev.map(t => {
        const newSteps = t.steps.map((_, idx) => {
          // Keep key downbeats for kick/snare
          if (t.soundType === 'kick' && idx % 4 === 0) return true;
          if (t.soundType === 'snare' && (idx === 4 || idx === 12)) return true;
          return Math.random() > 0.65;
        });
        const newVel = t.velocity.map(() => Number((0.5 + Math.random() * 0.5).toFixed(2)));
        return { ...t, steps: newSteps, velocity: newVel };
      })
    );
  };

  const handleMute = (trackId: string) => {
    setTracks(prev =>
      prev.map(t => (t.id === trackId ? { ...t, isMuted: !t.isMuted } : t))
    );
  };

  const handleSolo = (trackId: string) => {
    setTracks(prev =>
      prev.map(t => (t.id === trackId ? { ...t, isSolo: !t.isSolo } : t))
    );
  };

  const handlePresetSelect = (presetName: string) => {
    setActivePreset(presetName);
    if (presetName === 'Cyber Beat 01') {
      setTracks(INITIAL_TRACKS);
      setBpm(120.0);
    } else if (presetName === 'Future Trap 140') {
      setBpm(140.0);
      setTracks(prev =>
        prev.map(t => {
          if (t.soundType === 'kick') {
            return { ...t, steps: [true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false] };
          }
          if (t.soundType === 'snare') {
            return { ...t, steps: [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false] };
          }
          if (t.soundType === 'hihat') {
            return { ...t, steps: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true] };
          }
          return t;
        })
      );
    } else if (presetName === 'Deep House 124') {
      setBpm(124.0);
      setTracks(prev =>
        prev.map(t => {
          if (t.soundType === 'kick') {
            return { ...t, steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false] };
          }
          if (t.soundType === 'openhat') {
            return { ...t, steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false] };
          }
          if (t.soundType === 'clap') {
            return { ...t, steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false] };
          }
          return t;
        })
      );
    }
  };

  return (
    <div
      id="playbeat-sequencer-module"
      className={`w-full rounded-2xl bg-[#2D2B3D] border border-[#4A4666] shadow-2xl overflow-hidden text-white font-sans ${
        isCompact ? 'p-4' : 'p-6'
      }`}
    >
      {/* 1. Header Section: Audiomodern Logo ▲ + ● playbeat 4 + BPM + Transport Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#4A4666]/60">
        {/* Playbeat Logo & Audiomodern Peak */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#232131] border border-[#4A4666] flex items-center justify-center shadow-md">
            {/* White triangular peak icon ▲ */}
            <span className="text-white text-base font-black leading-none select-none">▲</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              {/* Orange-red circular element ● */}
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] shadow-[0_0_8px_#FF6B6B] animate-pulse inline-block" />
              <h3 className="text-lg font-black tracking-tight text-white uppercase">
                playbeat <span className="text-[#FF6B6B]">4</span>
              </h3>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#B8B5C7]">
              Audiomodern Creative Drum Machine & Rhythm Engine
            </p>
          </div>
        </div>

        {/* Central Transport & BPM Control Bar */}
        <div className="flex items-center gap-3 bg-[#232131] px-4 py-2 rounded-2xl border border-[#4A4666] shadow-inner">
          {/* BPM Display */}
          <div className="flex items-center gap-2 pr-3 border-r border-[#4A4666]">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-[#B8B5C7] tracking-wider">TEMPO</span>
              <span className="text-base font-black text-white font-mono">{bpm.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => setBpm(b => Math.min(220, b + 1))}
                className="p-1 rounded bg-[#353248] hover:bg-[#4A4666] text-[#B8B5C7] hover:text-white transition-colors"
                title="Increase BPM"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={() => setBpm(b => Math.max(60, b - 1))}
                className="p-1 rounded bg-[#353248] hover:bg-[#4A4666] text-[#B8B5C7] hover:text-white transition-colors"
                title="Decrease BPM"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Central Red Circular Play Button (Prominent Feature) */}
          <button
            id="playbeat-main-play-btn"
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 transform active:scale-95 shadow-xl ${
              isPlaying
                ? 'bg-[#FF6B6B] text-white ring-4 ring-[#FF6B6B]/40 shadow-[0_0_25px_#FF6B6B]'
                : 'bg-[#FF6B6B] hover:bg-[#ff5252] text-white shadow-[0_0_15px_rgba(255,107,107,0.4)]'
            }`}
            title={isPlaying ? 'Pause Sequence (Space)' : 'Start Sequencer'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white text-white" />
            ) : (
              <Play className="w-6 h-6 fill-white text-white ml-0.5" />
            )}
          </button>

          {/* Stop Button */}
          <button
            onClick={handleStop}
            className="p-2.5 rounded-xl bg-[#353248] hover:bg-[#4A4666] text-[#B8B5C7] hover:text-white transition-colors"
            title="Stop & Reset Cursor"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>

          {/* Record Button */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2.5 rounded-xl transition-colors ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-[#353248] hover:bg-[#4A4666] text-[#B8B5C7]'
            }`}
            title="Arm Recording"
          >
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500 block" />
          </button>

          {/* Smart AI Randomizer */}
          <button
            onClick={handleRandomizeRhythm}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#E84A8C] to-[#9B59B6] hover:brightness-110 text-white text-xs font-bold shadow-md shadow-[#E84A8C]/20 transition-all"
            title="Generate Smart Random Rhythms"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Smart Rhythms</span>
          </button>
        </div>

        {/* Presets & Settings */}
        <div className="flex items-center gap-2">
          {/* Preset Chips */}
          <div className="hidden lg:flex items-center gap-1 bg-[#232131] p-1 rounded-xl border border-[#4A4666]">
            {['Cyber Beat 01', 'Future Trap 140', 'Deep House 124'].map(p => (
              <button
                key={p}
                onClick={() => handlePresetSelect(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activePreset === p
                    ? 'bg-[#FF6B6B] text-white shadow-sm'
                    : 'text-[#B8B5C7] hover:text-white hover:bg-[#353248]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {onOpenFullStudio && (
            <button
              onClick={onOpenFullStudio}
              className="p-2 rounded-xl bg-[#353248] hover:bg-[#4A4666] text-[#B8B5C7] hover:text-white transition-colors"
              title="Expand Studio Canvas"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Step Indicator Header (1 to 16) */}
      <div className="pt-4 pb-2 grid grid-cols-[160px_1fr] gap-3 items-center">
        <div className="text-[10px] font-black uppercase text-[#B8B5C7] tracking-widest pl-2">
          8-TRACK ENGINE
        </div>
        <div className="grid grid-cols-16 gap-1 sm:gap-1.5 text-center">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`text-[9px] font-mono font-bold py-0.5 rounded transition-colors ${
                currentStep === i && isPlaying
                  ? 'bg-[#FF6B6B] text-white shadow-[0_0_8px_#FF6B6B]'
                  : i % 4 === 0
                  ? 'text-white bg-[#353248]/60'
                  : 'text-[#B8B5C7]'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Sequencer Grid: 8 Tracks with Color Palette */}
      <div className="space-y-2 mt-1">
        {tracks.map(track => {
          return (
            <div
              key={track.id}
              className={`grid grid-cols-[160px_1fr] gap-3 items-center p-2 rounded-xl border transition-all ${
                activeTrackId === track.id
                  ? 'bg-[#353248]/90 border-[#4A4666]'
                  : 'bg-[#232131]/60 border-transparent hover:border-[#4A4666]/40'
              }`}
            >
              {/* Track Left Info: Name, Color Pip, Mute/Solo */}
              <div className="flex items-center justify-between pr-2">
                <div
                  className="flex items-center gap-2 cursor-pointer truncate"
                  onClick={() => {
                    setActiveTrackId(track.id);
                    soundEngine.triggerSound(track.soundType, track.volume, track.pitch);
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: track.color }}
                  />
                  <span className="text-xs font-bold text-white truncate">{track.name}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-1">
                  <button
                    onClick={() => handleMute(track.id)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider uppercase transition-colors ${
                      track.isMuted
                        ? 'bg-rose-900/80 text-rose-300 border border-rose-600'
                        : 'bg-[#353248] text-[#B8B5C7] hover:text-white'
                    }`}
                    title="Mute Track"
                  >
                    M
                  </button>
                  <button
                    onClick={() => handleSolo(track.id)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider uppercase transition-colors ${
                      track.isSolo
                        ? 'bg-amber-500 text-slate-950 font-extrabold'
                        : 'bg-[#353248] text-[#B8B5C7] hover:text-white'
                    }`}
                    title="Solo Track"
                  >
                    S
                  </button>
                </div>
              </div>

              {/* 16 Step Grid for this track */}
              <div className="grid grid-cols-16 gap-1 sm:gap-1.5">
                {track.steps.map((isActive, stepIdx) => {
                  const isCurrent = currentStep === stepIdx && isPlaying;
                  return (
                    <button
                      key={stepIdx}
                      onClick={() => toggleStep(track.id, stepIdx)}
                      className={`h-9 rounded-lg relative overflow-hidden transition-all duration-100 transform active:scale-95 ${
                        isActive
                          ? 'shadow-md border border-white/20'
                          : 'bg-[#353248]/70 hover:bg-[#3E3B54] border border-[#4A4666]/30'
                      } ${isCurrent ? 'ring-2 ring-white shadow-lg' : ''}`}
                      style={{
                        backgroundColor: isActive ? track.color : undefined,
                      }}
                      title={`${track.name} - Step ${stepIdx + 1}`}
                    >
                      {/* Step inner highlight */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20" />
                      )}

                      {/* Velocity bar at bottom */}
                      {isActive && (
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-white/40"
                          style={{ height: `${track.velocity[stepIdx] * 100}%` }}
                        />
                      )}

                      {/* Beat division indicator dot on inactive 1/4 notes */}
                      {!isActive && stepIdx % 4 === 0 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B8B5C7]/40 mx-auto my-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Status Bar */}
      <div className="mt-5 pt-3 border-t border-[#4A4666]/60 flex flex-wrap items-center justify-between text-xs text-[#B8B5C7]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-white text-[11px]">Web Audio Synthesizer: 48kHz Ready</span>
          </div>
          <span className="hidden sm:inline text-[#4A4666]">|</span>
          <span className="hidden sm:inline text-[11px]">8 Polyphonic Channels • Real-time DSP</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePresetSelect('Cyber Beat 01')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#353248] hover:bg-[#4A4666] text-[#B8B5C7] hover:text-white transition-colors text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Pattern
          </button>
          <span className="px-2 py-0.5 rounded bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/40 font-mono text-[10px] font-bold">
            PLAYBEAT 4 CORE
          </span>
        </div>
      </div>
    </div>
  );
};
