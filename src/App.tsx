/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Nav } from './components/Nav';
import { Cover } from './components/Cover';
import { About } from './components/About';
import { EducationTimeline } from './components/EducationTimeline';
import { Hobbies } from './components/Hobbies';
import { Artworks } from './components/Artworks';
import { MiniGames } from './components/MiniGames';
import { Skills } from './components/Skills';
import { InteractiveCorkboard } from './components/InteractiveCorkboard';
import { Contact } from './components/Contact';
import { Ending } from './components/Ending';
import { ResumeModal } from './components/ResumeModal';
import { StickerDrop } from './components/StickerDrop';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main id="top" className="min-h-screen bg-[#FAF8F2] text-[#291100] selection:bg-[#D4C04D] selection:text-[#291100] relative">
      {/* Floating Scrapbook Navigation */}
      <Nav onOpenResume={() => setIsResumeOpen(true)} />

      {/* Hero Cover: Fanned Interactive Deck with Alyanna's Cards */}
      <Cover />

      {/* Page One: About & Personal Information */}
      <About />

      {/* Page Two: Chronological Educational Background & Timeline */}
      <EducationTimeline />

      {/* Page Three: Things I Love — Instagram Card Carousel with subtle center gradient & real photos */}
      <Hobbies />

      {/* Page Four: My Artworks — Automatically Moving Image Carousel with Smooth Fade & Larger View Popup */}
      <Artworks />

      {/* Page Five: Alyanna's Secret Vault — 5 Levels of Mini-Games Unlocking Secret Facts & Hand-Drawn Polaroids */}
      <MiniGames />

      {/* Page Six: Core Skills & Preserved Technical Toolbox */}
      <Skills />

      {/* Page Six: Interactive Corkboard & Guestbook */}
      <InteractiveCorkboard />

      {/* Page Seven: Postcard Contact & Coordinates */}
      <Contact />

      {/* The Last Page Ending */}
      <Ending />

      {/* One-Page Typeset Academic Profile & Summary Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Interactive Stamp & Sticker Drawer */}
      <StickerDrop />
    </main>
  );
}
