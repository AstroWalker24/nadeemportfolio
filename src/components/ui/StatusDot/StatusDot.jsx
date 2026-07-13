import cn from '@utils/cn';
import './StatusDot.css';

const COLOR_MAP = {
  active: 'success',
  done:   'success',
  wip:    'warning',
  paused: 'muted',
  queued: 'info',
};

/**
 * Small colored status indicator dot.
 *
 * @param {string}  status  - 'active' | 'done' | 'wip' | 'paused' | 'queued'
 *                            or a raw color key: 'success' | 'warning' | 'info' | 'danger' | 'muted'
 * @param {boolean} pulse   - show CSS pulse animation (use for 'active' states)
 */
const StatusDot = ({ status = 'active', pulse, className, ...props }) => {
  const color = COLOR_MAP[status] ?? status;
  const shouldPulse = pulse ?? status === 'active';

  return (
    <span
      className={cn(
        'status-dot',
        `status-dot--${color}`,
        shouldPulse && 'status-dot--pulse',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
};

export default StatusDot;
