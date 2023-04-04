import { useState } from 'react';

import { logger } from 'common';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Papa from 'papaparse';
import type { ChangeEvent } from 'react';

// Load the CSV file and parse its contents
export async function loadCSV(file: File): Promise<unknown[]> {
  return new Promise((resolve, reject) =>
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        logger.info('Loaded CSV', results.data);
        resolve(results.data);
      },
      error: (error) => {
        logger.error(error.message);
        reject(error);
      },
    }),
  );
}

export const Csv = () => {
  const [csvState, setCsvState] = useState<unknown[]>();

  const { onClose } = useDisclosure();

  const headers = Object.keys((csvState?.[0] as Record<string, unknown>) || {});

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const file = files?.[0];
    if (file) {
      loadCSV(file).then((parsedData) => {
        setCsvState(parsedData);
      });
    }
    logger.error('File not found');
    return { error: 'File not found' };
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Modal isOpen={!!csvState?.length} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="scroll">
            <form
            // onSubmit={handleSubmit}
            >
              <Table id="table" size="sm" variant="striped" maxWidth="100%">
                <Thead>
                  <Tr>
                    {headers?.map((header: string) => (
                      <Th key={header}>
                        <input
                          type="text"
                          value={header}
                          // onChange={(e) => handleHeaderChange(e, index)}
                        />
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {csvState?.map((cell) => (
                    <Tr key={String(cell)}>
                      {Object.values(cell as Record<string, string>).map(
                        (value: string) => (
                          <Td key={value}>
                            <input
                              type="text"
                              value={value}
                              // onChange={(e) =>
                              // 	handleCellChange(e, rowIndex, cellIndex)
                              // }
                            />
                          </Td>
                        ),
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <button type="submit">Submit</button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
