/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download } from 'lucide-react';

interface HeaderProps {
  activeTab: 'director' | 'beats' | 'guide';
  setActiveTab: (tab: 'director' | 'beats' | 'guide') => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenExport }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <a href="#top" className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
        <span>K-Relax Studio</span>
      </a>

      {/* Zone 2: 4-5 clean single-line text navigation links (Desktop) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('director')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'director' ? 'text-slate-900 font-semibold border-b-2 border-amber-600' : ''
          }`}
        >
          15s Reel Director
        </button>
        <button
          onClick={() => setActiveTab('beats')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'beats' ? 'text-slate-900 font-semibold border-b-2 border-amber-600' : ''
          }`}
        >
          Script & Subtitles
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'guide' ? 'text-slate-900 font-semibold border-b-2 border-amber-600' : ''
          }`}
        >
          Student Spa Guide
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenExport}
          className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Script</span>
        </button>
      </div>
    </header>
  );
};
