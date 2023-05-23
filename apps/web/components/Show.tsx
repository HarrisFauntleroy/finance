import { PropsWithChildren } from "react";

type ShowProps<T> = PropsWithChildren<T> & {
  when: boolean;
};

export function Show<T>({ when, children }: ShowProps<T>) {
  return (
    <div style={{ display: when ? undefined : "none" }}>
      <>{children}</>
    </div>
  );
}
