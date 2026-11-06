import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface MonoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'muted' | 'cyan' | 'success';
  dot?: boolean;
}

export const MonoBadge: React.FC<MonoBadgeProps> = ({
  children,
  className,
  variant = 'gold',
  dot = true,
  ...props
}) => {
  const variantStyles = {
    gold: 'border-gold/30 bg-gold/10 text-gold',
    muted: 'border-white/10 bg-white/5 text-text-muted',
    cyan: 'border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  };

  const dotColors = {
    gold: 'bg-gold animate-pulse',
    muted: 'bg-text-muted',
    cyan: 'bg-neon-cyan animate-pulse',
    success: 'bg-emerald-400 animate-ping',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider border select-none',
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={clsx('h-1.5 w-1.5 rounded-full', dotColors[variant])} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

export default MonoBadge;
