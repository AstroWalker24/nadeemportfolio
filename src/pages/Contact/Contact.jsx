import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSEO } from '@utils/seo';
import Container from '@layouts/Container/Container';
import { siteConfig } from '@content';
import { staggerContainer, staggerItem } from '@animations/variants';
import './Contact.css';

/* ── JSON syntax helpers ────────────────────────────────────── */
const JsonKey = ({ k }) => <span className="json-key">"{k}"</span>;
const JsonStr = ({ v }) => <span className="json-str">"{v}"</span>;

const JsonUrl = ({ v, href }) => {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="json-url"
    >
      "{v}"
    </a>
  );
};

function JsonRow({ k, v, href, last }) {
  return (
    <div className="json-row">
      <span className="json-indent" aria-hidden="true" />
      <JsonKey k={k} />
      <span className="json-colon">: </span>
      {href ? <JsonUrl v={v} href={href} /> : <JsonStr v={v} />}
      {!last && <span className="json-comma">,</span>}
    </div>
  );
}

/* ── Actions ────────────────────────────────────────────────── */
const ACTIONS = [
  { id: 'email',    cmd: 'open email',      label: '\u{1F4E7}  Open Email'   },
  { id: 'github',   cmd: 'open github',     label: '\u{1F419}  GitHub'       },
  { id: 'linkedin', cmd: 'open linkedin',   label: '\u{1F4BC}  LinkedIn'     },
  { id: 'resume',   cmd: 'download resume', label: '\u{1F4C4}  Resume'       },
];

const FEEDBACK = {
  email:    'Launching mail client...',
  github:   'Opening GitHub...',
  linkedin: 'Opening LinkedIn...',
  resume:   'Downloading resume...',
};

/* ─────────────────────────────────────────────────────────────── */

const Contact = () => {
  useSEO({
    title:       'Contact',
    description: 'Get in touch for engineering roles or interesting work.',
  });

  const [activeAction, setActiveAction] = useState(null);

  const execute = (action) => {
    if (activeAction) return;
    setActiveAction(action.id);
    setTimeout(() => {
      setActiveAction(null);
      if (action.id === 'email') {
        window.location.href = `mailto:${siteConfig.email}`;
      } else if (action.id === 'github') {
        window.open(siteConfig.socials.github, '_blank', 'noopener,noreferrer');
      } else if (action.id === 'linkedin') {
        window.open(siteConfig.socials.linkedin, '_blank', 'noopener,noreferrer');
      } else if (action.id === 'resume') {
        const a = document.createElement('a');
        a.href     = '/nadeemshaik.pdf';
        a.download = 'Nadeem_Shaik_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }, 860);
  };

  const apiData = [
    { k: 'name',             v: siteConfig.name },
    { k: 'role',             v: siteConfig.title },
    { k: 'status',           v: 'Open to Opportunities' },
    { k: 'location',         v: 'India' },
    { k: 'timezone',         v: 'IST (UTC+5:30)' },
    { k: 'responseTime',     v: '< 24 hours' },
    { k: 'preferredContact', v: 'Email' },
    { k: 'email',            v: siteConfig.email,            href: `mailto:${siteConfig.email}` },
    { k: 'github',           v: siteConfig.socials.github,   href: siteConfig.socials.github },
    { k: 'linkedin',         v: siteConfig.socials.linkedin, href: siteConfig.socials.linkedin },
    { k: 'resume',           v: '/nadeemshaik.pdf' },
  ];

  return (
    <div className="contact-page">
      <Container size="narrow">

        {/* ── Page header ──────────────────────────────── */}
        <motion.div
          className="contact-page__header"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="contact-page__eyebrow">
            <span className="contact-page__dollar">$</span> ./contact.sh
          </p>
          <h1 className="contact-page__title">Get in touch</h1>
          <p className="contact-page__sub">
            Open to software engineer roles, I reply within 24h.
          </p>
        </motion.div>

        {/* ── Terminal window ───────────────────────────── */}
        <motion.div
          className="term-window"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Title bar */}
          <div className="term-titlebar" aria-hidden="true">
            <div className="term-traffic">
              <span className="term-traffic__dot term-traffic__dot--red"    />
              <span className="term-traffic__dot term-traffic__dot--yellow" />
              <span className="term-traffic__dot term-traffic__dot--green"  />
            </div>
            <span className="term-titlebar__label">contact.sh — bash — 80x24</span>
            <div className="term-titlebar__balance" />
          </div>

          {/* Body */}
          <div className="term-body">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">

              {/* Request line */}
              <motion.div className="tl tl--cmd" variants={staggerItem}>
                $ GET /api/contact
              </motion.div>
              <motion.div className="tl" variants={staggerItem}>&nbsp;</motion.div>

              {/* HTTP response headers */}
              <motion.div variants={staggerItem}>
                <div className="tl api-status-line">
                  <span className="api-proto">HTTP/1.1</span>
                  {' '}
                  <span className="api-code">200 OK</span>
                </div>
                <div className="tl tl--comment">Content-Type: application/json</div>
              </motion.div>
              <motion.div className="tl" variants={staggerItem}>&nbsp;</motion.div>

              {/* JSON body */}
              <motion.div className="json-block" variants={staggerItem}>
                <div className="json-brace">{'{'}</div>
                {apiData.map((row, i) => (
                  <JsonRow key={row.k} {...row} last={i === apiData.length - 1} />
                ))}
                <div className="json-brace">{'}'}</div>
              </motion.div>

              <motion.div className="tl" variants={staggerItem}>&nbsp;</motion.div>
              <motion.hr className="term-divider" variants={staggerItem} aria-hidden="true" />
              <motion.div className="tl" variants={staggerItem}>&nbsp;</motion.div>

              {/* Action rows */}
              <motion.div className="api-actions" variants={staggerItem}>
                {ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    className={`api-action${activeAction === action.id ? ' api-action--active' : ''}`}
                    onClick={() => execute(action)}
                    disabled={activeAction !== null && activeAction !== action.id}
                  >
                    <span className="api-action__prompt">$</span>
                    <span className="api-action__cmd">{action.cmd}</span>
                    <span className="api-action__label">{action.label}</span>
                  </button>
                ))}
              </motion.div>

              {/* Click feedback */}
              <AnimatePresence>
                {activeAction && (
                  <motion.div
                    className="tl api-feedback"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="api-feedback__arrow">›</span>
                    {' '}{FEEDBACK[activeAction]}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div className="tl" variants={staggerItem}>&nbsp;</motion.div>

            </motion.div>
          </div>
        </motion.div>

      </Container>
    </div>
  );
};

export default Contact;
