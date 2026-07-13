/**
 * Eagerly import all MDX article modules via Vite glob.
 * Each module exports: default (Component) + meta (metadata object).
 */
const modules = import.meta.glob('../content/articles/*.mdx', { eager: true });

export const allArticles = Object.values(modules)
  .map((mod) => ({
    ...mod.meta,
    Component: mod.default,
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getArticleBySlug = (slug) =>
  allArticles.find((a) => a.slug === slug) ?? null;

export const getAllTags = () => {
  const set = new Set();
  allArticles.forEach((a) => a.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort();
};
