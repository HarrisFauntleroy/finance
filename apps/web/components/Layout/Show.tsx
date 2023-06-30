import { PropsWithChildren } from "react";

type ShowProperties<T> = PropsWithChildren<T> & {
  when: boolean;
};

export function Show<T>({ when, children }: ShowProperties<T>) {
  return (
    <div style={{ display: when ? undefined : "none" }}>
      <>{children}</>
    </div>
  );
}
