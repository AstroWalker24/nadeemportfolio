import { useRef, useEffect, useMemo } from 'react';
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
              <span className="command-palette__icon" aria-hidden="true">`</span>
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
