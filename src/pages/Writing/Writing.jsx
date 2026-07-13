import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { allArticles, getAllTags } from '@utils/articles';
import { useSEO } from '@utils/seo';
import Container from '@layouts/Container/Container';
import { Badge } from '@components';
import cn from '@utils/cn';
import './Writing.css';

const EASE = [0.25, 0.1, 0.25, 1];

const fmt = (str) =>
  new Date(str + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

const Writing = () => {
  const [query,     setQuery]     = useState('');
  const [activeTag, setActiveTag] = useState('All');

  useSEO({
    title:       'Writing',
    description: 'Articles on systems, frontend, and engineering.',
  });

  const tags = useMemo(() => ['All', ...getAllTags()], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allArticles.filter((article) => {
      const tagMatch = activeTag === 'All' || article.tags?.includes(activeTag);
      if (!q) return tagMatch;
      return (
        tagMatch &&
        (article.title.toLowerCase().includes(q) ||
          article.description?.toLowerCase().includes(q) ||
          article.tags?.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [query, activeTag]);

  return (
    <div className="writing-page">

      {/* ── Page header ────────────────────────────────────── */}
      <div className="writing-header">
        <Container>
          <motion.div
            className="writing-header__inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="writing-header__eyebrow">Writing</p>
            <h1 className="writing-header__title">
              Thoughts on systems,<br />frontend, and engineering.
            </h1>
            <p className="writing-header__count">
              {allArticles.length} article{allArticles.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        </Container>
      </div>

      <Container>

        {/* ── Search + tag filters ──────────────────────────── */}
        <motion.div
          className="writing-filters"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
        >
          <div className="writing-search" role="search">
            <span className="writing-search__icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="search"
              className="writing-search__input"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search articles"
            />
            {query && (
              <button
                className="writing-search__clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="writing-tags" role="group" aria-label="Filter by tag">
            {tags.map((tag) => (
              <button
                key={tag}
                className={cn('writing-tag', tag === activeTag && 'writing-tag--active')}
                onClick={() => setActiveTag(tag)}
                aria-pressed={tag === activeTag}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Result count ─────────────────────────────────── */}
        {(query || activeTag !== 'All') && (
          <p className="writing-result-count">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
        )}

        {/* ── Article list ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              className="writing-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="writing-empty__text">No articles found</p>
              <p className="writing-empty__sub">Try adjusting your search or filter.</p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="writing-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.06 }}
                >
                  <Link
                    to={`/writing/${article.slug}`}
                    className="article-card"
                  >
                    <div className="article-card__meta">
                      <time dateTime={article.date} className="article-card__date">
                        {fmt(article.date)}
                      </time>
                      {article.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="ghost" size="sm">
                          {tag}
                        </Badge>
                      ))}
                      <span className="article-card__time">
                        {article.readTime}&nbsp;read
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h2 className="article-card__title">{article.title}</h2>
                      {article.description && (
                        <p className="article-card__desc">{article.description}</p>
                      )}
                    </div>
                    <span className="article-card__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </div>
  );
};

export default Writing;
