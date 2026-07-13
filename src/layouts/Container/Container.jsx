import cn from '@utils/cn';
import './Container.css';

const Container = ({
  children,
  size     = 'default',
  as: Tag  = 'div',
  className,
  ...props
}) => (
  <Tag
    className={cn('container', size !== 'default' && `container--${size}`, className)}
    {...props}
  >
    {children}
  </Tag>
);

export default Container;
