import { motion } from 'framer-motion';
import './CommandPaletteButton.css';

/**
 * CommandPaletteButton — Fixed button to open command palette from UI.
 * Props: { onClick }
 */
const CommandPaletteButton = ({ onClick }) => {
  return (
    <motion.button
      className="command-palette-button"
      onClick={onClick}
      aria-label="Open command palette (Ctrl+`)"
      title="Open command palette (Ctrl+`)"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
    >
      <span className="command-palette-button__label" aria-hidden="true">&gt;_</span>
    </motion.button>
  );
};

export default CommandPaletteButton;
