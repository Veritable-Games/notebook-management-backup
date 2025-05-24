import React from 'react';
import clsx from 'clsx';

/**
 * Input component with support for various states and sizes
 * 
 * @param {Object} props - Input props
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Input size
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.error=false] - Whether the input is in error state
 * @param {string} [props.helperText] - Helper text to display below the input
 * @param {string} [props.label] - Label for the input
 * @param {string} [props.className] - Additional CSS class
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props.rest - Other input props
 */
export const Input = React.forwardRef(({
  size = 'medium',
  disabled = false,
  error = false,
  helperText,
  label,
  className,
  id,
  ...rest
}, ref) => {
  const uniqueId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = clsx(
    'vg-input',
    `vg-input--${size}`,
    {
      'vg-input--error': error,
      'vg-input--disabled': disabled,
    },
    className
  );
  
  return (
    <div className="vg-input-wrapper">
      {label && (
        <label className="vg-input__label" htmlFor={uniqueId}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={uniqueId}
        className={inputClasses}
        disabled={disabled}
        aria-invalid={error}
        {...rest}
      />
      {helperText && (
        <p className={clsx('vg-input__helper-text', { 'vg-input__helper-text--error': error })}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;