import { SimpleGrid } from "@mantine/core";
import { Card } from "../../../components/Layout/Card";

function Statistics() {
  return (
    <SimpleGrid cols={1}>
      <Card>Statistics</Card>
    </SimpleGrid>
  );
}

Statistics.auth = true;
export default Statistics;
