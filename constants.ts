import { Project, Experience, Skill } from './types';

export const PORTFOLIO_DATA = {
  name: "Anirudh",
  role: "Full Stack Engineer & AI Specialist",
  tagline: "Building digital experiences with precision and intelligence.",
  about: "I am a passionate developer focused on creating intuitive and dynamic user experiences. With a strong foundation in modern web technologies and a keen interest in Artificial Intelligence, I transform complex problems into elegant solutions.",
  location: "San Francisco, CA",
  email: "anirudh@example.com", // Placeholder
  socials: {
    github: "https://github.com/anirudh0405",
    linkedin: "https://linkedin.com/in/anirudh",
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Nebula Dashboard',
    description: 'A real-time analytics dashboard for SaaS platforms using React and D3.js. Features live data streaming and customizable widgets.',
    techStack: ['React', 'TypeScript', 'D3.js', 'Firebase'],
    image: 'https://picsum.photos/600/400'
  },
  {
    id: 'p2',
    title: 'EcoTrack Mobile',
    description: 'Cross-platform mobile application for tracking carbon footprint. Gamified experience with social sharing features.',
    techStack: ['React Native', 'Node.js', 'MongoDB'],
    image: 'https://picsum.photos/600/401'
  },
  {
    id: 'p3',
    title: 'AI Code Assistant',
    description: 'VS Code extension powered by Gemini API to suggest code snippets and refactoring options in real-time.',
    techStack: ['TypeScript', 'Gemini API', 'VS Code API'],
    image: 'https://picsum.photos/600/402'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    role: 'Senior Frontend Engineer',
    company: 'TechCorp Industries',
    period: '2022 - Present',
    points: [
      'Led the migration of legacy codebase to Next.js.',
      'Improved site performance by 40% using advanced optimization techniques.',
      'Mentored junior developers and established code quality standards.'
    ]
  },
  {
    id: 'e2',
    role: 'Full Stack Developer',
    company: 'Innovate Solutions',
    period: '2020 - 2022',
    points: [
      'Developed and maintained multiple client-facing web applications.',
      'Implemented secure authentication flows using OAuth2.',
      'Collaborated with designers to implement pixel-perfect UIs.'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Python', level: 80, category: 'Backend' },
  { name: 'AWS', level: 75, category: 'Tools' },
  { name: 'Docker', level: 70, category: 'Tools' },
  { name: 'TensorFlow', level: 65, category: 'AI' },
  { name: 'Gemini API', level: 85, category: 'AI' },
];
