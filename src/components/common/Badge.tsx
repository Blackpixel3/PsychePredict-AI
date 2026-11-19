import React from 'react';
import type { SeverityLevel } from '../../types';
import { SEVERITY_COLORS } from '../../data/mockData';

interface BadgeProps {
  label: string;
  severity?: SeverityLevel;
  variant?: 'default' | 'outline' | 'sage' | 'charcoal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  severity,
  variant = 'default',
  size = 'md',
  className = '',
  showDot = false,
}) => {
  let colorClasses = 'bg-zinc-100 text-zinc-700 border-zinc-200';

  if (severity && SEVERITY_COLORS[severity]) {
    const sc = SEVERITY_COLORS[severity];
    colorClasses = `${sc.bg} ${sc.text} ${sc.border}`;
  } else if (variant === 'sage') {
    colorClasses = 'bg-sage-50 text-sage-800 border-sage-200';
  } else if (variant === 'charcoal') {
    colorClasses = 'bg-zinc-900 text-zinc-100 border-zinc-800';
  } else if (variant === 'outline') {
    colorClasses = 'bg-transparent text-zinc-600 border-zinc-300';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs font-medium px-2.5 py-0.5',
    lg: 'text-xs font-semibold px-3 py-1',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border ${sizeClasses} ${colorClasses} tracking-tight ${className}`}
    >
      {showDot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />}
      {label}
    </span>
  );
};
