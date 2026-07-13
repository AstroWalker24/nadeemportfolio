import { motion } from 'framer-motion';
import cn from '@utils/cn';
import { staggerContainer } from '@animations';
import './Section.css';

const Section = ({
  children,
  id,
  padded  = true,
  animate = true,
  className,
  as: Tag = 'section',
  ...props
}) => (
  <Tag
    id={id}
    className={cn('section', padded && 'section--padded', className)}
    {...props}
  >
    <motion.div
      variants={animate ? staggerContainer : undefined}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  </Tag>
);

export default Section;
