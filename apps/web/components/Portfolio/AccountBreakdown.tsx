import { Text } from "@mantine/core";
import { Card } from "../Layout/Card";

export const AccountBreakdown = () => {
  return (
    <Card>
      <Text>Overview</Text>
      <ul>
        <ul>
          <li>CREDIT</li>
          <li>1 active account</li>
        </ul>
        <ul>
          <li>CRYPTO</li>
          <li>2 active account</li>
        </ul>
        <ul>
          <li>STOCK</li>
          <li>1 active account</li>
        </ul>
      </ul>
    </Card>
  );
};
