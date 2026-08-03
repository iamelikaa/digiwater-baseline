import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  const combinedClassName = className ? `card ${className}` : 'card';

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
