/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, CheckCircle2 } from 'lucide-react';
import { ScriptBeat, generateSrtContent } from '../utils/script-rules';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  editionTitle: string;
  beats: ScriptBeat[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  editionTitle,
  beats
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawScriptText = beats
    .map(
      (b, i) =>
        `BEAT ${i + 1} (${b.timeRange}) [${b.narration.split(/\s+/).length} words]:\nNarration: "${b.narration}"\nSubtitles:\n- ${b.subtitleLines[0]}\n- ${b.subtitleLines[1]}\n`
    )
    .join('\n');

  const socialCaptionText = `Ready to experience Korea's coziest cultural tradition? ♨️
Hit a jjimjilbang with your friends: soak in mineral tubs, wear matching loungewear, crack sauna eggs, and sip ice-cold sikhye!

Save this for your first semester in Korea! 🇰🇷
#jjimjilbang #koreatravel #studyinkorea #koreanculture #seoullife #exchangestudent #koreanspa`;

  const srtContent = generateSrtContent(beats);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadSrt = () => {
    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jjimjilbang_15s_subtitles.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close export dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
            Production Export Suite
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            Export 15-Second Narration & Subtitles
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ready to record voiceover or import directly into Premiere, CapCut, DaVinci Resolve, or Final Cut Pro.
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-5">
          {/* Option 1: Formatted Script with Beats */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                Scriptwriter Narration & Subtitle Cards
              </span>
              <button
                onClick={() => handleCopy(rawScriptText, 'script')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedType === 'script' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-700 bg-white p-3 rounded-xl border border-slate-200 max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {rawScriptText}
            </pre>
          </div>

          {/* Option 2: SRT Subtitle File */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-amber-600" />
                Standard SubRip (.SRT) Timed Subtitles
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(srtContent, 'srt')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedType === 'srt' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SRT</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadSrt}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .SRT</span>
                </button>
              </div>
            </div>
            <pre className="text-xs font-mono text-slate-600 bg-white p-3 rounded-xl border border-slate-200 max-h-32 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {srtContent}
            </pre>
          </div>

          {/* Option 3: Social Media Caption */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">
                Instagram Reels / TikTok / YouTube Shorts Caption
              </span>
              <button
                onClick={() => handleCopy(socialCaptionText, 'caption')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedType === 'caption' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Caption</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 whitespace-pre-wrap">
              {socialCaptionText}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
