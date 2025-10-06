import React from 'react';
import { BaseComponentProps } from '@/core/types';

interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
}) => {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {(title || subtitle || actions) ? (
        <div className="flex items-start justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

interface CardContentProps extends BaseComponentProps {}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps extends BaseComponentProps {}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
