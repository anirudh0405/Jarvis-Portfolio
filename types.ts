
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  image?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'AI';
}

export enum Section {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  EXPERIENCE = 'EXPERIENCE',
  SKILLS = 'SKILLS',
  SUITS = 'SUITS',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
