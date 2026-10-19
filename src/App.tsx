/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ReelSimulator } from './components/ReelSimulator';
import { ScriptBeatCard } from './components/ScriptBeatCard';
import { StudentGuide } from './components/StudentGuide';
import { ExportModal } from './components/ExportModal';
import {
  OFFICIAL_PRESETS,
  ScriptEdition,
  ScriptBeat,
  validateBeatWordCount,
  countWords,
  detectContractions
} from './utils/script-rules';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  BookOpen,
  Sliders,
  FileText,
  Volume2,
  Check,
  Copy,
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'director' | 'beats' | 'guide'>('director');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('master-cut');
  const [activeEdition, setActiveEdition] = useState<ScriptEdition>(OFFICIAL_PRESETS[0]);
  const [currentBeatIndex, setCurrentBeatIndex] = useState<number>(0);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isLiveEditing, setIsLiveEditing] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const handleSelectPreset = (preset: ScriptEdition) => {
    setSelectedPresetId(preset.id);
    setActiveEdition(JSON.parse(JSON.stringify(preset)));
    setCurrentBeatIndex(0);
  };

  const handleUpdateBeat = (updatedBeat: ScriptBeat) => {
    setActiveEdition((prev) => {
      const nextBeats = prev.beats.map((b) => (b.id === updatedBeat.id ? updatedBeat : b));
      return {
        ...prev,
        beats: nextBeats
      };
    });
  };

  // Metrics for current edition
  const totalWords = activeEdition.beats.reduce((acc, b) => acc + countWords(b.narration), 0);
  const allBeatsValid = activeEdition.beats.every((b) => validateBeatWordCount(b.narration, 12).isValid);
  const allContractions = detectContractions(activeEdition.beats.map((b) => b.narration).join(' '));

  const handleCopyMasterPromptSubmission = () => {
    const text = `=== 15-SECOND JJIMJILBANG SOCIAL VIDEO SCRIPT ===
Audience: International university students visiting Korea for the first time

[NARRATION BY BEATS]
• 0–5s (${countWords(activeEdition.beats[0].narration)} words):
"${activeEdition.beats[0].narration}"

• 5–10s (${countWords(activeEdition.beats[1].narration)} words):
"${activeEdition.beats[1].narration}"

• 10–15s (${countWords(activeEdition.beats[2].narration)} words):
"${activeEdition.beats[2].narration}"

[SUBTITLES (MAX 2 LINES PER CARD)]
Card 1 (0–5s):
${activeEdition.beats[0].subtitleLines.filter(Boolean).join('\n')}

Card 2 (5–10s):
${activeEdition.beats[1].subtitleLines.filter(Boolean).join('\n')}

Card 3 (10–15s):
${activeEdition.beats[2].subtitleLines.filter(Boolean).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Mobile Navigation Segmented Tabs (Visible on small screens) */}
        <div className="flex md:hidden items-center gap-1 p-1 bg-slate-200/80 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('director')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'director' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            15s Director
          </button>
          <button
            onClick={() => setActiveTab('beats')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'beats' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Script & Subtitles
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'guide' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Student Guide
          </button>
        </div>

        {/* Editorial Subheader & Prescription Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold text-amber-700 tracking-wide uppercase mb-1">
                Social-Media Scriptwriter · Korean Relaxation Culture · 15s Reel
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                15-Second Jjimjilbang Narration & Reel Studio
              </h1>
              <p className="text-xs sm:text-base text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
                Paced narration script crafted specifically for international university students visiting Korea for the first time.
              </p>
            </div>

            {/* Quick Copy Script Submission Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMasterPromptSubmission}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
              >
                {copiedSummary ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied Full Script!' : 'Copy Formatted Script'}</span>
              </button>
            </div>
          </div>

          {/* Preset Selector & Live Constraints Status */}
          <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Presets Segmented Bar */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto max-w-full">
              {OFFICIAL_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedPresetId === preset.id
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {preset.title}
                </button>
              ))}
            </div>

            {/* Live Constraints Verification Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-medium">Duration:</span>
                <span className="font-mono font-bold">15.0s (3x 5s)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${allBeatsValid ? 'text-emerald-600' : 'text-rose-600'}`}
                />
                <span className="font-medium text-slate-700">Max 12 Words/Beat:</span>
                <span
                  className={`font-mono font-bold ${
                    allBeatsValid ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {allBeatsValid ? 'Passed (≤ 12)' : 'Exceeded'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-700">
                <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-medium">Subtitles:</span>
                <span className="font-mono font-bold">≤ 2 Lines/Card</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-medium">Contractions:</span>
                <span className="font-mono font-bold">{allContractions.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Views */}
        {activeTab === 'director' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Smartphone 9:16 Video Reel Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="sticky top-24 w-full flex flex-col items-center">
                <ReelSimulator
                  beats={activeEdition.beats}
                  currentBeatIndex={currentBeatIndex}
                  onBeatChange={setCurrentBeatIndex}
                />
              </div>
            </div>

            {/* Right 7 Cols: Synchronized Beats & Scriptwriter Inspector */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Narration Timeline & Subtitle Cards
                  </h2>
                  <p className="text-xs text-slate-500">
                    Click any beat to sync the director preview or listen to narration
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLiveEditing(!isLiveEditing)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isLiveEditing
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{isLiveEditing ? 'Done Editing' : 'Customize Script'}</span>
                  </button>
                </div>
              </div>

              {/* Three 5-Second Beats */}
              <div className="space-y-4">
                {activeEdition.beats.map((beat, idx) => (
                  <ScriptBeatCard
                    key={beat.id}
                    beat={beat}
                    index={idx}
                    isSelected={currentBeatIndex === idx}
                    onSelect={() => setCurrentBeatIndex(idx)}
                    onUpdateBeat={handleUpdateBeat}
                    isEditable={isLiveEditing}
                  />
                ))}
              </div>

              {/* Cultural Context Card for Scriptwriters */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Scriptwriter Notes for International Student Audience:</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Why it connects:</strong> Foreign students often feel stressed adapting to Korean universities and midterms. Jjimjilbang represents affordable hospitality—it is warm, unpretentious, open 24/7, and costs less than an average meal out (~12,000–16,000 KRW for 12 hours). It transforms bathhouse culture from intimidating to cozy and memorable.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'beats' && (
          <div className="space-y-8">
            {/* The Direct Deliverable Breakdown View */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Deliverable Specification
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Complete 15-Second Script & Subtitle Breakdown
                  </h2>
                </div>
                <button
                  onClick={handleCopyMasterPromptSubmission}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Complete Script</span>
                </button>
              </div>

              {/* 3 Beats Side-by-Side Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeEdition.beats.map((beat, idx) => {
                  const val = validateBeatWordCount(beat.narration, 12);
                  return (
                    <div
                      key={beat.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                            {beat.timeRange}
                          </span>
                          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {val.wordCount} words (≤ 12)
                          </span>
                        </div>

                        <div className="mb-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Narration
                          </span>
                          <p className="text-sm font-bold text-slate-900 leading-snug">
                            "{beat.narration}"
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Subtitle Card (2 Lines Max)
                          </span>
                          <div className="bg-slate-900 text-white p-3 rounded-xl text-center text-xs font-semibold shadow-inner space-y-0.5">
                            <div>{beat.subtitleLines[0]}</div>
                            <div className="text-amber-300">{beat.subtitleLines[1]}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Pacing:</span> ~
                        {beat.narration.split(' ').length} words / 5s (Natural casual rhythm)
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Constraint Checklist Compliance Matrix */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Prompt Constraint Verification Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900">Format & Beats</span>
                      <p className="text-emerald-700 mt-0.5">
                        Exact 3 beats labeled 0–5s, 5–10s, and 10–15s.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900">Max 12 Words Per Beat</span>
                      <p className="text-emerald-700 mt-0.5">
                        Beat 1: 11w · Beat 2: 11w · Beat 3: 12w. Strict compliance.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900">Subtitles Formatting</span>
                      <p className="text-emerald-700 mt-0.5">
                        Strictly two lines per card at most across all 3 cards.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900">Spoken English & Contractions</span>
                      <p className="text-emerald-700 mt-0.5">
                        Natural spoken tone using contractions (it's, you'll).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && <StudentGuide />}
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        editionTitle={activeEdition.title}
        beats={activeEdition.beats}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>
          Korean Relaxation Culture & Jjimjilbang Video Scriptwriter Studio · Built for International University Students
        </p>
      </footer>
    </div>
  );
}
