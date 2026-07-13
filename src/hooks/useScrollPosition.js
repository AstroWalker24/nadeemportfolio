import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    let lastY = window.scrollY;

    const handle = () => {
      const y = window.scrollY;
      setDirection(y > lastY ? 'down' : 'up');
      setScrollY(y);
      lastY = y;
    };

    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return { scrollY, direction };
};

export default useScrollPosition;
