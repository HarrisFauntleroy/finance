import { Button } from "@mantine/core";
import { useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CreateAccount } from ".";
import { PrivacyContext } from "../../Providers/Privacy";

export const ControlBar = () => {
  const { privacy, togglePrivacy } = useContext(PrivacyContext);

  return (
    <Button.Group style={{ gap: 8 }}>
      <CreateAccount />
      <Button>Hide zero balances</Button>
      <Button
        leftIcon={privacy ? <FiEyeOff /> : <FiEye />}
        onClick={() => togglePrivacy()}
      >
        Privacy mode
      </Button>
    </Button.Group>
  );
};
