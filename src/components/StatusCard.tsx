import React from 'react';

export type StatusCardVariant = 'normal' | 'warning' | 'alert';

export interface StatusCardProps {
  caption: string;
  headline: string | number;
  label: string;
  variant?: StatusCardVariant;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  caption,
  headline,
  label,
  variant = 'normal',
}) => {
  return (
    <article
      className={`status-card status-card-${variant}`}
      aria-label={`${caption}: ${headline}`}
    >
      <div className="status-card-accent" aria-hidden="true" />
      <div className="status-card-caption">{caption}</div>
      <div className="status-card-headline">{headline}</div>
      <div className="status-card-label">{label}</div>
    </article>
  );
};

export default StatusCard;
