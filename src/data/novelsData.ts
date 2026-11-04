export interface NovelComicItem {
  id: string;
  code: string;
  title: string;
  nativeTitle?: string;
  author: string;
  illustrator?: string;
  type: string; // 'Webtoon' | 'Novel' | 'Manga'
  genre: string;
  rating: number;
  readCount: string;
  status: string;
  tagline: string;
  image: string;
  paperColor: string;
  tabColor: string;
  accentColor: string;
  quote: string;
  review: string;
  badge: string;
  chaptersOrPages: string;
}

export const TOP_5_NOVELS_COMICS: NovelComicItem[] = [
  {
    id: 'orv',
    code: 'VOL_001 // ORV',
    title: "Omniscient Reader's Viewpoint",
    nativeTitle: '전지적 독자 시점',
    author: 'Sing Shong',
    illustrator: 'Sleepy-C (Redice Studio)',
    type: 'Webtoon & Web Novel',
    genre: 'Apocalyptic / Dark Fantasy / Action',
    rating: 5.0,
    readCount: 'Read 3 times',
    status: 'Completed Novel • Ongoing Webtoon',
    chaptersOrPages: '551 Chapters • 220+ Webtoon Ep',
    tagline: 'Only one reader knows the end of this ruined world.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    paperColor: '#0F172A',
    tabColor: '#1E293B',
    accentColor: '#38BDF8',
    quote:
      'There are three ways to survive in an apocalyptic world. Now, I have forgotten a few, but one thing is certain: you who are reading these lines will survive.',
    review:
      "Kim Dokja's story is one of my deepest artistic and literary inspirations. The blend of fourth-wall breaking, self-sacrifice, camaraderie, and complex world-building makes it an unmatched masterpiece in modern Korean fiction.",
    badge: 'All-Time Favorite',
  },
  {
    id: 'achilles',
    code: 'VOL_002 // ACHILLES',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    type: 'Literary Historical Novel',
    genre: 'Mythology / Tragedy / Poetic Fiction',
    rating: 5.0,
    readCount: 'Finished & Treasured',
    status: 'Completed Novel',
    chaptersOrPages: '416 Pages',
    tagline: 'He is half of my soul, as the poets say.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    paperColor: '#451A03',
    tabColor: '#78350F',
    accentColor: '#F59E0B',
    quote:
      'I could recognize him by touch alone, by smell; I would know him blind, by the way his breaths came and his feet struck the earth. I would know him in death, at the end of the world.',
    review:
      'Lyrical, devastating, and written with breathtaking tenderness. Madeline Miller transforms ancient mythology into an intimate, heart-wrenching meditation on honor, fate, and everlasting devotion.',
    badge: 'Heartbreaking Masterpiece',
  },
  {
    id: 'eleceed',
    code: 'VOL_003 // ELECEED',
    title: 'Eleceed',
    author: 'Jeho Son',
    illustrator: 'ZHENA',
    type: 'Action / Supernatural Webtoon',
    genre: 'Urban Fantasy / Comedy / Martial Arts',
    rating: 4.9,
    readCount: 'Weekly Reader',
    status: 'Ongoing Serialization',
    chaptersOrPages: '290+ Chapters',
    tagline: 'An extraordinary kindhearted boy meets an overpowered cat.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
    paperColor: '#18181B',
    tabColor: '#27272A',
    accentColor: '#F97316',
    quote:
      'Never look down on someone who has the courage to protect those who cannot protect themselves.',
    review:
      "Kayden trapped in a chubby orange cat's body produces the funniest scenes, but when the battles begin, ZHENA's lightning-fast art is utterly mesmerizing. Jiwoo's genuine kindness is so comforting.",
    badge: 'Comfort Webtoon',
  },
  {
    id: 'evelyn-hugo',
    code: 'VOL_004 // EVELYN',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    type: 'Historical Fiction Novel',
    genre: 'Old Hollywood / Drama / Romance',
    rating: 4.9,
    readCount: 'Read in one sitting',
    status: 'Completed Novel',
    chaptersOrPages: '400 Pages',
    tagline: 'They are just husbands. I am Evelyn Hugo.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
    paperColor: '#064E3B',
    tabColor: '#065F46',
    accentColor: '#34D399',
    quote:
      "Make them pay you what they think you're worth. Then make them pay you what you know you're worth.",
    review:
      "A thrilling, glamorous voyage into mid-century cinema with raw emotional stakes. Evelyn Hugo is ruthless, loving, unapologetic, and unforgettable. One of those books you can't put down until 3 AM.",
    badge: 'Unputdownable Novel',
  },
  {
    id: 'pancreas',
    code: 'VOL_005 // PANCREAS',
    title: 'I Want to Eat Your Pancreas',
    nativeTitle: '君の膵臓をたべたい',
    author: 'Yoru Sumino',
    illustrator: 'Idumi Kirihara',
    type: 'Light Novel & Manga',
    genre: 'Coming-of-Age / Slice of Life / Drama',
    rating: 5.0,
    readCount: 'Cherished Reread',
    status: 'Completed Novel & 2-Vol Manga',
    chaptersOrPages: '320 Pages • 10 Manga Ch',
    tagline: 'Spring cherry blossoms, a secret diary, and lives intertwining.',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format&fit=crop&q=80',
    paperColor: '#500724',
    tabColor: '#831843',
    accentColor: '#F472B6',
    quote:
      'Living means having a bond with other people. If you pay attention to someone, love someone, hate someone, having fun being with someone... that is what it means to be alive.',
    review:
      "Despite the startling title, this is one of the most gentle, profound stories about human connection, grief, and living without regret. Sakura's perspective on life changed how I cherish daily moments.",
    badge: 'Tearjerker Classic',
  },
];
