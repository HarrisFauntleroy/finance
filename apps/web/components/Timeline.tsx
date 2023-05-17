import { Timeline, Text } from '@mantine/core';
import { IconGitCommit } from '@tabler/icons-react';
import { Commit } from './Changelog';

export function Releases({ commits }: { commits: Commit[] }) {
  console.log(commits);
  return (
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      {commits?.slice(0, 3).map((commit) => (
        <Timeline.Item
          key={commit.sha}
          bullet={<IconGitCommit size={16} />}
          title={commit.sha}
        >
          <Text
            color="dimmed"
            size="sm"
            variant="link"
            component="span"
            inherit
          >
            {commit.message}
          </Text>{' '}
          <Text size="xs" mt={4}>
            2 hours ago
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
