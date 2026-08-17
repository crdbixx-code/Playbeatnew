// AudioModern Playbeat 4 Web Audio Synthesis & Rhythm Engine

export interface TrackPattern {
  id: string;
  name: string;
  soundType: 'kick' | 'snare' | 'hihat' | 'openhat' | 'clap' | 'tom' | 'bass' | 'glitch';
  color: string; // #E84A8C, #4ECDC4, #FFE66D, #45B7D1, #9B59B6, #FF6B6B
  steps: boolean[]; // 16 steps
  velocity: number[]; // 0.0 to 1.0
  pitch: number; // semitones (-12 to +12)
  volume: number; // 0 to 1
  isMuted: boolean;
  isSolo: boolean;
}

export const INITIAL_TRACKS: TrackPattern[] = [
  {
    id: 'track-kick',
    name: 'Kick (909 Punch)',
    soundType: 'kick',
    color: '#E84A8C', // Pink/Magenta
    steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    velocity: [1, 0.7, 0.7, 0.7, 0.9, 0.7, 0.7, 0.7, 1, 0.7, 0.7, 0.7, 0.9, 0.7, 0.7, 0.7],
    pitch: 0,
    volume: 0.9,
    isMuted: false,
    isSolo: false,
  },
  {
    id: 'track-snare',
    name: 'Snare (Snappy Crisp)',
    soundType: 'snare',
    color: '#4ECDC4', // Green/Mint
    steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    velocity: [0.7, 0.7, 0.7, 0.7, 1, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 1, 0.7, 0.7, 0.7],
    pitch: 0,
    volume: 0.85,
    isMuted: false,
    isSolo: false,
  },
  {
    id: 'track-hihat',
    name: 'Hi-Hat (16th Pulse)',
    soundType: 'hihat',
    color: '#FFE66D', // Yellow/Gold
    steps: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    velocity: [0.9, 0.4, 0.7, 0.4, 0.9, 0.4, 0.7, 0.4, 0.9, 0.4, 0.7, 0.4, 0.9, 0.4, 0.7, 0.5],
    pitch: 0,
    volume: 0.7,
    isMuted: false,
    isSolo: false,
  },
  {
    id: 'track-openhat',
    name: 'Open Hat (Sizzle)',
    soundType: 'openhat',
    color: '#45B7D1', // Blue/Sky
    steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
    velocity: [0.6, 0.6, 0.85, 0.6, 0.6, 0.6, 0.85, 0.6, 0.6, 0.6, 0.85, 0.6, 0.6, 0.6, 0.9, 0.6],
    pitch: 0,
    volume: 0.75,
    isMuted: false,
    isSolo: false,
  },
  {
    id: 'track-clap',
    name: 'Clap (Stereo Spread)',
    soundType: 'clap',
    color: '#9B59B6', // Purple/Violet
    steps: [false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false],
    velocity: [0.6, 0.6, 0.6, 0.6, 0.9, 0.6, 0.6, 0.75, 0.6, 0.6, 0.6, 0.6, 0.95, 0.6, 0.6, 0.6],
    pitch: 0,
    volume: 0.8,
    isMuted: false,
    isSolo: false,
  },
  {
    id: 'track-tom',
    name: 'Tom (Analog Tuned)',
    soundType: 'tom',
    color: '#FF6B6B', // Red/Orange UI Accent
    steps: [false, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false],
    velocity: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.85, 0.7, 0.7, 0.9, 0.7, 0.7],
    pitch: 2,
    volume: 0.8,
    isMuted: false,
    isSolo: false,
  },
  {
    id: 'track-bass',
    name: 'Synth Bass (Sub Groove)',
    soundType: 'bass',
    color: '#4ECDC4', // Green/Mint
    steps: [true, false, false, true, false, false, true, false, false, true, false, false, true, false, true, false],
    velocity: [0.9, 0.5, 0.5, 0.8, 0.5, 0.5, 0.85, 0.5, 0.5, 0.9, 0.5, 0.5, 0.8, 0.5, 0.85, 0.5],
    pitch: -5,
    volume: 0.85,
    isMuted: false,
    isSolo: false,
  },
  {
    id: 'track-glitch',
    name: 'Glitch FX (Digital Beat)',
    soundType: 'glitch',
    color: '#FFE66D', // Yellow/Gold
    steps: [false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true],
    velocity: [0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.85, 0.5, 0.5, 0.5, 0.95],
    pitch: 4,
    volume: 0.7,
    isMuted: false,
    isSolo: false,
  },
];

class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public triggerSound(type: string, velocity: number = 1, pitch: number = 0) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const pitchMultiplier = Math.pow(2, pitch / 12);

      switch (type) {
        case 'kick': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';

          const startFreq = 160 * pitchMultiplier;
          const endFreq = 38 * pitchMultiplier;

          osc.frequency.setValueAtTime(startFreq, now);
          osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.09);

          gain.gain.setValueAtTime(1.1 * velocity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.36);
          break;
        }

        case 'snare': {
          // Noise buffer
          const bufferSize = ctx.sampleRate * 0.2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.value = 1000 * pitchMultiplier;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.8 * velocity, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

          noise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(ctx.destination);

          // Tone
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(185 * pitchMultiplier, now);
          oscGain.gain.setValueAtTime(0.6 * velocity, now);
          oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

          osc.connect(oscGain);
          oscGain.connect(ctx.destination);

          noise.start(now);
          osc.start(now);
          noise.stop(now + 0.21);
          osc.stop(now + 0.13);
          break;
        }

        case 'hihat': {
          const bufferSize = ctx.sampleRate * 0.05;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 7500 * pitchMultiplier;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.6 * velocity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          noise.start(now);
          noise.stop(now + 0.07);
          break;
        }

        case 'openhat': {
          const bufferSize = ctx.sampleRate * 0.35;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.value = 6500 * pitchMultiplier;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.7 * velocity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          noise.start(now);
          noise.stop(now + 0.33);
          break;
        }

        case 'clap': {
          const bufferSize = ctx.sampleRate * 0.25;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1400 * pitchMultiplier;
          filter.Q.value = 3;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.8 * velocity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          noise.start(now);
          noise.stop(now + 0.23);
          break;
        }

        case 'tom': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(140 * pitchMultiplier, now);
          osc.frequency.exponentialRampToValueAtTime(65 * pitchMultiplier, now + 0.15);

          gain.gain.setValueAtTime(0.8 * velocity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.26);
          break;
        }

        case 'bass': {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(65 * pitchMultiplier, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, now);
          filter.frequency.exponentialRampToValueAtTime(120, now + 0.2);

          gain.gain.setValueAtTime(0.7 * velocity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.25);
          break;
        }

        case 'glitch': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(880 * pitchMultiplier, now);
          osc.frequency.setValueAtTime(1760 * pitchMultiplier, now + 0.03);
          osc.frequency.setValueAtTime(440 * pitchMultiplier, now + 0.06);

          gain.gain.setValueAtTime(0.5 * velocity, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.11);
          break;
        }
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }
}

export const soundEngine = new SoundEngine();
