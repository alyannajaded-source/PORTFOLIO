import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heading, Reveal, Tilt, Star } from './Common';
import { initialEducationData } from '../data/portfolioData';
import { EducationItem } from '../types';
import { MapPin, Calendar, Sparkles, Edit3, Check, RotateCcw, GraduationCap, BookOpen, Backpack, Pencil, ZoomIn, X, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EducationPhotoData {
  src: string;
  caption: string;
  subtitle: string;
  alt: string;
  yearTag: string;
  tapeTone: string;
  tapeRot: string;
  angle: number;
}

const educationPhotos: Record<string, EducationPhotoData> = {
  elem: {
    src: '/assets/aistudio/elemen_aad47768.jfif',
    caption: 'Classroom Days & Lunchtime',
    subtitle: 'Elementary school memories with classmates & teacher at wooden desks',
    alt: 'Elementary school classmates sitting together at classroom desks in Pio V. Corpus',
    yearTag: '2012–2018',
    tapeTone: 'bg-[#D4C04D]/90',
    tapeRot: '-3deg',
    angle: 2,
  },
  jhs: {
    src: '/assets/aistudio/hs_ce09ffbd.jfif',
    caption: 'Cataingan National High School Stage',
    subtitle: 'Moving up ceremony stage with honors, medals & graduation sashes',
    alt: 'Cataingan National High School ceremony stage celebration',
    yearTag: '2018–2022',
    tapeTone: 'bg-[#657733]/80',
    tapeRot: '3deg',
    angle: -2.5,
  },
  shs: {
    src: '/assets/aistudio/shs_190bc6d1.jfif',
    caption: '12 STEM UNO • Batch 2023–2024',
    subtitle: 'Senior high STEM family holding the class banner under sunny skies',
    alt: '12 STEM UNO classmates proudly holding their batch banner',
    yearTag: '2022–2024',
    tapeTone: 'bg-[#C46849]/80',
    tapeRot: '-2.5deg',
    angle: 2,
  },
  college: {
    src: '/assets/aistudio/collage_f214a78c.jfif',
    caption: 'University of Cebu • Friends & Cinema Days',
    subtitle: 'College adventures, student lanyards, cinema outings & shared laughs',
    alt: 'University of Cebu college classmates hanging out at the cinema',
    yearTag: '2024–Present',
    tapeTone: 'bg-[#D4C04D]/95',
    tapeRot: '3deg',
    angle: -2,
  },
};

export function EducationTimeline() {
  const [timeline, setTimeline] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem('alyanna_education_timeline');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return initialEducationData;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EducationItem[]>(timeline);
  const [activePhoto, setActivePhoto] = useState<EducationPhotoData | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('alyanna_education_timeline', JSON.stringify(timeline));
    } catch {
      // ignore
    }
  }, [timeline]);

  // Handle escape key to close active photo modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveEdits = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeline(editData);
    setIsEditing(false);
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#657733', '#D4C04D', '#ECF5E2'],
      });
    } catch {
      // ignore
    }
  };

  const handleResetDefaults = () => {
    setTimeline(initialEducationData);
    setEditData(initialEducationData);
    setIsEditing(false);
  };

  const handleFieldChange = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...editData];
    updated[index] = { ...updated[index], [field]: value };
    setEditData(updated);
  };

  // Render school-related hand-drawn icons
  const renderIcon = (type: EducationItem['iconType'], isCurrent?: boolean) => {
    switch (type) {
      case 'pencil':
        return <Pencil className="h-6 w-6 text-[#657733]" />;
      case 'backpack':
        return <Backpack className="h-6 w-6 text-[#291100]" />;
      case 'book':
        return <BookOpen className="h-6 w-6 text-[#C46849]" />;
      case 'graduation-cap':
        return <GraduationCap className={`h-7 w-7 ${isCurrent ? 'text-[#D4C04D] animate-bounce' : 'text-[#657733]'}`} />;
      default:
        return <BookOpen className="h-6 w-6 text-[#657733]" />;
    }
  };

  return (
    <section id="education" className="dotgrid py-28 relative">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <Heading kicker="page three" title="Academic journey" />

          {/* Edit Timeline Toggle Button */}
          <div className="mb-14 flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => {
                  setEditData(timeline);
                  setIsEditing(true);
                }}
                className="flex items-center gap-1.5 rounded-full paper px-4 py-2 text-xs font-semibold text-[#657733] border border-[#657733]/30 shadow-xs hover:bg-[#ECF5E2] transition-colors"
                title="Edit timeline years or institutions"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit Timeline Years</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-[#C46849] hover:bg-[#F4DCD1] transition-colors font-medium"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-full px-3 py-1.5 text-xs text-[#291100]/70 hover:bg-[#FAF8F2]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form Modal/Drawer if editing */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form
                onSubmit={handleSaveEdits}
                className="paper rounded-2xl p-6 sm:p-8 border-2 border-dashed border-[#657733] bg-[#FAF8F2] shadow-xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[#291100]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#D4C04D]" />
                    <h3 className="font-display text-xl text-[#291100]">
                      Update Timeline Years & Details
                    </h3>
                  </div>
                  <span className="font-hand text-lg text-[#657733]">changes save to your browser</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {editData.map((item, idx) => (
                    <div
                      key={item.id}
                      className="rounded-xl p-4 bg-white/90 border border-[#291100]/15 space-y-2 shadow-xs"
                    >
                      <p className="font-display text-base text-[#657733] flex items-center justify-between">
                        <span>{item.stage}</span>
                        {item.isCurrent && (
                          <span className="text-[10px] font-mono uppercase bg-[#657733] text-[#ECF5E2] px-2 py-0.5 rounded-full">
                            Current Stage
                          </span>
                        )}
                      </p>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#291100]/60">Years / Span</label>
                        <input
                          type="text"
                          value={item.years}
                          onChange={(e) => handleFieldChange(idx, 'years', e.target.value)}
                          className="w-full text-xs font-mono font-bold rounded-lg border border-[#291100]/20 px-2.5 py-1.5 focus:border-[#657733] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#291100]/60">Institution</label>
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(e) => handleFieldChange(idx, 'institution', e.target.value)}
                          className="w-full text-xs rounded-lg border border-[#291100]/20 px-2.5 py-1.5 focus:border-[#657733] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#291100]/60">Location</label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => handleFieldChange(idx, 'location', e.target.value)}
                          className="w-full text-xs rounded-lg border border-[#291100]/20 px-2.5 py-1.5 focus:border-[#657733] focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-full bg-[#657733] px-6 py-2.5 text-xs font-semibold text-[#ECF5E2] hover:bg-[#291100] transition-colors shadow-md"
                  >
                    <Check className="h-4 w-4" />
                    <span>Save Timeline Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrapbook Connected Timeline with Vacant Spaces populated by Polaroids */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Dashed Center Connector Line drawing down on scroll */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="origin-top absolute top-6 left-5 h-[calc(100%-48px)] border-l-2 border-dashed border-[#657733] md:left-1/2 md:-ml-[1px] pointer-events-none"
          />

          {timeline.map((item, i) => {
            const isOdd = i % 2 !== 0;
            const isCollege = item.isCurrent;
            const photo = educationPhotos[item.id];

            // Sub-component: The Educational Scrapbook Card
            const academicCard = (
              <Tilt
                rot={isCollege ? 0 : isOdd ? 1.5 : -1.5}
                className={`relative rounded-2xl p-6 sm:p-8 shadow-lift border transition-all ${
                  isCollege
                    ? 'bg-[#657733] text-[#ECF5E2] border-[#D4C04D] ring-2 ring-[#D4C04D]/50 shadow-2xl scale-[1.02]'
                    : `${item.tone} text-[#291100] border-[#291100]/10`
                }`}
              >
                {/* Washi tape on top for scrapbook feel */}
                <div className="absolute -top-3 left-8 z-10">
                  <div
                    className={`h-5 w-20 ${
                      isCollege ? 'bg-[#D4C04D]/90' : 'bg-[#FAF8F2]/90'
                    } border-l-2 border-r-2 border-dashed border-[#291100]/30 shadow-xs rotate-[-2deg]`}
                  />
                </div>

                {/* Header: Stage and Year */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isCollege ? 'text-[#D4C04D]' : 'text-[#657733]'}`}>
                      Step 0{i + 1}
                    </span>
                    <h4 className="font-display text-2xl sm:text-3xl leading-tight">
                      {item.stage}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs font-semibold px-2.5 py-1 rounded-full border border-current/20 bg-white/10 backdrop-blur-xs">
                    <Calendar className="h-3 w-3" />
                    <span>{item.years}</span>
                  </div>
                </div>

                {/* Institution & Location */}
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium">
                  <span className={`font-bold ${isCollege ? 'text-[#ECF5E2]' : 'text-[#291100]'}`}>
                    {item.institution}
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="flex items-center gap-1 text-xs opacity-80">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                </div>

                {/* Ongoing College Highlight Badge */}
                {isCollege && (
                  <div className="mt-4 rounded-xl bg-[#FAF8F2] p-4 text-[#291100] border border-[#D4C04D] shadow-inner">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#657733] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#657733]"></span>
                      </span>
                      <p className="font-display text-lg font-bold text-[#657733]">
                        Ongoing Academic Stage
                      </p>
                    </div>
                    <p className="font-hand text-xl font-bold text-[#291100] mt-1">
                      ✿ {item.currentNote || 'Currently a third-year college student'}
                    </p>
                    <p className="text-xs text-[#291100]/75 mt-1.5 font-sans leading-relaxed">
                      Actively pursuing undergraduate studies, expanding knowledge in computer skills, programming logic, and collaborative student initiatives.
                    </p>
                  </div>
                )}

                {/* Description for non-college cards */}
                {!isCollege && item.description && (
                  <p className="mt-3 text-sm opacity-80 leading-relaxed font-sans">
                    {item.description}
                  </p>
                )}
              </Tilt>
            );

            // Sub-component: The Polaroid Photo Card sitting in the vacant slot
            const polaroidCard = photo && (
              <Tilt
                rot={photo.angle}
                className="group relative cursor-pointer"
              >
                <div
                  onClick={() => setActivePhoto(photo)}
                  className="bg-[#FFFDF9] p-3 sm:p-4 pb-6 sm:pb-8 rounded-lg shadow-xl border border-[#291100]/15 relative transition-transform duration-300 group-hover:scale-[1.02]"
                >
                  {/* Washi tape pinned to the top of Polaroid */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`h-5 w-20 ${photo.tapeTone} border-l border-r border-dashed border-[#291100]/30 shadow-xs`}
                      style={{ transform: `rotate(${photo.tapeRot})` }}
                    />
                  </div>

                  {/* Polaroid Photo Image Frame */}
                  <div className="relative overflow-hidden rounded-sm bg-[#291100]/5 border border-[#291100]/10 aspect-4/3">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      style={{ filter: 'contrast(1.03) saturate(1.05) brightness(1.02)' }}
                      loading="lazy"
                    />

                    {/* Subtle gloss reflection overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20" />

                    {/* Quick view indicator on hover */}
                    <div className="absolute bottom-2 right-2 rounded-full bg-[#291100]/80 px-2.5 py-1 text-[11px] font-mono text-[#FAF8F2] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs flex items-center gap-1 shadow-md">
                      <ZoomIn className="h-3 w-3" />
                      <span>Enlarge</span>
                    </div>

                    {/* Vintage camera corner badge */}
                    <div className="absolute top-2 left-2 rounded-full bg-white/70 p-1 backdrop-blur-xs text-[#291100]/70 opacity-70">
                      <Camera className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Authentic Handwritten Polaroid Caption */}
                  <div className="mt-3 flex items-start justify-between gap-2 px-1">
                    <div className="min-w-0 flex-1">
                      <p className="font-hand text-xl sm:text-2xl font-bold text-[#291100] leading-tight truncate">
                        ✿ {photo.caption}
                      </p>
                      <p className="font-sans text-[11px] text-[#291100]/70 mt-0.5 line-clamp-1">
                        {photo.subtitle}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-[10px] font-bold uppercase bg-[#657733]/15 text-[#657733] px-2 py-0.5 rounded-full mt-1">
                      {photo.yearTag}
                    </span>
                  </div>
                </div>
              </Tilt>
            );

            return (
              <div
                key={item.id}
                className="relative mb-20 md:mb-28 pl-12 md:pl-0"
              >
                {/* Timeline Center Node Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                    delay: 0.2 + i * 0.12,
                  }}
                  className={`absolute top-6 left-0 md:left-1/2 md:-translate-x-1/2 grid h-10 w-10 place-items-center rounded-full border-2 border-[#291100] shadow-md z-20 ${
                    isCollege
                      ? 'bg-[#D4C04D] scale-110 ring-4 ring-[#657733]/30'
                      : 'bg-[#FAF8F2]'
                  }`}
                >
                  {renderIcon(item.iconType, isCollege)}
                </motion.div>

                {/* Alternating Layout: Card on one side, Polaroid in the vacant space on the other */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
                  {!isOdd ? (
                    <>
                      {/* Left Side: Academic Card */}
                      <motion.div
                        initial={{ opacity: 0, x: -45, y: 30, rotate: -2 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="order-1"
                      >
                        {academicCard}
                      </motion.div>

                      {/* Right Side: Polaroid occupying the vacant space */}
                      <motion.div
                        initial={{ opacity: 0, x: 45, y: 30, rotate: 4 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: photo?.angle || 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, delay: i * 0.12 + 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="order-2"
                      >
                        {polaroidCard}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Left Side: Polaroid occupying the vacant space */}
                      <motion.div
                        initial={{ opacity: 0, x: -45, y: 30, rotate: -4 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: photo?.angle || 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, delay: i * 0.12 + 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="order-2 md:order-1"
                      >
                        {polaroidCard}
                      </motion.div>

                      {/* Right Side: Academic Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 45, y: 30, rotate: 2 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="order-1 md:order-2"
                      >
                        {academicCard}
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Polaroid Lightbox / Zoom Modal */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#291100]/80 backdrop-blur-sm cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full bg-[#FFFDF9] rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-[#291100]/20 cursor-default"
              >
                {/* Washi tape topper */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className={`h-6 w-28 ${activePhoto.tapeTone} border-l border-r border-dashed border-[#291100]/30 shadow-sm rotate-[-1.5deg]`} />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-3 right-3 z-20 rounded-full bg-[#291100]/10 p-2 text-[#291100] hover:bg-[#291100] hover:text-[#FAF8F2] transition-colors"
                  title="Close (Esc)"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Enlarged High-Quality Photo */}
                <div className="overflow-hidden rounded-xl bg-black/5 border border-[#291100]/15 max-h-[70vh]">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    className="w-full h-auto max-h-[68vh] object-contain mx-auto"
                    style={{ filter: 'contrast(1.03) saturate(1.05) brightness(1.02)' }}
                  />
                </div>

                {/* Caption and Information Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#291100]/10 pt-3">
                  <div>
                    <h3 className="font-hand text-2xl sm:text-3xl font-bold text-[#291100]">
                      ✿ {activePhoto.caption}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#291100]/80 mt-0.5">
                      {activePhoto.subtitle}
                    </p>
                  </div>

                  <span className="font-mono text-xs font-bold uppercase bg-[#657733] text-[#ECF5E2] px-3 py-1 rounded-full shadow-xs">
                    {activePhoto.yearTag}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

