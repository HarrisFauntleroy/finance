import { Card } from "../../../Layout/Card";
import { AssetList } from "../../../Portfolio/Assets/AssetList";
import { ControlBar } from "../../Assets/ControlBar";

export const OverviewAccountsList = () => {
  return (
    <Card>
      <ControlBar />
      <AssetList />
    </Card>
  );
};
