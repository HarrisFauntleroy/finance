import { useEffect, useState } from 'react';
import { Box, Title } from '@mantine/core';
import { Releases } from './Timeline';

export interface Commit {
  message: string;
  sha: string;
  url: string;
  author: {
    name: string;
    email: string;
  };
}

export interface PushEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: Array<{
      sha: string;
      author: {
        email: string;
        name: string;
      };
      message: string;
      distinct: boolean;
      url: string;
    }>;
  };
  public: boolean;
  created_at: string;
}

async function getGithubEvents(
  username: string,
  repoName: string,
  eventType: string,
): Promise<PushEvent[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/events`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PushEvent[] = await response.json();
    return data?.filter((event) => event.type === eventType);
  } catch (error) {
    console.error('Fetching github events failed: ', error);
    throw error;
  }
}

function groupPushEvents(pushEvents: PushEvent[]): Commit[] {
  let commits: Commit[] = [];
  pushEvents.forEach((event) => {
    const commitsByAuthor = event.payload.commits.filter(({ author }) => {
      const emails = ['harrisfauntleroy@gmail.com'];
      return emails.includes(author.email);
    });
    commits = [...commits, ...commitsByAuthor];
  });
  return commits;
}

const getCommits = async (
  username: string,
  repoName: string,
): Promise<Commit[]> => {
  const events = await getGithubEvents(username, repoName, 'PushEvent');
  return groupPushEvents(events);
};

export const Changelog = () => {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    getCommits('harrisfauntleroy', 'alchemical-finance').then((commits) => {
      setCommits(commits);
    });
  }, []);

  return (
    <Box h="100%" w="100%" p="lg">
      <Title order={1} mb="16px">
        Releases
      </Title>
      <Releases commits={commits} />
    </Box>
  );
};
