/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Volume2, CheckCircle2, AlertCircle, Sparkles, Video, Mic, Copy, Check } from 'lucide-react';
import { ScriptBeat, validateBeatWordCount, detectContractions } from '../utils/script-rules';

interface ScriptBeatCardProps {
  beat: ScriptBeat;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateBeat?: (updated: ScriptBeat) => void;
  isEditable?: boolean;
}

export const ScriptBeatCard: React.FC<ScriptBeatCardProps> = ({
  beat,
  index,
  isSelected,
  onSelect,
  onUpdateBeat,
  isEditable = false
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const wordValidation = validateBeatWordCount(beat.narration, 12);
  const contractions = detectContractions(beat.narration);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(beat.narration);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `[${beat.timeRange}]\nNarration: "${beat.narration}"\nSubtitles:\n${beat.subtitleLines.join('\n')}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
        isSelected
          ? 'bg-amber-50/40 border-amber-500/80 shadow-md ring-2 ring-amber-500/20'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-slate-900 text-white font-mono">
            {beat.timeRange}
          </span>
          <span className="text-xs font-medium text-slate-500">
            Beat {index + 1} of 3
          </span>
        </div>

        {/* Word count check against constraint (max 12 words) */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
              wordValidation.isValid
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {wordValidation.isValid ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            )}
            <span className="font-mono font-bold">{wordValidation.wordCount}</span>
            <span>/ 12 words</span>
          </div>

          <button
            onClick={handleSpeak}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Listen to beat narration"
            aria-label="Play narration sample"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-600 animate-pulse' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Copy beat script"
            aria-label="Copy beat script"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Spoken Narration Block */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-amber-600" />
          <span>Narration (Spoken English)</span>
        </div>
        {isEditable && onUpdateBeat ? (
          <textarea
            value={beat.narration}
            onChange={(e) => {
              const newNarration = e.target.value;
              onUpdateBeat({
                ...beat,
                narration: newNarration
              });
            }}
            rows={2}
            className="w-full text-base font-semibold text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        ) : (
          <p className="text-base font-semibold text-slate-900 leading-relaxed">
            "{beat.narration}"
          </p>
        )}

        {/* Contraction highlights */}
        {contractions.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Friendly contractions used:</span>
            <div className="flex gap-1">
              {contractions.map((c) => (
                <span
                  key={c}
                  className="font-mono font-medium text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtitles Preview Card (Two lines per card constraint) */}
      <div className="mb-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
          <span>SUBTITLES (CARD {index + 1} · MAX 2 LINES)</span>
          <span className="text-[10px] text-slate-400 font-mono">
            {beat.subtitleLines.filter(Boolean).length}/2 lines
          </span>
        </div>
        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-center font-bold text-xs tracking-wide shadow-inner">
          <div className="leading-snug">{beat.subtitleLines[0]}</div>
          {beat.subtitleLines[1] && (
            <div className="text-amber-300 mt-1 leading-snug">{beat.subtitleLines[1]}</div>
          )}
        </div>
      </div>

      {/* Production & Director Context */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div>
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Video className="w-3 h-3 text-slate-400" /> Visual Shot:
          </span>
          <p className="text-slate-500 mt-0.5 leading-normal">{beat.visualFocus}</p>
        </div>
        <div>
          <span className="font-semibold text-slate-700">Director Cue:</span>
          <p className="text-slate-500 mt-0.5 leading-normal">{beat.directorNotes}</p>
        </div>
      </div>

      {beat.pronunciationNotes && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-amber-800 bg-amber-50/60 px-2.5 py-1.5 rounded-lg flex items-center gap-2">
          <span className="font-bold">Pronunciation:</span>
          <span className="font-mono text-slate-700">{beat.pronunciationNotes}</span>
        </div>
      )}
    </div>
  );
};
