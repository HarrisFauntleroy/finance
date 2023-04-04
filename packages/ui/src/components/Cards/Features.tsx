import { FeatureCard } from '../Cards/FeatureCard';
import { Grid } from '../Grid';
import { Container } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import React from 'react';

export type Feature = {
  heading: string;
  content: string;
  icon?: ReactNode;
};

type FeaturesProps = {
  features: Feature[];
};

export function Features({ features }: FeaturesProps) {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <Grid gap={10}>{features.map(FeatureCard)}</Grid>
    </Container>
  );
}
