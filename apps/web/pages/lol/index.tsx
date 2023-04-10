import { useCallback, useState } from 'react';

import { AssetTable } from '~/components/lol';

import {
  Avatar,
  AvatarGroup,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { SetStateAction } from 'react';
import { MdSend } from 'react-icons/md';

type Message = {
  message: { id: string; body: string };
};

const SentMessage = ({ message }: Message) => (
  <Flex
    key={message.id}
    justifyContent="flex-end"
    gap="8px"
    css={{ gap: '8px' }}
  >
    <Text bg="blue.100" borderRadius="4px" padding="8px">
      {message.body}
    </Text>
  </Flex>
);

const ReceivedMessage = ({ message }: Message) => (
  <Flex
    key={message.id}
    justifyContent="flex-start"
    gap="8px"
    css={{ gap: '8px' }}
  >
    <Text bg="green.100" borderRadius="4px" padding="8px">
      {message.body}
    </Text>
  </Flex>
);

const GroupChat = () => {
  const [messages, setMessages] = useState([
    { body: 'Hello!', id: '823r208awdwa3209', received: true },
    { body: 'Hello', id: '823r208awdwaadwad3209', received: true },
    { body: "ello'", id: 'awdawdwadwadawdwa', received: true },
    { body: "Hello'", id: 'awdawdwadwadawdwa', received: true },
    { body: 'Howdy', id: 'dccszczs', received: true },
    { body: 'Hey fellas.', id: 'dccszczs', sent: true },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setInputValue(e.target.value);
    },
    [],
  );

  const sendMessage = (content: string) => {
    const newMessage = {
      body: content,
      id: Date.now().toString(),
      sent: true,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <Stack>
      <Center height="100%">
        <Stack
          height="512px"
          width="420px"
          padding="8px"
          border="4px solid"
          borderColor="blue.100"
          borderRadius="4px"
          justifyContent="space-between"
        >
          <Flex
            padding="8px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>5 eyes groupchat</Text>
            <AvatarGroup>
              <Avatar name="R1" src="https://bit.ly/dan-abramov" />
              <Avatar name="R2" src="https://bit.ly/dan-abramov" />
              <Avatar name="R3" src="https://bit.ly/dan-abramov" />
              <Avatar name="R4" src="https://bit.ly/dan-abramov" />
              <Avatar name="R5" src="https://bit.ly/dan-abramov" />
            </AvatarGroup>
          </Flex>
          <Stack overflowY="auto">
            {messages.map((message) =>
              message.sent ? (
                <SentMessage key={message.id} message={message} />
              ) : (
                <ReceivedMessage key={message.id} message={message} />
              ),
            )}
          </Stack>
          <InputGroup size="lg">
            <Input value={inputValue} onChange={handleInputChange} />
            <InputRightElement>
              <IconButton
                icon={<MdSend />}
                aria-label="Send chat"
                onClick={handleSendClick}
              />
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Center>
      <AssetTable />
    </Stack>
  );
};

export default GroupChat;
