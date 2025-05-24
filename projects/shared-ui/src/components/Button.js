import React from 'react';
import clsx from 'clsx';

/**
 * Button component with support for different variants, sizes, and states
 * 
 * @param {Object} props - Button props
 * @param {'primary'|'secondary'|'tertiary'|'danger'} [props.variant='primary'] - Button variant
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Button size
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {boolean} [props.loading=false] - Whether the button is in loading state
 * @param {string} [props.className] - Additional CSS class
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - Other button props
 */
export const Button = React.forwardRef(({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...rest
}, ref) => {
  const buttonClasses = clsx(
    'vg-button',
    `vg-button--${variant}`,
    `vg-button--${size}`,
    {
      'vg-button--full-width': fullWidth,
      'vg-button--loading': loading,
    },
    className
  );
  
  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="vg-button__loader" aria-hidden="true">
          <span className="vg-spinner"></span>
        </span>
      )}
      <span className="vg-button__content">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;