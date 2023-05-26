import { trpc } from "../../../utils/trpc";

import { BudgetControl } from "../BudgetControl";

import {
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";
import currency from "currency.js";
import { useSession } from "next-auth/react";
import { Card } from "../../Cards";
import { Grid } from "../../Grid";

export const BudgetsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;
  const { data } = trpc.budget.byUserId.useQuery({
    userId: userId || "",
  });

  return (
    <Stack gap="8px">
      <Flex justify="space-between" align="center">
        <BudgetControl />
      </Flex>
      <Grid>
        {data?.map((budget) => (
          <Card key={budget.id}>
            <Stack justify="space-between" align="top">
              <Stack>
                <Heading size="md">{budget.name}</Heading>
              </Stack>
              <StatGroup gap="16px">
                <Stat>
                  <StatNumber>
                    {currency(String(budget.income)).format()}
                  </StatNumber>
                  <StatHelpText>Income</StatHelpText>
                </Stat>
                <Stat>
                  <StatNumber>
                    {currency(String(budget?.totalBalance)).format()}
                  </StatNumber>
                  <StatHelpText>Current balance</StatHelpText>
                </Stat>
                <Stat>
                  <StatNumber>{currency(40).format()}</StatNumber>
                  <StatHelpText>Daily spend limit</StatHelpText>
                </Stat>
              </StatGroup>
              <ButtonGroup alignItems="center">
                <BudgetControl variant="delete" defaultValues={budget} />
                <BudgetControl defaultValues={budget} />
              </ButtonGroup>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
};
