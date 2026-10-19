/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Check, Key, Shirt, Coffee, Moon, Users, ShieldAlert, Heart } from 'lucide-react';

export const StudentGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Entrance & Wristband Key',
      icon: Key,
      korean: 'Shinbaljang · 신발장 (Shoe Locker & Key)',
      summary: 'Store your shoes in the entryway locker. Your electronic wristband is your digital wallet for food, juice, and arcade games inside—you pay everything when exiting!',
      tip: 'Never lose your wristband key—keep it securely on your wrist or ankle.'
    },
    {
      num: '02',
      title: 'Gender-Separated Bath (Mokyoktang)',
      icon: Users,
      korean: 'Mokyoktang · 목욕탕 (Bath Area)',
      summary: 'Before entering any sauna, you head to the gender-separated bath area. Full nudity is standard and completely normal. Always shower thoroughly at a seated stall before entering the hot tubs!',
      tip: 'Do not put your hair or towel in the bathwater. Tie your hair up.'
    },
    {
      num: '03',
      title: 'Put On Matching Loungewear',
      icon: Shirt,
      korean: 'Jjimjil-bok · 찜질복 (Spa Uniform)',
      summary: 'Dry off and change into the oversized cotton T-shirt and shorts provided by the spa. Now you can enter the giant unisex communal hall where friends and families hang out together.',
      tip: 'These matching outfits make everyone equal—professors, students, and grandparents all wear the same comfy uniform!'
    },
    {
      num: '04',
      title: 'Themed Heated Kilns & Ice Rooms',
      icon: Sparkles,
      korean: 'Jjimjilbang · 찜질방 (Sauna Rooms)',
      summary: 'Wander between temperature-controlled rooms: Himalayan salt brick rooms (55°C), yellow clay kilns (65°C), pine charcoal rooms, and crisp sub-zero ice rooms to cool down.',
      tip: 'Take 10-15 minute sessions, then cool off in the ice room or main hall.'
    },
    {
      num: '05',
      title: 'The Iconic Jjimjilbang Feast',
      icon: Coffee,
      korean: 'Sikhye & Eggs · 식혜 & 맥반석 계란',
      summary: 'Hit the snack bar for slow-baked brown germanium eggs (nutty, smoky aroma) and an ice-cold sweet malted rice punch called Sikhye served in a tall cup with a straw.',
      tip: 'K-Drama tradition: crack the brown egg against your best friend’s forehead (gently!) for good luck.'
    },
    {
      num: '06',
      title: 'Overnight Sleep on Ondol Floors',
      icon: Moon,
      korean: 'Sumyeonsil & Ondol · 수면실 & 온돌 (Heated Floor)',
      summary: 'Grab a vinyl sleeping mat and wooden headrest block. Lie flat on the warm ondol radiant heated floor. Perfect for international students looking for a cheap, safe overnight spot after a late night.',
      tip: 'Keep voices to a whisper in sleeping zones. Quiet hours are strictly respected.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Intro Hero Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-6 rounded-3xl border border-amber-200/80">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md">
            First-Timer University Student Field Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            What is a Jjimjilbang? (찜질방 · Korean Bathhouse & Spa)
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Literally meaning <em>"heating room room,"</em> a Jjimjilbang is Korea’s beloved 24-hour communal spa and relaxation sanctuary.
            Unlike western day-spas, it is an accessible, community-centered third space where students, families, and friends spend entire afternoons or overnight hours soaking, sweating, snacking, and bonding together in total comfort.
          </p>
        </div>
      </div>

      {/* 6-Step Etiquette Journey */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Step-by-Step Spa Etiquette</h3>
            <p className="text-xs text-slate-500">Know exactly what to expect from check-in to check-out</p>
          </div>
          <span className="text-xs font-mono text-slate-400">6 Simple Steps</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = activeStep === idx;
            return (
              <div
                key={st.num}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {st.num}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{st.title}</h4>
                  <div className="text-[11px] font-mono text-amber-700/80 mb-2">{st.korean}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.summary}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-amber-700 shrink-0">Pro Tip:</span>
                  <span>{st.tip}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Yangmeori (Sheep-Head Towel) Interactive Mini-Feature */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>The Iconic K-Drama Trend</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            How to Make the "Yangmeori" (양머리) Sheep Towel Head
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Every foreign exchange student’s favorite photo-op! When you check in, you receive two small hand towels.
            Here is the classic 3-fold origami technique to wear the famous sheep-horns:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">Step 1</span>
              <h5 className="font-bold text-white text-sm mt-1">Fold Into Thirds</h5>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Lay the small towel flat horizontally. Fold the bottom third up, then the top third down, creating a long, narrow 3-layer strip.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">Step 2</span>
              <h5 className="font-bold text-white text-sm mt-1">Roll the Ends Outward</h5>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Starting from both open ends, roll the edges outward like rolling up your sleeves (around 3 to 4 tight rolls each side).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">Step 3</span>
              <h5 className="font-bold text-white text-sm mt-1">Open Center & Wear</h5>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Pry open the middle pocket between the two rolls, place it like a snug beanie on your head, and admire your cute sheep-horns!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Vocabulary Pill List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Essential Korean Vocabulary to Know
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Pronunciation and terms you'll hear and see at any Korean spa
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { kr: '찜질방', rom: 'Jjimjilbang', def: 'Heating room leisure spa' },
            { kr: '목욕탕', rom: 'Mokyoktang', def: 'Gender-separated bathhouse' },
            { kr: '식혜', rom: 'Sikhye', def: 'Chilled sweet fermented rice drink' },
            { kr: '맥반석 계란', rom: 'Maekbanseok Gyeran', def: 'Germanium stone roasted eggs' },
            { kr: '온돌', rom: 'Ondol', def: 'Underfloor radiant heating system' },
            { kr: '양머리', rom: 'Yangmeori', def: 'Sheep-head folded towel style' }
          ].map((term) => (
            <div key={term.kr} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-slate-900">{term.kr}</span>
                <span className="text-xs font-mono text-amber-700 font-semibold">{term.rom}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{term.def}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
