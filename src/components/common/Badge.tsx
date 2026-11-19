import React from 'react';
import type { SeverityLevel } from '../../types';
import { SEVERITY_COLORS } from '../../data/mockData';

interface BadgeProps {
  label: string;
  severity?: SeverityLevel;
  variant?: 'default' | 'outline' | 'teal' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  severity,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (severity && SEVERITY_COLORS[severity]) {
    const sc = SEVERITY_COLORS[severity];
    colorClasses = `${sc.bg} ${sc.text} ${sc.border}`;
  } else if (variant === 'teal') {
    colorClasses = 'bg-teal-50 text-teal-700 border-teal-200';
  } else if (variant === 'navy') {
    colorClasses = 'bg-navy-50 text-navy-800 border-navy-200';
  } else if (variant === 'outline') {
    colorClasses = 'bg-transparent text-slate-600 border-slate-300';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-semibold px-3 py-1.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
};
