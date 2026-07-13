// Command palette command definitions
// Organize by category for easy grouping

export const COMMANDS = [
  // Navigation
  {
    id: 'nav-hero',
    label: 'Go to Hero',
    description: 'Jump to the top of the page',
    category: 'Navigation',
    icon: '▲',
    action: () => {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    },
  },
  {
    id: 'nav-work',
    label: 'Go to Work',
    description: 'View featured projects',
    category: 'Navigation',
    icon: '📦',
    action: () => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    },
  },
  {
    id: 'nav-writing',
    label: 'Go to Writing',
    description: 'Read latest articles',
    category: 'Navigation',
    icon: '✍',
    action: () => {
      document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth' });
    },
  },
  {
    id: 'nav-focus',
    label: 'Current Focus',
    description: 'What I am working on now',
    category: 'Navigation',
    icon: '🎯',
    action: () => {
      document.getElementById('focus')?.scrollIntoView({ behavior: 'smooth' });
    },
  },
  {
    id: 'nav-contact',
    label: 'Get in Touch',
    description: 'Contact information',
    category: 'Navigation',
    icon: '✉',
    action: () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    },
  },

  // External
  {
    id: 'open-github',
    label: 'Open GitHub',
    description: 'Visit my GitHub profile',
    category: 'External',
    icon: '🐙',
    action: () => {
      window.open('https://github.com/yourusername', '_blank');
    },
  },
  {
    id: 'open-linkedin',
    label: 'Open LinkedIn',
    description: 'Connect on LinkedIn',
    category: 'External',
    icon: '💼',
    action: () => {
      window.open('https://linkedin.com/in/yourusername', '_blank');
    },
  },
  {
    id: 'send-email',
    label: 'Send Email',
    description: 'Contact via email',
    category: 'External',
    icon: '📧',
    action: () => {
      window.location.href = 'mailto:walkerastro41@gmail.com';
    },
  },

  // Actions
  {
    id: 'scroll-top',
    label: 'Scroll to Top',
    description: 'Jump to the very top',
    category: 'Actions',
    icon: '⬆',
    action: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  {
    id: 'scroll-bottom',
    label: 'Scroll to Bottom',
    description: 'Jump to the very bottom',
    category: 'Actions',
    icon: '⬇',
    action: () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
  },
  {
    id: 'copy-email',
    label: 'Copy Email',
    description: 'Copy email to clipboard',
    category: 'Actions',
    icon: '📋',
    action: () => {
      navigator.clipboard.writeText('walkerastro41@gmail.com');
    },
  },
];

/**
 * Search commands by query
 * Searches across label, description, and category
 */
export const searchCommands = (query) => {
  if (!query.trim()) return COMMANDS;

  const q = query.toLowerCase();
  return COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
  );
};

/**
 * Group commands by category
 */
export const groupByCategory = (commands) => {
  return commands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});
};
