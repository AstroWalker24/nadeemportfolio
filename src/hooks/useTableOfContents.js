import { useState, useEffect, useRef } from 'react';

/**
 * Scans the attached content element for h2/h3 headings (after mount)
 * and tracks which heading is currently in the viewport via IntersectionObserver.
 *
 * Returns:
 *   contentRef — attach to the article content container
 *   headings   — [{ id, text, level }]
 *   activeId   — id of the currently visible heading
 */
const useTableOfContents = () => {
  const contentRef = useRef(null);
  const [headings, setHeadings]   = useState([]);
  const [activeId, setActiveId]   = useState('');

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const elements = Array.from(el.querySelectorAll('h2[id], h3[id]'));

    setHeadings(
      elements.map((h) => ({
        id:    h.id,
        text:  h.textContent?.replace(/#\s*$/, '').trim() ?? '',
        level: parseInt(h.tagName[1], 10),
      }))
    );

    if (elements.length === 0) return;

    // Highlight the heading closest to the top of the visible area
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // rootMargin: top offset accounts for sticky navbar; bottom offset
        // makes the "active" heading the one near the top, not the bottom.
        rootMargin: '-80px 0px -65% 0px',
        threshold:  0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { contentRef, headings, activeId };
};

export default useTableOfContents;
