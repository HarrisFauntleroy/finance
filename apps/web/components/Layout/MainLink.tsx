import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { Role } from "database/generated/prisma-client";
import Link from "next/link";
import { ReactNode, useCallback } from "react";

export type MainLinkProps = {
  href?: string;
  label?: string;
  icon?: ReactNode;
  expectedRole?: Role;
  userRole?: Role;
  color?: string;
  className?: string;
  onClick?: () => void;
  open?: boolean;
};

export function MainLink({
  icon,
  color,
  label,
  className,
  href,
  onClick,
  expectedRole,
  userRole = Role.GUEST,
  open,
}: MainLinkProps) {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const isDisabled =
    expectedRole === Role.USER &&
    userRole !== expectedRole &&
    userRole !== Role.ADMIN;
  const isHidden = expectedRole === Role.ADMIN && userRole !== expectedRole;

  if (isHidden) return null;

  return (
    <UnstyledButton
      component={Link}
      href={isDisabled ? "" : href || ""}
      className={className}
      onClick={isDisabled ? undefined : handleClick}
      aria-disabled={isDisabled}
      sx={(theme) => ({
        "display": "flex",
        "width": "100%",
        "padding": theme.spacing.xs,
        "borderRadius": theme.radius.sm,
        "color": isDisabled
          ? theme.colors.gray[5]
          : theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.black,
        "&:hover": {
          backgroundColor: isDisabled
            ? undefined
            : theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon
          m={open ? "auto" : "none"}
          color={color}
          variant="light"
          opacity={isDisabled ? 0.5 : 1}
        >
          {icon}
        </ThemeIcon>
        {!open && <Text size="sm">{label}</Text>}
      </Group>
    </UnstyledButton>
  );
}
