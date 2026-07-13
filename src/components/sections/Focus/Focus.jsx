import { motion } from 'framer-motion';
import Container from '@layouts/Container/Container';
import { Badge } from '@components';
import { currentFocus } from '@content';
import { staggerContainer, staggerItem } from '@animations';
import './Focus.css';

const EASE = [0.25, 0.1, 0.25, 1];

const ProgressBar = ({ value }) => (
  <div
    className="focus-bar"
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label={`${value}% complete`}
  >
    <div className="focus-bar__track">
      <motion.div
        className="focus-bar__fill"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: value / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
    <span className="focus-bar__pct">{value}%</span>
  </div>
);

const Focus = () => {
  const { building, learning, reading, openTo } = currentFocus;

  return (
    <section id="focus" className="section section--padded focus-section">
      <Container>
        <motion.div
          className="focus"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.div className="focus__hd" variants={staggerItem}>
            <p className="section-eyebrow">
              <span className="section-eyebrow__num">03</span>
              <span aria-hidden="true" className="section-eyebrow__dash">───</span>
              Current Focus
            </p>
            <h2 className="section-h2">
              What's on my<br />desk right now.
            </h2>
          </motion.div>

          <motion.div className="focus__grid" variants={staggerItem}>
            {/* Building card */}
            <div className="focus__card focus__card--build">
              <p className="focus__card-eyebrow">Building</p>
              <div className="focus__build-head">
                <h3 className="focus__build-name">{building.name}</h3>
                <div className="focus__build-langs">
                  {building.langs.map(lang => (
                    <Badge key={lang} variant="ghost" size="sm">
                      <span className="focus__lang-dot" aria-hidden="true" />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="focus__build-desc">{building.description}</p>
              <ProgressBar value={building.progress} />
            </div>

            {/* Side: learning + reading */}
            <div className="focus__side">
              <div className="focus__card">
                <p className="focus__card-eyebrow">Learning</p>
                <div className="focus__tags">
                  {learning.map(item => (
                    <Badge key={item} variant="default" size="md">{item}</Badge>
                  ))}
                </div>
              </div>

              <div className="focus__card">
                <p className="focus__card-eyebrow">Reading</p>
                <p className="focus__book-title">{reading.title}</p>
                <p className="focus__book-author">{reading.author}</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="focus__avail" variants={staggerItem}>
            <span className="focus__avail-dot" aria-hidden="true" />
            <span>{openTo}</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Focus;
