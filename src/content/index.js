export const siteConfig = {
  name:        'Nadeem Shaik',
  title:       'Full-Stack Engineer',
  description: "You'll usually find me building or learning something.",
  email:       'walkerastro41@gmail.com',
  socials: {
    github:   'https://github.com/AstroWalker24',
    linkedin: 'https://www.linkedin.com/in/nadeem-shaik-15b610243',
    twitter:  '',
  },
};

export const navLinks = [
  { label: 'Work',      href: '/#work'      },
  { label: 'Writing',   href: '/writing'    },
  { label: 'Contact',   href: '/contact'    },
];

export const featuredProjects = [
  {
    slug: 'nova-ui',
    name: 'nova-ui',
    description:
      'Zero-runtime accessible React component library. 40+ headless components, full TypeScript types, WCAG 2.1 AA throughout.',
    stack: ['React', 'TypeScript', 'CSS'],
    github: 'https://github.com/yourusername/nova-ui',
    live: 'https://nova-ui.dev',
    status: 'active',
    stars: '1.2k',
  },
  {
    slug: 'shipyard',
    name: 'shipyard',
    description:
      'Self-hosted deployment platform. Push code, Docker builds auto-triggered, zero-downtime blue-green deploys to any VPS in under 60 seconds.',
    stack: ['Go', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/yourusername/shipyard',
    live: null,
    status: 'wip',
    stars: '340',
  },
  {
    slug: 'trace',
    name: 'trace',
    description:
      'Distributed tracing SDK for Node.js microservices. OpenTelemetry-compatible with sub-millisecond overhead and zero dependencies.',
    stack: ['Node.js', 'gRPC', 'Protobuf'],
    github: 'https://github.com/yourusername/trace',
    live: null,
    status: 'active',
    stars: '89',
  },
];

export const articles = [
  {
    slug: 'accretion-disk-energy',
    title: 'How does Blackhole Accretion Disks release enormous amount of energy',
    date: '2024-08-26',
    readTime: '15 min',
    tag: 'Blackhole Physics',
    href: '/writing/accretion-disk-energy',
  },
  {
    slug: 'living-with-frosted-glass-popos',
    title: 'Living With Frosted Glass in Pop!_OS: The Honeymoon Is Over',
    date: '2025-07-21',
    readTime: '8 min',
    tag: 'Pop!_OS',
    href: '/writing/living-with-frosted-glass-popos',
  },
  {
    slug: 'frosted-glass-popos',
    title: 'Frosted Glass in Pop!_OS 24.04 LTS',
    date: '2026-07-19',
    readTime: '15 min',
    tag: 'Pop!_OS',
    href: '/writing/frosted-glass-popos',
  },
];

export const currentFocus = {
  building: {
    name:        'Stream Together',
    description: 'A watch party application with advanced AI features.',
    progress:    25,
    langs:       ['React', 'Golang', 'PostgreSQL'],
  },
  learning: ['Qiskit', 'Kubernetes', 'Deep Learning'],
  reading: {
    title: 'Quantum Computing: From theory to implementation',
    author: 'Diana Jeba Jingle',
  },
  openTo: 'Software Engineering roles (Remote or APAC)',
};

// Keep legacy exports
export const heroContent     = {};
export const aboutContent    = {};
export const projectsContent = [];
export const skillsContent   = [];
export const contactContent  = {};
