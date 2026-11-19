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
      className={`bg-white rounded-lg border border-charcoal-200 shadow-subtle ${className}`}
    >
      {(title || subtitle || action) && (
        <div
          className={`px-5 py-3.5 flex items-center justify-between flex-wrap gap-2 ${
            headerBorder ? 'border-b border-charcoal-200' : ''
          }`}
        >
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-charcoal-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-charcoal-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
