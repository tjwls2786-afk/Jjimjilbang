/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScriptBeat {
  id: string;
  timeRange: '0–5s' | '5–10s' | '10–15s';
  startSec: number;
  endSec: number;
  narration: string;
  subtitleLines: [string, string];
  visualFocus: string;
  directorNotes: string;
  pronunciationNotes?: string;
  imagePath: string;
}

export interface ScriptEdition {
  id: string;
  title: string;
  badge: string;
  description: string;
  beats: ScriptBeat[];
}

export const OFFICIAL_PRESETS: ScriptEdition[] = [
  {
    id: 'master-cut',
    title: 'Master Official Reel',
    badge: 'Primary Submission',
    description: 'Energetic, friendly first-timer welcome for international college students exploring Korea.',
    beats: [
      {
        id: 'beat-1',
        timeRange: '0–5s',
        startSec: 0,
        endSec: 5,
        narration: "Tired after classes? Hit a jjimjilbang—it's Korea's top spa!",
        subtitleLines: [
          'Tired after classes?',
          "Hit a jjimjilbang—it's Korea's top spa!"
        ],
        visualFocus: 'Wide pan of stunning warm wooden atrium & students entering peaceful ondol hall',
        directorNotes: 'Hook the viewer immediately with college relatable fatigue; punchy, welcoming delivery.',
        pronunciationNotes: 'jjimjilbang = [jeem-jeel-bahng]',
        imagePath: '/src/assets/images/jjimjilbang_hall_1792390239488.jpg'
      },
      {
        id: 'beat-2',
        timeRange: '5–10s',
        startSec: 5,
        endSec: 10,
        narration: 'Slip into cozy loungewear, soak together, and unwind with friends.',
        subtitleLines: [
          'Slip into cozy loungewear,',
          'soak together, and unwind with friends.'
        ],
        visualFocus: 'Friends in matching cotton uniforms and sheep-towel hats laughing in Himalayan salt room',
        directorNotes: 'Warm communal feeling, emphasizing low-stress shared bonding with classmates.',
        pronunciationNotes: 'yangmeori = [yahng-muh-ree] (sheep head towel)',
        imagePath: '/src/assets/images/jjimjilbang_friends_1792390240547.jpg'
      },
      {
        id: 'beat-3',
        timeRange: '10–15s',
        startSec: 10,
        endSec: 15,
        narration: "You'll crack baked eggs, sip sikhye, and recharge on heated floors!",
        subtitleLines: [
          "You'll crack baked eggs, sip sikhye,",
          'and recharge on heated floors!'
        ],
        visualFocus: 'Crisp close-up of roasted brown eggs cracking, frosty sweet sikhye drink, and peaceful rest',
        directorNotes: 'Satisfying foodie conclusion; highlight the iconic snacks and overnight comfort.',
        pronunciationNotes: 'sikhye = [sheek-hye] (sweet malted rice beverage)',
        imagePath: '/src/assets/images/jjimjilbang_treats_1792390239883.jpg'
      }
    ]
  },
  {
    id: 'budget-study-break',
    title: 'Study Break & Budget Haven',
    badge: 'Student Budget Focus',
    description: 'Highlights late-night recharge after exam marathons and budget-friendly overnight stays.',
    beats: [
      {
        id: 'beat-1',
        timeRange: '0–5s',
        startSec: 0,
        endSec: 5,
        narration: "Stressed from studying? You'll love jjimjilbang, Korea's coziest retreat.",
        subtitleLines: [
          'Stressed from studying?',
          "You'll love jjimjilbang, Korea's retreat."
        ],
        visualFocus: 'Exhausted student sighing, transitioning into the tranquil warm cedar sauna air',
        directorNotes: 'Speak directly to midterms anxiety, offering immediate relief.',
        pronunciationNotes: 'ondol = [on-dol] (Korean underfloor radiant heating)',
        imagePath: '/src/assets/images/jjimjilbang_hall_1792390239488.jpg'
      },
      {
        id: 'beat-2',
        timeRange: '5–10s',
        startSec: 5,
        endSec: 10,
        narration: 'Throw on matching loungewear, hit warm tubs, and chill with classmates.',
        subtitleLines: [
          'Throw on matching loungewear,',
          'hit warm tubs, and chill with classmates.'
        ],
        visualFocus: 'Group of classmates relaxing side-by-side in mineral hot springs and clay saunas',
        directorNotes: 'Upbeat and friendly; shows university social bonding.',
        pronunciationNotes: 'jjimjil-bok = [jeem-jeel-bohk] (cotton spa loungewear set)',
        imagePath: '/src/assets/images/jjimjilbang_friends_1792390240547.jpg'
      },
      {
        id: 'beat-3',
        timeRange: '10–15s',
        startSec: 10,
        endSec: 15,
        narration: 'Grab iced sikhye, roast sauna eggs, and sleep overnight for cheap!',
        subtitleLines: [
          'Grab iced sikhye, roast sauna eggs,',
          'and sleep overnight for cheap!'
        ],
        visualFocus: 'Cracking warm eggs, drinking frosty sikhye with straws, cozying into private sleeping cubbies',
        directorNotes: 'End on an empowering student tip: overnight stay costs only 12,000–18,000 KRW.',
        pronunciationNotes: 'maekbanseok = [mek-bahn-suk] (germanium baked brown eggs)',
        imagePath: '/src/assets/images/jjimjilbang_treats_1792390239883.jpg'
      }
    ]
  },
  {
    id: 'first-timer-etiquette',
    title: 'First-Timer Rituals & Etiquette',
    badge: 'Cultural Immersion',
    description: 'Demystifies the locker keys, bathhouse nude etiquette, and iconic sheep head towel.',
    beats: [
      {
        id: 'beat-1',
        timeRange: '0–5s',
        startSec: 0,
        endSec: 5,
        narration: "Visiting Korea? Don't miss a jjimjilbang—it's a massive spa!",
        subtitleLines: [
          'Visiting Korea?',
          "Don't miss a jjimjilbang—it's a massive spa!"
        ],
        visualFocus: 'Quick welcoming snapshot of reception desk, shoe locker key, and entryway',
        directorNotes: 'Clear, reassuring tone to eliminate first-timer hesitation.',
        pronunciationNotes: 'mokyoktang = [mohk-yohk-tahng] (the bath area)',
        imagePath: '/src/assets/images/jjimjilbang_hall_1792390239488.jpg'
      },
      {
        id: 'beat-2',
        timeRange: '5–10s',
        startSec: 5,
        endSec: 10,
        narration: 'Fold cute towel sheep-horns, try hot saunas, and bond with friends.',
        subtitleLines: [
          'Fold cute towel sheep-horns,',
          'try hot saunas, and bond with friends.'
        ],
        visualFocus: 'Step-by-step rolling of the towel into sheep ears and wearing it with pride',
        directorNotes: 'Fun and playful cultural icon that international students love.',
        pronunciationNotes: 'yangmeori = [yahng-muh-ree]',
        imagePath: '/src/assets/images/jjimjilbang_friends_1792390240547.jpg'
      },
      {
        id: 'beat-3',
        timeRange: '10–15s',
        startSec: 10,
        endSec: 15,
        narration: "You'll feast on brown eggs, drink sikhye, and melt on ondol floors.",
        subtitleLines: [
          "You'll feast on brown eggs, drink sikhye,",
          'and melt on ondol floors.'
        ],
        visualFocus: 'Cracking brown egg on friend\'s head (the drama tradition!) and peaceful deep sleep',
        directorNotes: 'Heartwarming, culturally immersive closing note.',
        pronunciationNotes: 'sikhye = [sheek-hye]',
        imagePath: '/src/assets/images/jjimjilbang_treats_1792390239883.jpg'
      }
    ]
  }
];

