import { useState, useEffect, useRef, useMemo, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Repeat,
  Shuffle,
  Music2,
  Sparkles,
  BookOpen,
  FileText,
  ChevronDown,
  Maximize2,
  Camera,
  RotateCcw,
  Star,
  Quote,
  Bookmark,
  ExternalLink,
  Layers,
  X,
  Radio,
  BookMarked,
} from 'lucide-react';
import { TOP_5_SONGS, SongTrack, spotifySynth } from '../utils/spotifyAudio';
import { TOP_5_NOVELS_COMICS, NovelComicItem } from '../data/novelsData';

export function TopMusic() {
  // === MUSIC STATE ===
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isLikedSong, setIsLikedSong] = useState<Record<string, boolean>>({
    'cig-smoke': true,
    'moths': true,
    'bags': true,
  });
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [expandedSong, setExpandedSong] = useState<SongTrack | null>(null);

  // Custom user photo overrides
  const [customCovers, setCustomCovers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('alyanna_spotify_custom_covers_v3');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetUploadSongId, setTargetUploadSongId] = useState<string | null>(null);

  // Audio timer & visualizer
  const timerRef = useRef<number | null>(null);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([20, 48, 32, 60, 40]);

  const activeSong = useMemo(() => TOP_5_SONGS[activeSongIndex], [activeSongIndex]);

  // === NOVELS & COMICS STATE ===
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const [selectedBookModal, setSelectedBookModal] = useState<NovelComicItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({
    orv: true,
    eleceed: true,
  });

  const activeBook = useMemo(
    () => TOP_5_NOVELS_COMICS[activeBookIndex],
    [activeBookIndex]
  );

  // Toggle Play / Pause
  const handleTogglePlay = (targetIdx?: number) => {
    const nextIdx = targetIdx !== undefined ? targetIdx : activeSongIndex;

    if (targetIdx !== undefined && targetIdx !== activeSongIndex) {
      setActiveSongIndex(nextIdx);
      setIsPlaying(true);
      spotifySynth.playTrack(TOP_5_SONGS[nextIdx]);
      setCurrentTimeSec(0);
      return;
    }

    if (isPlaying) {
      spotifySynth.stop();
      setIsPlaying(false);
    } else {
      spotifySynth.playTrack(TOP_5_SONGS[nextIdx]);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    let nextIdx = (activeSongIndex + 1) % TOP_5_SONGS.length;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * TOP_5_SONGS.length);
      if (nextIdx === activeSongIndex) nextIdx = (activeSongIndex + 1) % TOP_5_SONGS.length;
    }
    setActiveSongIndex(nextIdx);
    setCurrentTimeSec(0);
    if (isPlaying) {
      spotifySynth.playTrack(TOP_5_SONGS[nextIdx]);
    }
  };

  const handlePrev = () => {
    const prevIdx = (activeSongIndex - 1 + TOP_5_SONGS.length) % TOP_5_SONGS.length;
    setActiveSongIndex(prevIdx);
    setCurrentTimeSec(0);
    if (isPlaying) {
      spotifySynth.playTrack(TOP_5_SONGS[prevIdx]);
    }
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    spotifySynth.setVolume(newVal);
    setIsMuted(newVal === 0);
  };

  const handleToggleMute = () => {
    const muted = spotifySynth.toggleMute();
    setIsMuted(muted);
  };

  // Progress timer loop & visualizer animation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= activeSong.durationSec) {
            if (isRepeat) return 0;
            handleNext();
            return 0;
          }
          return prev + 1;
        });

        // Dynamic visualizer bars
        setVisualizerBars([
          Math.floor(22 + Math.random() * 65),
          Math.floor(38 + Math.random() * 58),
          Math.floor(45 + Math.random() * 52),
          Math.floor(30 + Math.random() * 66),
          Math.floor(20 + Math.random() * 62),
        ]);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setVisualizerBars([14, 20, 16, 22, 16]);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeSong, isRepeat, isShuffle]);

  useEffect(() => {
    return () => {
      spotifySynth.stop();
    };
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTimeSec(Math.floor(ratio * activeSong.durationSec));
  };

  // Upload custom picture for song
  const triggerImageUpload = (songId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetUploadSongId(songId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetUploadSongId) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          const updated = { ...customCovers, [targetUploadSongId]: result };
          setCustomCovers(updated);
          try {
            localStorage.setItem('alyanna_spotify_custom_covers_v3', JSON.stringify(updated));
          } catch {
            // storage quota
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetCovers = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomCovers({});
    try {
      localStorage.removeItem('alyanna_spotify_custom_covers_v3');
    } catch {
      // storage
    }
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Archive codes for the 5 music tracks
  const musicCodes = [
    'TRACK_001 // CIG SMOKE',
    'TRACK_002 // PRETTY',
    'TRACK_003 // MOTHS',
    'TRACK_004 // BAGS',
    'TRACK_005 // MY BODY',
  ];

  return (
    <section
      id="music"
      className="relative py-24 overflow-hidden border-b border-[#291100]/10 bg-[#FAF8F2]"
    >
      {/* Hidden file input for custom song images */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Decorative Washi Tape Accent */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="h-5 w-40 bg-[#D4C04D]/70 border-l border-r border-dashed border-[#FAF8F2] shadow-xs rotate-[-1deg]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1DB954] bg-[#1DB954]/10 px-3 py-1 rounded-full border border-[#1DB954]/30 flex items-center gap-1.5 shadow-xs">
                <Music2 className="h-3 w-3" />
                Spotify Soundtracks
              </span>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#657733] bg-[#657733]/10 px-3 py-1 rounded-full border border-[#657733]/30 flex items-center gap-1.5 shadow-xs">
                <BookOpen className="h-3 w-3" />
                Novels & Comics Library
              </span>
              <span className="font-hand text-xl text-[#657733]">page five</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#291100] tracking-tight">
              My Top 5 Music & Comics
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#291100]/75 font-sans max-w-2xl">
              Organized side-by-side in archival tabbed card decks inspired by Japanese file logs.
              On the left, Alyanna&apos;s on-repeat Spotify tracks (tap to play chords); on the right, her all-time favorite novels, webtoons, and manga.
            </p>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {Object.keys(customCovers).length > 0 && (
              <button
                onClick={resetCovers}
                className="text-xs font-mono font-medium text-[#291100]/70 hover:text-[#291100] flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#291100]/15 shadow-xs cursor-pointer"
                title="Reset custom artwork"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Covers</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#291100]/15 shadow-xs text-xs font-mono text-[#291100]/75">
              <Sparkles className="h-3.5 w-3.5 text-[#D4C04D]" />
              <span>Interactive Audio & Book Slips</span>
            </div>
          </div>
        </div>

        {/* SIDE-BY-SIDE SHOWCASE GRID: Left = Top 5 Music | Right = Top 5 Novels & Comics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT SIDE: TOP 5 MUSIC (Archival File Folder Spine Deck)  */}
          {/* ========================================================= */}
          <div className="flex flex-col bg-[#FAF8F5] rounded-3xl border-2 border-[#291100]/15 p-4 sm:p-6 shadow-polaroid relative overflow-hidden">
            {/* Top Scrapbook Tape Accent */}
            <div className="pointer-events-none absolute -top-3 left-8 z-20">
              <div className="h-5 w-24 bg-[#D7E3A4]/90 border-l border-r border-dashed border-[#FAF8F2] shadow-xs rotate-[-2deg]" />
            </div>

            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#291100]/10">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#121212] flex items-center justify-center text-[#1DB954] shadow-xs">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.306c-.217.357-.678.472-1.035.254-2.836-1.733-6.406-2.124-10.609-1.164-.408.093-.812-.162-.905-.57-.093-.408.162-.812.57-.905 4.606-1.053 8.563-.604 11.725 1.35.357.218.472.678.254 1.035zm1.468-3.26c-.273.443-.852.585-1.295.312-3.246-1.996-8.196-2.573-12.035-1.408-.5.152-1.03-.134-1.182-.634-.152-.5.134-1.03.634-1.182 4.385-1.33 9.832-.684 13.566 1.617.443.273.585.852.312 1.295zm.126-3.396c-3.893-2.312-10.315-2.525-14.037-1.395-.596.182-1.228-.157-1.41-.753-.182-.596.157-1.228.753-1.41 4.285-1.301 11.378-1.052 15.86 1.611.536.318.71 1.013.392 1.549-.318.536-1.013.71-1.558.398z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#291100] tracking-tight">
                    Top 5 Music On Repeat
                  </h3>
                  <span className="font-mono text-[10px] text-[#657733] uppercase tracking-wider font-semibold">
                    Archive Spines • Side-by-Side Deck
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[#291100]/60">
                <span className="hidden sm:inline">track {activeSongIndex + 1} of 5</span>
                {isPlaying && (
                  <span className="flex items-center gap-1 text-[#1DB954] font-bold">
                    <Radio className="h-3.5 w-3.5 animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>
            </div>

            {/* TABBED CARDS CONTAINER (Matching reference image: overlapping folder cards with tabs sticking up) */}
            <div className="relative pt-8 pb-3 min-h-[460px] flex flex-col justify-end">
              {/* TOP PROTRUDING FILE TABS (Staggered like folder tabs across the top edge) */}
              <div className="absolute top-0 inset-x-0 h-10 flex items-end gap-1 px-1 z-20">
                {TOP_5_SONGS.map((song, idx) => {
                  const isActive = idx === activeSongIndex;
                  return (
                    <button
                      key={song.id}
                      onClick={() => handleTogglePlay(idx)}
                      className={`relative flex-1 h-9 sm:h-10 rounded-t-xl px-1.5 sm:px-2 pt-1.5 border-t border-l border-r font-mono text-[9px] sm:text-[10px] tracking-tight transition-all cursor-pointer truncate flex items-center justify-between ${
                        isActive
                          ? 'bg-[#181818] text-white border-white/20 shadow-lg -translate-y-1 z-30 font-bold'
                          : 'bg-[#DCD8CD] hover:bg-[#EAE6DB] text-[#291100]/80 border-[#291100]/20 hover:-translate-y-0.5 z-10'
                      }`}
                      title={`${song.title} by ${song.artist}`}
                    >
                      <span className="truncate">
                        {musicCodes[idx].replace('TRACK_', 'T')}
                      </span>
                      {isActive && isPlaying && (
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* OVERLAPPING HORIZONTAL SLEEVE CAROUSEL (File folder deck inspired by download_21da92a3.jfif) */}
              <div className="relative w-full h-[400px] sm:h-[430px] rounded-2xl overflow-hidden bg-[#121212] border-2 border-black/30 shadow-2xl p-2 sm:p-3 flex gap-2">
                {TOP_5_SONGS.map((song, idx) => {
                  const isActive = idx === activeSongIndex;
                  const coverSrc = customCovers[song.id] || song.image;

                  return (
                    <motion.div
                      key={song.id}
                      onClick={() => handleTogglePlay(idx)}
                      layout
                      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                      className={`relative rounded-xl overflow-hidden cursor-pointer select-none transition-all flex flex-col justify-between ${
                        isActive
                          ? 'flex-[5] bg-[#1a1a1a] ring-2 ring-[#1DB954] shadow-2xl'
                          : 'flex-[1] hover:flex-[1.3] bg-[#222222] border border-white/10 opacity-75 hover:opacity-100'
                      }`}
                    >
                      {/* Active Expanded Card View */}
                      {isActive ? (
                        <div className="relative h-full w-full flex flex-col justify-between p-3.5 sm:p-4 text-white">
                          {/* Background Artwork with Subtle Overlay */}
                          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                            <img
                              src={coverSrc}
                              alt={song.title}
                              className="h-full w-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                          </div>

                          {/* Top Spine Code & Quick Actions */}
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#1DB954] border border-[#1DB954]/40 flex items-center gap-1 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                                #{idx + 1} • {song.badge}
                              </span>
                              <span className="font-mono text-[9px] text-white/70 hidden sm:inline">
                                {musicCodes[idx]}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Fullscreen Artwork Lightbox */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedSong(song);
                                }}
                                className="h-7 w-7 rounded-full bg-black/75 hover:bg-[#1DB954] text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors shadow-xs"
                                title="Inspect high-res artwork"
                              >
                                <Maximize2 className="h-3 w-3" />
                              </button>

                              {/* Camera icon to customize photo */}
                              <button
                                onClick={(e) => triggerImageUpload(song.id, e)}
                                className="h-7 w-7 rounded-full bg-black/75 hover:bg-[#1DB954] text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors shadow-xs"
                                title="Change picture for this track"
                              >
                                <Camera className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          {/* Center Big Play Button Overlay */}
                          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTogglePlay(idx);
                              }}
                              className="h-16 w-16 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-[0_10px_30px_rgba(29,185,84,0.45)] transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
                              title={isPlaying ? 'Pause song' : 'Play song'}
                            >
                              {isPlaying ? (
                                <Pause className="h-7 w-7 fill-black" />
                              ) : (
                                <Play className="h-7 w-7 fill-black ml-1" />
                              )}
                            </button>
                            <span className="font-mono text-[10px] text-white/90 mt-2 font-semibold tracking-wider bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                              {isPlaying ? 'PLAYING REAL AUDIO' : 'TAP TO PLAY'}
                            </span>
                          </div>

                          {/* Bottom Metadata & Soundwave */}
                          <div className="relative z-10 pt-2">
                            <div className="flex items-end justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight truncate drop-shadow-md">
                                  {song.title}
                                </h4>
                                <p className="font-sans text-xs sm:text-sm text-white/80 truncate">
                                  {song.artist} • <span className="text-white/60">{song.album}</span>
                                </p>
                              </div>

                              {/* Equalizer animation */}
                              {isPlaying && (
                                <div className="flex items-end gap-1 px-2 py-1 rounded-lg bg-black/60 border border-white/15 backdrop-blur-md shrink-0">
                                  {visualizerBars.map((bar, bIdx) => (
                                    <motion.span
                                      key={bIdx}
                                      className="w-1 bg-[#1DB954] rounded-full"
                                      animate={{ height: `${Math.max(4, bar / 4.5)}px` }}
                                      transition={{ duration: 0.15 }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Barcode Strip matching reference image style */}
                            <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-white/60">
                              <span className="tracking-widest">||| | |||| | || |</span>
                              <span>{formatTime(activeSong.durationSec)}</span>
                              <span className="uppercase text-[#1DB954]">{song.genre}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Collapsed Vertical Folder Spine View */
                        <div className="relative h-full w-full flex flex-col justify-between items-center py-4 px-1 text-white">
                          <span className="font-mono text-[10px] font-bold text-[#1DB954]">
                            0{idx + 1}
                          </span>

                          {/* Rotated Vertical Title along spine */}
                          <div className="writing-vertical-rl transform rotate-180 font-mono text-xs tracking-wider text-white/80 font-medium truncate max-h-[220px]">
                            {song.title}
                          </div>

                          <div className="h-6 w-6 rounded-full bg-black/80 flex items-center justify-center text-white/70 border border-white/10 group-hover:bg-[#1DB954] group-hover:text-black transition-colors">
                            <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* INTEGRATED SPOTIFY MINI PLAYER CAPSULE */}
            <div className="mt-4 pt-4 border-t border-[#291100]/10">
              {/* Scrubbable Seek Bar */}
              <div className="mb-2.5 px-1">
                <div
                  onClick={handleSeek}
                  className="group relative h-1.5 w-full bg-[#291100]/15 hover:h-2 rounded-full cursor-pointer transition-all overflow-hidden"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#1DB954] to-[#22c55e] rounded-full relative transition-all"
                    style={{
                      width: `${(currentTimeSec / activeSong.durationSec) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-[#291100]/60 mt-1">
                  <span>{formatTime(currentTimeSec)}</span>
                  <span className="truncate max-w-[160px] text-center font-sans font-medium">
                    {activeSong.title} — {activeSong.artist}
                  </span>
                  <span>{formatTime(activeSong.durationSec)}</span>
                </div>
              </div>

              {/* The Player Controls Row */}
              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 rounded-2xl bg-[#181818] border border-white/15 text-white shadow-xl">
                {/* Playback Buttons */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer hidden sm:block ${
                      isShuffle ? 'text-[#1DB954]' : 'text-white/50'
                    }`}
                    title="Toggle Shuffle"
                  >
                    <Shuffle className="h-3 w-3" />
                  </button>

                  <button
                    onClick={handlePrev}
                    className="p-1 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Previous Track"
                  >
                    <SkipBack className="h-3.5 w-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => handleTogglePlay()}
                    className="h-8 w-8 rounded-full bg-[#1DB954] text-black hover:scale-105 active:scale-95 flex items-center justify-center transition-transform cursor-pointer shadow-md"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 fill-black" />
                    ) : (
                      <Play className="h-4 w-4 fill-black ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-1 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Next Track"
                  >
                    <SkipForward className="h-3.5 w-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => setIsRepeat(!isRepeat)}
                    className={`p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer hidden sm:block ${
                      isRepeat ? 'text-[#1DB954]' : 'text-white/50'
                    }`}
                    title="Toggle Repeat"
                  >
                    <Repeat className="h-3 w-3" />
                  </button>
                </div>

                {/* Like Button */}
                <button
                  onClick={() =>
                    setIsLikedSong({
                      ...isLikedSong,
                      [activeSong.id]: !isLikedSong[activeSong.id],
                    })
                  }
                  className={`p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer ${
                    isLikedSong[activeSong.id] ? 'text-[#1DB954]' : 'text-white/40'
                  }`}
                  title="Favorite track"
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      isLikedSong[activeSong.id] ? 'fill-[#1DB954]' : ''
                    }`}
                  />
                </button>

                {/* Lyrics & Volume */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowLyrics(!showLyrics)}
                    className={`p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer ${
                      showLyrics ? 'text-[#1DB954] bg-white/10' : 'text-white/70'
                    }`}
                    title="View lyrics"
                  >
                    <FileText className="h-3.5 w-3.5" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={handleToggleMute}
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-3.5 w-3.5 text-red-400" />
                      ) : (
                        <Volume2 className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <AnimatePresence>
                      {showVolumeSlider && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          onMouseLeave={() => setShowVolumeSlider(false)}
                          className="absolute bottom-9 right-0 p-2 rounded-xl bg-[#181818] border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-2 z-30"
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="w-16 accent-[#1DB954] cursor-pointer"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Lyrics Snippet Drawer */}
              <AnimatePresence>
                {showLyrics && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-3 rounded-xl bg-[#181818] border border-white/15 text-white text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#1DB954] font-bold">
                        Lyrics Snippet • {activeSong.title}
                      </span>
                      <button
                        onClick={() => setShowLyrics(false)}
                        className="text-white/40 hover:text-white"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="space-y-1 font-sans text-white/80">
                      {activeSong.lyrics.map((line, lIdx) => (
                        <p
                          key={lIdx}
                          className={lIdx === 1 ? 'text-[#1DB954] font-medium' : ''}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT SIDE: TOP 5 NOVELS & COMICS (Matching Archival Folder Deck) */}
          {/* ================================================================= */}
          <div className="flex flex-col bg-[#FAF8F5] rounded-3xl border-2 border-[#291100]/15 p-4 sm:p-6 shadow-polaroid relative overflow-hidden">
            {/* Top Scrapbook Tape Accent */}
            <div className="pointer-events-none absolute -top-3 right-8 z-20">
              <div className="h-5 w-24 bg-[#FAD4C0]/90 border-l border-r border-dashed border-[#FAF8F2] shadow-xs rotate-[3deg]" />
            </div>

            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#291100]/10">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#657733] flex items-center justify-center text-[#FAF8F2] shadow-xs">
                  <BookMarked className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#291100] tracking-tight">
                    Top 5 Novels & Comics
                  </h3>
                  <span className="font-mono text-[10px] text-[#657733] uppercase tracking-wider font-semibold">
                    Alyanna&apos;s Library • Handpicked Archive
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[#291100]/60">
                <span className="hidden sm:inline">vol {activeBookIndex + 1} of 5</span>
                <span className="flex items-center gap-1 text-[#657733] font-bold">
                  <Star className="h-3 w-3 fill-current text-[#D4C04D]" />
                  {activeBook.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* TABBED CARDS CONTAINER (Matching reference image: overlapping folder cards with tabs sticking up) */}
            <div className="relative pt-8 pb-3 min-h-[460px] flex flex-col justify-end">
              {/* TOP PROTRUDING FILE TABS */}
              <div className="absolute top-0 inset-x-0 h-10 flex items-end gap-1 px-1 z-20">
                {TOP_5_NOVELS_COMICS.map((book, idx) => {
                  const isActive = idx === activeBookIndex;
                  return (
                    <button
                      key={book.id}
                      onClick={() => setActiveBookIndex(idx)}
                      className={`relative flex-1 h-9 sm:h-10 rounded-t-xl px-1.5 sm:px-2 pt-1.5 border-t border-l border-r font-mono text-[9px] sm:text-[10px] tracking-tight transition-all cursor-pointer truncate flex items-center justify-between ${
                        isActive
                          ? 'bg-[#291100] text-[#FAF8F2] border-[#291100] shadow-lg -translate-y-1 z-30 font-bold'
                          : 'bg-[#E3DFD5] hover:bg-[#EFECE3] text-[#291100]/80 border-[#291100]/20 hover:-translate-y-0.5 z-10'
                      }`}
                      title={`${book.title} by ${book.author}`}
                    >
                      <span className="truncate">{book.code.split(' // ')[1]}</span>
                      {isActive && (
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4C04D] ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* OVERLAPPING HORIZONTAL SLEEVE CAROUSEL (Archive Spine Deck) */}
              <div className="relative w-full h-[400px] sm:h-[430px] rounded-2xl overflow-hidden bg-[#241E18] border-2 border-[#291100]/30 shadow-2xl p-2 sm:p-3 flex gap-2">
                {TOP_5_NOVELS_COMICS.map((book, idx) => {
                  const isActive = idx === activeBookIndex;

                  return (
                    <motion.div
                      key={book.id}
                      onClick={() => setActiveBookIndex(idx)}
                      layout
                      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                      className={`relative rounded-xl overflow-hidden cursor-pointer select-none transition-all flex flex-col justify-between ${
                        isActive
                          ? 'flex-[5] bg-[#2d241d] ring-2 ring-[#D4C04D] shadow-2xl'
                          : 'flex-[1] hover:flex-[1.3] bg-[#1a1410] border border-white/10 opacity-75 hover:opacity-100'
                      }`}
                    >
                      {/* Active Expanded Book View */}
                      {isActive ? (
                        <div className="relative h-full w-full flex flex-col justify-between p-3.5 sm:p-4 text-white">
                          {/* Background Book Cover Artwork with Rich Overlay */}
                          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="h-full w-full object-cover object-center filter brightness-[0.65] contrast-[1.08]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                          </div>

                          {/* Top Spine Code & Bookmark Button */}
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#D4C04D] border border-[#D4C04D]/40 flex items-center gap-1 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4C04D]" />
                                {book.badge}
                              </span>
                              <span className="font-mono text-[9px] text-white/70 hidden sm:inline">
                                {book.code}
                              </span>
                            </div>

                            <button
                              onClick={(e) => toggleBookmark(book.id, e)}
                              className={`h-7 w-7 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors shadow-xs ${
                                bookmarkedIds[book.id]
                                  ? 'bg-[#D4C04D] text-[#291100]'
                                  : 'bg-black/70 text-white/70 hover:text-white'
                              }`}
                              title={
                                bookmarkedIds[book.id]
                                  ? 'Bookmarked in reading list'
                                  : 'Bookmark this title'
                              }
                            >
                              <Bookmark className="h-3 w-3 fill-current" />
                            </button>
                          </div>

                          {/* Center Quote Callout with Vintage Quotation Marks */}
                          <div className="relative z-10 my-auto p-3 rounded-xl bg-black/65 border border-white/15 backdrop-blur-md max-w-sm mx-auto text-left shadow-lg">
                            <div className="flex items-start gap-2">
                              <Quote className="h-4 w-4 text-[#D4C04D] shrink-0 mt-0.5" />
                              <div>
                                <p className="font-serif italic text-xs sm:text-[13px] text-white/95 leading-relaxed line-clamp-3">
                                  &ldquo;{book.quote}&rdquo;
                                </p>
                                <p className="font-mono text-[9px] text-[#D4C04D] mt-1.5 uppercase tracking-wider font-semibold">
                                  — Favorite line • {book.author}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Metadata & Review Button */}
                          <div className="relative z-10 pt-2">
                            <div className="flex items-end justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight truncate drop-shadow-md">
                                  {book.title}
                                </h4>
                                <p className="font-sans text-xs text-white/80 truncate">
                                  by {book.author}{' '}
                                  {book.illustrator && (
                                    <span className="text-white/60">• Art: {book.illustrator}</span>
                                  )}
                                </p>
                              </div>

                              {/* Star Rating Badge */}
                              <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-black/70 border border-white/15 backdrop-blur-md shrink-0 text-[#D4C04D]">
                                <Star className="h-3 w-3 fill-current" />
                                <span className="font-mono text-xs font-bold text-white">
                                  {book.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>

                            {/* Barcode Strip & Format Tag */}
                            <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-white/60">
                              <span className="tracking-widest">||| || | |||| ||</span>
                              <span className="text-white/80">{book.chaptersOrPages}</span>
                              <span className="uppercase text-[#D4C04D] font-bold">
                                {book.type.split(' ')[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Collapsed Vertical Book Spine View */
                        <div className="relative h-full w-full flex flex-col justify-between items-center py-4 px-1 text-white">
                          <span className="font-mono text-[10px] font-bold text-[#D4C04D]">
                            0{idx + 1}
                          </span>

                          {/* Rotated Vertical Title along book spine */}
                          <div className="writing-vertical-rl transform rotate-180 font-mono text-xs tracking-wider text-white/80 font-medium truncate max-h-[220px]">
                            {book.title}
                          </div>

                          <div className="h-6 w-6 rounded-full bg-black/80 flex items-center justify-center text-white/70 border border-white/10 group-hover:bg-[#D4C04D] group-hover:text-black transition-colors">
                            <BookOpen className="h-2.5 w-2.5" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* INTEGRATED BOOK SUMMARY CARD & DETAIL DRAWER TRIGGER */}
            <div className="mt-4 pt-4 border-t border-[#291100]/10 flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-white border border-[#291100]/10 shadow-xs">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#657733]/15 text-[#657733]">
                      {activeBook.type}
                    </span>
                    <span className="text-xs text-[#291100]/50">•</span>
                    <span className="font-sans text-xs text-[#291100]/70 truncate">
                      {activeBook.status}
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-sm text-[#291100] truncate">
                    {activeBook.title}
                  </h5>
                  <p className="font-sans text-xs text-[#291100]/75 line-clamp-1 mt-0.5">
                    {activeBook.tagline}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBookModal(activeBook)}
                  className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#657733] hover:bg-[#526129] text-[#FAF8F2] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Alyanna&apos;s Review & Notes</span>
                </button>
              </div>

              {/* Bottom Archival Footnote */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#291100]/60 px-1">
                <span>FORMAT: {activeBook.genre}</span>
                <span className="text-[#657733] font-semibold">{activeBook.readCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section Footnote */}
        <div className="mt-12 text-center text-xs font-mono text-[#291100]/60 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-[#657733]" />
            Side-by-Side Dual Archive Decks
          </span>
          <span>•</span>
          <span>Click any card spine to slide it forward</span>
          <span>•</span>
          <span>Real chord audio synthesis on music click</span>
        </div>
      </div>

      {/* LIGHTBOX MODAL: FULL ALBUM ARTWORK */}
      <AnimatePresence>
        {expandedSong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedSong(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#181818] rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 text-white"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                <img
                  src={customCovers[expandedSong.id] || expandedSong.image}
                  alt={`${expandedSong.artist} - ${expandedSong.title}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-lg text-white">
                    {expandedSong.title}
                  </h4>
                  <p className="font-sans text-xs text-white/70">
                    {expandedSong.artist} • {expandedSong.album} ({expandedSong.year})
                  </p>
                </div>

                <button
                  onClick={() => {
                    const idx = TOP_5_SONGS.findIndex((s) => s.id === expandedSong.id);
                    if (idx !== -1) {
                      handleTogglePlay(idx);
                    }
                  }}
                  className="h-11 w-11 rounded-full bg-[#1DB954] hover:scale-105 active:scale-95 text-black flex items-center justify-center transition-transform shadow-lg cursor-pointer"
                >
                  {isPlaying && activeSong.id === expandedSong.id ? (
                    <Pause className="h-5 w-5 fill-black" />
                  ) : (
                    <Play className="h-5 w-5 fill-black ml-0.5" />
                  )}
                </button>
              </div>

              <button
                onClick={() => setExpandedSong(null)}
                className="mt-4 w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAIL MODAL: NOVEL & COMIC REVIEW & EXCERPT */}
      <AnimatePresence>
        {selectedBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBookModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FAF8F2] rounded-3xl overflow-hidden border-2 border-[#291100]/20 shadow-2xl p-6 text-[#291100] max-h-[90vh] overflow-y-auto"
            >
              {/* Top Scrapbook Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#291100]/15 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase font-bold text-[#657733] bg-[#657733]/10 px-2.5 py-0.5 rounded-md">
                    {selectedBookModal.code}
                  </span>
                  <span className="font-hand text-lg text-[#657733]">Alyanna&apos;s Reading Journal</span>
                </div>
                <button
                  onClick={() => setSelectedBookModal(null)}
                  className="p-1.5 rounded-full hover:bg-[#291100]/10 text-[#291100]/60 hover:text-[#291100] transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cover & Title Block */}
              <div className="flex gap-4 items-start mb-5">
                <div className="h-32 w-24 rounded-xl overflow-hidden shrink-0 shadow-md border border-[#291100]/15 bg-black">
                  <img
                    src={selectedBookModal.image}
                    alt={selectedBookModal.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#D4C04D] bg-[#291100] px-2 py-0.5 rounded-md">
                      {selectedBookModal.badge}
                    </span>
                    <span className="font-sans text-xs text-[#291100]/60">
                      {selectedBookModal.type}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#291100] leading-tight">
                    {selectedBookModal.title}
                  </h3>
                  {selectedBookModal.nativeTitle && (
                    <p className="font-sans text-xs text-[#291100]/60 italic mt-0.5">
                      {selectedBookModal.nativeTitle}
                    </p>
                  )}
                  <p className="font-sans text-xs text-[#291100]/80 mt-1 font-medium">
                    By <span className="font-semibold text-[#657733]">{selectedBookModal.author}</span>
                    {selectedBookModal.illustrator && (
                      <span> • Art: {selectedBookModal.illustrator}</span>
                    )}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[#D4C04D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="font-mono text-xs font-bold text-[#291100] ml-1">
                      {selectedBookModal.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Favorite Quote Paper Card */}
              <div className="p-4 rounded-2xl bg-[#ECF5E2] border border-[#657733]/20 mb-5 relative">
                <Quote className="h-5 w-5 text-[#657733]/60 absolute top-3 right-3" />
                <p className="font-serif italic text-sm text-[#291100] leading-relaxed pr-6">
                  &ldquo;{selectedBookModal.quote}&rdquo;
                </p>
                <span className="block font-mono text-[10px] text-[#657733] uppercase tracking-wider font-bold mt-2">
                  ✦ Favorite Excerpt
                </span>
              </div>

              {/* Alyanna's Personal Review */}
              <div className="mb-5">
                <h4 className="font-mono text-xs uppercase font-bold text-[#291100]/70 tracking-wider mb-1.5 flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-[#657733]" />
                  Why I Love This Story:
                </h4>
                <p className="font-sans text-sm text-[#291100]/85 leading-relaxed bg-white p-3.5 rounded-xl border border-[#291100]/10">
                  {selectedBookModal.review}
                </p>
              </div>

              {/* Story Details Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-5">
                <div className="p-2.5 rounded-xl bg-white border border-[#291100]/10">
                  <span className="text-[#291100]/50 block text-[10px]">GENRE</span>
                  <span className="font-semibold text-[#291100]">{selectedBookModal.genre}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#291100]/10">
                  <span className="text-[#291100]/50 block text-[10px]">LENGTH</span>
                  <span className="font-semibold text-[#291100]">{selectedBookModal.chaptersOrPages}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#291100]/10">
                  <span className="text-[#291100]/50 block text-[10px]">READING STATUS</span>
                  <span className="font-semibold text-[#657733]">{selectedBookModal.readCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#291100]/10">
                  <span className="text-[#291100]/50 block text-[10px]">SERIALIZATION</span>
                  <span className="font-semibold text-[#291100]">{selectedBookModal.status}</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedBookModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#291100] text-[#FAF8F2] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#431f05] transition-colors cursor-pointer"
              >
                Close Journal Entry
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
