import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlaybeatSequencer } from '../components/PlaybeatSequencer';
import {
  Zap,
  Radio,
  Sliders,
  Sparkles,
  Download,
  Share2,
  Layers,
  ArrowLeft,
  Volume2,
  RefreshCw,
  Cpu,
  ShoppingBag,
} from 'lucide-react';

export const NodeStudioView: React.FC = () => {
  const { showToast, setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<'sequencer' | 'stems' | 'presets'>('sequencer');

  const presets = [
    {
      name: 'Cyberpunk Electro',
      bpm: 128,
      genre: 'Synthwave / Industrial',
      desc: 'Punchy 909 kicks, gated metallic snares, and rolling hi-hat rhythms.',
    },
    {
      name: 'Deep Tech Groove',
      bpm: 124,
      genre: 'Tech House',
      desc: 'Tight acoustic kicks, resonant claps, and syncopated shaker rolls.',
    },
    {
      name: '808 Trap Matrix',
      bpm: 140,
      genre: 'Modern Hip-Hop',
      desc: 'Booming sub-kicks, lightning triple hi-hats, and punchy rim-shots.',
    },
    {
      name: 'Lo-Fi Chill Hop',
      bpm: 85,
      genre: 'Lo-Fi / Downtempo',
      desc: 'Warm analog kicks, dusty brush snares, and relaxed swing groove.',
    },
    {
      name: 'UK Drill Precision',
      bpm: 142,
      genre: 'Drill / Grime',
      desc: 'Sliding 808 patterns, ghost snares, and rapid-fire percussion.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#2D2B3D] text-white py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Studio Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#4A4666]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveView('home')}
            className="p-2.5 rounded-xl bg-[#232131] hover:bg-[#353248] border border-[#4A4666] text-[#B8B5C7] hover:text-white transition-colors"
            title="Back to Store"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-white text-base">▲</span>
              <span className="text-[#FF6B6B] text-lg font-bold">●</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                playbeat 4
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] text-[10px] font-black uppercase tracking-wider border border-[#FF6B6B]/40">
                PRO STUDIO
              </span>
            </div>
            <p className="text-xs text-[#B8B5C7] mt-0.5">
              The Creative Drum & Polyrhythmic Algorithmic Beat Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-[#232131] p-1 rounded-xl border border-[#4A4666]">
            <button
              onClick={() => setActiveTab('sequencer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'sequencer'
                  ? 'bg-[#FF6B6B] text-white shadow-md'
                  : 'text-[#B8B5C7] hover:text-white'
              }`}
            >
              8-Track Grid
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'presets'
                  ? 'bg-[#FF6B6B] text-white shadow-md'
                  : 'text-[#B8B5C7] hover:text-white'
              }`}
            >
              Presets
            </button>
          </div>

          <button
            onClick={() => {
              showToast('Exported 8-track MIDI & WAV stems bundle!', 'success');
            }}
            className="px-4 py-2 bg-[#232131] hover:bg-[#353248] border border-[#4A4666] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#4ECDC4]" />
            Export Stems
          </button>

          <button
            onClick={() => setActiveView('shop')}
            className="px-4 py-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#FF6B6B]/20 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Shop Licenses
          </button>
        </div>
      </div>

      {/* Main Studio View Area */}
      <div className="max-w-7xl mx-auto space-y-8">
        {activeTab === 'sequencer' && (
          <PlaybeatSequencer />
        )}

        {activeTab === 'presets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Factory Sound Banks & Grooves</h2>
                <p className="text-xs text-[#B8B5C7]">Select a curated groove matrix to instantly load into the sequencer.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {presets.map((preset, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#232131] border border-[#4A4666] hover:border-[#FF6B6B]/60 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#4ECDC4]">{preset.genre}</span>
                    <span className="px-2 py-0.5 rounded bg-[#353248] text-xs font-mono text-[#FFE66D]">
                      {preset.bpm} BPM
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{preset.name}</h3>
                  <p className="text-xs text-[#B8B5C7] leading-relaxed">{preset.desc}</p>

                  <button
                    onClick={() => {
                      showToast(`Loaded ${preset.name} (${preset.bpm} BPM) into 8-track grid!`, 'success');
                      setActiveTab('sequencer');
                    }}
                    className="w-full py-2 bg-[#353248] hover:bg-[#FF6B6B] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Load Preset
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="p-5 rounded-2xl bg-[#232131] border border-[#4A4666] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#E84A8C]/20 border border-[#E84A8C]/40 flex items-center justify-center text-[#E84A8C]">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Algorithmic Variation Engine</h3>
            <p className="text-xs text-[#B8B5C7] leading-relaxed">
              Create infinitely evolving drum patterns with probability gates, velocity randomization, and micro-timing swing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#232131] border border-[#4A4666] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 flex items-center justify-center text-[#4ECDC4]">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">8-Track Independent Synthesis</h3>
            <p className="text-xs text-[#B8B5C7] leading-relaxed">
              Synthesizes real-time kicks, claps, snares, rimshots, shakers, open hats, closed hats, and percussions via Web Audio API.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#232131] border border-[#4A4666] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FFE66D]/20 border border-[#FFE66D]/40 flex items-center justify-center text-[#FFE66D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Seamless Store & Vault Sync</h3>
            <p className="text-xs text-[#B8B5C7] leading-relaxed">
              Unlocked software serial keys, license codes, and presets are saved instantly in your encrypted PlayBeat customer vault.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
