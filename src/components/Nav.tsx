import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, FileText, Menu, X, Sparkles } from 'lucide-react';

interface NavProps {
  onOpenResume: () => void;
}

export function Nav({ onOpenResume }: NavProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const navLinks = [
    { label: 'about', href: '#about' },
    { label: 'education', href: '#education' },
    { label: 'hobbies', href: '#hobbies' },
    { label: 'artworks', href: '#artworks', badge: 'new' },
    { label: 'mini games', href: '#games', badge: '5 levels' },
    { label: 'skills', href: '#skills' },
    { label: 'guestbook', href: '#guestbook' },
    { label: 'contact', href: '#contact' },
  ];

  // Synthesize cozy ambient rain & warm vinyl crackle with Web Audio API
  const toggleAmbientAudio = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create pink noise buffer for soft rain
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        setIsPlayingAudio(true);
      } catch (err) {
        console.warn('Audio could not start:', err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav className="paper pointer-events-auto flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm border border-[#291100]/10 shadow-lg backdrop-blur-md bg-[#FAF8F2]/95">
          <a
            href="#top"
            className="font-display mr-2 px-2.5 py-1 text-lg font-bold text-[#657733] hover:text-[#291100] transition-colors rounded-full"
            title="Go to top"
          >
            A.
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative rounded-full px-3 py-1 font-medium text-[#291100]/80 transition-colors hover:bg-[#D7E3A4] hover:text-[#291100]"
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 rounded-full bg-[#657733] px-1.5 py-0.2 text-[10px] text-[#ECF5E2] font-semibold">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-[#291100]/15 mx-1 hidden sm:block" />

          {/* Profile / Resume Viewer Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1 rounded-full bg-[#ECF5E2] px-3 py-1 text-xs font-semibold text-[#657733] hover:bg-[#D7E3A4] transition-colors border border-[#657733]/20"
            title="View Student Profile & Education Summary"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Profile</span>
          </button>

          {/* Cozy Ambient Audio Toggle */}
          <button
            onClick={toggleAmbientAudio}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors ${
              isPlayingAudio
                ? 'bg-[#657733] text-[#ECF5E2]'
                : 'text-[#291100]/70 hover:bg-[#ECF5E2] hover:text-[#291100]'
            }`}
            title={isPlayingAudio ? 'Mute cozy rain & vinyl ambient sound' : 'Play cozy rain & vinyl ambient sound'}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="h-3.5 w-3.5 animate-pulse" />
                <span className="hidden lg:inline text-[11px] font-hand">rain on</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span className="hidden lg:inline text-[11px] font-hand">lo-fi</span>
              </>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#291100] hover:bg-[#D7E3A4] rounded-full transition-colors ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {/* Scroll Progress line */}
        <motion.div
          className="fixed top-0 left-0 h-1.5 origin-left bg-[#D4C04D] shadow-sm"
          style={{ scaleX, width: '100%' }}
        />
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 md:hidden paper rounded-2xl p-5 border border-[#291100]/15 shadow-2xl bg-[#FAF8F2]">
          <div className="flex flex-col gap-2">
            <p className="font-hand text-xl text-[#657733] mb-1">pages & scrapbooks:</p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium text-[#291100] hover:bg-[#ECF5E2] transition-colors"
              >
                <span className="capitalize">{link.label}</span>
                {link.badge ? (
                  <span className="rounded-full bg-[#657733] px-2 py-0.5 text-xs text-[#ECF5E2]">
                    {link.badge}
                  </span>
                ) : (
                  <span className="font-hand text-[#657733]">→</span>
                )}
              </a>
            ))}
            <div className="pt-2 border-t border-[#291100]/10 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#657733] px-4 py-2.5 text-sm font-semibold text-[#ECF5E2]"
              >
                <FileText className="h-4 w-4" />
                <span>View Student Profile & Education</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
