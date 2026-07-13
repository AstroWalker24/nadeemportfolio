import { useState, useEffect } from 'react';

/**
 * Tracks reading progress (0-100) relative to a content element.
 * 0 = article not yet in view, 100 = article fully scrolled past.
 */
const useReadingProgress = (contentRef) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;

      const top        = el.offsetTop;
      const height     = el.offsetHeight;
      const viewHeight = window.innerHeight;
      const scrollY    = window.scrollY;

      const range = height - viewHeight;
      if (range <= 0) {
        setProgress(scrollY >= top ? 100 : 0);
        return;
      }

      const pct = Math.max(0, Math.min(100, ((scrollY - top) / range) * 100));
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentRef]);

  return progress;
};

export default useReadingProgress;
