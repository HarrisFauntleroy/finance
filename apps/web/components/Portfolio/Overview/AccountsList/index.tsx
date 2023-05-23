import { Card } from "@mantine/core";
import { ControlBar } from "../../ControlBar";
import { AssetTable } from "../AssetTable";

export const OverviewAccountsList = () => {
  return (
    <Card>
      <ControlBar />
      <AssetTable />
    </Card>
  );
};
