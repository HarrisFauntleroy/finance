import { Stack } from "@mantine/core";
import { AccountBreakdown } from "../../../components/Portfolio/AccountBreakdown";
import { ControlBar } from "../../../components/Portfolio/ControlBar";
import { AssetTable } from "../../../components/Portfolio/Overview/AssetTable";

function Accounts() {
  return (
    <Stack>
      <ControlBar />
      <AssetTable />
      <AccountBreakdown />
    </Stack>
  );
}

Accounts.auth = true;
export default Accounts;
