import { motion } from 'motion/react';
import { Heading, Reveal, Tilt, Star } from './Common';
import { skillsData } from '../data/portfolioData';
import {
  Sparkles,
  Monitor,
  Palette,
  BookOpen,
  Puzzle,
  CheckCircle2,
  Code2,
  Clock,
  Compass,
} from 'lucide-react';

export function Skills() {
  const marqueeWords = ['learning', 'curiosity', 'drawing', 'reading', 'problem-solving', 'technology', 'creativity'];

  const coreSkillsWithIcons = [
    {
      name: 'Basic Computer Skills',
      desc: 'Proficient navigation, file management, document processing, and digital workflows',
      icon: Monitor,
    },
    {
      name: 'Creativity and Drawing',
      desc: 'Visual storytelling, freehand sketching, layout composition, and concept ideation',
      icon: Palette,
    },
    {
      name: 'Reading and Comprehension',
      desc: 'Deep analytical reading, rapid concept grasping, and synthesizing detailed information',
      icon: BookOpen,
    },
    {
      name: 'Problem-Solving',
      desc: 'Approaching challenges methodically with patience, logic, and creative solutions',
      icon: Puzzle,
    },
    {
      name: 'Attention to Detail',
      desc: 'Careful precision in review, consistency in layout, and meticulous presentation',
      icon: CheckCircle2,
    },
    {
      name: 'Basic Programming',
      desc: 'Understanding algorithmic logic, syntax fundamentals, and web development basics',
      icon: Code2,
    },
    {
      name: 'Time Management',
      desc: 'Balancing academic requirements, deadlines, personal studies, and creative pursuits',
      icon: Clock,
    },
    {
      name: 'Willingness to Learn',
      desc: 'Eager curiosity to acquire new technologies, accept constructive feedback, and grow',
      icon: Sparkles,
    },
  ];

  return (
    <section id="skills" className="overflow-hidden bg-[#ECF5E2]/60 py-28 border-y border-[#657733]/15">
      {/* Infinite Marquee Ticker */}
      <div className="mb-16 flex whitespace-nowrap select-none">
        <div className="marquee font-display flex shrink-0 gap-10 pr-10 text-6xl text-[#657733] md:text-8xl">
          {Array.from({ length: 3 }).flatMap((_, k) =>
            marqueeWords.map((w) => (
              <span key={`${k}-${w}`} className="flex items-center gap-10">
                <span>{w}</span>
                <Star className="h-8 w-8 text-[#D4C04D]" />
              </span>
            ))
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Heading kicker="page six" title="Skills & strengths" />

        {/* 1. Alyanna's Core Personal & Academic Skills with Minimalist Gradient Symbols */}
        <div className="mb-16">
          <Reveal>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-[#657733]" />
              <h3 className="font-display text-3xl text-[#291100]">Core Competencies</h3>
              <span className="font-hand text-xl text-[#657733] ml-2">abilities & habits</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreSkillsWithIcons.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <Reveal key={skill.name} delay={idx * 0.05}>
                  <Tilt
                    rot={idx % 2 === 0 ? -1 : 1}
                    className="paper rounded-xl p-5 border border-[#291100]/10 shadow-sm bg-[#FAF8F2] flex flex-col justify-between h-full hover:border-[#657733]/40 transition-all hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        {/* Minimalist Design with Green & Yellow Gradient from Color Palette */}
                        <span className="h-11 w-11 rounded-xl bg-gradient-to-tr from-[#657733] to-[#D4C04D] text-[#FAF8F2] flex items-center justify-center shadow-xs">
                          <Icon className="h-5 w-5 stroke-[2.2]" />
                        </span>

                        <span className="font-mono text-[10px] text-[#657733] bg-[#ECF5E2] px-2.5 py-0.5 rounded-full font-bold border border-[#657733]/15">
                          0{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-display text-lg text-[#291100] mt-1">{skill.name}</h4>
                      <p className="text-xs text-[#291100]/75 mt-2 leading-relaxed font-sans">
                        {skill.desc}
                      </p>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* 2. Existing Toolbox from Draft Website (preserved exactly as requested) */}
        <div>
          <Reveal>
            <div className="flex items-center gap-2 mb-6 pt-4 border-t border-[#657733]/20">
              <span className="font-mono text-xs uppercase font-bold text-[#657733] tracking-widest bg-[#FAF8F2] px-3 py-1 rounded-full border border-[#657733]/20">
                Draft Toolbox
              </span>
              <h3 className="font-display text-3xl text-[#291100]">Technical Toolbox</h3>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            {skillsData.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.08}>
                <Tilt
                  rot={i % 2 === 0 ? 1 : -1}
                  className={`${s.tone} rounded-2xl p-7 md:p-9 shadow-lift border border-[#291100]/10 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-display text-3xl md:text-4xl text-[#291100]">{s.group}</h3>
                      <span className="font-hand text-2xl font-bold opacity-75">0{i + 1}</span>
                    </div>
                    <p className="text-xs text-[#291100]/70 font-sans mb-6">
                      {s.description}
                    </p>
                  </div>

                  {/* Draggable Stickers */}
                  <div className="flex flex-wrap gap-2.5">
                    {s.items.map((it, j) => (
                      <motion.span
                        key={it}
                        drag
                        dragSnapToOrigin
                        whileHover={{ rotate: j % 2 === 0 ? 6 : -6, y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        className="cursor-grab active:cursor-grabbing rounded-full border border-[#291100]/20 bg-[#FAF8F2]/90 backdrop-blur-xs px-4 py-2 text-xs md:text-sm font-medium text-[#291100] shadow-xs select-none"
                      >
                        {it}
                      </motion.span>
                    ))}
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>

          <p className="font-hand mt-10 text-center text-2xl text-[#657733]">
            psst — all toolbox stickers are draggable! feel free to toss them around ✦
          </p>
        </div>
      </div>
    </section>
  );
}
