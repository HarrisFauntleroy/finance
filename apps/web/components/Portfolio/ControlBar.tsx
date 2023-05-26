import { ActionIcon, Button, Flex, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { PrivacyContext } from "../Providers/Privacy";
import { CreateAccount } from "./CreateAccount";

export const ControlBar = () => {
  const { privacy, togglePrivacy } = useContext(PrivacyContext);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Flex justify="space-between">
      <CreateAccount />
      <Button>Hide zero balances</Button>
      <Button
        leftIcon={privacy ? <FiEyeOff /> : <FiEye />}
        onClick={() => togglePrivacy()}
      >
        Privacy mode
      </Button>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon>
    </Flex>
  );
};
