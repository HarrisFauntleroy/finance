import { ReactNode } from "react";
import { Text, UnstyledButton, Group, ThemeIcon } from "@mantine/core";
import Link from "next/link";
import { Role } from "database/generated/prisma-client";

export interface MainLinkProps {
  href?: string;
  label?: string;
  icon?: ReactNode;
  role?: Role;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export function MainLink({
  icon,
  color,
  label,
  className,
  href,
  onClick,
}: MainLinkProps) {
  return (
    <UnstyledButton
      component={Link}
      href={href || ""}
      className={className}
      sx={(theme) => ({
        "display": "block",
        "width": "100%",
        "padding": theme.spacing.xs,
        "borderRadius": theme.radius.sm,
        "color":
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={onClick}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
