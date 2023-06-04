import { Button } from "@mantine/core";
import { useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { PrivacyContext } from "../../Providers/Privacy";
import { CreateTransaction } from "./CreateTransaction";

export const ControlBar = () => {
  const { privacy, togglePrivacy } = useContext(PrivacyContext);

  return (
    <Button.Group style={{ gap: 8 }}>
      <CreateTransaction />
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
