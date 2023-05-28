import {
  Button,
  Card,
  Col,
  Grid,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
import { Page } from "../components/Layout/Page";
import { Changelog } from "../components/Releases";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Home = () => {
  const session = useSession();

  return (
    <Page title="Home">
      {session.data?.user ? <AuthenticatedHomePage /> : <HomePage />}
    </Page>
  );
};

Home.auth = false;
export default Home;

function AuthenticatedHomePage() {
  const theme = useMantineTheme();

  return (
    <Stack style={{ paddingTop: theme.spacing.xl }}>
      <Card>Accounts overview</Card>
      <Card>Budgets overview</Card>
      <Card>Markets overview</Card>
    </Stack>
  );
}

function HomePage() {
  const theme = useMantineTheme();

  return (
    <Stack style={{ paddingTop: theme.spacing.xl }}>
      <Grid>
        <Col span={12}>
          <Paper p="md" shadow="xs">
            <Text align="center" size="xl" weight={700}>
              Welcome to Alchemical Finance
            </Text>
            <Text align="center">
              Track your portfolio, create and collaborate on budgets, gain
              trading insights, and much more.
            </Text>
            <Button
              fullWidth
              variant="light"
              style={{ marginTop: theme.spacing.md }}
            >
              Get Started
            </Button>
          </Paper>
        </Col>
      </Grid>
      <Changelog repo="harrisfauntleroy/alchemical-finance" />
    </Stack>
  );
}

Home.auth = false;
