import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider rounded-lg font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px] gap-1.5',
    md: 'px-4 py-2.5 text-xs gap-2',
    lg: 'px-6 py-3.5 text-sm gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-bg font-bold shadow-md hover:shadow-gold-glow hover:brightness-110 active:scale-[0.98]',
    outline:
      'bg-transparent border border-gold/60 text-gold hover:bg-gold/10 hover:border-gold active:scale-[0.98]',
    ghost:
      'bg-transparent text-text-muted hover:text-gold hover:bg-white/5 active:scale-[0.98]',
  };

  return (
    <button
      className={twMerge(
        clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default GoldButton;

