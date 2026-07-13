import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '@layouts/Container/Container';
import { Badge, Button } from '@components';
import { articles } from '@content';
import { staggerContainer, staggerItem } from '@animations';
import './Articles.css';

const fmt = (str) =>
  new Date(str + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

const TAG_VARIANT = { Systems: 'accent', Frontend: 'default', Engineering: 'default' };

const Articles = () => (
  <section id="writing" className="section section--padded articles-section">
    <Container>
      <motion.div
        className="articles"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer}
      >
        <motion.div className="articles__header" variants={staggerItem}>
          <div>
            <p className="section-eyebrow">
              <span className="section-eyebrow__num">02</span>
              <span aria-hidden="true" className="section-eyebrow__dash">───</span>
              Writing
            </p>
            <h2 className="section-h2">
              Thoughts worth<br />reading.
            </h2>
          </div>
          <Button
            as={Link}
            to="/writing"
            variant="ghost"
            size="sm"
            rightIcon={<span aria-hidden="true">→</span>}
          >
            View all
          </Button>
        </motion.div>

        <motion.ul
          className="articles__list"
          role="list"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {articles.map((article) => (
            <motion.li key={article.slug ?? article.title} variants={staggerItem}>
              <Link to={article.href} className="article-row">
                <div className="article-row__meta">
                  <time dateTime={article.date} className="article-row__date">
                    {fmt(article.date)}
                  </time>
                  <Badge variant={TAG_VARIANT[article.tag] || 'default'} size="sm">
                    {article.tag}
                  </Badge>
                  <span className="article-row__time">{article.readTime}&nbsp;read</span>
                </div>
                <div className="article-row__body">
                  <h3 className="article-row__title">{article.title}</h3>
                  <span className="article-row__arrow" aria-hidden="true">→</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </Container>
  </section>
);

export default Articles;
