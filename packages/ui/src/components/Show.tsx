import React, { ReactNode } from 'react';

interface ShowProps {
  when: boolean;
  children?: ReactNode;
}

export const Show = ({ when, children }: ShowProps) => {
  return (
    <div style={{ display: when ? undefined : 'none' }}>
      <>{children}</>
    </div>
  );
};
