import cn from '@utils/cn';
import './Badge.css';

const Badge = ({
  children,
  variant  = 'default',
  size     = 'md',
  dot      = false,
  className,
  ...props
}) => (
  <span
    className={cn('badge', `badge--${variant}`, `badge--${size}`, className)}
    {...props}
  >
    {dot && <span className="badge__dot" aria-hidden="true" />}
    {children}
  </span>
);

export default Badge;
