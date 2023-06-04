import { SimpleGrid } from "@mantine/core";
import { AccountBreakdown } from "../../../components/Portfolio/AccountBreakdown";
import { ControlBar } from "../../../components/Portfolio/ControlBar";
import { AssetTable } from "../../../components/Portfolio/Overview/AssetTable";

function Accounts() {
  return (
    <SimpleGrid cols={1}>
      <ControlBar />
      <AssetTable />
      <AccountBreakdown />
    </SimpleGrid>
  );
}

Accounts.auth = true;
export default Accounts;
