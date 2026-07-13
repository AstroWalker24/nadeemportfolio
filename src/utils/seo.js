import { useEffect } from 'react';

const SITE_NAME = 'Nadeem Shaik';

/**
 * useSEO — updates document title and meta description for the current page.
 * Restores previous values on unmount.
 */
export const useSEO = ({ title, description = '' }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    const getOrCreate = (sel, attrs) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      return el;
    };

    const metaDesc  = getOrCreate('meta[name="description"]',    { name: 'description' });
    const ogTitle   = getOrCreate('meta[property="og:title"]',   { property: 'og:title' });
    const ogDesc    = getOrCreate('meta[property="og:description"]', { property: 'og:description' });

    const prevDesc   = metaDesc.getAttribute('content')  ?? '';
    const prevOgT    = ogTitle.getAttribute('content')   ?? '';
    const prevOgD    = ogDesc.getAttribute('content')    ?? '';

    metaDesc.setAttribute('content', description);
    ogTitle.setAttribute('content',  title ?? SITE_NAME);
    ogDesc.setAttribute('content',   description);

    return () => {
      document.title = prevTitle;
      metaDesc.setAttribute('content', prevDesc);
      ogTitle.setAttribute('content',  prevOgT);
      ogDesc.setAttribute('content',   prevOgD);
    };
  }, [title, description]);
};
