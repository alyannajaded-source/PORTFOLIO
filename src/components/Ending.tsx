import { motion } from 'motion/react';
import { Reveal, Star } from './Common';
import { portfolioOwner } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export function Ending() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="dotgrid relative overflow-hidden px-6 py-36 text-center border-t border-[#657733]/15">
      {/* Slow spinning golden star */}
      <Star className="spin-slow absolute top-14 left-1/2 h-16 w-16 -translate-x-1/2 text-[#D4C04D]" />

      <Reveal>
        <p className="font-hand text-3xl text-[#657733]">the last page</p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-5xl leading-[0.95] text-[#291100] md:text-7xl">
          Thanks for visiting my personal scrapbook{' '}
          <em className="text-[#657733] not-italic underline decoration-[#D4C04D] decoration-wavy decoration-2">
            portfolio
          </em>
          .
        </h2>
        <p className="font-hand mt-8 text-3xl text-[#291100]">
          — with love, {portfolioOwner.preferredName} ✿
        </p>

        {/* Back to top stamp */}
        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full paper px-5 py-2.5 text-xs font-semibold text-[#657733] border border-[#657733]/25 shadow-sm hover:bg-[#ECF5E2] transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>back to the cover page ↑</span>
          </motion.button>
        </div>
      </Reveal>

      {/* Decorative floating stars */}
      {[
        'left-[8%] top-1/3 text-[#D7E3A4] h-12 w-12',
        'right-[12%] top-1/4 text-[#657733] h-9 w-9',
        'left-[18%] bottom-16 text-[#D4C04D] h-8 w-8',
        'right-[8%] bottom-20 text-[#291100]/60 h-10 w-10',
      ].map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c} pointer-events-none`}
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: 0.35 + i * 0.12 }}
        >
          <Star className="floaty h-full w-full" />
        </motion.div>
      ))}

      <p className="mt-20 text-xs tracking-widest text-[#291100]/50 uppercase font-mono">
        © 2026 {portfolioOwner.fullName} · {portfolioOwner.college} · handmade scrapbook portfolio
      </p>
    </section>
  );
}
