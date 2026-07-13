import { useMemo } from 'react';
import { motion } from 'framer-motion';
import cn from '@utils/cn';
import './Card.css';

const Card = ({
  children,
  variant   = 'default',
  hover     = true,
  padding   = true,
  className,
  as: Tag   = 'div',
  ...props
}) => {
  const MotionTag = useMemo(
    () => (typeof Tag === 'string' ? motion[Tag] : motion.create(Tag)),
    [Tag]
  );

  return (
    <MotionTag
      className={cn(
        'card',
        `card--${variant}`,
        hover   && 'card--hover',
        padding && 'card--padded',
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default Card;
