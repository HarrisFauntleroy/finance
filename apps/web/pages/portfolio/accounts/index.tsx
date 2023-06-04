import { SimpleGrid } from "@mantine/core";
import { AccountBreakdown } from "../../../components/Portfolio/AccountBreakdown";
import { AssetList } from "../../../components/Portfolio/Assets/AssetList";
import { ControlBar } from "../../../components/Portfolio/Assets/ControlBar";

function Accounts() {
  return (
    <SimpleGrid cols={1}>
      <ControlBar />
      <AssetList />
      <AccountBreakdown />
    </SimpleGrid>
  );
}

Accounts.auth = true;
export default Accounts;
