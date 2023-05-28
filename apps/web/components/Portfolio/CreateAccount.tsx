import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Debug } from "../Debug";

export function CreateAccount() {
  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({});

  const inputs = [
    {
      id: "mQx8p5iZ",
      label: "Name",
      placeholder: "Name",
      inputProps: form.getInputProps("name"),
    },
    {
      id: "RTptgjTN",
      label: "Currency",
      placeholder: "Currency",
      inputType: "string",
      inputProps: form.getInputProps("currency"),
    },
    {
      id: "PtEeyb8c",
      label: "Balance",
      placeholder: "Balance",
      inputProps: form.getInputProps("balance"),
    },
    {
      id: "TvaL0Lw3",
      label: "Cost Basis",
      placeholder: "Cost Basis",
      inputProps: form.getInputProps("costbasis"),
    },
    {
      id: "XHMg0496",
      label: "Realised Gain",
      placeholder: "Realised Gain",
      inputProps: form.getInputProps("realisedGain"),
    },
    {
      id: "Xd4R0496",
      label: "Market ID",
      placeholder: "Market ID",
      inputProps: form.getInputProps("marketId"),
    },
  ];

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
                    console.log("values", values);
                    notifications.show({
                      title: "Submitted values",
                      message: JSON.stringify(values),
                    });
                  })}
                >
                  {inputs?.map((values) => (
                    <TextInput key={values.id} {...values} />
                  ))}
                  <Button type="submit">Submit</Button>
                </form>
                <Debug data={submittedValues} />
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
