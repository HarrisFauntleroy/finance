/**
 *
 * Index page
 *
 */

import {
  Paper,
  Col,
  Container,
  Text,
  Button,
  useMantineTheme,
  Grid,
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
import { Fragment, FC } from 'react';
import Head from 'next/head';
import { Changelog } from '../components/Changelog';

interface PageHeadProps {
  title: string;
}

export const PageHead: FC<PageHeadProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

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
    <Fragment>
      <PageHead title="Alchemical Finance - Home" />
      <Container style={{ paddingTop: theme.spacing.xl }}>
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
      </Container>
      <Changelog />
    </Fragment>
  );
};

Home.auth = false;
export default Home;
