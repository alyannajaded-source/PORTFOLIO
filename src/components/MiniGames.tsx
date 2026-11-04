import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heading, Tilt } from './Common';
import { secretFactsData, SecretFact } from '../data/miniGameData';
import {
  playFlipSound,
  playMatchSound,
  playMissSound,
  playTone,
  playCatchSound,
  playVictoryFanfare,
  playTapTick,
} from '../utils/gameAudio';
import {
  Lock,
  Unlock,
  Sparkles,
  Trophy,
  RotateCcw,
  BookOpen,
  X,
  Volume2,
  VolumeX,
  ArrowRight,
  Eye,
  CheckCircle2,
  Palette,
  Code2,
  Monitor,
  Puzzle,
  Clock,
  Compass,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FallingItem {
  id: number;
  skillKey: 'palette' | 'monitor' | 'book' | 'puzzle' | 'code' | 'clock' | 'sparkles';
  label: string;
  x: number;
  speed: number;
  y: number;
}

export function MiniGames() {
  // Current active level tab (1 to 5)
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Unlocked levels array stored in localStorage
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('alyanna_unlocked_game_levels');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [1]; // Level 1 is always unlocked
  });

  // Modal to show unlocked secret fact upon victory or when browsing album
  const [activeSecretFact, setActiveSecretFact] = useState<SecretFact | null>(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState<boolean>(false);

  // Save unlocked levels
  useEffect(() => {
    try {
      localStorage.setItem('alyanna_unlocked_game_levels', JSON.stringify(unlockedLevels));
    } catch {
      // ignore
    }
  }, [unlockedLevels]);

  // Handle Level Win
  const handleWinLevel = (level: number) => {
    if (soundEnabled) playVictoryFanfare();
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#657733', '#D4C04D', '#C46849', '#ECF5E2'],
      });
    } catch {
      // ignore
    }

    // Unlock next level if not already unlocked
    if (!unlockedLevels.includes(level)) {
      setUnlockedLevels((prev) => [...prev, level]);
    }
    if (level < 5 && !unlockedLevels.includes(level + 1)) {
      setUnlockedLevels((prev) => [...prev, level + 1]);
    }

    // Open the secret fact modal for this level
    const fact = secretFactsData.find((f) => f.level === level);
    if (fact) {
      setTimeout(() => {
        setActiveSecretFact(fact);
      }, 400);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all unlocked mini-game levels and secret facts?')) {
      setUnlockedLevels([1]);
      setCurrentLevel(1);
      localStorage.removeItem('alyanna_unlocked_game_levels');
    }
  };

  const currentFact = secretFactsData.find((f) => f.level === currentLevel) || secretFactsData[0];
  const isCurrentLevelUnlocked = unlockedLevels.includes(currentLevel);
  const isCurrentLevelCompleted = unlockedLevels.includes(currentLevel + 1) || (currentLevel === 5 && unlockedLevels.includes(5));

  return (
    <section id="games" className="dotgrid py-28 relative">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <Heading kicker="mini games • level quest" title="Alyanna's Secret Vault" />
            <p className="font-hand text-xl text-[#657733] -mt-6">
              ✿ Win each level to unlock hidden facts nobody knows about me!
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center flex-wrap gap-2 mb-10">
            <button
              onClick={() => setIsAlbumOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-[#657733] px-4 py-2 text-xs font-semibold text-[#ECF5E2] hover:bg-[#291100] transition-colors shadow-sm"
              title="View all unlocked secret facts"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Secret Facts Album ({unlockedLevels.filter((lvl) => lvl <= 5 && (unlockedLevels.includes(lvl + 1) || lvl === 5)).length}/5)</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="rounded-full paper p-2 text-[#291100] border border-[#291100]/20 hover:bg-[#FAF8F2] transition-colors"
              title={soundEnabled ? 'Mute Game Audio' : 'Unmute Game Audio'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-[#657733]" /> : <VolumeX className="h-4 w-4 text-[#C46849]" />}
            </button>

            <button
              onClick={handleResetProgress}
              className="rounded-full paper p-2 text-[#291100]/60 border border-[#291100]/20 hover:text-[#C46849] hover:bg-[#FAF8F2] transition-colors"
              title="Reset Progress"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Level Progression Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
          {secretFactsData.map((f) => {
            const isUnlocked = unlockedLevels.includes(f.level);
            const isCompleted = unlockedLevels.includes(f.level + 1) || (f.level === 5 && unlockedLevels.includes(6));
            const isActive = currentLevel === f.level;

            return (
              <button
                key={f.level}
                onClick={() => isUnlocked && setCurrentLevel(f.level)}
                disabled={!isUnlocked}
                className={`relative rounded-xl p-3 sm:p-4 text-left border transition-all ${
                  isActive
                    ? 'bg-[#657733] text-[#ECF5E2] border-[#291100] shadow-md scale-[1.02]'
                    : isUnlocked
                    ? 'paper text-[#291100] border-[#291100]/20 hover:border-[#657733] hover:bg-white'
                    : 'bg-[#291100]/5 text-[#291100]/40 border-dashed border-[#291100]/20 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-[#D4C04D]' : 'text-[#657733]'}`}>
                    Level 0{f.level}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#D4C04D]" />
                  ) : isUnlocked ? (
                    <Unlock className="h-3.5 w-3.5 opacity-60" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 opacity-40" />
                  )}
                </div>

                <p className="font-display text-sm sm:text-base leading-tight truncate">
                  {f.gameTitle}
                </p>

                <p className={`text-[10px] font-mono mt-1 ${isActive ? 'text-[#ECF5E2]/80' : 'text-[#291100]/60'}`}>
                  {f.difficulty}
                </p>
              </button>
            );
          })}
        </div>

        {/* Game Stage Area */}
        <div className="paper rounded-3xl p-6 sm:p-10 border-2 border-[#291100]/15 bg-[#FAF8F2] shadow-xl relative overflow-hidden">
          {/* Scrapbook Tape Accents */}
          <div className="absolute -top-3 left-12">
            <div className="h-6 w-24 bg-[#D4C04D]/85 border-l-2 border-r-2 border-dashed border-[#291100]/30 shadow-xs rotate-[-2deg]" />
          </div>
          <div className="absolute -top-3 right-12">
            <div className="h-6 w-24 bg-[#657733]/80 border-l-2 border-r-2 border-dashed border-[#291100]/30 shadow-xs rotate-[3deg]" />
          </div>

          {/* Level Header info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#291100]/10 pb-5 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase bg-[#D4C04D] text-[#291100] px-2.5 py-0.5 rounded-full">
                  Level {currentFact.level} of 5
                </span>
                <span className="font-mono text-xs text-[#291100]/60">
                  Reward: Secret #{currentFact.level}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#291100] mt-1">
                {currentFact.gameTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#291100]/75 font-sans mt-0.5">
                {currentFact.gamePrompt}
              </p>
            </div>

            {/* If already completed, quick button to peek at unlocked secret */}
            {isCurrentLevelCompleted && (
              <button
                onClick={() => setActiveSecretFact(currentFact)}
                className="flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-[#ECF5E2] border border-[#657733]/30 px-3.5 py-1.5 text-xs font-semibold text-[#657733] hover:bg-[#657733] hover:text-[#ECF5E2] transition-colors shadow-xs"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>View Fact #{currentFact.level}</span>
              </button>
            )}
          </div>

          {/* Dynamic Game Component based on current level */}
          <div className="py-2">
            {currentFact.level === 1 && (
              <Level1PairsGame
                soundEnabled={soundEnabled}
                onWin={() => handleWinLevel(1)}
              />
            )}
            {currentFact.level === 2 && (
              <Level2SimonGame
                soundEnabled={soundEnabled}
                onWin={() => handleWinLevel(2)}
              />
            )}
            {currentFact.level === 3 && (
              <Level3CatcherGame
                soundEnabled={soundEnabled}
                onWin={() => handleWinLevel(3)}
              />
            )}
            {currentFact.level === 4 && (
              <Level4PairsHardGame
                soundEnabled={soundEnabled}
                onWin={() => handleWinLevel(4)}
              />
            )}
            {currentFact.level === 5 && (
              <Level5SpeedLockGame
                soundEnabled={soundEnabled}
                onWin={() => handleWinLevel(5)}
              />
            )}
          </div>
        </div>

        {/* Modal: Secret Fact Revealed (Victory / Preview) */}
        <AnimatePresence>
          {activeSecretFact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSecretFact(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#291100]/80 backdrop-blur-sm cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 25 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 25 }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-xl w-full bg-[#FFFDF9] rounded-2xl p-5 sm:p-8 shadow-2xl border-2 border-[#291100]/20 cursor-default"
              >
                {/* Washi tape topper */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="h-6 w-28 bg-[#D4C04D]/90 border-l border-r border-dashed border-[#291100]/30 shadow-sm rotate-[-2deg]" />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveSecretFact(null)}
                  className="absolute top-3 right-3 z-20 rounded-full bg-[#291100]/10 p-2 text-[#291100] hover:bg-[#291100] hover:text-[#FAF8F2] transition-colors"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Secret Tag Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold uppercase bg-[#657733] text-[#ECF5E2] px-2.5 py-0.5 rounded-full">
                    Level {activeSecretFact.level} Secret Unlocked!
                  </span>
                  <span className="font-mono text-[11px] text-[#C46849] font-semibold">
                    ✿ {activeSecretFact.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#291100] leading-tight mb-4">
                  {activeSecretFact.title}
                </h3>

                {/* Polaroid Frame of the Secret Illustration */}
                <div className="rounded-xl overflow-hidden border border-[#291100]/15 shadow-inner bg-[#291100]/5 mb-4">
                  <img
                    src={activeSecretFact.image}
                    alt={activeSecretFact.title}
                    className="w-full h-56 sm:h-64 object-cover object-center"
                    style={{ filter: 'contrast(1.03) saturate(1.05)' }}
                  />
                  <div className="p-2.5 bg-[#FAF8F2] border-t border-[#291100]/10">
                    <p className="font-hand text-base text-[#291100]/90">
                      {activeSecretFact.caption}
                    </p>
                  </div>
                </div>

                {/* The Secret Fact Story */}
                <div className="bg-[#ECF5E2]/60 rounded-xl p-4 border border-[#657733]/20 text-[#291100] leading-relaxed font-sans text-sm mb-5 shadow-xs">
                  <p className="font-serif italic text-base">
                    "{activeSecretFact.fact}"
                  </p>
                </div>

                {/* Navigation in Modal */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#291100]/10">
                  <button
                    onClick={() => setActiveSecretFact(null)}
                    className="rounded-full px-4 py-2 text-xs font-semibold text-[#291100]/70 hover:bg-[#FAF8F2] transition-colors"
                  >
                    Keep in Album
                  </button>

                  {activeSecretFact.level < 5 && (
                    <button
                      onClick={() => {
                        setActiveSecretFact(null);
                        setCurrentLevel(activeSecretFact.level + 1);
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-[#657733] px-5 py-2 text-xs font-semibold text-[#ECF5E2] hover:bg-[#291100] transition-colors shadow-sm"
                    >
                      <span>Play Level {activeSecretFact.level + 1}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal: Secret Facts Album (All Unlocked Secrets Drawer) */}
        <AnimatePresence>
          {isAlbumOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAlbumOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#291100]/80 backdrop-blur-sm cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 25 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 25 }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full max-h-[85vh] flex flex-col bg-[#FAF8F2] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#291100]/20 cursor-default"
              >
                <div className="flex items-center justify-between border-b border-[#291100]/10 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-[#657733]">
                      Archive of Secrets
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#291100]">
                      Alyanna's Secret Facts Album
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsAlbumOpen(false)}
                    className="rounded-full bg-[#291100]/10 p-2 text-[#291100] hover:bg-[#291100] hover:text-[#FAF8F2] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Scrollable grid of secret facts */}
                <div className="overflow-y-auto space-y-4 pr-1">
                  {secretFactsData.map((f) => {
                    const isUnlocked = unlockedLevels.includes(f.level + 1) || (f.level === 5 && unlockedLevels.includes(6)) || unlockedLevels.includes(f.level);

                    if (!isUnlocked) {
                      return (
                        <div
                          key={f.level}
                          className="rounded-2xl p-5 border-2 border-dashed border-[#291100]/20 bg-[#291100]/5 flex items-center gap-4 text-[#291100]/50"
                        >
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#291100]/10">
                            <Lock className="h-5 w-5 text-[#291100]/40" />
                          </div>
                          <div>
                            <p className="font-mono text-xs uppercase font-bold text-[#291100]/40">
                              Level 0{f.level} Secret Locked
                            </p>
                            <p className="font-display text-lg text-[#291100]/60">
                              ??? Mystery Fact ???
                            </p>
                            <p className="text-xs text-[#291100]/50 font-sans mt-0.5">
                              Beat {f.gameTitle} to reveal this fact and picture!
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={f.level}
                        className="rounded-2xl p-4 sm:p-5 bg-white border border-[#291100]/15 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 items-start"
                      >
                        <div className="w-full sm:w-40 sm:h-32 shrink-0 rounded-xl overflow-hidden border border-[#291100]/15 bg-black/5">
                          <img
                            src={f.image}
                            alt={f.title}
                            className="w-full h-36 sm:h-full object-cover object-center"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[10px] font-bold uppercase bg-[#657733]/15 text-[#657733] px-2 py-0.5 rounded-full">
                              Fact #0{f.level}
                            </span>
                            <span className="font-mono text-xs text-[#C46849] font-medium">
                              {f.tag}
                            </span>
                          </div>

                          <h4 className="font-display text-xl text-[#291100]">
                            {f.title}
                          </h4>

                          <p className="font-serif italic text-xs sm:text-sm text-[#291100]/80 mt-1.5 leading-relaxed">
                            "{f.fact}"
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ==========================================
// GAME 1: Skills Match (Creativity & Logic - Pairs Easy)
// ==========================================
function Level1PairsGame({ soundEnabled, onWin }: { soundEnabled: boolean; onWin: () => void }) {
  const [cards, setCards] = useState<Array<{
    id: number;
    skillKey: 'palette' | 'code';
    name: string;
    skillNum: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>>([]);

  const [selected, setSelected] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const resetGame = () => {
    const raw = [
      { skillKey: 'palette' as const, name: 'Creativity & Drawing', skillNum: '02' },
      { skillKey: 'code' as const, name: 'Basic Programming', skillNum: '06' },
      { skillKey: 'palette' as const, name: 'Creativity & Drawing', skillNum: '02' },
      { skillKey: 'code' as const, name: 'Basic Programming', skillNum: '06' },
    ];
    const shuffled = [...raw]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index + 1,
        skillKey: item.skillKey,
        name: item.name,
        skillNum: item.skillNum,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setSelected([]);
    setIsLocked(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    if (soundEnabled) playFlipSound();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setIsLocked(true);
      const [firstIdx, secondIdx] = newSelected;
      if (cards[firstIdx].skillKey === cards[secondIdx].skillKey) {
        setTimeout(() => {
          if (soundEnabled) playMatchSound();
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setSelected([]);
          setIsLocked(false);

          if (newCards.every((c) => c.isMatched)) {
            onWin();
          }
        }, 350);
      } else {
        setTimeout(() => {
          if (soundEnabled) playMissSound();
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setSelected([]);
          setIsLocked(false);
        }, 800);
      }
    }
  };

  const renderIcon = (key: 'palette' | 'code') => {
    if (key === 'palette') return <Palette className="h-7 w-7 stroke-[2.2]" />;
    return <Code2 className="h-7 w-7 stroke-[2.2]" />;
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-md w-full mb-6">
        {cards.map((card, idx) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`h-36 sm:h-40 rounded-2xl p-3 border-2 text-center flex items-center justify-center transition-all shadow-md ${
              card.isFlipped || card.isMatched
                ? 'bg-[#FAF8F2] border-[#657733] text-[#291100]'
                : 'bg-[#657733] border-[#291100] text-[#ECF5E2]'
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <motion.div
                initial={{ scale: 0.6, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                className="flex items-center justify-center"
              >
                <span className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-[#657733] to-[#D4C04D] text-[#FAF8F2] flex items-center justify-center shadow-md">
                  {renderIcon(card.skillKey)}
                </span>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center opacity-85">
                <Sparkles className="h-8 w-8 text-[#D4C04D]" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="flex items-center gap-1.5 rounded-full paper px-4 py-1.5 text-xs font-semibold text-[#291100] border border-[#291100]/20 hover:bg-[#ECF5E2] transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Shuffle & Replay</span>
      </button>
    </div>
  );
}

// ==========================================
// GAME 2: Strengths Melody Sequence (Simon with Skills Symbols)
// ==========================================
function Level2SimonGame({ soundEnabled, onWin }: { soundEnabled: boolean; onWin: () => void }) {
  const STAMPS = [
    { id: 0, name: 'Creativity & Drawing', icon: Palette, freq: 330, tone: 'from-[#657733] to-[#8CA87A]', num: '02' },
    { id: 1, name: 'Problem-Solving', icon: Puzzle, freq: 440, tone: 'from-[#D4C04D] to-[#ECF5E2]', num: '04' },
    { id: 2, name: 'Reading & Analysis', icon: BookOpen, freq: 554, tone: 'from-[#C46849] to-[#D7E3A4]', num: '03' },
    { id: 3, name: 'Willingness to Learn', icon: Sparkles, freq: 659, tone: 'from-[#657733] to-[#D4C04D]', num: '08' },
  ];

  const [sequence, setSequence] = useState<number[]>([]);
  const [playerIdx, setPlayerIdx] = useState<number>(0);
  const [activeStamp, setActiveStamp] = useState<number | null>(null);
  const [isPlayingSeq, setIsPlayingSeq] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);
  const MAX_ROUNDS = 3;

  const startNextRound = (currentSeq: number[]) => {
    const nextItem = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, nextItem];
    setSequence(newSeq);
    setPlayerIdx(0);
    playSequence(newSeq);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlayingSeq(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise((res) => setTimeout(res, 500));
      const stampId = seq[i];
      setActiveStamp(stampId);
      if (soundEnabled) playTone(STAMPS[stampId].freq, 0.25);
      await new Promise((res) => setTimeout(res, 350));
      setActiveStamp(null);
    }
    setIsPlayingSeq(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setRound(1);
    startNextRound([]);
  };

  const handleStampClick = (id: number) => {
    if (isPlayingSeq || !gameStarted) return;

    if (soundEnabled) playTone(STAMPS[id].freq, 0.2);
    setActiveStamp(id);
    setTimeout(() => setActiveStamp(null), 200);

    if (id === sequence[playerIdx]) {
      const nextIdx = playerIdx + 1;
      setPlayerIdx(nextIdx);

      if (nextIdx === sequence.length) {
        if (round >= MAX_ROUNDS) {
          if (soundEnabled) playMatchSound();
          onWin();
        } else {
          setRound((r) => r + 1);
          setTimeout(() => {
            startNextRound(sequence);
          }, 800);
        }
      }
    } else {
      if (soundEnabled) playMissSound();
      setGameStarted(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-3">
      <div className="text-center mb-5">
        <p className="font-mono text-xs uppercase font-bold text-[#657733]">
          {gameStarted ? `Round ${round} of ${MAX_ROUNDS}` : 'Press Start to Listen to the Strengths Sequence'}
        </p>
        <p className="font-hand text-lg text-[#291100] mt-0.5">
          {isPlayingSeq ? 'Watch the Skills symbols glow in harmony...' : gameStarted ? 'Your turn! Tap the Skills in exact order.' : 'Repeat 3 consecutive rounds to unlock Fact #2!'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm w-full mb-6">
        {STAMPS.map((stamp) => {
          const Icon = stamp.icon;
          const isGlow = activeStamp === stamp.id;
          return (
            <motion.button
              key={stamp.id}
              onClick={() => handleStampClick(stamp.id)}
              disabled={isPlayingSeq || !gameStarted}
              whileTap={{ scale: 0.94 }}
              className={`h-24 sm:h-28 rounded-2xl border-2 border-[#291100]/20 p-3 flex items-center justify-center transition-all shadow-md bg-white ${
                isGlow ? 'ring-4 ring-[#D4C04D] scale-105 shadow-xl bg-[#ECF5E2]' : 'hover:border-[#657733]'
              }`}
            >
              <span className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-tr ${stamp.tone} text-[#FAF8F2] flex items-center justify-center shadow-xs ${isGlow ? 'brightness-125' : ''}`}>
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.2]" />
              </span>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={startGame}
        className="flex items-center gap-1.5 rounded-full bg-[#657733] px-6 py-2.5 text-xs font-semibold text-[#ECF5E2] hover:bg-[#291100] transition-colors shadow-md"
      >
        <Sparkles className="h-4 w-4" />
        <span>{gameStarted ? 'Restart Sequence' : 'Start Strengths Melody'}</span>
      </button>
    </div>
  );
}

// ==========================================
// GAME 3: Skills Badge Catcher (Falling Skills Tokens)
// ==========================================
function Level3CatcherGame({ soundEnabled, onWin }: { soundEnabled: boolean; onWin: () => void }) {
  const [score, setScore] = useState<number>(0);
  const TARGET_SCORE = 8;
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [items, setItems] = useState<FallingItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const SKILL_KEYS: Array<{ key: FallingItem['skillKey']; label: string }> = [
    { key: 'palette', label: 'Drawing' },
    { key: 'monitor', label: 'Computer' },
    { key: 'book', label: 'Reading' },
    { key: 'puzzle', label: 'Problem-Solving' },
    { key: 'code', label: 'Programming' },
    { key: 'clock', label: 'Time Mgmt' },
    { key: 'sparkles', label: 'Curiosity' },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Spawn falling skill tokens
  useEffect(() => {
    let spawnTimer: NodeJS.Timeout;
    if (isPlaying) {
      spawnTimer = setInterval(() => {
        const pick = SKILL_KEYS[Math.floor(Math.random() * SKILL_KEYS.length)];
        const newItem: FallingItem = {
          id: Date.now() + Math.random(),
          skillKey: pick.key,
          label: pick.label,
          x: Math.floor(Math.random() * 80) + 10,
          speed: Math.random() * 2 + 2.8,
          y: 0,
        };
        setItems((prev) => [...prev.slice(-10), newItem]);
      }, 700);
    }
    return () => clearInterval(spawnTimer);
  }, [isPlaying]);

  const handleStart = () => {
    setScore(0);
    setTimeLeft(20);
    setItems([]);
    setIsPlaying(true);
  };

  const handleCatchItem = (id: number) => {
    if (!isPlaying) return;
    if (soundEnabled) playCatchSound();
    setItems((prev) => prev.filter((item) => item.id !== id));
    setScore((s) => {
      const nextScore = s + 1;
      if (nextScore >= TARGET_SCORE) {
        setIsPlaying(false);
        onWin();
      }
      return nextScore;
    });
  };

  const renderSkillIcon = (key: FallingItem['skillKey']) => {
    switch (key) {
      case 'palette': return <Palette className="h-5 w-5 stroke-[2.2]" />;
      case 'monitor': return <Monitor className="h-5 w-5 stroke-[2.2]" />;
      case 'book': return <BookOpen className="h-5 w-5 stroke-[2.2]" />;
      case 'puzzle': return <Puzzle className="h-5 w-5 stroke-[2.2]" />;
      case 'code': return <Code2 className="h-5 w-5 stroke-[2.2]" />;
      case 'clock': return <Clock className="h-5 w-5 stroke-[2.2]" />;
      case 'sparkles': return <Sparkles className="h-5 w-5 stroke-[2.2]" />;
    }
  };

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex items-center justify-between w-full max-w-md px-2 mb-3">
        <span className="font-mono text-xs font-bold text-[#657733] bg-[#ECF5E2] px-3 py-1 rounded-full border border-[#657733]/30">
          Target: {score} / {TARGET_SCORE} Skills Caught
        </span>
        <span className="font-mono text-xs font-bold text-[#C46849] bg-[#F4DCD1] px-3 py-1 rounded-full border border-[#C46849]/30">
          Time: {timeLeft}s
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-md h-64 bg-white/70 rounded-2xl border-2 border-dashed border-[#657733]/50 overflow-hidden shadow-inner flex items-center justify-center"
      >
        {!isPlaying ? (
          <div className="text-center p-4">
            <span className="h-12 w-12 rounded-xl bg-gradient-to-tr from-[#657733] to-[#D4C04D] text-[#FAF8F2] flex items-center justify-center shadow-md mx-auto mb-2">
              <Sparkles className="h-6 w-6 stroke-[2.2]" />
            </span>
            <p className="font-display text-xl text-[#291100]">Ready to Catch Skills Tokens?</p>
            <p className="font-hand text-sm text-[#657733] mt-1 mb-4">
              Click or tap falling Skill Badges as they float down!
            </p>
            <button
              onClick={handleStart}
              className="rounded-full bg-[#657733] px-6 py-2 text-xs font-semibold text-[#ECF5E2] hover:bg-[#291100] transition-colors shadow-md"
            >
              Start Catching Skills
            </button>
          </div>
        ) : (
          items.map((item) => (
            <motion.button
              key={item.id}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 220 }}
              transition={{ duration: item.speed, ease: 'linear' }}
              onClick={() => handleCatchItem(item.id)}
              style={{ left: `${item.x}%` }}
              className="absolute top-2 -translate-x-1/2 cursor-pointer hover:scale-125 transition-transform flex items-center justify-center"
            >
              <span className="h-11 w-11 rounded-xl bg-gradient-to-tr from-[#657733] to-[#D4C04D] text-[#FAF8F2] flex items-center justify-center shadow-lg border border-[#FAF8F2]/60">
                {renderSkillIcon(item.skillKey)}
              </span>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// GAME 4: Master Skills Memory Grid (Pairs Hard - 8 cards)
// ==========================================
function Level4PairsHardGame({ soundEnabled, onWin }: { soundEnabled: boolean; onWin: () => void }) {
  const [cards, setCards] = useState<Array<{
    id: number;
    skillKey: 'palette' | 'book' | 'puzzle' | 'code';
    name: string;
    num: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const resetGame = () => {
    const raw = [
      { skillKey: 'palette' as const, name: 'Creativity', num: '02' },
      { skillKey: 'book' as const, name: 'Reading', num: '03' },
      { skillKey: 'puzzle' as const, name: 'Problem-Solving', num: '04' },
      { skillKey: 'code' as const, name: 'Programming', num: '06' },
      { skillKey: 'palette' as const, name: 'Creativity', num: '02' },
      { skillKey: 'book' as const, name: 'Reading', num: '03' },
      { skillKey: 'puzzle' as const, name: 'Problem-Solving', num: '04' },
      { skillKey: 'code' as const, name: 'Programming', num: '06' },
    ];
    const shuffled = [...raw]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index + 1,
        skillKey: item.skillKey,
        name: item.name,
        num: item.num,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setSelected([]);
    setIsLocked(false);
    setTimeLeft(30);
    setGameStarted(true);
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStarted(false);
            if (soundEnabled) playMissSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const handleCardClick = (index: number) => {
    if (isLocked || !gameStarted || cards[index].isFlipped || cards[index].isMatched) return;

    if (soundEnabled) playFlipSound();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setIsLocked(true);
      const [firstIdx, secondIdx] = newSelected;
      if (cards[firstIdx].skillKey === cards[secondIdx].skillKey) {
        setTimeout(() => {
          if (soundEnabled) playMatchSound();
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setSelected([]);
          setIsLocked(false);

          if (newCards.every((c) => c.isMatched)) {
            setGameStarted(false);
            onWin();
          }
        }, 350);
      } else {
        setTimeout(() => {
          if (soundEnabled) playMissSound();
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setSelected([]);
          setIsLocked(false);
        }, 800);
      }
    }
  };

  const renderIcon = (key: 'palette' | 'book' | 'puzzle' | 'code') => {
    switch (key) {
      case 'palette': return <Palette className="h-5 w-5 stroke-[2.2]" />;
      case 'book': return <BookOpen className="h-5 w-5 stroke-[2.2]" />;
      case 'puzzle': return <Puzzle className="h-5 w-5 stroke-[2.2]" />;
      case 'code': return <Code2 className="h-5 w-5 stroke-[2.2]" />;
    }
  };

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex items-center justify-between w-full max-w-lg px-2 mb-4">
        <span className="font-mono text-xs font-bold text-[#657733]">
          Match 4 Core Skills: {cards.filter((c) => c.isMatched).length / 2} / 4 Done
        </span>
        <span className="font-mono text-xs font-bold text-[#C46849] bg-[#F4DCD1] px-3 py-1 rounded-full border border-[#C46849]/30">
          Timer: {timeLeft}s
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg w-full mb-6">
        {cards.map((card, idx) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`h-24 sm:h-28 rounded-xl p-1.5 border-2 text-center flex flex-col items-center justify-center transition-all shadow-sm ${
              card.isFlipped || card.isMatched
                ? 'bg-[#FAF8F2] border-[#657733] text-[#291100]'
                : 'bg-[#657733] border-[#291100] text-[#ECF5E2]'
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="flex items-center justify-center">
                <span className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-tr from-[#657733] to-[#D4C04D] text-[#FAF8F2] flex items-center justify-center shadow-xs">
                  {renderIcon(card.skillKey)}
                </span>
              </motion.div>
            ) : (
              <Sparkles className="h-6 w-6 text-[#D4C04D] opacity-80" />
            )}
          </motion.button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="flex items-center gap-1.5 rounded-full paper px-4 py-1.5 text-xs font-semibold text-[#291100] border border-[#291100]/20 hover:bg-[#ECF5E2] transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Restart Skills Grid</span>
      </button>
    </div>
  );
}

// ==========================================
// GAME 5: The Strengths Padlock & Master Cipher (Speed Tapper)
// ==========================================
function Level5SpeedLockGame({ soundEnabled, onWin }: { soundEnabled: boolean; onWin: () => void }) {
  const [clicks, setClicks] = useState<number>(0);
  const TARGET_CLICKS = 15;
  const [timeLeft, setTimeLeft] = useState<number>(8);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            if (soundEnabled) playMissSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleStart = () => {
    setClicks(0);
    setTimeLeft(8);
    setIsPlaying(true);
    setIsUnlocked(false);
  };

  const handlePadlockClick = () => {
    if (!isPlaying) {
      handleStart();
      return;
    }

    if (soundEnabled) playTapTick();

    setClicks((prev) => {
      const next = prev + 1;
      if (next >= TARGET_CLICKS) {
        setIsPlaying(false);
        setIsUnlocked(true);
        onWin();
      }
      return next;
    });
  };

  const progress = Math.min(100, Math.round((clicks / TARGET_CLICKS) * 100));

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-7 w-7 rounded-lg bg-gradient-to-tr from-[#657733] to-[#D4C04D] text-[#FAF8F2] flex items-center justify-center shadow-xs">
            <Clock className="h-4 w-4 stroke-[2.2]" />
          </span>
          <span className="font-mono text-xs font-bold uppercase bg-[#D4C04D] text-[#291100] px-3 py-1 rounded-full">
            Time Management & Problem Solving
          </span>
        </div>
        <p className="font-hand text-xl text-[#291100]">
          {isPlaying
            ? `Rapidly channel your energy! Time left: ${timeLeft}s`
            : isUnlocked
            ? 'Vault Opened! Secret Fact #5 Unlocked!'
            : 'Tap the lock 15 times before the 8s fuse runs out!'}
        </p>
      </div>

      {/* Progress Bar with Skills Gradient */}
      <div className="w-full max-w-xs h-3.5 rounded-full bg-[#291100]/10 border border-[#291100]/20 overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-tr from-[#657733] to-[#D4C04D]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Giant Animated Golden Padlock Button */}
      <motion.button
        onClick={handlePadlockClick}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className={`w-36 h-36 rounded-3xl border-4 flex flex-col items-center justify-center transition-all shadow-xl ${
          isUnlocked
            ? 'bg-gradient-to-tr from-[#657733] to-[#D4C04D] border-[#291100] text-[#FAF8F2]'
            : isPlaying
            ? 'bg-[#657733] border-[#D4C04D] text-[#ECF5E2] animate-pulse'
            : 'bg-[#FAF8F2] border-[#291100] text-[#291100]'
        }`}
      >
        {isUnlocked ? (
          <Unlock className="h-14 w-14" />
        ) : (
          <Lock className="h-14 w-14" />
        )}
        <span className="font-mono text-xs font-bold uppercase mt-1">
          {isPlaying ? `${clicks} / ${TARGET_CLICKS}` : isUnlocked ? 'Unlocked!' : 'Tap to Break'}
        </span>
      </motion.button>

      {!isPlaying && (
        <button
          onClick={handleStart}
          className="mt-6 rounded-full bg-[#657733] px-6 py-2 text-xs font-semibold text-[#ECF5E2] hover:bg-[#291100] transition-colors shadow-md flex items-center gap-2"
        >
          <Puzzle className="h-4 w-4" />
          <span>{isUnlocked ? 'Replay Final Challenge' : 'Start Rapid Tap'}</span>
        </button>
      )}
    </div>
  );
}

