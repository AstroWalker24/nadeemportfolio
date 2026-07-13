// Framer Motion variants
// Aesthetic: GitHub x Linear x Raycast x Warp Terminal

const EASE = [0.25, 0.1, 0.25, 1];

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const fadeInUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.4, ease: EASE } },
};

export const fadeInDown = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0,    transition: { duration: 0.4, ease: EASE } },
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.4, ease: EASE } },
};

export const slideInRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.4, ease: EASE } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.3, ease: EASE } },
};

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      delayChildren:   0.05,
      staggerChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.35, ease: EASE } },
};
