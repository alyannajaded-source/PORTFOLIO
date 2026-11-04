import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heading, Reveal, Tilt, Star } from './Common';
import { initialGuestNotes } from '../data/portfolioData';
import { GuestNote } from '../types';
import { Pin, Plus, Sparkles, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function InteractiveCorkboard() {
  const [notes, setNotes] = useState<GuestNote[]>(() => {
    try {
      const saved = localStorage.getItem('mira_scrapbook_guest_notes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return initialGuestNotes;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [selectedStamp, setSelectedStamp] = useState('🌸');
  const [selectedTone, setSelectedTone] = useState('bg-[#ECF5E2]');

  useEffect(() => {
    try {
      localStorage.setItem('mira_scrapbook_guest_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const stampOptions = ['🌸', '☕', '🌿', '⭐', '🎨', '🥐', '🎧', '💌', '🐈', '✨'];

  const toneOptions = [
    { label: 'Honeydew', class: 'bg-[#ECF5E2]' },
    { label: 'Tea Leaf', class: 'bg-[#D7E3A4]' },
    { label: 'Warm Gold', class: 'bg-[#D4C04D]' },
    { label: 'Pale Blush', class: 'bg-[#F4DCD1]' },
    { label: 'Parchment', class: 'bg-[#FAF8F2]' },
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newNote: GuestNote = {
      id: `note-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || undefined,
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      stamp: selectedStamp,
      tone: selectedTone,
      rotation: (Math.random() * 8) - 4,
    };

    setNotes([newNote, ...notes]);
    setAuthor('');
    setLocation('');
    setMessage('');
    setIsModalOpen(false);

    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4C04D', '#657733', '#ECF5E2', '#C46849'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="guestbook" className="mx-auto max-w-6xl px-6 py-28 relative">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <Heading kicker="page six" title="The guestbook" />

        <div className="mb-14">
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-[#657733] px-6 py-3 font-semibold text-[#ECF5E2] shadow-md hover:bg-[#291100] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Pin a Note on the Wall ✿</span>
          </motion.button>
        </div>
      </div>

      {/* Corkboard / Paper Notice Board Container */}
      <div className="corkboard relative rounded-3xl p-6 sm:p-12 border-8 border-[#291100]/25 shadow-2xl overflow-hidden min-h-[480px]">
        {/* Wooden Frame Corner Brackets */}
        <div className="absolute top-2 left-2 h-6 w-6 border-t-2 border-l-2 border-[#291100]/40 pointer-events-none" />
        <div className="absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2 border-[#291100]/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-[#291100]/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-[#291100]/40 pointer-events-none" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              drag
              dragSnapToOrigin
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, zIndex: 30 }}
              style={{ rotate: `${note.rotation}deg` }}
              className={`relative cursor-grab active:cursor-grabbing rounded-xl p-5 ${note.tone} border border-[#291100]/15 shadow-md flex flex-col justify-between min-h-[220px] select-none`}
            >
              {/* Pushpin at top center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="h-6 w-6 rounded-full bg-[#C46849] border-2 border-[#291100]/30 shadow-md flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
                </div>
              </div>

              {/* Stamp in upper right */}
              <div className="flex items-start justify-between mt-1 mb-2">
                <span className="text-2xl select-none">{note.stamp}</span>
                <span className="font-mono text-[10px] text-[#291100]/50 tracking-wider">
                  {note.date}
                </span>
              </div>

              {/* Note Content */}
              <p className="font-hand text-xl text-[#291100] leading-snug my-2">
                "{note.message}"
              </p>

              {/* Signoff */}
              <div className="pt-2 border-t border-[#291100]/10 flex items-center justify-between">
                <p className="font-display text-sm text-[#291100]">
                  — {note.author}
                </p>
                {note.location && (
                  <span className="font-hand text-xs text-[#657733]">
                    {note.location}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-hand text-center text-xl text-[#291100]/60 mt-10">
          (every note is draggable · feel free to rearrange them!)
        </p>
      </div>

      {/* Modal: Write and Pin Note */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#291100]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md paper rounded-2xl p-6 sm:p-8 border border-[#291100]/20 shadow-2xl bg-[#FAF8F2]"
            >
              {/* Washi tape on modal */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="h-5 w-24 bg-[#D7E3A4]/90 border-l-2 border-r-2 border-dashed border-[#FAF8F2]/70 shadow-xs rotate-[-2deg]" />
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-[#291100]/70 hover:text-[#291100] rounded-full hover:bg-[#ECF5E2]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Pin className="h-5 w-5 text-[#C46849]" />
                <h3 className="font-display text-2xl text-[#291100]">Leave a Post-It Note</h3>
              </div>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#657733] uppercase tracking-wider mb-1">
                    Your Name or Handle *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Alex M."
                    className="w-full rounded-xl border border-[#291100]/20 bg-white px-3.5 py-2 text-sm text-[#291100] focus:border-[#657733] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#657733] uppercase tracking-wider mb-1">
                    Where are you visiting from? (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Melbourne, Tokyo, Berlin"
                    className="w-full rounded-xl border border-[#291100]/20 bg-white px-3.5 py-2 text-sm text-[#291100] focus:border-[#657733] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#657733] uppercase tracking-wider mb-1">
                    Your Handwritten Note *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say hello, share a song recommendation, or leave some warm thoughts..."
                    className="w-full rounded-xl border border-[#291100]/20 bg-white px-3.5 py-2 text-sm text-[#291100] focus:border-[#657733] focus:outline-none resize-none font-hand text-lg"
                  />
                </div>

                {/* Stamp Picker */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#657733] uppercase tracking-wider mb-1.5">
                    Pick a Stamp
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {stampOptions.map((stamp) => (
                      <button
                        key={stamp}
                        type="button"
                        onClick={() => setSelectedStamp(stamp)}
                        className={`h-9 w-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                          selectedStamp === stamp
                            ? 'bg-[#657733] text-white scale-110 shadow-xs'
                            : 'bg-[#ECF5E2] hover:bg-[#D7E3A4]'
                        }`}
                      >
                        {stamp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paper Tone Picker */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#657733] uppercase tracking-wider mb-1.5">
                    Sticky Note Color
                  </label>
                  <div className="flex gap-2">
                    {toneOptions.map((tone) => (
                      <button
                        key={tone.label}
                        type="button"
                        onClick={() => setSelectedTone(tone.class)}
                        className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium border border-[#291100]/15 ${tone.class} ${
                          selectedTone === tone.class ? 'ring-2 ring-[#657733] font-bold' : ''
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full px-4 py-2 text-xs font-semibold text-[#291100]/70 hover:bg-[#ECF5E2]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-[#657733] px-6 py-2 text-xs font-semibold text-[#ECF5E2] hover:bg-[#291100] transition-colors"
                  >
                    Pin It to the Wall ✦
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
