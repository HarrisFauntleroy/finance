import { useEffect, useState } from "react";
import { Box, Text, Title } from "@mantine/core";
import { Releases } from "./Timeline";
import { logger } from "common";
import { Endpoints } from "@octokit/types";

type ListRepositoryEventsResponse =
  Endpoints["GET /repos/{owner}/{repo}/events"]["response"];

export type EventData = ListRepositoryEventsResponse["data"];

async function getGithubEvents(
  owner: string,
  repo: string,
  type: string
): Promise<EventData> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/events`,
      {
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data: EventData = await response.json();
    logger.info("data", data);
    return data?.filter(function (event) {
      return event.type === type;
    });
  } catch (error) {
    logger.error("Fetching github events failed: ", error);
    throw error;
  }
}

export function Changelog() {
  const [releases, setReleases] = useState<EventData>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getGithubEvents("harrisfauntleroy", "alchemical-finance", "ReleaseEvent")
      .then((releases) => {
        logger.info("Successfully fetch releases: ", releases);
        setReleases(releases);
      })
      .catch((error: Error) => {
        logger.error("Couldn't get releases: ", error);
        setError("Error fetching release history");
      });
  }, []);

  return (
    <Box h="100%" w="100%" p="lg">
      <Title order={1} mb="16px">
        Changelog
      </Title>
      <Releases releases={releases} />
      <Text color="red">{error}</Text>
    </Box>
  );
}
