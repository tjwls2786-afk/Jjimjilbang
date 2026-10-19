/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  countWords,
  validateBeatWordCount,
  validateSubtitles,
  detectContractions,
  calculateWordsPerMinute,
  OFFICIAL_PRESETS
} from './script-rules.ts';

test('countWords handles punctuation and contractions correctly', () => {
  assert.equal(countWords("Tired after classes? Hit a jjimjilbang—it's Korea's ultimate relaxation spa."), 11);
  assert.equal(countWords(''), 0);
  assert.equal(countWords('   '), 0);
  assert.equal(countWords('One two three'), 3);
});

test('every beat in the Master Cut satisfies constraints (<= 12 words, <= 2 subtitle lines)', () => {
  const masterPreset = OFFICIAL_PRESETS.find(p => p.id === 'master-cut');
  assert.ok(masterPreset, 'Master preset must exist');

  assert.equal(masterPreset.beats.length, 3, 'Must have exactly 3 beats');

  masterPreset.beats.forEach((beat, idx) => {
    const wordVal = validateBeatWordCount(beat.narration, 12);
    assert.equal(
      wordVal.isValid,
      true,
      `Beat ${idx + 1} (${beat.timeRange}) exceeds 12 words! Count: ${wordVal.wordCount}`
    );
    assert.ok(
      wordVal.wordCount <= 12,
      `Beat ${idx + 1} word count should be <= 12, got ${wordVal.wordCount}`
    );

    const subVal = validateSubtitles(beat.subtitleLines);
    assert.equal(
      subVal.isValid,
      true,
      `Beat ${idx + 1} subtitles exceed 2 lines! Lines: ${subVal.lineCount}`
    );
    assert.ok(
      subVal.lineCount <= 2,
      `Beat ${idx + 1} subtitle lines must be <= 2, got ${subVal.lineCount}`
    );
  });
});

test('contractions are detected properly in master narration', () => {
  const masterPreset = OFFICIAL_PRESETS.find(p => p.id === 'master-cut')!;
  const allNarration = masterPreset.beats.map(b => b.narration).join(' ');
  const contractions = detectContractions(allNarration);
  
  assert.ok(contractions.includes("it's"), "Must include contraction 'it\'s'");
  assert.ok(contractions.includes("you'll"), "Must include contraction 'you\'ll'");
});

test('WPM rate calculation produces accurate cadence for 5s window', () => {
  // 10 words in 5 seconds = 120 words per minute (normal friendly speech rate)
  const wpm = calculateWordsPerMinute(10, 5);
  assert.equal(wpm, 120);
});
