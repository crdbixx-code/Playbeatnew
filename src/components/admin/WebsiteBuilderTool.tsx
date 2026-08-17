import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layout,
  Layers,
  Palette,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  Smartphone,
  Monitor,
  Check,
  Type,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Globe,
  Sliders,
  ExternalLink,
} from 'lucide-react';

interface CustomSection {
  id: string;
  type: 'hero' | 'features' | 'banner' | 'promo' | 'faq' | 'contact_cta';
  title: string;
  subtitle: string;
  badge: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  buttonText: string;
  buttonLink: string;
  enabled: boolean;
}

export const WebsiteBuilderTool: React.FC = () => {
  const { settings, refreshData, showToast, setActiveView } = useApp();

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'branding' | 'sections' | 'colors' | 'banner'>('branding');

  // Branding & Typography State
  const [brandName, setBrandName] = useState('PLAYBEAT DIGITAL');
  const [tagline, setTagline] = useState('High-Performance Audio Sequencer & Digital License Vault');
  const [announcementText, setAnnouncementText] = useState(
    settings?.appearance?.announcementBar?.text || '⚡ FLASH SALE: Get 10% Off All PC Keys & Subscriptions — Code: PLAYBEAT10'
  );
  const [announcementEnabled, setAnnouncementEnabled] = useState(
    settings?.appearance?.announcementBar?.enabled ?? true
  );

  // Color Theme & Accents
  const [primaryAccent, setPrimaryAccent] = useState('#FF6B6B');
  const [secondaryAccent, setSecondaryAccent] = useState('#4ECDC4');
  const [tertiaryAccent, setTertiaryAccent] = useState('#FFE66D');
  const [surfaceColor, setSurfaceColor] = useState('#1E1C2B');
  const [cardColor, setCardColor] = useState('#2D2B3D');

  // Customizable Visual Page Sections
  const [sections, setSections] = useState<CustomSection[]>([
    {
      id: 'sec-hero',
      type: 'hero',
      title: 'Next-Generation Audio Plugins & Instant Digital Keys',
      subtitle: 'Verified lifetime licenses for PC gaming, operating systems, AI developer tokens & 4K smart projectors delivered within 0.8s.',
      badge: 'PRO PERFORMANCE SUITE',
      bgGradient: 'from-[#1E1C2B] via-[#2A283B] to-[#1F1D2E]',
      textColor: '#FFFFFF',
      accentColor: '#FF6B6B',
      buttonText: 'Shop Instant Keys',
      buttonLink: 'shop',
      enabled: true,
    },
    {
      id: 'sec-features',
      type: 'features',
      title: 'Engineered for Immediate Delivery & Rock-Solid Security',
      subtitle: 'Why 12,500+ developers, producers, and businesses trust PlayBeat Digital.',
      badge: 'CORE PILLARS',
      bgGradient: 'from-[#232131] to-[#1E1C2B]',
      textColor: '#FFFFFF',
      accentColor: '#4ECDC4',
      buttonText: 'Explore Features',
      buttonLink: 'about',
      enabled: true,
    },
    {
      id: 'sec-promo',
      type: 'promo',
      title: 'Need High-Yield Turnkey Software Solutions?',
      subtitle: 'Complete e-commerce platforms, AI token hubs, and boardroom projector systems with 100% escrow guarantee.',
      badge: 'B2B ENTERPRISE',
      bgGradient: 'from-[#2A283B] to-[#1F1D2E]',
      textColor: '#FFFFFF',
      accentColor: '#FFE66D',
      buttonText: 'View Turnkey Solutions',
      buttonLink: 'services',
      enabled: true,
    },
    {
      id: 'sec-contact',
      type: 'contact_cta',
      title: 'Have Questions? Contact Direct Engineering Support',
      subtitle: 'Reach our team directly via support@playbeat.digital or WhatsApp +923321029333 for instant assistance.',
      badge: '24/7 LIVE HELPDESK',
      bgGradient: 'from-[#1E1C2B] via-[#232131] to-[#1E1C2B]',
      textColor: '#FFFFFF',
      accentColor: '#25D366',
      buttonText: 'WhatsApp +923321029333',
      buttonLink: 'support',
      enabled: true,
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  // Section Reordering
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSections(updated);
  };

  const toggleSection = (id: string) => {
    setSections(sections.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const updateSection = (id: string, field: keyof CustomSection, value: any) => {
    setSections(sections.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleAddNewSection = () => {
    const newSec: CustomSection = {
      id: `sec-${Date.now()}`,
      type: 'banner',
      title: 'New Announcement Banner Section',
      subtitle: 'Describe the promotional offer or special collection here.',
      badge: 'LIMITED EDITION',
      bgGradient: 'from-[#232131] via-[#2A283B] to-[#1E1C2B]',
      textColor: '#FFFFFF',
      accentColor: '#4ECDC4',
      buttonText: 'Learn More',
      buttonLink: 'shop',
      enabled: true,
    };
    setSections([...sections, newSec]);
    showToast('New section block added!', 'success');
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    showToast('Section deleted', 'info');
  };

  const handleSaveWebsiteSettings = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appearance: {
            announcementBar: {
              enabled: announcementEnabled,
              text: announcementText,
              link: '/shop',
            },
            theme: {
              primaryAccent,
              secondaryAccent,
              tertiaryAccent,
              surfaceColor,
              cardColor,
            },
            brandInfo: {
              brandName,
              tagline,
            },
          },
        }),
      });

      if (res.ok) {
        await refreshData();
        showToast('Website layout & design settings published live! ⚡', 'success');
      } else {
        showToast('Failed to publish settings', 'error');
      }
    } catch {
      showToast('Error saving website configuration', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setBrandName('PLAYBEAT DIGITAL');
    setTagline('High-Performance Audio Sequencer & Digital License Vault');
    setAnnouncementText('⚡ FLASH SALE: Get 10% Off All PC Keys & Subscriptions — Code: PLAYBEAT10');
    setPrimaryAccent('#FF6B6B');
    setSecondaryAccent('#4ECDC4');
    setTertiaryAccent('#FFE66D');
    setSurfaceColor('#1E1C2B');
    setCardColor('#2D2B3D');
    showToast('Reset to default brand aesthetics', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 text-xs font-bold border border-purple-800 font-mono">
            <Layout className="w-3.5 h-3.5" />
            <span>Interactive Visual Website Builder</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2">Live Storefront & Layout Customizer</h2>
          <p className="text-xs text-slate-400 font-mono">
            Live-edit headers, color palettes, custom page blocks, and official contact banners.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <button
            onClick={handleSaveWebsiteSettings}
            disabled={isSaving}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Publishing Changes...' : 'Publish to Live Storefront'}
          </button>
        </div>
      </div>

      {/* Main Dual-Column Builder View: Controls (Left) + Interactive Live Canvas (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Builder Controls & Customizers (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Builder Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-2xl border border-slate-800">
            {[
              { id: 'branding', label: 'Branding & Meta', icon: Type },
              { id: 'colors', label: 'Color Themes', icon: Palette },
              { id: 'sections', label: `Page Blocks (${sections.length})`, icon: Layers },
              { id: 'banner', label: 'Announcement Bar', icon: Globe },
            ].map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    active
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: BRANDING & META */}
          {activeTab === 'branding' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Type className="w-4 h-4 text-purple-400" /> Brand Identity & Typography
              </h3>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Store Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Tagline / Mission</label>
                <textarea
                  rows={3}
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1">
                <span className="text-[11px] font-bold text-purple-300 block">Verified Domain:</span>
                <span className="text-xs text-white font-mono">playbeat.digital</span>
                <p className="text-[10px] text-slate-400">
                  Global CDN caching and automated SSL termination enabled on this route.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: COLOR THEMES */}
          {activeTab === 'colors' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#4ECDC4]" /> Theme Palettes & Accents
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryAccent }} />
                    Primary Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryAccent}
                      onChange={e => setPrimaryAccent(e.target.value)}
                      className="w-8 h-8 rounded bg-transparent cursor-pointer border border-slate-700"
                    />
                    <input
                      type="text"
                      value={primaryAccent}
                      onChange={e => setPrimaryAccent(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryAccent }} />
                    Secondary Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={secondaryAccent}
                      onChange={e => setSecondaryAccent(e.target.value)}
                      className="w-8 h-8 rounded bg-transparent cursor-pointer border border-slate-700"
                    />
                    <input
                      type="text"
                      value={secondaryAccent}
                      onChange={e => setSecondaryAccent(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tertiaryAccent }} />
                    Highlight Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tertiaryAccent}
                      onChange={e => setTertiaryAccent(e.target.value)}
                      className="w-8 h-8 rounded bg-transparent cursor-pointer border border-slate-700"
                    />
                    <input
                      type="text"
                      value={tertiaryAccent}
                      onChange={e => setTertiaryAccent(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: surfaceColor }} />
                    Surface Canvas
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={surfaceColor}
                      onChange={e => setSurfaceColor(e.target.value)}
                      className="w-8 h-8 rounded bg-transparent cursor-pointer border border-slate-700"
                    />
                    <input
                      type="text"
                      value={surfaceColor}
                      onChange={e => setSurfaceColor(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Preset Palette Chooser */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Palette Presets:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setPrimaryAccent('#FF6B6B');
                      setSecondaryAccent('#4ECDC4');
                      setTertiaryAccent('#FFE66D');
                      setSurfaceColor('#1E1C2B');
                    }}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-left text-[11px] text-white flex items-center justify-between"
                  >
                    <span>Audiomodern Neon</span>
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFE66D]" />
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setPrimaryAccent('#6366F1');
                      setSecondaryAccent('#06B6D4');
                      setTertiaryAccent('#10B981');
                      setSurfaceColor('#0F172A');
                    }}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-left text-[11px] text-white flex items-center justify-between"
                  >
                    <span>Deep Cyber Blue</span>
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAGE SECTIONS BUILDER */}
          {activeTab === 'sections' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" /> Modular Layout Blocks
                </h3>
                <button
                  onClick={handleAddNewSection}
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Block
                </button>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                      sec.enabled
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-950/40 border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSection(sec.id)}
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                            sec.enabled ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {sec.enabled ? <Check className="w-3 h-3" /> : null}
                        </button>
                        <span className="font-bold text-white uppercase text-[11px] tracking-wider">
                          {sec.type} Block
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveSection(idx, 'up')}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={idx === sections.length - 1}
                          onClick={() => moveSection(idx, 'down')}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteSection(sec.id)}
                          className="p-1 rounded bg-rose-950 text-rose-400 hover:bg-rose-900"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-slate-900">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-semibold">Heading Title</label>
                        <input
                          type="text"
                          value={sec.title}
                          onChange={e => updateSection(sec.id, 'title', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs mt-0.5"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-semibold">Subtext & Description</label>
                        <input
                          type="text"
                          value={sec.subtitle}
                          onChange={e => updateSection(sec.id, 'subtitle', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-xs mt-0.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-semibold">Badge Label</label>
                          <input
                            type="text"
                            value={sec.badge}
                            onChange={e => updateSection(sec.id, 'badge', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-semibold">Button Label</label>
                          <input
                            type="text"
                            value={sec.buttonText}
                            onChange={e => updateSection(sec.id, 'buttonText', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs mt-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TOP ANNOUNCEMENT BANNER */}
          {activeTab === 'banner' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#FFE66D]" /> Storewide Announcement Banner
              </h3>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Enable Announcement Ticker</span>
                  <span className="text-[11px] text-slate-400">Display marquee bar at the very top of all views</span>
                </div>
                <button
                  onClick={() => setAnnouncementEnabled(!announcementEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                    announcementEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      announcementEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Announcement Text Content</label>
                <textarea
                  rows={3}
                  value={announcementText}
                  onChange={e => setAnnouncementText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="⚡ PROMO: Enter discount or announcement copy..."
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-400 text-[11px]">
                <span className="font-bold text-slate-300">Supported Shortcodes:</span>
                <p className="font-mono text-cyan-400">PLAYBEAT10 • FASTDISPATCH • +923321029333</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Device Frame Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Live Store Canvas Preview</span>
            </div>

            {/* Viewport Toggle Switch */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold transition-all ${
                  previewDevice === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold transition-all ${
                  previewDevice === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
          </div>

          {/* Interactive Screen Canvas */}
          <div
            className={`mx-auto rounded-3xl border border-slate-700 bg-[#1E1C2B] overflow-hidden shadow-2xl transition-all duration-300 ${
              previewDevice === 'mobile' ? 'max-w-xs' : 'w-full'
            }`}
          >
            {/* Mock Browser Header */}
            <div className="bg-[#232131] px-4 py-2 border-b border-[#4A4666] flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-[#1E1C2B] text-slate-300 border border-[#4A4666] truncate max-w-[200px]">
                https://playbeat.digital
              </div>
              <span className="text-[9px] text-[#4ECDC4]">SSL 256-Bit</span>
            </div>

            {/* Announcement Top Bar in Preview */}
            {announcementEnabled && (
              <div className="bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] text-slate-950 font-black text-[10px] text-center py-1.5 px-3 uppercase tracking-wider">
                {announcementText}
              </div>
            )}

            {/* Mock Navigation Header */}
            <div className="px-4 py-3 bg-[#232131]/95 border-b border-[#4A4666] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-xs font-black">▲</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryAccent }} />
                <span className="text-xs font-black tracking-tight text-white uppercase">{brandName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1E1C2B] text-[#4ECDC4] border border-[#4A4666] font-mono">
                  support@playbeat.digital
                </span>
              </div>
            </div>

            {/* Dynamic Section Blocks Render */}
            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {sections
                .filter(s => s.enabled)
                .map(sec => (
                  <div
                    key={sec.id}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${sec.bgGradient} border border-[#4A4666] space-y-2.5 relative overflow-hidden text-left`}
                  >
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1E1C2B] text-[10px] font-mono font-bold border border-slate-700" style={{ color: sec.accentColor }}>
                      <Sparkles className="w-3 h-3" />
                      <span>{sec.badge}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-white leading-tight">
                      {sec.title}
                    </h4>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {sec.subtitle}
                    </p>

                    <button
                      onClick={() => setActiveView(sec.buttonLink as any)}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-slate-950 flex items-center gap-1 shadow-md hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: sec.accentColor }}
                    >
                      <span>{sec.buttonText}</span>
                    </button>
                  </div>
                ))}

              {/* Direct Support Notice in Preview */}
              <div className="p-3 rounded-xl bg-[#232131] border border-[#4A4666] flex items-center justify-between text-[11px] text-slate-300">
                <span>Official Contact:</span>
                <span className="text-[#25D366] font-mono font-bold">WhatsApp: +923321029333</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
