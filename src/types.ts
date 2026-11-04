export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'editorial' | 'branding' | 'digital' | 'photography';
  categoryLabel: string;
  year: string;
  client: string;
  role: string;
  tone: string;
  tapeColor?: string;
  coverImage: string;
  accentColor: string;
  summary: string;
  overview: string;
  challenges: string;
  deliverables: string[];
  tools: string[];
  quote?: string;
  galleryImages: {
    title: string;
    description: string;
    badge?: string;
  }[];
  colorPalette: {
    name: string;
    hex: string;
  }[];
  typefaces: string[];
}

export interface EducationItem {
  id: string;
  stage: string;
  institution: string;
  location: string;
  years: string;
  isCurrent?: boolean;
  currentNote?: string;
  description?: string;
  tone: string;
  iconType: 'book' | 'pencil' | 'backpack' | 'graduation-cap';
}

export interface GuestNote {
  id: string;
  author: string;
  location?: string;
  message: string;
  date: string;
  stamp: string;
  tone: string;
  rotation: number;
}

export interface ExperienceItem {
  date: string;
  org: string;
  role: string;
  text: string;
  location?: string;
  tone: string;
  highlights?: string[];
}

export interface HobbyItem {
  emoji: string;
  name: string;
  note: string;
  tone: string;
  r: number;
  funDetail?: string;
}

export interface SkillCategory {
  group: string;
  tone: string;
  items: string[];
  description: string;
}
