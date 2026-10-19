/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Heart, MessageCircle, Share2, Music } from 'lucide-react';
import { ScriptBeat, formatTime } from '../utils/script-rules';

interface ReelSimulatorProps {
  beats: ScriptBeat[];
  currentBeatIndex: number;
  onBeatChange: (index: number) => void;
}

export const ReelSimulator: React.FC<ReelSimulatorProps> = ({
  beats,
  currentBeatIndex,
  onBeatChange
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(14200);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Determine active beat from currentTime
  const activeBeatIdx = Math.min(2, Math.floor(currentTime / 5));
  const activeBeat = beats[activeBeatIdx] || beats[0];

  useEffect(() => {
    if (activeBeatIdx !== currentBeatIndex) {
      onBeatChange(activeBeatIdx);
    }
  }, [activeBeatIdx, currentBeatIndex, onBeatChange]);

  // Audio synthesis helper for synchronized voiceover
  const speakCurrentBeat = (beat: ScriptBeat) => {
    if (!isAudioEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(beat.narration);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // Main playback timer loop
  useEffect(() => {
    if (isPlaying) {
      const step = (timestamp: number) => {
        if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
        const delta = (timestamp - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = timestamp;

        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= 15) {
            // Loop or stop
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            return 15;
          }

          // Trigger speech on beat boundary
          const prevBeat = Math.floor(prev / 5);
          const nextBeat = Math.floor(next / 5);
          if (nextBeat !== prevBeat && nextBeat < beats.length) {
            speakCurrentBeat(beats[nextBeat]);
          }

          return next;
        });

        animationFrameRef.current = requestAnimationFrame(step);
      };

      animationFrameRef.current = requestAnimationFrame(step);
    } else {
      lastTimestampRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, isAudioEnabled, beats]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= 15) {
        setCurrentTime(0);
        speakCurrentBeat(beats[0]);
      } else {
        speakCurrentBeat(beats[activeBeatIdx]);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSeekBeat = (idx: number) => {
    const targetTime = idx * 5;
    setCurrentTime(targetTime);
    onBeatChange(idx);
    if (isPlaying) {
      speakCurrentBeat(beats[idx]);
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikeCount((c) => c - 1);
      setHasLiked(false);
    } else {
      setLikeCount((c) => c + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 9:16 Video Frame Container */}
      <div className="relative w-[320px] sm:w-[350px] h-[620px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 flex flex-col justify-between select-none">
        {/* Visual Backgrounds for 3 beats with smooth crossfade */}
        {beats.map((beat, idx) => {
          const isActive = activeBeatIdx === idx;
          return (
            <div
              key={beat.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <img
                src={beat.imagePath}
                alt={beat.visualFocus}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Cinematic Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40" />
            </div>
          );
        })}

        {/* Top Header Overlay */}
        <div className="relative z-10 p-4 flex items-center justify-between text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              {activeBeat.timeRange}
            </span>
            <span className="text-xs font-mono text-amber-300 font-semibold bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
              {formatTime(currentTime)} / 15.0s
            </span>
          </div>

          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors text-white border border-white/10 cursor-pointer"
            title={isAudioEnabled ? 'Mute AI voiceover' : 'Enable AI voiceover'}
            aria-label="Toggle voiceover narration"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-white/60" />}
          </button>
        </div>

        {/* Right Side Interaction Bar (Simulating Reels/TikTok engagement) */}
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 group cursor-pointer"
            aria-label="Like video"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              hasLiked ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
            }`}>
              <Heart className={`w-5 h-5 ${hasLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[10px] font-mono font-medium text-white shadow-sm">
              {(likeCount / 1000).toFixed(1)}k
            </span>
          </button>

          <div className="flex flex-col items-center gap-1">
            <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-medium text-white shadow-sm">342</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-medium text-white shadow-sm">1.8k</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white/40 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
            <Music className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>

        {/* Bottom Content & Subtitle Card Overlay */}
        <div className="relative z-10 p-4 pb-3 flex flex-col gap-3">
          {/* Subtitles Area (Strictly 2 lines per card - clean subtitles only) */}
          <div className="bg-slate-950/85 backdrop-blur-md rounded-xl px-3 py-2 border border-white/15 text-center shadow-lg max-w-[270px]">
            <p className="text-[11px] sm:text-xs font-bold text-white leading-snug drop-shadow-md whitespace-nowrap">
              {activeBeat.subtitleLines[0]}
            </p>
            {activeBeat.subtitleLines[1] && (
              <p className="text-[11px] sm:text-xs font-bold text-amber-200 leading-snug drop-shadow-md mt-0.5 whitespace-nowrap">
                {activeBeat.subtitleLines[1]}
              </p>
            )}
          </div>

          {/* Social Caption Details */}
          <div className="text-left text-white/90">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>@kculture.campus</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                Seoul Guide
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
              15-second survival guide to Korean Jjimjilbang for exchange students! ♨️ #SeoulStudy #Jjimjilbang
            </p>
          </div>

          {/* Segmented Timeline Scrub Bar (3x 5-second beats) */}
          <div className="flex gap-1.5 w-full pt-1">
            {[0, 1, 2].map((idx) => {
              const beatStart = idx * 5;
              const beatEnd = (idx + 1) * 5;
              let fillPct = 0;
              if (currentTime >= beatEnd) {
                fillPct = 100;
              } else if (currentTime > beatStart) {
                fillPct = ((currentTime - beatStart) / 5) * 100;
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSeekBeat(idx)}
                  className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all relative"
                >
                  <div
                    className="h-full bg-amber-400 transition-all duration-75 rounded-full"
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Deck below phone frame */}
      <div className="mt-4 flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={handleReset}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Restart video (0.0s)"
          aria-label="Restart video"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={handleTogglePlay}
          className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
          <span>{isPlaying ? 'Pause' : 'Play 15s Reel'}</span>
        </button>

        {/* Quick jump to specific beat buttons */}
        <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
          {beats.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => handleSeekBeat(idx)}
              className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                activeBeatIdx === idx
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {b.timeRange}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
