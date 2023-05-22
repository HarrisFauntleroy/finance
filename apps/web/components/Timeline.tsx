import { Timeline, Text, Avatar } from '@mantine/core';
import { EventData } from './Changelog';
import { format } from 'date-fns';
import { Markdown } from './Markdown';

export function Releases({ releases }: { releases: EventData }) {
  return (
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      {releases?.slice(0, 3).map((release) => (
        <Timeline.Item
          key={release.id}
          bullet={<Avatar src={release.actor.avatar_url} radius="xl" />}
          title={
            <Text>
              {release.repo.name
                .split('/')[1]
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
              {' - '}
              {(release.payload as { release: { name: string } }).release.name}
            </Text>
          }
        >
          <Markdown>
            {(release.payload as { release: { body: string } }).release.body}
          </Markdown>
          <Text
            color="dimmed"
            size="sm"
            variant="link"
            component="span"
            inherit
          >
            {format(
              new Date(
                (
                  release.payload as { release: { published_at: string } }
                ).release.published_at,
              ),
              'MMM dd, yyyy',
            )}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