/**
 * Counts words strictly, splitting on whitespace and ignoring pure punctuation.
 */
export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  // Normalize dashes/hyphens between words to avoid accidental fusion or miscounting
  const cleaned = text
    .replace(/[—–]/g, ' ')
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words.length;
}

/**
 * Validates whether a beat meets the maximum 12 words constraint.
 */
export function validateBeatWordCount(narration: string, maxWords: number = 12): {
  isValid: boolean;
  wordCount: number;
  remainingWords: number;
} {
  const wordCount = countWords(narration);
  return {
    isValid: wordCount <= maxWords,
    wordCount,
    remainingWords: maxWords - wordCount
  };
}

/**
 * Validates that subtitles have at most 2 lines per card.
 */
export function validateSubtitles(lines: string[]): {
  isValid: boolean;
  lineCount: number;
} {
  const lineCount = lines.filter((l) => l.trim().length > 0).length;
  return {
    isValid: lineCount <= 2,
    lineCount
  };
}

/**
 * Detects friendly conversational contractions in text.
 */
export function detectContractions(text: string): string[] {
  const contractionRegex = /\b[a-zA-Z]+(?:'[a-zA-Z]+|’[a-zA-Z]+)\b/g;
  const matches = text.match(contractionRegex) || [];
  return Array.from(new Set(matches.map((m) => m.toLowerCase())));
}

/**
 * Computes words per minute delivery rate for a 5-second beat.
 */
export function calculateWordsPerMinute(wordCount: number, durationSec: number = 5): number {
  if (durationSec <= 0) return 0;
  return Math.round((wordCount / durationSec) * 60);
}

/**
 * Formats seconds into MM:SS.S display.
 */
export function formatTime(seconds: number): string {
  const clamped = Math.max(0, Math.min(15, seconds));
  const s = Math.floor(clamped);
  const ms = Math.floor((clamped - s) * 10);
  return `${s < 10 ? '0' : ''}${s}.${ms}s`;
}

/**
 * Exports script to SubRip Subtitle (.srt) format.
 */
export function generateSrtContent(beats: ScriptBeat[]): string {
  return beats
    .map((beat, index) => {
      const startMs = formatSrtTimestamp(beat.startSec);
      const endMs = formatSrtTimestamp(beat.endSec);
      const text = beat.subtitleLines.filter(Boolean).join('\n');
      return `${index + 1}\n${startMs} --> ${endMs}\n${text}\n`;
    })
    .join('\n');
}

function formatSrtTimestamp(totalSec: number): string {
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = Math.floor(totalSec % 60);
  const ms = Math.floor((totalSec % 1) * 1000);
  const pad = (n: number, w: number = 2) => String(n).padStart(w, '0');
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},${pad(ms, 3)}`;
}
