import { useState, useCallback, useEffect } from 'react';

/**
 * Manages global command palette state and keyboard events.
 * Handles Ctrl+` to open, Escape to close, and arrow key navigation.
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
      // Ctrl+` or Cmd+` to open
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
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
