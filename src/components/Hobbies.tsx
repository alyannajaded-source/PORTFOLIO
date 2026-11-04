import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heading, Reveal, Tilt, Star } from './Common';
import { portfolioOwner } from '../data/portfolioData';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MoreHorizontal,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import artPalette from '../assets/art_palette.jpg';
import masbateLighthouse from '../assets/masbate_lighthouse.jpg';
import alyannaSmiling from '../assets/alyanna_smiling.jpg';
import alyannaPortrait from '../assets/alyanna_portrait.jpg';
import readingBooks from '../assets/reading_books.jpg';
import gamingRoblox from '../assets/gaming_roblox.jpg';
import musicSpotify from '../assets/music_spotify.jpg';

interface HobbyCard {
  id: string;
  category: 'all' | 'reading' | 'drawing' | 'gaming' | 'music';
  categoryLabel: string;
  title: string;
  headline: string;
  subheadline: string;
  badge: string;
  image: string;
  textColor: string;
  accentColor: string;
  likes: number;
  caption: string;
  tags: string[];
  stats: { label: string; value: string }[];
}

export function Hobbies() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'reading' | 'drawing' | 'gaming' | 'music'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>({});
  const [bookmarkedState, setBookmarkedState] = useState<Record<string, boolean>>({});

  const cards: HobbyCard[] = [
    {
      id: 'card-matcha-reads',
      category: 'reading',
      categoryLabel: 'Reading',
      title: 'CLASSIC READS & JOURNALING',
      headline: 'East of Eden & Jane Austen',
      subheadline: 'Annotating classic literature with handwritten notes & coffee',
      badge: 'Current Stack',
      image: readingBooks,
      textColor: 'text-[#FAF8F2]',
      accentColor: '#D4C04D',
      likes: 2480,
      caption: 'Curling up with East of Eden, The Picture of Dorian Gray, and Jane Austen. Highlighting favorite passages and journaling thoughts with pen and warm coffee.',
      tags: ['#classicnovels', '#eastofeden', '#bookworm', '#journaling', '#maryoliver'],
      stats: [
        { label: 'Top Read', value: 'East of Eden' },
        { label: 'Companion', value: 'Journal & Glasses' },
      ],
    },
    {
      id: 'card-juicy-drawing',
      category: 'drawing',
      categoryLabel: 'Drawing',
      title: 'CREATIVE PALETTE & DRAWING',
      headline: 'Oil Colors & Portrait Eye',
      subheadline: 'Hand-mixed greens, earthy tones & expressive painted studies',
      badge: 'Art Journal',
      image: artPalette,
      textColor: 'text-[#FAF8F2]',
      accentColor: '#D4C04D',
      likes: 3120,
      caption: 'Late night sketching and painting on my palette. Mixing custom greens and studying expressive features and eyes on toned canvas.',
      tags: ['#sketchbook', '#oilpalette', '#drawing', '#creativeflow'],
      stats: [
        { label: 'Medium', value: 'Pencil & Oil Paint' },
        { label: 'Style', value: 'Warm & Expressive' },
      ],
    },
    {
      id: 'card-cozy-gaming',
      category: 'gaming',
      categoryLabel: 'Playing Games',
      title: 'ROBLOX & COZY GAMES',
      headline: 'Brookhaven, 3008 & Worlds',
      subheadline: 'Exploring custom worlds, Brookhaven RP & hanging out with friends',
      badge: 'Playing Games',
      image: gamingRoblox,
      textColor: 'text-[#ECF5E2]',
      accentColor: '#D4C04D',
      likes: 2190,
      caption: 'After long university study sessions, diving into Roblox with friends—hanging out in Brookhaven RP, exploring 3008, and checking out new game modes.',
      tags: ['#roblox', '#brookhaven', '#cozygaming', '#chillvibes', '#relaxing'],
      stats: [
        { label: 'Platform', value: 'Roblox & Tablet' },
        { label: 'Top Worlds', value: 'Brookhaven & 3008' },
      ],
    },
    {
      id: 'card-lofi-beats',
      category: 'music',
      categoryLabel: 'Listening to Music',
      title: 'SPOTIFY LIKED SONGS',
      headline: 'Joji, Sufjan Stevens & More',
      subheadline: 'Curated playlists for study flow, acoustic nights & chill vibes',
      badge: 'Liked Songs',
      image: musicSpotify,
      textColor: 'text-[#ECF5E2]',
      accentColor: '#D4C04D',
      likes: 4210,
      caption: 'The background music guiding my assignments, reading hours, and sketching sessions. Featuring Joji, Sufjan Stevens, Noah Kahan, and Bruno Mars.',
      tags: ['#spotifyliked', '#joji', '#sufjanstevens', '#acoustic', '#studyplaylist'],
      stats: [
        { label: 'Playlist', value: 'Liked Songs' },
        { label: 'Favorites', value: 'Joji & Sufjan Stevens' },
      ],
    },
    {
      id: 'card-literature-notes',
      category: 'reading',
      categoryLabel: 'Reading',
      title: 'POETRY & CLASSIC ESSAYS',
      headline: 'Mary Oliver & Sylvia Plath',
      subheadline: 'Annotating pages with handwritten margin notes and sticky tabs',
      badge: 'Book Log',
      image: readingBooks,
      textColor: 'text-[#FAF8F2]',
      accentColor: '#D4C04D',
      likes: 1850,
      caption: 'Reflecting on poetry collections like Mary Oliver’s Devotions. Deeply engaging with words that bring calm, beauty, and mindful clarity.',
      tags: ['#maryoliver', '#annotatedbooks', '#readingjournal', '#classicliterature'],
      stats: [
        { label: 'Favorite Habit', value: 'Handwritten Margin Notes' },
        { label: 'Reading Goal', value: 'Mindful Reading' },
      ],
    },
    {
      id: 'card-nature-moments',
      category: 'drawing',
      categoryLabel: 'Drawing',
      title: 'BOTANICAL & NATURE',
      headline: 'Leaves, Flowers & Light',
      subheadline: 'Studies of sunlight filtering through branches in Masbate',
      badge: 'Pencil Studies',
      image: masbateLighthouse,
      textColor: 'text-[#FAF8F2]',
      accentColor: '#D4C04D',
      likes: 2790,
      caption: 'Inspired by the historic lighthouse and ocean breeze of Pio V. Corpus, Masbate. Nature is the best art teacher.',
      tags: ['#botanicalart', '#masbate', '#naturedrawing', '#warmth'],
      stats: [
        { label: 'Inspiration', value: 'Poblacion, Masbate' },
        { label: 'Art Style', value: 'Organic & Gentle' },
      ],
    },
  ];

  const filteredCards = selectedFilter === 'all'
    ? cards
    : cards.filter((c) => c.category === selectedFilter);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleLike = (cardId: string, initialLikes: number) => {
    const current = likesState[cardId] || { count: initialLikes, liked: false };
    const newLiked = !current.liked;
    const newCount = newLiked ? current.count + 1 : current.count - 1;

    setLikesState({
      ...likesState,
      [cardId]: { count: newCount, liked: newLiked },
    });

    if (newLiked) {
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.65 },
          colors: ['#E11D48', '#D4C04D', '#657733'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleToggleBookmark = (cardId: string) => {
    setBookmarkedState({
      ...bookmarkedState,
      [cardId]: !bookmarkedState[cardId],
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];
  const activeLikes = likesState[activeCard.id]?.count ?? activeCard.likes;
  const isLiked = likesState[activeCard.id]?.liked ?? false;
  const isBookmarked = bookmarkedState[activeCard.id] ?? false;

  return (
    <section
      id="hobbies"
      className="py-24 relative overflow-hidden bg-white bg-[radial-gradient(ellipse_at_center,_rgba(215,227,164,0.32)_0%,_rgba(244,220,209,0.18)_35%,_#ffffff_72%)] text-[#291100] border-y border-[#291100]/10"
    >
      {/* Subtle center background gradient bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,_rgba(215,227,164,0.38)_0%,_rgba(212,192,77,0.15)_38%,_transparent_70%)] pointer-events-none blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#657733] bg-[#ECF5E2] px-3 py-1 rounded-full border border-[#657733]/25">
                Interactive Showcase
              </span>
              <span className="font-hand text-xl text-[#657733]">page three</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-[#291100] tracking-tight">
              Things I love
            </h2>
            <p className="mt-2 text-sm text-[#291100]/70 font-sans max-w-md">
              A dynamic visual showcase of the books, sketches, cozy games, and melodies that bring me joy.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all' as const, label: 'All Favorites' },
              { id: 'reading' as const, label: 'Reading' },
              { id: 'drawing' as const, label: 'Drawing' },
              { id: 'gaming' as const, label: 'Playing Games' },
              { id: 'music' as const, label: 'Listening to Music' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-[#657733] text-[#ECF5E2] shadow-md scale-105 font-bold'
                    : 'bg-[#FAF8F2] text-[#291100]/80 hover:bg-[#ECF5E2] border border-[#291100]/15'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Concept Mockup Stage: Horizontal Conveyor with Centered Instagram Frame */}
        <div className="relative my-8">
          <div className="flex items-center justify-center relative min-h-[580px] sm:min-h-[640px]">
            {/* Left Peeking Card (Real photograph without emojis!) */}
            {filteredCards.length > 1 && (
              <motion.div
                onClick={handlePrev}
                className="hidden md:block absolute left-4 lg:left-12 z-10 w-[240px] lg:w-[280px] aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-all -rotate-6 scale-90 border border-[#291100]/15 shadow-xl bg-white group"
                whileHover={{ scale: 0.94, rotate: -4 }}
              >
                {(() => {
                  const prevCard = filteredCards[(currentIndex - 1 + filteredCards.length) % filteredCards.length];
                  return (
                    <div className="relative h-full w-full overflow-hidden select-none">
                      <img
                        src={prevCard.image}
                        alt={prevCard.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 p-5 flex flex-col justify-between text-white">
                        <span className="font-mono text-[10px] font-bold uppercase text-white/95 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full w-max border border-white/20">
                          {prevCard.categoryLabel}
                        </span>
                        <div className="text-center my-auto px-2">
                          <p className="font-mono text-[11px] uppercase tracking-widest text-[#D4C04D] font-bold">
                            {prevCard.badge}
                          </p>
                          <h4 className="font-display text-xl text-white mt-1 leading-tight drop-shadow-md">
                            {prevCard.title}
                          </h4>
                        </div>
                        <p className="font-hand text-sm text-[#D4C04D] text-center font-bold">click to slide ←</p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Centered Instagram Post Mockup Card */}
            <motion.div
              layout
              className="relative z-30 w-full max-w-[360px] sm:max-w-[400px] rounded-3xl bg-white text-[#291100] shadow-[0_20px_50px_-15px_rgba(41,17,0,0.22)] border border-[#291100]/15 overflow-hidden"
            >
              {/* Instagram Card Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#291100]/10 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full p-[2px] bg-gradient-to-tr from-[#657733] via-[#D4C04D] to-[#657733]">
                      <img
                        src={alyannaSmiling}
                        alt="Alyanna Jade"
                        className="h-full w-full rounded-full object-cover border border-white"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-display text-sm font-bold tracking-tight text-[#291100]">
                        alyannajade
                      </span>
                      <span className="text-[10px] text-blue-500 font-bold" title="Verified Creator">●</span>
                    </div>
                    <p className="text-[10px] text-[#291100]/60 font-mono leading-none mt-0.5">
                      Pio V. Corpus, Masbate · UC
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-mono text-[10px] bg-[#ECF5E2] text-[#657733] font-bold px-2 py-0.5 rounded-full">
                    {activeCard.categoryLabel}
                  </span>
                  <button className="p-1 text-[#291100]/60 hover:text-[#291100]" aria-label="More options">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Instagram Card Visual Display (Real photography, NO emojis!) */}
              <div className="relative aspect-[4/4.8] w-full overflow-hidden bg-[#FAF8F2]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative h-full w-full"
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={activeCard.image}
                        alt={activeCard.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15" />
                    </div>

                    {/* Overlay Typography without emojis */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white select-none">
                      <div className="flex items-start justify-between">
                        <span className="rounded-full bg-black/45 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase border border-white/20">
                          {activeCard.badge}
                        </span>
                        <span className="font-mono text-[11px] text-white/80 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full uppercase tracking-widest">
                          {activeCard.categoryLabel}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="font-mono text-xs uppercase tracking-widest text-[#D4C04D] font-bold">
                          {activeCard.title}
                        </p>
                        <h3 className="font-display text-2xl sm:text-3xl leading-tight drop-shadow-md">
                          {activeCard.headline}
                        </h3>
                        <p className="text-xs text-white/85 font-sans leading-snug pt-1">
                          {activeCard.subheadline}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left / Right Carousel Arrow Overlays on the Card */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white grid place-items-center hover:bg-black/70 transition-all border border-white/20 shadow-md"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white grid place-items-center hover:bg-black/70 transition-all border border-white/20 shadow-md"
                  aria-label="Next card"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Instagram Action Bar */}
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(activeCard.id, activeCard.likes)}
                      className="group flex items-center transition-transform active:scale-125"
                      aria-label="Like post"
                    >
                      <Heart
                        className={`h-6 w-6 transition-colors ${
                          isLiked
                            ? 'fill-[#E11D48] text-[#E11D48]'
                            : 'text-[#291100] group-hover:text-[#E11D48]'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => handleLike(activeCard.id, activeCard.likes)}
                      className="text-[#291100] hover:text-[#657733] transition-colors"
                      aria-label="Comment"
                    >
                      <MessageCircle className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        confetti({ particleCount: 20, spread: 50 });
                      }}
                      className="text-[#291100] hover:text-[#657733] transition-colors"
                      aria-label="Share"
                    >
                      <Send className="h-5 w-5 -rotate-12" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleToggleBookmark(activeCard.id)}
                    className="text-[#291100] hover:text-[#657733] transition-colors"
                    aria-label="Bookmark"
                  >
                    <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-[#291100]' : ''}`} />
                  </button>
                </div>

                {/* Likes Count */}
                <p className="font-display text-sm font-bold text-[#291100]">
                  {activeLikes.toLocaleString()} likes
                </p>

                {/* Caption & Tags */}
                <div className="mt-1 text-xs text-[#291100]/85 font-sans leading-relaxed">
                  <span className="font-bold mr-1 text-[#291100]">alyannajade</span>
                  <span>{activeCard.caption}</span>
                </div>

                <div className="mt-1.5 flex flex-wrap gap-1 text-[11px] font-mono text-[#657733]">
                  {activeCard.tags.map((t) => (
                    <span key={t} className="hover:underline cursor-pointer">{t}</span>
                  ))}
                </div>

                {/* Pagination Dots */}
                <div className="mt-3 pt-3 border-t border-[#291100]/10 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {filteredCards.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentIndex(dotIdx)}
                        className={`h-1.5 rounded-full transition-all ${
                          currentIndex === dotIdx ? 'w-6 bg-[#657733]' : 'w-1.5 bg-[#291100]/25'
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-[10px] text-[#291100]/50 font-bold">
                    Slide {currentIndex + 1} of {filteredCards.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Peeking Card (Real photograph without emojis!) */}
            {filteredCards.length > 1 && (
              <motion.div
                onClick={handleNext}
                className="hidden md:block absolute right-4 lg:right-12 z-10 w-[240px] lg:w-[280px] aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-all rotate-6 scale-90 border border-[#291100]/15 shadow-xl bg-white group"
                whileHover={{ scale: 0.94, rotate: 4 }}
              >
                {(() => {
                  const nextCard = filteredCards[(currentIndex + 1) % filteredCards.length];
                  return (
                    <div className="relative h-full w-full overflow-hidden select-none">
                      <img
                        src={nextCard.image}
                        alt={nextCard.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 p-5 flex flex-col justify-between text-white">
                        <span className="font-mono text-[10px] font-bold uppercase text-white/95 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full w-max border border-white/20">
                          {nextCard.categoryLabel}
                        </span>
                        <div className="text-center my-auto px-2">
                          <p className="font-mono text-[11px] uppercase tracking-widest text-[#D4C04D] font-bold">
                            {nextCard.badge}
                          </p>
                          <h4 className="font-display text-xl text-white mt-1 leading-tight drop-shadow-md">
                            {nextCard.title}
                          </h4>
                        </div>
                        <p className="font-hand text-sm text-[#D4C04D] text-center font-bold">click to slide →</p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>

          {/* Bottom helper note */}
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono text-[#291100]/60">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 hover:text-[#657733] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span>•</span>
            <span className="font-hand text-base text-[#657733] font-bold">
              tap arrows or side cards to slide through things i love ✿
            </span>
            <span>•</span>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 hover:text-[#657733] transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
