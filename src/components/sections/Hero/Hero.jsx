import { motion } from 'framer-motion';
import Button from '@components/ui/Button/Button';
import TerminalWindow from './TerminalWindow';
import { siteConfig } from '@content';
import './Hero.css';

const EASE = [0.25, 0.1, 0.25, 1];

const rise = (delay) => ({
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE, delay } },
});

const Hero = () => (
  <section className="hero" aria-label="Introduction">
    {/* Extra accent glow behind terminal */}
    <div className="hero__glow-r" aria-hidden="true" />

    <div className="hero__inner">
      {/* ── Text ── */}
      <div className="hero__text">
        <motion.p
          className="hero__eyebrow"
          variants={rise(0.2)}
          initial="hidden"
          animate="visible"
        >
          <span aria-hidden="true">──</span>
          <span>hey, I'm</span>
        </motion.p>

        <motion.h1
          className="hero__name"
          variants={rise(0.32)}
          initial="hidden"
          animate="visible"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          className="hero__title"
          variants={rise(0.44)}
          initial="hidden"
          animate="visible"
        >
          {siteConfig.title}
        </motion.p>

        <motion.p
          className="hero__desc"
          variants={rise(0.54)}
          initial="hidden"
          animate="visible"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={rise(0.64)}
          initial="hidden"
          animate="visible"
        >
          <Button as="a" href="#work"    variant="primary"   size="lg">
            Open Workspace
          </Button>
          <Button as="a" href="#writing" variant="secondary" size="lg">
            Read my writing
          </Button>
        </motion.div>

        <motion.div
          className="hero__meta"
          variants={rise(0.74)}
          initial="hidden"
          animate="visible"
        >
          <span className="hero__meta-status">
            <span className="hero__status-dot" aria-hidden="true" />
            Open to work
          </span>
          <span aria-hidden="true" className="hero__meta-sep">·</span>
          <span>1+ yr exp</span>
          <span aria-hidden="true" className="hero__meta-sep">·</span>
          <span>Based in AP, India</span>
        </motion.div>
      </div>

      {/* ── Terminal ── */}
      <motion.div
        className="hero__visual"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1   }}
        transition={{ duration: 0.72, ease: EASE, delay: 0.38 }}
      >
        <TerminalWindow />
      </motion.div>
    </div>
  </section>
);

export default Hero;
