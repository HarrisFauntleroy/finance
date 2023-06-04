import { Button, Flex, Stack, Title } from "@mantine/core";
import currency from "currency.js";
import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { Grid } from "../../Grid";
import { Card } from "../../Layout/Card";

export const BudgetsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;
  const { data } = trpc.budget.byUserId.useQuery({
    userId: userId || "",
  });

  return (
    <Stack>
      <Flex justify="space-between" align="center">
        {/* <BudgetControl /> */}
      </Flex>
      <Grid>
        {data?.map((budget) => (
          <Card key={budget.id}>
            <Stack justify="space-between" align="top">
              <Stack>
                <Title size="md">{budget.name}</Title>
              </Stack>
              <Flex gap="16px">
                <Flex>
                  <Flex>{currency(String(budget.income)).format()}</Flex>
                  <Flex>Income</Flex>
                </Flex>
                <Flex>
                  <Flex>{currency(String(budget?.totalBalance)).format()}</Flex>
                  <Flex>Current balance</Flex>
                </Flex>
                <Flex>
                  <Flex>{currency(40).format()}</Flex>
                  <Flex>Daily spend limit</Flex>
                </Flex>
              </Flex>
              <Button.Group>Controls here</Button.Group>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
};
