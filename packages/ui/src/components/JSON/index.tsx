export const JSONObjectViewer = ({
  data,
}: {
  data?: Record<string, unknown> | null;
}) => {
  return <pre>{JSON.stringify(data, null, '\t')}</pre>;
};
