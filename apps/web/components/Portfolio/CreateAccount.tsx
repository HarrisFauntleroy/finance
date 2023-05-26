import { Box, Button, Code, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export function CreateAccount() {
  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({
    initialValues: {
      firstName: "Jane",
      lastName: "Doe",
      age: "33",
    },

    transformValues: (values) => ({
      fullName: `${values.firstName} ${values.lastName}`,
      age: Number(values.age) || 0,
    }),
  });

  return (
    <Group position="center">
      <Button
        onClick={() => {
          modals.open({
            id: "create-account",
            title: "Add new account",
            children: (
              <Box maw={400} mx="auto">
                <form
                  onSubmit={form.onSubmit((values) => {
                    setSubmittedValues(JSON.stringify(values, null, 2));
                    notifications.show({
                      title: "Default notification",
                      message: "Hey there, your code is awesome! 🤥",
                    });
                  })}
                >
                  <TextInput
                    label="First name"
                    placeholder="First name"
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    label="Last name"
                    placeholder="Last name"
                    mt="md"
                    {...form.getInputProps("lastName")}
                  />
                  <Select
                    type="number"
                    label="Age"
                    placeholder="Age"
                    mt="md"
                    data={
                      [
                        { value: "10", label: "Ten" },
                        { value: "20", label: "Twenty" },
                        { value: "30", label: "Thirty" },
                      ] as const
                    }
                    {...form.getInputProps("age")}
                  />
                  <Button type="submit" mt="md">
                    Submit
                  </Button>
                </form>
                {submittedValues && <Code block>{submittedValues}</Code>}
              </Box>
            ),
          });
        }}
      >
        Open content modal
      </Button>
    </Group>
  );
}
