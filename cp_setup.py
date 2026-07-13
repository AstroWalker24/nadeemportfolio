import pathlib

B = pathlib.Path('/home/astrowalker/playgrounds/projects/nadeem/src')

def w(rel, content):
    p = B / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding='utf-8')
    print(f'  ok  {rel}')

# ─────────────────────────────────────────────────────────────────
#  COMMANDS
# ─────────────────────────────────────────────────────────────────

w('constants/commands.js', """// Command palette command definitions
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
    description: 'What I'm working on now',
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
      window.location.href = 'mailto:hello@yourname.dev';
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
      navigator.clipboard.writeText('hello@yourname.dev');
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
""")

# ─────────────────────────────────────────────────────────────────
#  HOOK: useCommandPalette
# ─────────────────────────────────────────────────────────────────

w('hooks/useCommandPalette.js', """import { useState, useCallback, useEffect } from 'react';

/**
 * Manages global command palette state and keyboard events.
 * Handles Ctrl+K to open, Escape to close, and arrow key navigation.
 */
const useCommandPalette = () => {
  const [open,      setOpen]      = useState(false);
  const [selected,  setSelected]  = useState(0);
  const [search,    setSearch]    = useState('');

  // Open/close handler
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close  = useCallback(() => setOpen(false),     []);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to open
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      // Escape to close
      else if (e.key === 'Escape' && open) {
        e.preventDefault();
        close();
      }
      // Arrow navigation (only when open)
      else if (open) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelected((s) => s + 1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelected((s) => Math.max(0, s - 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  // Reset selected when closing
  useEffect(() => {
    if (!open) {
      setSelected(0);
      setSearch('');
    }
  }, [open]);

  return {
    open,
    setOpen,
    toggle,
    close,
    selected,
    setSelected,
    search,
    setSearch,
  };
};

export default useCommandPalette;
""")

# ─────────────────────────────────────────────────────────────────
#  COMMAND PALETTE
# ─────────────────────────────────────────────────────────────────

w('components/CommandPalette/CommandPalette.jsx', """import { useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchCommands, groupByCategory, COMMANDS } from '@constants/commands';
import cn from '@utils/cn';
import './CommandPalette.css';

/**
 * CommandPalette component — Raycast-inspired command palette.
 * Props: { open, close, selected, setSelected, search, setSearch }
 */
const CommandPalette = ({ open, close, selected, setSelected, search, setSearch }) => {
  const inputRef    = useRef(null);
  const listRef     = useRef(null);
  const itemsRef    = useRef({});

  // Search + group results
  const results     = useMemo(() => searchCommands(search), [search]);
  const grouped     = useMemo(() => groupByCategory(results), [results]);
  const categories  = useMemo(() => Object.keys(grouped), [grouped]);

  // Flatten results for keyboard nav
  const flatResults = useMemo(() => {
    return categories.flatMap((cat) => grouped[cat]);
  }, [categories, grouped]);

  // Focus input when opening
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Clamp selected index + scroll into view
  useEffect(() => {
    if (selected >= flatResults.length) {
      setSelected(flatResults.length - 1);
    }

    const el = itemsRef.current[selected];
    if (el && listRef.current) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [selected, flatResults.length, setSelected]);

  // Execute command on Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && flatResults[selected]) {
      flatResults[selected].action?.();
      close();
    }
  };

  const handleSelect = (index) => {
    setSelected(index);
    const cmd = flatResults[index];
    if (cmd) {
      cmd.action?.();
      close();
    }
  };

  // Overlay variants
  const overlayVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
    exit:    { opacity: 0 },
  };

  const panelVariants = {
    hidden:  { opacity: 0, y: -20, scale: 0.97 },
    visible: { opacity: 1, y: 0,   scale: 1     },
    exit:    { opacity: 0, y: -20, scale: 0.97 },
  };

  const itemVariants = {
    hidden:  { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0   },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            className="command-palette__overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Main panel */}
          <motion.div
            className="command-palette"
            role="combobox"
            aria-expanded={open}
            aria-owns="command-list"
            aria-label="Command palette"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          >
            {/* Search input */}
            <div className="command-palette__search">
              <span className="command-palette__icon" aria-hidden="true">⌘</span>
              <input
                ref={inputRef}
                type="text"
                className="command-palette__input"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={handleKeyDown}
                aria-label="Search commands"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="command-palette__hint" aria-hidden="true">esc</span>
            </div>

            {/* Results */}
            <motion.div
              ref={listRef}
              id="command-list"
              className="command-palette__list"
              role="listbox"
            >
              {flatResults.length === 0 ? (
                <div className="command-palette__empty" role="status" aria-live="polite">
                  <p className="command-palette__empty-text">No commands found</p>
                  <p className="command-palette__empty-hint">Try a different search</p>
                </div>
              ) : (
                categories.map((category) => (
                  <div key={category} className="command-palette__group">
                    <div className="command-palette__group-label" aria-hidden="true">
                      {category}
                    </div>
                    {grouped[category].map((cmd, i) => {
                      // Find global index
                      const globalIdx = flatResults.findIndex((r) => r.id === cmd.id);

                      return (
                        <motion.div
                          key={cmd.id}
                          ref={(el) => {
                            if (el) itemsRef.current[globalIdx] = el;
                          }}
                          className={cn(
                            'command-palette__item',
                            globalIdx === selected && 'command-palette__item--selected'
                          )}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{
                            duration: 0.25,
                            ease: 'easeOut',
                            delay: i * 0.03,
                          }}
                          role="option"
                          aria-selected={globalIdx === selected}
                          onClick={() => handleSelect(globalIdx)}
                          onMouseEnter={() => setSelected(globalIdx)}
                        >
                          <span className="command-palette__item-icon" aria-hidden="true">
                            {cmd.icon}
                          </span>
                          <div className="command-palette__item-content">
                            <div className="command-palette__item-label">{cmd.label}</div>
                            <div className="command-palette__item-desc">{cmd.description}</div>
                          </div>
                          <span className="command-palette__item-enter" aria-hidden="true">
                            ↵
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                ))
              )}
            </motion.div>

            {/* Footer hint */}
            {flatResults.length > 0 && (
              <div className="command-palette__footer" aria-hidden="true">
                <span className="command-palette__nav-hint">↑↓</span>
                <span>Navigate</span>
                <span className="command-palette__nav-hint">↵</span>
                <span>Select</span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
""")

