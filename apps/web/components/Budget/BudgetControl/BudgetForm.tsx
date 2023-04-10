import { Fragment, useEffect } from 'react';

import { trpc } from '~/utils/trpc';

import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import type { FormInputs } from 'components/Form/TextInput';
import { TextInput } from 'components/Form/TextInput';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

export type BudgetFormInputs = {
  id?: string;
  name?: string;
  userId?: string;
  totalBalance?: string;
};

type FormProps = {
  defaultValues?: BudgetFormInputs;
};

export const BudgetForm = ({ defaultValues }: FormProps) => {
  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userId = session?.data?.userId;

  const createBudget = trpc.budget.create.useMutation();
  const updateBudget = trpc.budget.update.useMutation();

  const methods = useForm<BudgetFormInputs>({
    defaultValues: { userId, ...defaultValues },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => reset(defaultValues), [defaultValues, reset]);

  const onValidSubmit: SubmitHandler<BudgetFormInputs> = (_data) => {
    return new Error('No userId provided');
  };

  const inputs: FormInputs[] = [
    {
      id: '145e9714-75f2-46b9-999f-e0895cc37952',
      label: 'Name',
      name: 'name',
      type: 'text',
    },
    {
      id: 'db3016e5-a3b7-432f-a399-8c238c562651',
      label: 'Total Balance',
      name: 'totalBalance',
      type: 'text',
    },
  ];

  return (
    <Fragment>
      <Button
        colorScheme={defaultValues?.id ? 'blue' : 'green'}
        onClick={onOpen}
      >
        {defaultValues?.id ? <EditIcon /> : 'NEW BUDGET'}
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methods}>
            <form>
              <ModalHeader>
                <Heading size="md">
                  {defaultValues?.id ? 'UPDATE BUDGET' : 'CREATE BUDGET'}
                </Heading>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack>
                  {inputs?.map((input) => (
                    <TextInput key={input.name} {...input} />
                  ))}
                </Stack>
                {(createBudget.isLoading || updateBudget.isLoading) && (
                  <Progress size="xs" isIndeterminate />
                )}
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button
                    disabled={createBudget.isLoading || updateBudget.isLoading}
                    colorScheme="green"
                    type="submit"
                    onClick={handleSubmit(onValidSubmit, console.error)}
                  >
                    {createBudget.isLoading || updateBudget.isLoading
                      ? 'LOADING...'
                      : 'SUBMIT'}
                  </Button>
                  <Button onClick={onClose} colorScheme="orange">
                    CANCEL
                  </Button>
                </ButtonGroup>
              </ModalFooter>
              {(createBudget.error || updateBudget.error) && (
                <p>
                  Something went wrong!{' '}
                  {createBudget?.error?.message || updateBudget?.error?.message}
                </p>
              )}
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
