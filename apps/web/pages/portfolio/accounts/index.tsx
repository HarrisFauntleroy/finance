import { Stack } from "@chakra-ui/react";
import { AccountBreakdown } from "../../../components/Portfolio/AccountBreakdown";
import { AccountsList } from "../../../components/Portfolio/Accounts/AccountsList";
import { ControlBar } from "../../../components/Portfolio/ControlBar";

function Accounts() {
  return (
    <Stack>
      <ControlBar />
      <AccountsList />
      <AccountBreakdown />
    </Stack>
  );
}

Accounts.auth = true;
export default Accounts;