# ─────────────────────────────────────────────────────────────────
#  COMMAND PALETTE CSS
# ─────────────────────────────────────────────────────────────────

w('components/CommandPalette/CommandPalette.css', """/* ===== Command Palette ======================================== */
.command-palette__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: var(--z-modal);
}

.command-palette {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: calc(var(--z-modal) + 1);
  width: 90vw;
  max-width: 520px;
  max-height: 70vh;
  background: var(--color-bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Search ───────────────────────────────────────────────────── */
.command-palette__search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
}

.command-palette__icon {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 0;
}

.command-palette__input {
  flex: 1;
  background: none;
  border: none;
  color: var(--color-text-primary);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  outline: none;
  caret-color: var(--color-accent);
}

.command-palette__input::placeholder {
  color: var(--color-text-muted);
}

.command-palette__hint {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 3px 7px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  letter-spacing: 0.03em;
}

/* ── List ─────────────────────────────────────────────────────── */
.command-palette__list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Scrollbar */
.command-palette__list::-webkit-scrollbar       { width: 6px; }
.command-palette__list::-webkit-scrollbar-track { background: transparent; }
.command-palette__list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
}
.command-palette__list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* ── Group ────────────────────────────────────────────────────── */
.command-palette__group {
  padding: 8px 4px;
}

.command-palette__group-label {
  font-family: var(--font-code);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  padding: 10px 12px 6px;
  font-weight: 600;
}

/* ── Item ─────────────────────────────────────────────────────── */
.command-palette__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin: 0 4px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color     var(--transition-fast);
}

.command-palette__item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.command-palette__item--selected {
  background: rgba(34, 211, 238, 0.1);
  border-color: rgba(34, 211, 238, 0.2);
}

.command-palette__item-icon {
  font-size: 16px;
  line-height: 0;
  flex-shrink: 0;
}

.command-palette__item-content {
  flex: 1;
  min-width: 0;
}

.command-palette__item-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

.command-palette__item-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
  line-height: 1.3;
}

.command-palette__item-enter {
  font-family: var(--font-code);
  font-size: 13px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.command-palette__item:hover .command-palette__item-enter,
.command-palette__item--selected .command-palette__item-enter {
  opacity: 1;
}

/* ── Empty state ──────────────────────────────────────────────── */
.command-palette__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 20px;
  text-align: center;
}

.command-palette__empty-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.command-palette__empty-hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* ── Footer ───────────────────────────────────────────────────── */
.command-palette__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 10px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--color-text-muted);
}

.command-palette__nav-hint {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 2px 5px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  letter-spacing: 0.05em;
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 640px) {
  .command-palette {
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 100px);
  }
}
""")

# ─────────────────────────────────────────────────────────────────
#  UPDATE APP.JSX
# ─────────────────────────────────────────────────────────────────

w('App.jsx', """import { Routes, Route } from 'react-router-dom';
import useCommandPalette from '@hooks/useCommandPalette';
import CommandPalette from '@components/CommandPalette/CommandPalette';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { Home } from '@pages';

const App = () => {
  const palette = useCommandPalette();

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <CommandPalette {...palette} />
    </>
  );
};

export default App;
""")

print('\\nAll command palette files written.')
