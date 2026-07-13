import { motion } from 'framer-motion';
import Container from '@layouts/Container/Container';
import { Badge, ProgressBar } from '@components';
import { staggerContainer, staggerItem } from '@animations';
import './Projects.css';

/* ── WIP project data ───────────────────────────────────────── */
const WIP_PROJECTS = [
  {
    name:        'portfolio-v2',
    status:      'In Progress',
    variant:     'accent',
    barColor:    'accent',
    accent:      'var(--color-accent)',
    description: 'A developer portfolio built with React, TypeScript, and Framer Motion, designed as an interactive software workspace.',
    progress:    90,
    footer:      'Expected soon →',
  },
  {
    name:        'tech-blog',
    status:      'Writing',
    variant:     'purple',
    barColor:    'purple',
    accent:      '#A78BFA',
    description: 'A collection of technical articles, implementation notes, and engineering write-ups documenting my learning journey.',
    progress:    60,
    footer:      'Coming soon →',
  },
  {
    name:        'secret-project',
    status:      'Cooking...',
    variant:     'amber',
    barColor:    'amber',
    accent:      '#FBBF24',
    description: 'An experimental project that\'s still taking shape. More details once it\'s ready to be shared.',
    progress:    35,
    footer:      'Stay tuned →',
  },
];

/* ── WIP card ────────────────────────────────────────────────── */
const WipCard = ({ name, status, variant, barColor, accent, description, progress, footer }) => (
  <motion.div
    className="wip-card"
    style={{ '--wip-accent': accent }}
    variants={staggerItem}
    whileHover={{ y: -2 }}
    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
  >
    {/* Header */}
    <div className="wip-card__head">
      <span className="wip-card__name">
        <span className="wip-card__folder" aria-hidden="true">▸</span>
        {name}/
      </span>
      <Badge variant={variant} size="sm" dot>{status}</Badge>
    </div>

    {/* Description */}
    <p className="wip-card__desc">{description}</p>

    {/* Progress */}
    <div className="wip-card__progress-wrap">
      <div className="wip-card__progress-meta">
        <span className="wip-card__progress-label">progress</span>
        <span className="wip-card__progress-pct">{progress}%</span>
      </div>
      <ProgressBar value={progress} color={barColor} size="sm" />
    </div>

    {/* Footer */}
    <div className="wip-card__footer">{footer}</div>
  </motion.div>
);

/* ── Section ─────────────────────────────────────────────────── */
const Projects = () => (
  <section id="work" className="section section--padded projects-section">
    <Container>
      <motion.div
        className="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div className="projects__header projects__header--wip" variants={staggerItem}>
          <p className="section-eyebrow">
            <span className="section-eyebrow__num">01</span>
            <span aria-hidden="true" className="section-eyebrow__dash">───</span>
            Work in Progress
          </p>
          <h2 className="section-h2">Things I&apos;m building.</h2>
          <p className="projects__wip-sub">
            Some projects are still under active development.<br />
            I&apos;d rather ship something polished than rush it. Check back soon.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="projects__grid"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {WIP_PROJECTS.map(project => (
            <WipCard key={project.name} {...project} />
          ))}
        </motion.div>
      </motion.div>
    </Container>
  </section>
);

export default Projects;
