import React from 'react';
import { InputVariant, InputSize, BaseComponentProps } from '@/core/types';

interface InputProps extends BaseComponentProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  className = '',
  fullWidth = true,
  ...props
}) => {
  const baseClasses = 'block w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const variantClasses: Record<InputVariant, string> = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    filled: 'border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
    outline: 'border-gray-300 bg-transparent focus:border-blue-500 focus:ring-blue-500',
  };
  
  const sizeClasses: Record<InputSize, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const leftIconClasses = leftIcon ? 'pl-10' : '';
  const rightIconClasses = rightIcon ? 'pr-10' : '';
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <div className={widthClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{leftIcon}</span>
          </div>
        )}
        
        <input
          className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${leftIconClasses} ${rightIconClasses} ${className}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
