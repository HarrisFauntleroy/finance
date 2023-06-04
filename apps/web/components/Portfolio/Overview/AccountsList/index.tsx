import { Card } from "../../../Layout/Card";
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
