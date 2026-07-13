import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@hooks';
import { navLinks, siteConfig } from '@content';
import Button from '../ui/Button/Button';
import cn from '@utils/cn';
import './Navbar.css';

const drawerVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.99 },
  visible: { opacity: 1, y:  0, scale: 1    },
  exit:    { opacity: 0, y: -8, scale: 0.99 },
};

const Navbar = ({ onTogglePalette }) => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const scrolled = scrollY > 24;

  const close = () => setOpen(false);

  return (
    <header
      className={cn('navbar', scrolled && 'navbar--scrolled')}
      role="banner"
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={close} aria-label="Go to home">
          <span className="navbar__logo-text">{siteConfig.name}</span>
          <span className="navbar__logo-dot" aria-hidden="true" />
        </Link>

        <nav className="navbar__nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <Button
            as="a"
            href={`mailto:${siteConfig.email}`}
            variant="secondary"
            size="sm"
            className="navbar__cta"
          >
            Get in touch
          </Button>

          {onTogglePalette && (
            <button
              type="button"
              className="navbar__palette-btn"
              onClick={onTogglePalette}
              aria-label="Open command palette"
            >
              &gt;_
            </button>
          )}
          <button
            className={cn('navbar__toggle', open && 'navbar__toggle--open')}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            <span className="navbar__bar" aria-hidden="true" />
            <span className="navbar__bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="navbar__drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__drawer-link"
                onClick={close}
              >
                {link.label}
              </a>
            ))}
            <div className="navbar__drawer-footer">
              <Button
                as="a"
                href={`mailto:${siteConfig.email}`}
                variant="primary"
                size="md"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={close}
              >
                Get in touch
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
