import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, FlowerIcon } from './Common';
import { deckCards, portfolioOwner } from '../data/portfolioData';

const ease = [0.22, 1, 0.36, 1] as const;

export function Cover() {
  const [spread, setSpread] = useState(false);
  const n = deckCards.length;

  return (
    <section className="dotgrid relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
      <motion.div
        className="flex items-center gap-2 font-hand text-2xl text-[#657733]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <FlowerIcon className="h-5 w-5 text-[#D4C04D]" />
        <span>vol. 01 — personal scrapbook & academic portfolio</span>
        <FlowerIcon className="h-5 w-5 text-[#D4C04D]" />
      </motion.div>

      {/* Interactive Fanned Card Deck */}
      <div
        className="relative my-10 h-[320px] w-full max-w-5xl cursor-pointer md:h-[380px]"
        onMouseEnter={() => setSpread(true)}
        onMouseLeave={() => setSpread(false)}
        onClick={() => setSpread((s) => !s)}
      >
        {deckCards.map((c, i) => {
          const mid = i - (n - 1) / 2;
          const x = mid * (spread ? 155 : 95);
          const rot = mid * (spread ? 6.5 : 9);
          const y = Math.abs(mid) * (spread ? 18 : 10);

          return (
            <motion.div
              key={i}
              drag
              dragSnapToOrigin
              className="absolute top-1/2 left-1/2 -mt-[135px] -ml-[90px] h-[270px] w-[185px] cursor-grab active:cursor-grabbing md:-mt-[155px] md:-ml-[105px] md:h-[310px] md:w-[215px] select-none"
              initial={{ x: 0, y: 600, rotate: 0, opacity: 0 }}
              animate={{ x, y, rotate: rot, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 16,
                delay: spread ? 0 : 0.2 + i * 0.08,
              }}
              whileHover={{ y: y - 30, rotate: 0, scale: 1.08, zIndex: 30 }}
              style={{ zIndex: i + 5 }}
            >
              {c.kind === 'img' ? (
                <div className="paper h-full w-full rounded-md p-2.5 pb-10 border border-[#291100]/10 shadow-polaroid bg-[#FAF8F2]">
                  <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#ECF5E2]">
                    <img
                      src={c.src}
                      alt={c.label}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <p className="font-hand mt-2 text-center text-2xl text-[#291100] tracking-wide">
                    {c.label}
                  </p>
                </div>
              ) : (
                <div
                  className={`${c.tone} flex h-full w-full flex-col justify-between rounded-md p-5 border border-[#291100]/10 shadow-lift`}
                >
                  <Star className="h-6 w-6 opacity-90" />
                  <div>
                    <p className="font-hand text-xl opacity-80">{c.title}</p>
                    <p className="font-display text-2xl md:text-3xl leading-tight mt-1">{c.body}</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.h1
        className="font-display text-center text-6xl leading-[0.9] text-[#291100] md:text-8xl mt-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease }}
      >
        Hello! I'm <em className="text-[#657733] not-italic underline decoration-[#D4C04D] decoration-wavy decoration-2">{portfolioOwner.preferredName}</em>
      </motion.h1>

      <motion.p
        className="mt-5 max-w-lg text-center text-lg text-[#291100]/80 leading-relaxed font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Third-year college student at {portfolioOwner.college}. Welcome to my scrapbook portfolio documenting my studies, hobbies, and skills.
      </motion.p>

      <motion.div
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <p className="font-hand text-xl text-[#657733]">
          (hover or drag the cards ↑)
        </p>
        <span className="text-xs text-[#291100]/40 font-mono">·</span>
        <a
          href="#education"
          className="font-hand text-xl text-[#C46849] hover:underline"
        >
          view academic timeline ↓
        </a>
      </motion.div>

      {/* Floating Scrapbook Stars */}
      <Star className="floaty absolute top-28 left-[8%] h-10 w-10 text-[#D4C04D] [--r:12deg] pointer-events-none" />
      <Star className="floaty absolute right-[10%] bottom-24 h-14 w-14 text-[#657733] [animation-delay:-2s] pointer-events-none" />
      <Star className="floaty absolute top-1/3 right-[6%] h-6 w-6 text-[#291100]/80 [animation-delay:-4s] pointer-events-none" />
      <Star className="floaty absolute bottom-12 left-[12%] h-8 w-8 text-[#C46849] [animation-delay:-3s] pointer-events-none" />
    </section>
  );
}
