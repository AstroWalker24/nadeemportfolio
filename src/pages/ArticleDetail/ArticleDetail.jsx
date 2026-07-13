import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getArticleBySlug } from '@utils/articles';
import { useSEO } from '@utils/seo';
import useReadingProgress from '@hooks/useReadingProgress';
import useTableOfContents from '@hooks/useTableOfContents';
import Container from '@layouts/Container/Container';
import { Badge } from '@components';
import mdxComponents from '@components/mdx/mdxComponents';
import cn from '@utils/cn';
import './ArticleDetail.css';

const EASE = [0.25, 0.1, 0.25, 1];

const fmt = (str) =>
  new Date(str + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

const ArticleDetail = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const article    = getArticleBySlug(slug);

  const { contentRef, headings, activeId } = useTableOfContents();
  const progress = useReadingProgress(contentRef);

  useSEO({
    title:       article?.title,
    description: article?.description ?? '',
  });

  useEffect(() => {
    if (!article) navigate('/writing', { replace: true });
  }, [article, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!article) return null;

  const { Component } = article;

  return (
    <>
      {/* ── Reading progress bar ─────────────────────────── */}
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <main className="article-detail">

        {/* ── Header ─────────────────────────────────────── */}
        <Container size="narrow">
          <Link to="/writing" className="article-detail__back">
            <span aria-hidden="true">←</span> Writing
          </Link>

          <motion.header
            className="article-detail__header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {article.tags && (
              <div className="article-detail__tags">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="ghost" size="sm">{tag}</Badge>
                ))}
              </div>
            )}
            <h1 className="article-detail__title">{article.title}</h1>
            <div className="article-detail__meta">
              <time dateTime={article.date}>{fmt(article.date)}</time>
              <span aria-hidden="true" className="article-detail__dot">·</span>
              <span>{article.readTime} read</span>
            </div>
          </motion.header>
        </Container>

        {/* ── Content + ToC ──────────────────────────────── */}
        <Container>
          <motion.div
            className="article-detail__layout"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            {/* Article prose */}
            <div ref={contentRef} className="article-detail__content prose">
              <Component components={mdxComponents} />
            </div>

            {/* Table of contents — desktop only */}
            {headings.length > 0 && (
              <aside className="article-detail__toc" aria-label="Table of contents">
                <p className="toc__label">On this page</p>
                <nav>
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={cn(
                        'toc__item',
                        h.level === 3 && 'toc__item--sub',
                        activeId === h.id && 'toc__item--active'
                      )}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </aside>
            )}
          </motion.div>
        </Container>

        {/* ── Footer ─────────────────────────────────────── */}
        <Container size="narrow">
          <div className="article-detail__footer">
            <Link to="/writing" className="article-detail__back article-detail__back--footer">
              ← Back to all articles
            </Link>
          </div>
        </Container>

      </main>
    </>
  );
};

export default ArticleDetail;
