import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '@animations/variants';
import cn from '@utils/cn';
import './PanelCard.css';

/**
 * IDE-style panel card with a header bar (icon + title + badge + action)
 * and a body region for any content.
 */
const PanelCard = ({
  title,
  icon,
  badge,
  action,
  children,
  className,
  bodyClassName,
  accent     = false,
  noPadding  = false,
  delay      = 0,
  as: Tag    = 'div',
  ...props
}) => {
  const MotionTag = useMemo(
    () => (typeof Tag === 'string' ? motion[Tag] : motion.create(Tag)),
    [Tag]
  );

  return (
    <MotionTag
      className={cn('panel-card', accent && 'panel-card--accent', className)}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      <div className="panel-card__header">
        {icon && <span className="panel-card__icon" aria-hidden="true">{icon}</span>}
        <span className="panel-card__title">{title}</span>
        {badge != null && (
          <span className="panel-card__badge">{badge}</span>
        )}
        {action && <div className="panel-card__action">{action}</div>}
      </div>
      <div className={cn('panel-card__body', noPadding && 'panel-card__body--no-pad', bodyClassName)}>
        {children}
      </div>
    </MotionTag>
  );
};

export default PanelCard;
