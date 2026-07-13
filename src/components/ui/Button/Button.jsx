import { useMemo } from 'react';
import { motion } from 'framer-motion';
import cn from '@utils/cn';
import './Button.css';

const Button = ({
  children,
  variant  = 'primary',
  size     = 'md',
  as: Tag  = 'button',
  disabled = false,
  className,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const MotionTag = useMemo(
    () => (typeof Tag === 'string' ? motion[Tag] : motion.create(Tag)),
    [Tag]
  );

  return (
    <MotionTag
      className={cn(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        disabled && 'btn--disabled',
        className
      )}
      disabled={Tag === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      whileHover={!disabled ? { scale: 1.015 } : undefined}
      whileTap={!disabled   ? { scale: 0.975 } : undefined}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      {...props}
    >
      {leftIcon  && <span className="btn__icon btn__icon--left"  aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="btn__icon btn__icon--right" aria-hidden="true">{rightIcon}</span>}
    </MotionTag>
  );
};

export default Button;
