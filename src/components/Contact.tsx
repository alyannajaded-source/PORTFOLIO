import { useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { Heading, Reveal, Star } from './Common';
import { portfolioOwner } from '../data/portfolioData';
import { Check, Copy, Send, Sparkles, MapPin, Mail, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const email = portfolioOwner.email;
  const x = useMotionValue(0);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D4C04D', '#657733', '#ECF5E2'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !messageText) return;
    setMsgSent(true);
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#657733', '#D4C04D', '#C46849'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      setMsgSent(false);
      setSenderName('');
      setSenderEmail('');
      setMessageText('');
    }, 4500);
  };

  const quickContacts = [
    { n: 'Email Address', h: portfolioOwner.email, tone: 'bg-[#D7E3A4]', r: -1.5, icon: Mail },
    { n: 'Current College', h: 'University of Cebu', tone: 'bg-[#ECF5E2]', r: 1.5, icon: GraduationCap },
    { n: 'Hometown', h: 'Pio V. Corpus, Masbate', tone: 'bg-[#D4C04D]', r: -1, icon: MapPin },
  ];

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28 relative">
      <Heading kicker="page seven" title="Say hello" />

      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] items-start">
        {/* Postcard Container */}
        <Reveal>
          <div className="relative rounded-2xl border-2 border-dashed border-[#657733] bg-[#FAF8F2] p-8 sm:p-10 shadow-lift">
            {/* Postage Stamp */}
            <div className="absolute top-6 right-6 grid h-20 w-16 rotate-6 place-items-center rounded-sm bg-[#D4C04D] border-2 border-dashed border-[#291100]/30 shadow-md">
              <Star className="h-8 w-8 text-[#291100]" />
              <span className="font-mono text-[9px] text-[#291100] uppercase tracking-wider font-bold">AIR MAIL</span>
            </div>

            <p className="font-hand text-2xl text-[#657733]">postcard to:</p>
            <p className="font-display mt-2 text-3xl leading-tight text-[#291100] md:text-4xl">
              you, the lovely
              <br />
              visitor
            </p>

            <p className="mt-5 max-w-md text-sm sm:text-base text-[#291100]/80 leading-relaxed font-sans">
              Have questions, study collaboration ideas, or want to connect with me? My inbox is always open.
            </p>

            {/* Quick Postcard Form */}
            {msgSent ? (
              <div className="mt-8 rounded-xl bg-[#ECF5E2] p-5 border border-[#657733]/30 text-center animate-in fade-in">
                <Sparkles className="h-6 w-6 text-[#657733] mx-auto mb-2" />
                <p className="font-display text-xl text-[#291100]">Postcard stamped & sent!</p>
                <p className="font-hand text-lg text-[#657733] mt-1">
                  Thank you, {senderName}. I'll reply to your message soon ✿
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendQuickMessage} className="mt-6 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full rounded-xl border border-[#291100]/15 bg-white/80 px-3.5 py-2 text-xs sm:text-sm text-[#291100] focus:border-[#657733] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#291100]/15 bg-white/80 px-3.5 py-2 text-xs sm:text-sm text-[#291100] focus:border-[#657733] focus:outline-none"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Drop a handwritten note to Alyanna..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full rounded-xl border border-[#291100]/15 bg-white/80 px-3.5 py-2 text-xs sm:text-sm text-[#291100] focus:border-[#657733] focus:outline-none resize-none font-hand text-base"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <motion.button
                    type="button"
                    style={{ x }}
                    whileHover={{ scale: 1.04, rotate: -1.5 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 rounded-full bg-[#ECF5E2] px-5 py-2.5 text-xs font-semibold text-[#657733] border border-[#657733]/30 hover:bg-[#D7E3A4] transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'copied! ✿' : email}</span>
                  </motion.button>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 rounded-full bg-[#291100] px-6 py-2.5 text-xs font-semibold text-[#ECF5E2] hover:bg-[#657733] transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Note</span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* Contact info cards */}
        <div className="flex flex-col gap-4">
          <p className="font-hand text-xl text-[#657733] px-2">direct coordinates:</p>
          {quickContacts.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={i * 0.08}>
                <div
                  style={{ transform: `rotate(${s.r}deg)` }}
                  className={`${s.tone} flex items-center justify-between rounded-xl px-6 py-5 shadow-lift border border-[#291100]/10`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#291100]/70" />
                    <div>
                      <p className="font-mono text-[10px] uppercase font-bold text-[#657733] tracking-wider">{s.n}</p>
                      <span className="font-display text-xl text-[#291100]">{s.h}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
