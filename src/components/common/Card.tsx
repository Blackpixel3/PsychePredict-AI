import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerBorder = true,
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 shadow-card transition-all duration-200 ${className}`}
    >
      {(title || subtitle || action) && (
        <div
          className={`px-5 py-4 flex items-center justify-between flex-wrap gap-2 ${
            headerBorder ? 'border-b border-slate-100' : ''
          }`}
        >
          <div>
            {title && (
              <h3 className="text-base font-semibold text-navy-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
