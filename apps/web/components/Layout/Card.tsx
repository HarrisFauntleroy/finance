import { CardProps, Card as MantineCard } from "@mantine/core";

export function Card(props: CardProps) {
  return <MantineCard style={{ overflow: "scroll" }} {...props} />;
}
