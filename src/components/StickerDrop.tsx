import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, X } from 'lucide-react';

interface DroppedSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
}

export function StickerDrop() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSticker, setActiveSticker] = useState<string | null>(null);
  const [stickers, setStickers] = useState<DroppedSticker[]>([]);

  const stickerPalette = [
    { emoji: '🌸', name: 'Cherry Blossom' },
    { emoji: '⭐', name: 'Golden Star' },
    { emoji: '🍵', name: 'Matcha Latte' },
    { emoji: '📷', name: '35mm Camera' },
    { emoji: '🌿', name: 'Fern Frond' },
    { emoji: '🥐', name: 'Croissant' },
    { emoji: '💛', name: 'Yellow Heart' },
    { emoji: '🐈', name: 'Studio Cat' },
  ];

  // Listen for clicks on the window if a sticker is armed
  useEffect(() => {
    if (!activeSticker) return;

    const handleWindowClick = (e: MouseEvent) => {
      // Avoid clicking inside the sticker drawer itself
      const target = e.target as HTMLElement;
      if (target.closest('#sticker-toolbox')) return;

      const newSticker: DroppedSticker = {
        id: `s-${Date.now()}-${Math.random()}`,
        emoji: activeSticker,
        x: e.pageX,
        y: e.pageY,
        rotation: (Math.random() * 30) - 15,
      };

      setStickers((prev) => [...prev, newSticker]);
    };

    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [activeSticker]);

  const clearStickers = () => {
    setStickers([]);
    setActiveSticker(null);
  };

  return (
    <>
      {/* Placed Stickers on Screen */}
      {stickers.map((st) => (
        <motion.div
          key={st.id}
          initial={{ scale: 0, rotate: st.rotation - 20 }}
          animate={{ scale: 1, rotate: st.rotation }}
          className="absolute z-40 select-none text-4xl pointer-events-auto cursor-pointer drop-shadow-md"
          style={{
            left: `${st.x - 20}px`,
            top: `${st.y - 20}px`,
          }}
          whileHover={{ scale: 1.25, rotate: st.rotation + 10 }}
          onClick={(e) => {
            e.stopPropagation();
            // remove individual sticker
            setStickers((prev) => prev.filter((item) => item.id !== st.id));
          }}
          title="Click to remove sticker"
        >
          {st.emoji}
        </motion.div>
      ))}

      {/* Floating Toolbox Toggle Button in bottom right */}
      <div id="sticker-toolbox" className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="paper absolute bottom-14 right-0 w-64 rounded-2xl p-4 border border-[#291100]/15 shadow-2xl bg-[#FAF8F2]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#291100]/10 mb-3">
                <div className="flex items-center gap-1.5 font-hand text-lg text-[#657733] font-bold">
                  <Sparkles className="h-4 w-4 text-[#D4C04D]" />
                  <span>Sticker Stamp Box</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-[#291100]/60 hover:bg-[#ECF5E2]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-[11px] font-sans text-[#291100]/75 mb-3 leading-tight">
                Select any sticker and click anywhere on the page to stamp it!
              </p>

              <div className="grid grid-cols-4 gap-2 mb-3">
                {stickerPalette.map((st) => (
                  <button
                    key={st.name}
                    onClick={() => setActiveSticker(activeSticker === st.emoji ? null : st.emoji)}
                    className={`h-11 w-11 rounded-xl text-2xl flex items-center justify-center transition-all ${
                      activeSticker === st.emoji
                        ? 'bg-[#657733] scale-110 shadow-sm ring-2 ring-[#D4C04D]'
                        : 'bg-[#ECF5E2] hover:bg-[#D7E3A4] hover:scale-105'
                    }`}
                    title={st.name}
                  >
                    {st.emoji}
                  </button>
                ))}
              </div>

              {activeSticker && (
                <div className="rounded-lg bg-[#D4C04D]/25 p-2 text-center text-xs font-hand text-[#291100] mb-2 font-bold animate-pulse">
                  Stamping mode active: Click anywhere on page!
                </div>
              )}

              {stickers.length > 0 && (
                <button
                  onClick={clearStickers}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold text-[#C46849] hover:bg-[#F4DCD1] transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear stamps ({stickers.length})</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 shadow-lg border border-[#291100]/15 transition-all text-xs font-bold ${
            isOpen || activeSticker
              ? 'bg-[#657733] text-[#ECF5E2]'
              : 'bg-[#FAF8F2] text-[#291100] hover:bg-[#ECF5E2]'
          }`}
        >
          <span className="text-sm">✿</span>
          <span>{activeSticker ? `Stamp: ${activeSticker}` : 'Stickers'}</span>
          {stickers.length > 0 && (
            <span className="ml-1 rounded-full bg-[#D4C04D] px-1.5 text-[10px] text-[#291100]">
              {stickers.length}
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
