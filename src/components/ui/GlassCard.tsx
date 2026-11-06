import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'gold-border' | 'subtle';
  hoverEffect?: boolean;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = true,
  glow = false,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-bg-secondary/75 border border-gold/15 backdrop-blur-md',
    'gold-border': 'bg-bg-secondary/85 border border-gold/40 shadow-gold-glow backdrop-blur-lg',
    subtle: 'bg-bg-secondary/40 border border-white/5 backdrop-blur-sm',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative rounded-xl p-6 transition-all duration-300',
          variantStyles[variant],
          hoverEffect &&
            'hover:border-gold/50 hover:bg-bg-secondary/90 hover:shadow-gold-glow hover:-translate-y-0.5',
          glow && 'shadow-gold-glow',
          className
        )
      )}
      {...props}
    >
      {/* Decorative top-corner cyber accent */}
      <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-gold/50 to-transparent" />
      <div className="absolute top-0 right-0 h-8 w-[1px] bg-gradient-to-b from-gold/50 to-transparent" />
      {children}
    </div>
  );
};

export default GlassCard;
