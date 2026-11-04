/**
 * Web Audio API Synthesis Engine for Alyanna's Top 5 Spotify Tracks
 * Features signature chord progressions, warm Rhodes/indie synth tones,
 * and audio analyser connection for real-time waveform visualizers.
 */

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  durationSec: number;
  badge: string;
  genre: string;
  vibe: string;
  image: string;
  accentColor: string;
  waveformPattern: number[];
  chords: number[][]; // MIDI note frequencies in Hz
  lyrics: string[];
}

// Note frequencies in Hz (Octaves 3, 4, 5)
const N = {
  // Octave 2 & 3 Bass/Keys
  E2: 82.41, F2: 87.31, Fs2: 92.5, G2: 98.0, A2: 110.0, Bb2: 116.54, B2: 123.47,
  C3: 130.81, Cs3: 138.59, D3: 146.83, Ds3: 155.56, Eb3: 155.56, E3: 164.81, F3: 174.61, Fs3: 185.0, G3: 196.0, Gs3: 207.65, Ab3: 207.65, A3: 220.0, Bb3: 233.08, B3: 246.94,
  // Octave 4 Mid
  C4: 261.63, Cs4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.0, Ab4: 415.3, A4: 440.0, Bb4: 466.16, B4: 493.88,
  // Octave 5 High
  C5: 523.25, Cs5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.0,
};

export const TOP_5_SONGS: SongTrack[] = [
  {
    id: 'cig-smoke',
    title: 'cigarette smoke',
    artist: 'Olivia Rodrigo',
    album: 'GUTS (spilled)',
    year: '2024',
    durationSec: 204, // 3:24
    badge: 'Alt Pop / Grunge',
    genre: 'Indie Rock',
    vibe: 'Raw gritty guitar chords, punchy bass groove & candid confessional punch',
    image: '/assets/aistudio/cig_smoke_bb59fb8e.jpg',
    accentColor: '#7895A2',
    waveformPattern: [32, 65, 88, 70, 92, 54, 76, 60],
    chords: [
      [N.G3, N.B3, N.D4, N.G4],     // G
      [N.E3, N.G3, N.B3, N.E4],     // Em
      [N.C3, N.E3, N.G3, N.C4],     // C
      [N.D3, N.Fs3, N.A3, N.D4],    // D
    ],
    lyrics: [
      'I smell like cigarette smoke and cheap perfume...',
      'Doing things I said I\'d never do, just to get over you.',
      'And everybody knows it, everybody sees,',
      'You\'re a habit I just can\'t kick, bringing me to my knees.',
    ],
  },
  {
    id: 'pretty-isnt-pretty',
    title: 'pretty isn\'t pretty',
    artist: 'Olivia Rodrigo',
    album: 'GUTS',
    year: '2023',
    durationSec: 199, // 3:19
    badge: 'New Wave Post-Punk',
    genre: 'Alt-Pop',
    vibe: 'Bouncing 80s chorus-drenched bassline with shimmering guitar textures',
    image: '/assets/aistudio/pretty_78b3af5a.jpg',
    accentColor: '#393366',
    waveformPattern: [45, 80, 68, 95, 75, 85, 62, 70],
    chords: [
      [N.Fs3, N.A3, N.Cs4, N.Fs4],  // F#m
      [N.D3, N.Fs3, N.A3, N.D4],    // D
      [N.A2, N.E3, N.A3, N.Cs4],    // A
      [N.E3, N.Gs3, N.B3, N.E4],    // E
    ],
    lyrics: [
      'Bought a bunch of makeup, trying on a new perfume...',
      'There\'s always something in the mirror that I wanna undo.',
      'And everybody tells me that I\'m overthinking it,',
      'Cause pretty isn\'t pretty enough anyway.',
    ],
  },
  {
    id: 'moths',
    title: 'Moths',
    artist: 'Conan Gray',
    album: 'Found Heaven',
    year: '2024',
    durationSec: 184, // 3:04 (matching user screenshot exact time 3:04)
    badge: 'Dream Synthpop',
    genre: 'Synthpop',
    vibe: 'Ethereal midnight synth pads, nostalgic reverb and emotive vocal resonance',
    image: '/assets/aistudio/moths_05573f74.jpg',
    accentColor: '#1A4D62',
    waveformPattern: [28, 48, 62, 50, 78, 64, 82, 55],
    chords: [
      [N.D3, N.F3, N.A3, N.D4],     // Dm
      [N.Bb2, N.D3, N.F3, N.Bb3],   // Bb
      [N.F3, N.A3, N.C4, N.F4],     // F
      [N.C3, N.E3, N.G3, N.C4],     // C
    ],
    lyrics: [
      'Like moths to a flame, we keep flying in the dark...',
      'Hoping this little spark won\'t tear us apart.',
      'You say we\'re getting closer, but we\'re burning in the light,',
      'Chasing shadows through the coldest of nights.',
    ],
  },
  {
    id: 'bags',
    title: 'Bags',
    artist: 'Clairo',
    album: 'Immunity',
    year: '2019',
    durationSec: 260, // 4:20
    badge: 'Indie Bedroom Pop',
    genre: 'Bedroom Pop',
    vibe: 'Warm vintage Rhodes electric keys with intimate lo-fi drum cadence',
    image: '/assets/aistudio/bags_de7af468.jpg',
    accentColor: '#6B6043',
    waveformPattern: [35, 55, 72, 60, 68, 58, 64, 48],
    chords: [
      [N.Bb3, N.D4, N.F4, N.A4],    // Bbmaj7
      [N.Eb3, N.G3, N.Bb3, N.D4],   // Ebmaj7
      [N.G3, N.Bb3, N.D4, N.F4],    // Gm7
      [N.F3, N.A3, N.C4, N.E4],     // F
    ],
    lyrics: [
      'Every second counting, I usually panic at these things...',
      'Can you tell that I am trying? I can see you checking in.',
      'Walking out the door with your bags packed light,',
      'Pardon my emotions, didn\'t mean to start a fight.',
    ],
  },
  {
    id: 'body-ready',
    title: 'My Body Isn\'t Ready',
    artist: 'sombr',
    album: 'in reverse',
    year: '2024',
    durationSec: 217, // 3:37 (matching user screenshot exact time 3:37)
    badge: 'Acoustic Indie Ballad',
    genre: 'Indie Alternative',
    vibe: 'Tender fingerpicked acoustic guitar with vulnerable melancholic warmth',
    image: '/assets/aistudio/body_cf535368.jpg',
    accentColor: '#525754',
    waveformPattern: [24, 42, 58, 76, 62, 80, 50, 44],
    chords: [
      [N.Cs3, N.E3, N.Gs3, N.Cs4],  // C#m
      [N.A2, N.Cs3, N.E3, N.A3],    // A
      [N.E3, N.Gs3, N.B3, N.E4],    // E
      [N.B2, N.Ds3, N.Fs3, N.B3],   // B
    ],
    lyrics: [
      'My body isn\'t ready to let you go yet...',
      'Counting every memory, wishing we had never met.',
      'Still feel your fingers running through my tangled hair,',
      'Waking up alone inside the cold midnight air.',
    ],
  },
];

class SpotifySynthAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  public analyser: AnalyserNode | null = null;
  private intervalId: number | null = null;
  private arpIntervalId: number | null = null;
  private chordIndex = 0;
  private activeNotes: OscillatorNode[] = [];
  private currentVolume = 0.85;
  private isMuted = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.currentVolume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTrack(track: SongTrack) {
    this.initContext();
    this.stop();

    if (!this.ctx || !this.masterGain) return;

    this.chordIndex = 0;
    const chords = track.chords;

    const playChordStep = () => {
      if (!this.ctx || !this.masterGain) return;

      const chord = chords[this.chordIndex % chords.length];
      this.chordIndex++;

      const now = this.ctx.currentTime;
      const stepDuration = 2.4;

      // Play each note with warm analog timbre based on track
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Waveform & filter customized per song's mood
        if (track.id === 'cig-smoke') {
          // Alt-rock guitar warmth (triangle with subtle overdrive-style lowpass)
          osc.type = 'triangle';
        } else if (track.id === 'pretty-isnt-pretty') {
          // 80s new wave synth pulse
          osc.type = 'sawtooth';
        } else if (track.id === 'moths') {
          // Dreamy ethereal sine/triangle pad
          osc.type = 'sine';
        } else if (track.id === 'bags') {
          // Clairo Rhodes keyboard tone
          osc.type = 'sine';
        } else {
          // Acoustic guitar harmonics
          osc.type = 'triangle';
        }

        // Slight natural detune for warmth
        const detuneAmount = (idx - 1.5) * 5;
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);
        osc.detune.setValueAtTime(detuneAmount, now);

        // Lowpass filter for smooth vintage presence
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        let cutoff = 1100;
        if (track.id === 'pretty-isnt-pretty') cutoff = 1600;
        if (track.id === 'moths') cutoff = 850;
        if (track.id === 'bags') cutoff = 1000;
        filter.frequency.setValueAtTime(cutoff, now);

        // Natural smooth attack and decay
        const peakGain = (track.id === 'pretty-isnt-pretty' ? 0.08 : 0.12) / Math.sqrt(chord.length);
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(peakGain, now + 0.1 + idx * 0.02);
        noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.5, now + 1.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + stepDuration);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now + idx * 0.03);
        osc.stop(now + stepDuration + 0.05);

        this.activeNotes.push(osc);
      });

      // Sub-bass root note for rich depth
      const bassFreq = chord[0] / 2;
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.exponentialRampToValueAtTime(0.15, now + 0.12);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + stepDuration);

      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);

      bassOsc.start(now);
      bassOsc.stop(now + stepDuration);
      this.activeNotes.push(bassOsc);
    };

    // Play first chord immediately
    playChordStep();

    // Loop chords every 2.4s
    this.intervalId = window.setInterval(playChordStep, 2400);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.arpIntervalId) {
      clearInterval(this.arpIntervalId);
      this.arpIntervalId = null;
    }
    this.activeNotes.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.activeNotes = [];
  }

  public setVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.currentVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getVisualizerData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

// Global singleton instance for app-wide playback
export const spotifySynth = new SpotifySynthAudio();
