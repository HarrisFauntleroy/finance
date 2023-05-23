import { useState } from "react";

import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { BsClipboard, BsClipboardCheck } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";

type CopyContentProps = {
  content?: string | null;
};

export const CopyContent = ({ content }: CopyContentProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const { onCopy, hasCopied } = useClipboard(
    content || "Copy failed, content missing."
  );

  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  const getMaskedContent = (unmaskedContent?: string, maxLength = 10) => {
    const maskLength = Math.min(
      unmaskedContent?.length || maxLength,
      maxLength
    );
    return "*".repeat(maskLength);
  };

  return content ? (
    <Tooltip label="Click the button to reveal or hide the content">
      <Flex gap="8px">
        <ButtonGroup>
          <IconButton
            icon={isRevealed ? <FiEye /> : <FiEyeOff />}
            onClick={handleToggleReveal}
            aria-label="Toggle reveal"
          />
          <IconButton
            icon={hasCopied ? <BsClipboardCheck /> : <BsClipboard />}
            onClick={onCopy}
            aria-label="Copy to clipboard"
          />
          <Button alignItems="center" variant="unstyled">
            {isRevealed ? content : getMaskedContent(content)}
          </Button>
        </ButtonGroup>
      </Flex>
    </Tooltip>
  ) : (
    <></>
  );
};
