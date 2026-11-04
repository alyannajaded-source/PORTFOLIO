export interface SecretFact {
  level: number;
  title: string;
  tag: string;
  fact: string;
  image: string;
  caption: string;
  difficulty: string;
  gameType: 'pairs-easy' | 'simon' | 'catcher' | 'pairs-hard' | 'speed-unlock';
  gameTitle: string;
  gamePrompt: string;
}

export const secretFactsData: SecretFact[] = [
  {
    level: 1,
    title: 'The Ultimate Fiesta Lechon Defender',
    tag: 'Childhood Fiesta Memory',
    fact: 'Back in Masbate during our big family fiestas, I took my job as official food protector very seriously! Before any guests arrived, I guarded the whole roasted crispy lechon on banana leaves, proudly flashing my signature peace sign pose—even when the lechon was practically larger than me!',
    image: '/assets/aistudio/6a62657d-e3be-4e08-82df-a902431edf3f_60a2aa25.jfif',
    caption: '✿ Little me guarding the crispy fiesta lechon & throwing up peace signs',
    difficulty: 'Warm-up',
    gameType: 'pairs-easy',
    gameTitle: 'Skills Match (Creativity & Logic)',
    gamePrompt: 'Flip & match the Creativity and Programming skill symbols to unlock Fact #1!',
  },
  {
    level: 2,
    title: 'The Sweetest Halo-Halo Sharing Circle',
    tag: 'Neighborhood Snack Story',
    fact: 'Growing up, my sisters, cousins, and I used to pool our spare coins after school to buy one gigantic, extra-tall halo-halo glass. We would sit together on the wooden table outside the local computer and LAN games shop, lovingly taking turns spoon-feeding each other so everyone got an equal taste of the sweet milk, shaved ice, and jellies!',
    image: '/assets/aistudio/26bfc54a-9ce4-4c7a-82bd-282b53c17e1b_61051316.jfif',
    caption: '✿ Sharing a single tall halo-halo glass with my sisters & cousins outside the shop',
    difficulty: 'Moderate',
    gameType: 'simon',
    gameTitle: 'Strengths Melody Sequence',
    gamePrompt: 'Watch the sequence of Core Skills (Palette, Puzzle, Book, Sparkles) and repeat the rhythm!',
  },
  {
    level: 3,
    title: 'The Secret Door-Crack Peek-a-Boo Duo',
    tag: 'Goofy Pet Antics',
    fact: 'Whenever someone knocks on my bedroom door, my pet and I have this unwritten ritual where we both squeeze our heads through the narrow door frame at the exact same split-second with the wildest, most theatrical shocked expressions. We’ve been perfecting this synchronized peek-a-boo comedy routine for years!',
    image: '/assets/aistudio/44287f35-6f22-4378-ac7f-e00fc2b58b49_6013cf74.jfif',
    caption: '✿ Synchronized door-peeking with my pet with matching funny faces',
    difficulty: 'Reflexes',
    gameType: 'catcher',
    gameTitle: 'Skills Badge Catcher',
    gamePrompt: 'Click/tap 8 falling Skill tokens (Code, Palette, Puzzle, Monitor) before time runs out!',
  },
  {
    level: 4,
    title: 'Midnight Lawn Talks Under Fairy Lights',
    tag: 'Barkada Night Tradition',
    fact: 'My favorite therapy after an exhausting week of college exams is gathering on the wide green park grass in a giant circle with my closest friends. Under the glow of warm hanging bistro lights, we sit cross-legged, sharing cheap takeout snacks, stargazing, and talking about our dreams and life until midnight.',
    image: '/assets/aistudio/9ec835b1-2b0c-4819-821b-a01012c877c8_4f80cd4c.jfif',
    caption: '✿ Sitting in a big circle on the green grass under strings of warm fairy lights',
    difficulty: 'Challenging',
    gameType: 'pairs-hard',
    gameTitle: 'Master Skills Memory Grid',
    gamePrompt: 'Match all 4 Core Skill pairs (Palette, Book, Puzzle, Code) under 30 seconds!',
  },
  {
    level: 5,
    title: 'The Speed-Walking Night Squad of Cebu',
    tag: 'College Shenanigans',
    fact: 'Whenever my college barkada and I walk down the bustling avenues of Cebu after class, it inevitably turns into an impromptu power-walking speed race! Carrying our heavy backpacks with city lights glowing around us, we laugh so uncontrollably while half-sprinting down the sidewalk that every candid photo comes out in pure kinetic motion blur!',
    image: '/assets/aistudio/9bca2359-d551-498e-9da0-1a94ec344807_184f81f4.jfif',
    caption: '✿ Motion blur late-night street walks with my backpack squad through Cebu city',
    difficulty: 'Grand Finale',
    gameType: 'speed-unlock',
    gameTitle: 'The Strengths Padlock & Master Cipher',
    gamePrompt: 'Channel your Time Management and Rapid Problem Solving—tap the golden lock 15 times before the 8-second fuse expires!',
  },
];
