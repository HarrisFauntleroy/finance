import { Avatar, Flex, List, Stack } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Profile = () => {
  const session = useSession();
  const userId = session?.data?.userId || "";

  const { data } = trpc.user.byId.useQuery({
    id: userId,
  });

  const formattedJoinDate = new Date(
    data?.createdAt || ""
  ).toLocaleDateString();

  return (
    <Stack>
      <Flex align="center" gap={8}>
        <Avatar src={data?.image} alt={data?.name || ""} />
        <List>
          <List.Item>{data?.name}</List.Item>
          <List.Item>Joined: {formattedJoinDate}</List.Item>
          <List.Item>Role: {data?.role}</List.Item>
        </List>
      </Flex>
    </Stack>
  );
};

Profile.auth = true;
export default Profile;
