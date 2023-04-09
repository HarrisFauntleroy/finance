export function JSONObjectViewer({
  data,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}) {
  return <pre>{JSON.stringify(data || {}, null, '\t')}</pre>;
}
