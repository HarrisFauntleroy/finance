import { Avatar, Loader, Text, Timeline } from "@mantine/core";
import { Endpoints } from "@octokit/types";
import { format } from "date-fns";
import { useFetchWithReactQuery } from "../hooks/useFetchWithReactQuery";
import { Markdown } from "./Markdown";

type ListRepositoryReleasesResponse =
  Endpoints["GET /repos/{owner}/{repo}/releases"]["response"];

export type ReleaseData = ListRepositoryReleasesResponse["data"];

const RELEASE_URL =
  "https://api.github.com/repos/harrisfauntleroy/alchemical-finance/releases";

export function Releases() {
  const { data, isLoading } = useFetchWithReactQuery(RELEASE_URL, {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (isLoading) return <Loader />;

  return (
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      {(data as ReleaseData)?.slice(0, 3).map((release) => (
        <Timeline.Item
          key={release.id}
          bullet={<Avatar src={release.author.avatar_url} radius="xl" />}
          title={
            <Text>
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
