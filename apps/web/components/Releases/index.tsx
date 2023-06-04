import { Avatar, Box, Loader, Text, Timeline, Title } from "@mantine/core";
import { Endpoints } from "@octokit/types";
import { format } from "date-fns";
import { useFetchWithReactQuery } from "../../hooks/useFetchWithReactQuery";
import { Markdown } from "../Markdown";

type Props = { repo: string };

type ListRepositoryReleasesResponse =
  Endpoints["GET /repos/{owner}/{repo}/releases"]["response"];

export type ReleaseData = ListRepositoryReleasesResponse["data"];

export function Releases({ repo }: Props) {
  const { data, isLoading } = useFetchWithReactQuery(
    `https://api.github.com/repos/${repo}/releases`,
    {
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      {(data as ReleaseData)?.slice(0, 3).map((release) => (
        <Timeline.Item
          key={release.id}
          bullet={<Avatar src={release.author.avatar_url} radius="xl" />}
          title={
            <Text>
              {/* We'll need to split on capital letters  */}
              {release.author.login.split(/(?=[A-Z])/).join(" ")} published
              Alchemical Finance
              {" - "}
              {release.tag_name}
            </Text>
          }
        >
          <Markdown>{String(release.body)}</Markdown>
          <Text
            color="dimmed"
            size="sm"
            variant="link"
            component="span"
            inherit
          >
            {format(new Date(release.published_at || ""), "MMM dd, yyyy")}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

export function Changelog({ repo }: Props) {
  return (
    <Box h="100%" w="100%" p="lg">
      <Title order={3} mb="32px">
        Development updates
      </Title>
      <Releases repo={repo} />
    </Box>
  );
}
