import { motion } from 'framer-motion';
import cn from '@utils/cn';
import './ProgressBar.css';

/**
 * Animated progress bar. Fills in on scroll into view.
 *
 * @param {number}  value      - current value
 * @param {number}  max        - maximum value (default 100)
 * @param {string}  color      - 'accent' | 'success' | 'warning' | 'danger' | 'info'
 * @param {string}  size       - 'sm' | 'md' | 'lg'
 * @param {boolean} showLabel  - show percentage label at end
 * @param {number}  delay      - animation delay in seconds
 */
const ProgressBar = ({
  value     = 0,
  max       = 100,
  color     = 'accent',
  size      = 'md',
  showLabel = false,
  delay     = 0,
  className,
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('progress-bar', `progress-bar--${size}`, className)}>
      <div className={cn('progress-bar__track')}>
        <motion.div
          className={cn('progress-bar__fill', `progress-bar__fill--${color}`)}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
      {showLabel && (
        <span className="progress-bar__label">{Math.round(pct)}%</span>
      )}
    </div>
  );
};

export default ProgressBar;
