import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heading, Reveal, Tilt } from './Common';
import { portfolioOwner } from '../data/portfolioData';
import { BookOpen, Gamepad2, Music, Palette, GraduationCap, MapPin, Calendar, CreditCard, Sparkles } from 'lucide-react';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [activeTab, setActiveTab] = useState<'hobbies' | 'student' | 'origin'>('student');

  return (
    <section id="about" ref={ref} className="mx-auto max-w-6xl px-6 py-28">
      <Heading kicker="page one" title="About me" />

      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.25fr]">
        {/* Left Column: Washi Tape Polaroid & Student ID card */}
        <motion.div style={{ y }} className="relative mx-auto w-full max-w-sm space-y-6">
          <Tilt rot={-3} className="tape paper rounded-sm p-3.5 pb-14 border border-[#291100]/10 shadow-polaroid bg-[#FAF8F2]">
            <div className="overflow-hidden rounded-sm bg-[#ECF5E2]">
              <img
                src={portfolioOwner.avatar}
                alt="Portrait of Alyanna Jade"
                width={768}
                height={960}
                loading="lazy"
                className="w-full object-cover rounded-sm transition-transform duration-700 hover:scale-105"
              />
            </div>
            <p className="font-hand absolute bottom-3.5 left-0 w-full text-center text-2xl text-[#291100]">
              {portfolioOwner.preferredName} ✿
            </p>
          </Tilt>

          {/* Rotating Est. 2006 Seal */}
          <motion.div
            className="absolute -right-5 -top-4 grid h-20 w-20 place-items-center rounded-full bg-[#D4C04D] text-center shadow-lg border-2 border-dashed border-[#291100]/30 select-none cursor-pointer"
            whileHover={{ rotate: 25, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            <span className="font-hand text-lg font-bold leading-none text-[#291100]">
              b. {portfolioOwner.est}
            </span>
          </motion.div>

          {/* Student ID Badge Card */}
          <div className="rounded-xl paper p-4 border border-[#291100]/15 bg-[#FAF8F2] shadow-sm">
            <div className="flex items-center justify-between border-b border-[#291100]/10 pb-2 mb-2.5">
              <span className="font-mono text-[10px] uppercase font-bold text-[#657733] tracking-wider flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                Student Identification
              </span>
              <span className="font-mono text-xs font-bold text-[#291100] bg-[#ECF5E2] px-2 py-0.5 rounded-full">
                ID: {portfolioOwner.studentId}
              </span>
            </div>
            <div className="text-xs space-y-1 font-sans text-[#291100]/80">
              <p><span className="font-semibold text-[#291100]">Full Name:</span> {portfolioOwner.fullName}</p>
              <p><span className="font-semibold text-[#291100]">Institution:</span> {portfolioOwner.college}</p>
              <p><span className="font-semibold text-[#291100]">Year Level:</span> {portfolioOwner.collegeStanding}</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Lined Paper & Personal Information */}
        <div className="space-y-6">
          <Reveal>
            <div className="lined paper rounded-xl p-8 leading-7 border border-[#291100]/10 shadow-md bg-[#FAF8F2]">
              <div className="flex items-center justify-between mb-3">
                <p className="font-display text-3xl sm:text-4xl text-[#291100]">Hello, I'm {portfolioOwner.preferredName}!</p>
                <span className="font-hand text-xl text-[#657733]">handwritten note ✎</span>
              </div>
              <p className="text-[#291100]/85 leading-relaxed font-sans text-base">
                {portfolioOwner.bio}
              </p>
              <p className="mt-4 text-[#291100]/85 leading-relaxed font-sans text-base">
                Welcome to my personal scrapbook website where I document my academic journey, favorite hobbies, creative drawings, and learning milestones.
              </p>
            </div>
          </Reveal>

          {/* Personal Information Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="rotate-1 rounded-xl bg-[#ECF5E2] p-6 shadow-sm border border-[#657733]/15">
                <p className="font-hand text-2xl text-[#657733] font-semibold">personal info</p>
                <ul className="mt-2.5 space-y-2 text-sm font-sans text-[#291100]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-base">👤</span>
                    <div>
                      <p className="text-[11px] font-mono text-[#657733] uppercase">Full Name</p>
                      <p className="font-semibold">{portfolioOwner.fullName}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-base">🎂</span>
                    <div>
                      <p className="text-[11px] font-mono text-[#657733] uppercase">Birthday</p>
                      <p className="font-semibold">{portfolioOwner.birthday}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-base">🆔</span>
                    <div>
                      <p className="text-[11px] font-mono text-[#657733] uppercase">Student ID</p>
                      <p className="font-mono font-bold">{portfolioOwner.studentId}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="-rotate-1.5 rounded-xl bg-[#D7E3A4] p-6 shadow-sm border border-[#657733]/15">
                <p className="font-hand text-2xl text-[#657733] font-semibold">roots & studies</p>
                <ul className="mt-2.5 space-y-2 text-sm font-sans text-[#291100]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-base">📍</span>
                    <div>
                      <p className="text-[11px] font-mono text-[#657733] uppercase">Hometown</p>
                      <p className="font-semibold">{portfolioOwner.hometown}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-base">🎓</span>
                    <div>
                      <p className="text-[11px] font-mono text-[#657733] uppercase">College</p>
                      <p className="font-semibold">{portfolioOwner.college}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-base">🌱</span>
                    <div>
                      <p className="text-[11px] font-mono text-[#657733] uppercase">Current Status</p>
                      <p className="font-semibold text-[#657733]">{portfolioOwner.collegeStanding}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Quick Hobbies Preview Strip */}
          <Reveal delay={0.2}>
            <div className="paper rounded-xl p-5 border border-[#291100]/10 shadow-sm bg-[#FAF8F2]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#D4C04D]" />
                  <p className="font-hand text-xl text-[#657733] font-bold">favorite pastimes</p>
                </div>
                <a href="#hobbies" className="font-hand text-sm text-[#C46849] hover:underline">
                  view all hobbies →
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Reading', icon: '📖', tone: 'bg-[#D7E3A4]' },
                  { name: 'Drawing', icon: '✏️', tone: 'bg-[#ECF5E2]' },
                  { name: 'Playing Games', icon: '🎮', tone: 'bg-[#D4C04D]' },
                  { name: 'Listening to Music', icon: '🎧', tone: 'bg-[#FAF8F2]' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`rounded-lg ${item.tone} p-3 text-center border border-[#291100]/10 flex flex-col items-center justify-center gap-1`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-semibold text-[#291100]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
