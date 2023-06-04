import { Button, GridItem } from "@chakra-ui/react";
import { Card } from "../../Layout/Card";
import { Layout } from "../Layout";

export const BudgetOverview = () => {
  return (
    <Layout>
      <Card h="64px">Date picker</Card>
      <Card>
        SPENDING BREAKDOWN
        <ul style={{ listStyle: "none" }}>
          <li>Income</li>
          <li>Expenses</li>
        </ul>
      </Card>
      <Card>ACCOUNTS OVERVIEW</Card>
      <Card>PERIOD SUMMARY</Card>
      <GridItem>
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
          <p>Goes to accounts page</p>
        </Card>
      </GridItem>
    </Layout>
  );
};
