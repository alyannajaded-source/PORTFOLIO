import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Palette,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Authentic original artworks created by Alyanna Jade P. Dagohoy
import art1Cats from '../assets/artworks/art1_cats.jpg';
import art2DualVisage from '../assets/artworks/art2_dual_visage.jpg';
import art3IntimateStudy from '../assets/artworks/art3_intimate_study.jpg';
import art4Shepherd from '../assets/artworks/art4_shepherd.jpg';
import art5Pearls from '../assets/artworks/art5_pearls.jpg';
import art6MelancholyBlue from '../assets/artworks/art6_melancholy_blue.jpg';

interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: string;
  image: string;
  isLandscape?: boolean;
  aspect: string;
  modalAspect: string;
  description: string;
  badge: string;
  tapeTone?: string;
}

export function Artworks() {
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const artworks: Artwork[] = [
    {
      id: 'art-1',
      title: 'Orange Tabby Pastel Study',
      medium: 'Oil Pastel on Spiral Paper',
      year: '2025',
      image: art1Cats,
      isLandscape: false,
      aspect: 'aspect-[4/5]',
      modalAspect: 'aspect-[3/4]',
      badge: 'Sketchbook Study',
      description:
        'Expressive feline character portraits rendered with vibrant Arte & Cor oil pastels in a spiral sketchbook. Features warm ochre, sienna, and ginger fur markings, piercing emerald-green eyes, and tactile pastel crayon marks.',
      tapeTone: 'bg-[#D7E3A4]/90',
    },
    {
      id: 'art-2',
      title: 'Whispers in Azure & Floral Bloom',
      medium: 'Oil Pastel on Open Spread',
      year: '2025',
      image: art2DualVisage,
      isLandscape: true,
      aspect: 'aspect-[16/9]',
      modalAspect: 'aspect-[16/10]',
      badge: 'Landscape Spread',
      description:
        'A dynamic horizontal dual-page sketchbook spread capturing flowing cerulean and turquoise locks intertwined with lavender blossoms. Features an introspective portrait beside an abstract golden ocular study and flying flora.',
      tapeTone: 'bg-[#D4C04D]/90',
    },
    {
      id: 'art-3',
      title: 'Tender Embrace & Gentle Hands',
      medium: 'Acrylic & Mixed Media on Board',
      year: '2025',
      image: art3IntimateStudy,
      isLandscape: true,
      aspect: 'aspect-[4/3]',
      modalAspect: 'aspect-[4/3]',
      badge: 'Landscape Painting',
      description:
        'An evocative horizontal composition depicting two figures face-to-face in intimate stillness. Luminous hands tenderly cradle their temples and hair against a deep, textured atmospheric ground.',
      tapeTone: 'bg-[#F4DCD1]/90',
    },
    {
      id: 'art-4',
      title: 'The Young Shepherd in the Hills',
      medium: 'Watercolor & Ink on Paper',
      year: '2024',
      image: art4Shepherd,
      isLandscape: false,
      aspect: 'aspect-[4/5]',
      modalAspect: 'aspect-[3/4]',
      badge: 'Watercolor Narrative',
      description:
        'A pastoral watercolor illustration portraying a young wanderer in traditional tunic and traveling pouch with wooden crook, watching over grazing sheep under a sunlit sky overlooking winding hills and verdant valleys.',
      tapeTone: 'bg-[#657733]/90 text-white',
    },
    {
      id: 'art-5',
      title: 'Portrait in Pearls & Sunlight',
      medium: 'Soft Pastel & Colored Pencil',
      year: '2025',
      image: art5Pearls,
      isLandscape: true,
      aspect: 'aspect-[4/3]',
      modalAspect: 'aspect-[4/3]',
      badge: 'Signed Original',
      description:
        'A stylized portrait featuring radiant coral-pink blush, gleaming pearl choker necklace, warm amber lighting, and rich brunette tresses. Hand-signed @diz.ynna yanna✿ in the studio sketchbook.',
      tapeTone: 'bg-[#D7E3A4]/90',
    },
    {
      id: 'art-6',
      title: 'Rain & Melancholy in Ultramarine',
      medium: 'Soft Pastel & Wash on Paper',
      year: '2025',
      image: art6MelancholyBlue,
      isLandscape: false,
      aspect: 'aspect-[4/5]',
      modalAspect: 'aspect-[3/4]',
      badge: 'Emotional Study',
      description:
        'An evocative portrait rendered in cool ultramarine, indigo, and deep violet washes with cascading vertical drip streaks, capturing quiet sorrow, rain textures, and introspective vulnerability.',
      tapeTone: 'bg-[#D4C04D]/90',
    },
  ];

  // Duplicate for seamless infinite continuous moving marquee
  const loopedArtworks = [...artworks, ...artworks, ...artworks];

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeArtwork) return;
      if (e.key === 'Escape') setActiveArtwork(null);
      if (e.key === 'ArrowRight') handleNextArtwork();
      if (e.key === 'ArrowLeft') handlePrevArtwork();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArtwork]);

  const handleOpenArtwork = (artwork: Artwork) => {
    setActiveArtwork(artwork);
    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#D4C04D', '#657733', '#ECF5E2'],
      });
    } catch {
      // ignore
    }
  };

  const handleNextArtwork = () => {
    if (!activeArtwork) return;
    const currentIdx = artworks.findIndex((a) => a.id === activeArtwork.id);
    const nextIdx = (currentIdx + 1) % artworks.length;
    setActiveArtwork(artworks[nextIdx]);
  };

  const handlePrevArtwork = () => {
    if (!activeArtwork) return;
    const currentIdx = artworks.findIndex((a) => a.id === activeArtwork.id);
    const prevIdx = (currentIdx - 1 + artworks.length) % artworks.length;
    setActiveArtwork(artworks[prevIdx]);
  };

  return (
    <section id="artworks" className="py-28 relative overflow-hidden bg-[#FAF8F2] border-b border-[#291100]/10">
      <div className="mx-auto max-w-6xl px-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#657733] bg-[#ECF5E2] px-3 py-1 rounded-full border border-[#657733]/25">
                Sketchbook & Portfolio
              </span>
              <span className="font-hand text-xl text-[#657733]">page four</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-[#291100] tracking-tight">
              My Artworks
            </h2>
            <p className="mt-2 text-sm text-[#291100]/70 font-sans max-w-md">
              A continuously moving showcase of Alyanna&apos;s genuine drawings, oil pastel studies, and paintings. Tap any piece to pop it up in a high-resolution view.
            </p>
          </div>

          <p className="font-hand text-xl text-[#657733] flex items-center gap-1.5 pb-2">
            <Sparkles className="h-4 w-4 text-[#D4C04D]" />
            <span>tap any piece to enlarge ✦</span>
          </p>
        </div>
      </div>

      {/* Automatically moving continuous image carousel with smooth fade at both ends */}
      <div
        className="relative w-full overflow-hidden py-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Smooth Fade Effect at Left End */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-20 sm:w-36 bg-gradient-to-r from-[#FAF8F2] to-transparent" />

        {/* Smooth Fade Effect at Right End */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-20 sm:w-36 bg-gradient-to-l from-[#FAF8F2] to-transparent" />

        {/* Continuously moving track */}
        <div
          className={`flex items-start gap-6 w-max ${isPaused ? '[animation-play-state:paused]' : ''}`}
          style={{
            animation: 'artworksMarquee 42s linear infinite',
          }}
        >
          {loopedArtworks.map((art, idx) => (
            <motion.div
              key={`${art.id}-${idx}`}
              onClick={() => handleOpenArtwork(art)}
              whileHover={{ scale: 1.04, y: -6, zIndex: 10 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative ${
                art.isLandscape ? 'w-[300px] sm:w-[350px]' : 'w-[230px] sm:w-[270px]'
              } shrink-0 cursor-pointer rounded-2xl paper p-3.5 pb-6 border border-[#291100]/15 shadow-polaroid bg-white select-none transition-shadow hover:shadow-2xl`}
            >
              {/* Scrapbook washi tape at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div
                  className={`h-5 w-20 ${
                    art.tapeTone || 'bg-[#D7E3A4]/90'
                  } border-l-2 border-r-2 border-dashed border-[#FAF8F2] shadow-xs rotate-[-2deg]`}
                />
              </div>

              {/* Artwork Image Container */}
              <div
                className={`relative ${
                  art.isLandscape ? 'aspect-[16/10]' : 'aspect-[4/5]'
                } w-full overflow-hidden rounded-xl bg-[#ECF5E2] border border-[#291100]/10`}
              >
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
                />

                {/* Badge for Landscape / Portrait */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/90 text-[#291100] shadow-xs backdrop-blur-xs">
                    {art.badge}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#291100]/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#291100] shadow-md">
                    <Maximize2 className="h-3.5 w-3.5 text-[#657733]" />
                    <span>View Larger</span>
                  </span>
                </div>
              </div>

              {/* Artwork Label */}
              <div className="mt-3 px-1 text-center">
                <h4 className="font-display text-base text-[#291100] line-clamp-1 leading-snug group-hover:text-[#657733] transition-colors">
                  {art.title}
                </h4>
                <p className="font-hand text-sm text-[#657733] mt-0.5">
                  {art.medium} · {art.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Larger View Popup Modal (Lightbox) */}
      <AnimatePresence>
        {activeArtwork && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#291100]/75 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveArtwork(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl paper rounded-3xl p-6 sm:p-10 border border-[#291100]/20 shadow-2xl bg-[#FAF8F2] my-8 max-h-[92vh] overflow-y-auto"
            >
              {/* Washi tape on modal */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                <div className="h-6 w-32 bg-[#D4C04D]/90 border-l-2 border-r-2 border-dashed border-[#FAF8F2] shadow-xs rotate-[-1deg]" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveArtwork(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#ECF5E2] text-[#291100] hover:bg-[#D7E3A4] transition-colors shadow-xs"
                aria-label="Close artwork popup"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className={`grid ${
                  activeArtwork.isLandscape ? 'md:grid-cols-[1.4fr_1fr]' : 'md:grid-cols-[1.1fr_1fr]'
                } gap-8 items-center`}
              >
                {/* Large Artwork Image Display */}
                <div
                  className={`relative ${activeArtwork.modalAspect} w-full overflow-hidden rounded-2xl paper border-2 border-[#291100]/15 shadow-lift bg-[#ECF5E2]/40 flex items-center justify-center`}
                >
                  <img
                    src={activeArtwork.image}
                    alt={activeArtwork.title}
                    className="h-full w-full object-contain sm:object-cover"
                  />

                  {/* Navigation Arrows on Modal Image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevArtwork();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-[#291100] grid place-items-center hover:bg-white hover:scale-105 transition-all shadow-md"
                    aria-label="Previous artwork"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextArtwork();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-[#291100] grid place-items-center hover:bg-white hover:scale-105 transition-all shadow-md"
                    aria-label="Next artwork"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Artwork Information */}
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#657733] bg-[#ECF5E2] px-3 py-1 rounded-full border border-[#657733]/25">
                        {activeArtwork.badge}
                      </span>
                      <span className="font-hand text-lg text-[#657733]">Alyanna&apos;s Gallery</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl text-[#291100] mt-3 leading-tight">
                      {activeArtwork.title}
                    </h3>
                    <p className="font-hand text-2xl text-[#657733] mt-1">
                      {activeArtwork.medium}
                    </p>
                  </div>

                  <div className="lined paper rounded-xl p-5 border border-[#291100]/10 text-sm leading-relaxed text-[#291100]/85 shadow-2xs">
                    {activeArtwork.description}
                  </div>

                  <div className="p-4 rounded-xl bg-[#ECF5E2]/60 border border-[#657733]/15 space-y-2 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="font-mono text-[#657733] uppercase font-bold">Created</span>
                      <span className="font-semibold text-[#291100]">{activeArtwork.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-[#657733] uppercase font-bold">Artist</span>
                      <span className="font-semibold text-[#291100]">Alyanna Jade P. Dagohoy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-[#657733] uppercase font-bold">Origin</span>
                      <span className="font-semibold text-[#291100]">Pio V. Corpus, Masbate</span>
                    </div>
                  </div>

                  {/* Actions & Keyboard info */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-hand text-base text-[#657733]">
                      use arrow keys ← → to browse
                    </span>

                    <button
                      onClick={() => setActiveArtwork(null)}
                      className="rounded-full bg-[#291100] px-6 py-2.5 text-xs font-semibold text-[#ECF5E2] hover:bg-[#657733] transition-colors shadow-sm"
                    >
                      Close View ✿
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Marquee Keyframes Animation definition */}
      <style>{`
        @keyframes artworksMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
