import { useEffect } from "react";

import { logger } from "@alchemical-finance/common";

import { defaultToast } from "../../utils/toast";
import { RouterOutput, trpc } from "../../utils/trpc";

import { Autocomplete } from "../Form/Autocomplete";

import type { Settings } from "@alchemical-finance/database/generated/prisma-client";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { Debug } from "../Debug";
import { Drawer } from "../Drawer";
import { TextInput } from "../TextInput";

type SettingsFormProps = {
  defaultValues?: RouterOutput["settings"]["byUserId"];
};

export const SettingsForm = ({ defaultValues }: SettingsFormProps) => {
  const session = useSession();
  const userId = session.data?.userId;
  const toast = useToast();

  const updatesettings = trpc.settings.update.useMutation();

  const { data: currencies } = trpc.markets.forex.useQuery();

  const methods = useForm<Settings>({
    defaultValues: { userId, ...defaultValues },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onFormSubmit = (data: Settings) => {
    if (userId) {
      updatesettings
        .mutateAsync({
          userId,
          id: defaultValues?.id,
          userCurrency: data.userCurrency,
          userLanguage: data.userLanguage,
        })
        .then(() => {
          reset();
          toast({
            title: "Updated!",
            status: "success",
            ...defaultToast,
          });
        })
        .catch(() => {
          reset();
          toast({
            title: "Error!",
            status: "error",
            ...defaultToast,
          });
        });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id="settings-form"
        onSubmit={handleSubmit(onFormSubmit, logger.error)}
      >
        <Stack gap={1}>
          <Autocomplete data={currencies || []} label="Currency" />
          <TextInput
            label="Language"
            name="userLanguage"
            register={register}
            validation={{
              minLength: {
                value: 3,
                message: "Minimum length should be 3",
              },
            }}
            error={errors.userLanguage?.message}
          />
          <TextInput
            label="Theme"
            name="preferredColorScheme"
            register={register}
            validation={{
              required: "This is required",
            }}
            error={errors.preferredColorScheme?.message}
          />
          <ButtonGroup>
            <Button
              type="submit"
              form="settings-form"
              colorScheme="green"
              flex={1}
            >
              Confirm
            </Button>
          </ButtonGroup>
        </Stack>
        <Debug data={defaultValues} />
      </form>
    </FormProvider>
  );
};

type SettingsDrawerProps = {
  defaultValues?: Settings;
};

export const SettingsDrawer = ({ defaultValues }: SettingsDrawerProps) => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        size="sm"
        icon={<SettingsIcon />}
        onClick={onOpen}
        textTransform="uppercase"
        maxWidth="max-content"
        aria-label={""}
      />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update settings</DrawerHeader>
          <DrawerBody>
            <SettingsForm defaultValues={defaultValues} />
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <ButtonGroup>
              <Button
                type="submit"
                form="settings-form"
                colorScheme="green"
                flex={1}
              >
                Save
              </Button>
              <Button flex={1} onClick={onClose} colorScheme="blue">
                Cancel
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
