import { Button, List, Stack } from "@mantine/core";
import { Card } from "../../Layout/Card";

export const BudgetOverview = () => {
  return (
    <Stack>
      <Card h="64px">Date picker</Card>
      <Card>
        SPENDING BREAKDOWN
        <List style={{ listStyle: "none" }}>
          <List.Item>Income</List.Item>
          <List.Item>Expenses</List.Item>
        </List>
      </Card>
      <Card>ACCOUNTS OVERVIEW</Card>
      <Card>PERIOD SUMMARY</Card>
      <Button.Group>
        <Card h="128px">
          <Button>Review Transactions</Button>
        </Card>
        <Card h="128px">
          <Button>Set November Budget</Button>
        </Card>
        <Card h="128px">
          <Button>Review Recurring Items</Button>
        </Card>
        <Card h="128px">
          <Button>Setup Accounts</Button>
        </Card>
      </Button.Group>
    </Stack>
  );
};
