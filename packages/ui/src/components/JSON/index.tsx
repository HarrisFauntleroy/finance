import React from 'react';

export const JSONObjectViewer = ({
  data,
}: {
  data?: Record<string, any> | null;
}) => {
  return <pre>{JSON.stringify(data, null, '\t')}</pre>;
};
