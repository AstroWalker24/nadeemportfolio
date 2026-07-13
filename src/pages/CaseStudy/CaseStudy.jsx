import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCaseStudyBySlug, getAdjacentCaseStudies } from '@content/caseStudies';
import Container from '@layouts/Container/Container';
import { Badge } from '@components';
import './CaseStudy.css';

const STATUS_VARIANT = { active: 'accent', wip: 'warning', archived: 'ghost' };
const EASE = [0.25, 0.1, 0.25, 1];

// ── Scroll-triggered animated section wrapper ─────────────────────
const AnimSection = ({ children, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, ease: EASE }}
  >
    {children}
  </motion.div>
);

// ── Image gallery with full-screen lightbox ───────────────────────
const Gallery = ({ screenshots }) => {
  const [active, setActive] = useState(null);

  const close    = useCallback(() => setActive(null), []);
  const gotoPrev = useCallback(() => setActive((i) => Math.max(0, i - 1)), []);
  const gotoNext = useCallback(
    () => setActive((i) => Math.min(screenshots.length - 1, i + 1)),
    [screenshots.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  gotoPrev();
      if (e.key === 'ArrowRight') gotoNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, gotoPrev, gotoNext]);

  return (
    <>
      {/* Grid */}
      <div className="gallery__grid">
        {screenshots.map((shot, i) => (
          <motion.div
            key={i}
            className="gallery__item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            onClick={() => setActive(i)}
          >
            <div className="gallery__preview" style={{ background: shot.gradient }}>
              <div className="gallery__preview-num" aria-hidden="true">{i + 1}</div>
            </div>
            <div className="gallery__caption">
              <span className="gallery__label">{shot.label}</span>
              <span className="gallery__desc">{shot.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <>
            <motion.div
              className="gallery__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              className="gallery__lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={screenshots[active].label}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            >
              <div
                className="gallery__lb-preview"
                style={{ background: screenshots[active].gradient }}
              >
                <div className="gallery__lb-label">{screenshots[active].label}</div>
                {active > 0 && (
                  <button
                    className="gallery__arrow gallery__arrow--prev"
                    onClick={(e) => { e.stopPropagation(); gotoPrev(); }}
                    aria-label="Previous screenshot"
                  >
                    ←
                  </button>
                )}
                {active < screenshots.length - 1 && (
                  <button
                    className="gallery__arrow gallery__arrow--next"
                    onClick={(e) => { e.stopPropagation(); gotoNext(); }}
                    aria-label="Next screenshot"
                  >
                    →
                  </button>
                )}
              </div>
              <div className="gallery__lb-footer">
                <p className="gallery__lb-caption">{screenshots[active].caption}</p>
                <span className="gallery__lb-count" aria-label={`${active + 1} of ${screenshots.length}`}>
                  {active + 1} / {screenshots.length}
                </span>
              </div>
              <button
                className="gallery__lb-close"
                onClick={close}
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Page ──────────────────────────────────────────────────────────
const CaseStudy = () => {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const study     = getCaseStudyBySlug(slug);
  const { prev: prevStudy, next: nextStudy } = study
    ? getAdjacentCaseStudies(slug)
    : { prev: null, next: null };

  // Redirect to home if slug not found
  useEffect(() => {
    if (!study) navigate('/', { replace: true });
  }, [study, navigate]);

  // Scroll to top when navigating between case studies
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!study) return null;

  // Group tech stack by category for the stack table
  const stackGroups = study.stack.reduce((acc, { name, category }) => {
    if (!acc[category]) acc[category] = [];
    acc[category].push(name);
    return acc;
  }, {});

  return (
    <motion.main
      key={slug}
      className="case-study"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="cs-hero" style={{ background: study.gradient }}>
        <div className="cs-hero__overlay" aria-hidden="true" />
        <Container>
          <div className="cs-hero__content">
            <Link to="/" className="cs-back">
              <span aria-hidden="true">←</span> Work
            </Link>
            <div className="cs-hero__body">
              <motion.p
                className="cs-hero__eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
              >
                Case Study
              </motion.p>
              <motion.h1
                className="cs-hero__title"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
              >
                {study.title}<span className="cs-hero__slash">/</span>
              </motion.h1>
              <motion.p
                className="cs-hero__tagline"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease: EASE }}
              >
                {study.tagline}
              </motion.p>
              <motion.div
                className="cs-hero__meta"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.34, ease: EASE }}
              >
                <span className="cs-hero__meta-item">
                  <span className="cs-hero__meta-label">Year</span>
                  <span>{study.year}</span>
                </span>
                <span className="cs-hero__meta-sep" aria-hidden="true" />
                <span className="cs-hero__meta-item">
                  <span className="cs-hero__meta-label">Role</span>
                  <span>{study.role}</span>
                </span>
                <span className="cs-hero__meta-sep" aria-hidden="true" />
                <Badge variant={STATUS_VARIANT[study.status] ?? 'default'} size="sm" dot>
                  {study.status}
                </Badge>
              </motion.div>
            </div>
          </div>
        </Container>
        <div className="cs-hero__fade" aria-hidden="true" />
      </div>

      {/* ── Metrics strip ────────────────────────────────────── */}
      <div className="cs-metrics">
        <Container>
          <motion.div
            className="cs-metrics__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden:  {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {study.metrics.map((m) => (
              <motion.div
                key={m.label}
                className="cs-metric"
                variants={{
                  hidden:  { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
              >
                <div className="cs-metric__val" style={{ color: study.accentColor }}>
                  {m.value}
                </div>
                <div className="cs-metric__lbl">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>

      {/* ── Prose sections ───────────────────────────────────── */}
      <Container size="narrow">

        {/* Overview */}
        <AnimSection className="cs-section">
          <p className="cs-section__eyebrow">Overview</p>
          <p className="cs-overview">{study.overview}</p>
        </AnimSection>

        {/* Problem */}
        <AnimSection className="cs-section cs-section--ruled">
          <p className="cs-section__eyebrow">01 — Problem</p>
          <h2 className="cs-section__h2">{study.problem.heading}</h2>
          <div className="cs-prose">
            {study.problem.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </AnimSection>

        {/* Solution */}
        <AnimSection className="cs-section cs-section--ruled">
          <p className="cs-section__eyebrow">02 — Solution</p>
          <h2 className="cs-section__h2">{study.solution.heading}</h2>
          <div className="cs-prose">
            {study.solution.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </AnimSection>

        {/* Architecture */}
        <AnimSection className="cs-section cs-section--ruled">
          <p className="cs-section__eyebrow">03 — Architecture</p>
          <h2 className="cs-section__h2">{study.architecture.heading}</h2>
          <p className="cs-section__sub">{study.architecture.body}</p>
          <motion.div
            className="cs-arch-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden:  {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {study.architecture.points.map((pt, i) => (
              <motion.div
                key={pt.title}
                className="cs-arch-card"
                variants={{
                  hidden:  { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
              >
                <div className="cs-arch-card__num" style={{ color: study.accentColor }}>
                  0{i + 1}
                </div>
                <div className="cs-arch-card__title">{pt.title}</div>
                <div className="cs-arch-card__desc">{pt.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </AnimSection>

        {/* Tech stack */}
        <AnimSection className="cs-section cs-section--ruled">
          <p className="cs-section__eyebrow">04 — Stack</p>
          <h2 className="cs-section__h2">Technologies Used</h2>
          <div className="cs-stack">
            {Object.entries(stackGroups).map(([cat, techs]) => (
              <div key={cat} className="cs-stack__row">
                <div className="cs-stack__cat">{cat}</div>
                <div className="cs-stack__badges">
                  {techs.map((t) => (
                    <Badge key={t} variant="ghost" size="sm">{t}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimSection>

      </Container>

      {/* ── Screenshots gallery ───────────────────────────────── */}
      <section className="cs-gallery-wrap">
        <Container>
          <AnimSection>
            <p className="cs-section__eyebrow" style={{ marginBottom: 'var(--space-2)' }}>
              05 — Screenshots
            </p>
            <h2 className="cs-section__h2" style={{ marginBottom: 'var(--space-8)' }}>
              Gallery
            </h2>
            <Gallery screenshots={study.screenshots} />
          </AnimSection>
        </Container>
      </section>

      {/* ── Links ────────────────────────────────────────────── */}
      <Container size="narrow">
        <AnimSection className="cs-links">
          <div className="cs-links__row">
            {study.links.github && (
              <a
                href={study.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-link-btn cs-link-btn--outline"
              >
                GitHub&nbsp;↗
              </a>
            )}
            {study.links.live && (
              <a
                href={study.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-link-btn cs-link-btn--accent"
              >
                Live Demo&nbsp;↗
              </a>
            )}
          </div>
        </AnimSection>
      </Container>

      {/* ── Prev / Next navigation ────────────────────────────── */}
      <Container>
        <div className="cs-nav">
          {prevStudy ? (
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <Link
                to={`/work/${prevStudy.slug}`}
                className="cs-nav__card cs-nav__card--prev"
              >
                <span className="cs-nav__dir">← Previous</span>
                <span className="cs-nav__name">{prevStudy.title}/</span>
                <span className="cs-nav__hint">{prevStudy.tagline}</span>
              </Link>
            </motion.div>
          ) : <span />}

          {nextStudy ? (
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <Link
                to={`/work/${nextStudy.slug}`}
                className="cs-nav__card cs-nav__card--next"
              >
                <span className="cs-nav__dir">Next →</span>
                <span className="cs-nav__name">{nextStudy.title}/</span>
                <span className="cs-nav__hint">{nextStudy.tagline}</span>
              </Link>
            </motion.div>
          ) : <span />}
        </div>
      </Container>

    </motion.main>
  );
};

export default CaseStudy;
