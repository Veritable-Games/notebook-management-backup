import React from 'react';
import clsx from 'clsx';

/**
 * Card component for displaying content in a contained card
 * 
 * @param {Object} props
 * @param {'default'|'elevated'|'outlined'} [props.variant='default'] - Card variant
 * @param {boolean} [props.interactive=false] - Whether the card has hover/active effects
 * @param {string} [props.className] - Additional CSS class
 * @param {React.ReactNode} props.children - Card content
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Other div props
 */
export const Card = ({
  variant = 'default',
  interactive = false,
  className,
  children,
  ...rest
}) => {
  const cardClasses = clsx(
    'vg-card',
    `vg-card--${variant}`,
    {
      'vg-card--interactive': interactive,
    },
    className
  );

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card header component
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS class
 * @param {React.ReactNode} props.children - Header content
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Other div props
 */
export const CardHeader = ({
  className,
  children,
  ...rest
}) => (
  <div className={clsx('vg-card__header', className)} {...rest}>
    {children}
  </div>
);

/**
 * Card body component
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS class
 * @param {React.ReactNode} props.children - Body content
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Other div props
 */
export const CardBody = ({
  className,
  children,
  ...rest
}) => (
  <div className={clsx('vg-card__body', className)} {...rest}>
    {children}
  </div>
);

/**
 * Card footer component
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS class
 * @param {React.ReactNode} props.children - Footer content
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Other div props
 */
export const CardFooter = ({
  className,
  children,
  ...rest
}) => (
  <div className={clsx('vg-card__footer', className)} {...rest}>
    {children}
  </div>
);

export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});