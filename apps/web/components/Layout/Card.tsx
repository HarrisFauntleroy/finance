import { CardProps, Card as MantineCard } from "@mantine/core";

export function Card(properties: CardProps) {
  return <MantineCard style={{ overflow: "scroll" }} {...properties} />;
}
