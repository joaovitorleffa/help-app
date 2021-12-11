import React, { ReactNode } from 'react';

type Props = {
  when?: boolean | null;
  fallback?: ReactNode;
  children: ReactNode;
};

export function Show({ when, fallback, children }: Props): JSX.Element {
  return <>{when ? children : fallback}</>;
}
