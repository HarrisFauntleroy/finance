import {
  Paper,
  Col,
  Text,
  Button,
  useMantineTheme,
  Grid,
  Stack,
} from '@mantine/core';
import type { NextPageWithLayout } from '../pages/_app';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Changelog } from '../components/Changelog';
import { Page } from 'components/Layout/Page';

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
  Filler,
);

const Home: NextPageWithLayout = () => {
  const theme = useMantineTheme();

  return (
    <Page title="Home">
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
        <Changelog />
      </Stack>
    </Page>
  );
};

Home.auth = false;
export default Home;
