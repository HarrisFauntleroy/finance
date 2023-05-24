import { trpc } from "../utils/trpc";

import { Avatar, Card, Chip, Stack, Text } from "@mantine/core";
import { Role } from "database/generated/prisma-client";
import { Grid } from "../components/Grid";
import { Page } from "../components/Layout/Page";

const UserCardComponent = ({
  user,
}: {
  user: {
    id: string;
    name: string | null;
    role: Role;
    image: string | null;
  };
}) => (
  <Card shadow="xs" padding="md">
    <Stack dir="row" align="center" spacing="md">
      <Avatar src={user.image || ""} radius="xl" />
      <Stack align="flex-start" spacing="xs">
        <Text size="xl" weight={500}>
          {user.name}
        </Text>
        <Text color="gray" size="sm">
          Role: {user.role.toUpperCase()}
        </Text>
        <Text color="gray" size="sm">
          ID: {user.id}
        </Text>
      </Stack>
    </Stack>
  </Card>
);

const LogCardComponent = ({
  log,
}: {
  log: {
    createdAt: Date;
    deleted: boolean;
    id: string;
    message: string;
    type: string;
    updatedAt: Date;
  };
}) => (
  <Card shadow="xs" padding="md">
    <Stack align="flex-start" spacing="xs">
      <Text size="xl" weight={500}>
        {log.createdAt.toLocaleDateString()}
      </Text>
      <Text color="gray" size="sm">
        Flagged for deletion: {log.deleted.toString()}
      </Text>
      <Text color="gray" size="sm">
        ID: {log.id}
      </Text>
      <Text color="gray" size="sm">
        {log.message}
      </Text>
      <Text color="gray" size="sm">
        {log.type}
      </Text>
      <Text color="gray" size="sm">
        {log.updatedAt.toLocaleDateString()}
      </Text>
    </Stack>
  </Card>
);

const CardComponent = ({
  statLabel,
  statNumber,
  statHelpText,
  list,
}: {
  statLabel: string;
  statNumber: number;
  statHelpText: string;
  list: {
    id: string;
    name: string | null;
  }[];
}) => (
  <Card shadow="xs">
    <Stack align="center">
      <Text size="xl" weight={500}>
        {statLabel}
      </Text>
      <Text size="4xl" weight={700}>
        {statNumber}
      </Text>
      <Text color="gray" size="sm">
        {statHelpText}
      </Text>
      <Stack dir="row" spacing="xs">
        {list.map((item) => (
          <Chip key={item.id}>{item.name}</Chip>
        ))}
      </Stack>
    </Stack>
  </Card>
);

const Index = () => {
  const { data: dashboardData } = trpc.user.dashboard.useQuery();
  const { data: logData } = trpc.logs.read.useQuery();

  return (
    <Page title="Admin">
      <Stack align="left">
        <Text size="xl">Admin dashboard</Text>

        <Text>Stats</Text>
        <Grid columns={4}>
          {dashboardData?.statistics.map((stat) => (
            <CardComponent
              key={stat.statHelpText}
              statLabel={stat.statLabel}
              statNumber={stat.statNumber}
              statHelpText={stat.statHelpText}
              list={stat.list}
            />
          ))}
        </Grid>
        <Text>Users</Text>
        <Grid columns={4}>
          {dashboardData?.users.map((user) => (
            <UserCardComponent key={user.id} user={user} />
          ))}
        </Grid>
        <Text>Logs</Text>
        {logData?.map((log) => (
          <LogCardComponent key={log.id} log={log} />
        ))}
      </Stack>
    </Page>
  );
};

Index.auth = false;
export default Index;
