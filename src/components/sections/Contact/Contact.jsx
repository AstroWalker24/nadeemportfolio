import { motion } from 'framer-motion';
import Container from '@layouts/Container/Container';
import { Button } from '@components';
import { siteConfig } from '@content';
import { staggerContainer, staggerItem } from '@animations';
import './Contact.css';

const Contact = () => (
  <section id="contact" className="section section--padded contact-section">
    <Container size="narrow">
      <motion.div
        className="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer}
      >
        <motion.p className="section-eyebrow contact__eyebrow" variants={staggerItem}>
          <span className="section-eyebrow__num">04</span>
          <span aria-hidden="true" className="section-eyebrow__dash">───</span>
          Get in touch
        </motion.p>

        <motion.h2 className="section-h2 contact__heading" variants={staggerItem}>
          Let's build something.
        </motion.h2>

        <motion.p className="contact__sub" variants={staggerItem}>
          If what you're building is worth thinking about twice,
          I'll reply within a day.
        </motion.p>

        <motion.div variants={staggerItem}>
          <motion.a
            href={`mailto:${siteConfig.email}`}
            className="contact__email"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {siteConfig.email}
          </motion.a>
        </motion.div>

        <motion.div className="contact__actions" variants={staggerItem}>
          <Button
            as="a"
            href={`mailto:${siteConfig.email}`}
            variant="primary"
            size="lg"
          >
            Send a message
          </Button>
          <Button
            as="a"
            href="/resume.pdf"
            download
            variant="secondary"
            size="lg"
          >
            Download&nbsp;r&#233;sum&#233;
          </Button>
        </motion.div>

        <motion.div className="contact__status" variants={staggerItem}>
          <span className="contact__status-dot" aria-hidden="true" />
          <span>Currently open to software engineering roles</span>
        </motion.div>
      </motion.div>
    </Container>
  </section>
);

export default Contact;
