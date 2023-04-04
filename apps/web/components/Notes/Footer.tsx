import React from 'react';

import { Box, Link } from '@chakra-ui/react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      style={{
        display: 'flex',
        flex: 1,
        padding: '2rem 0',
        borderTop: '1px solid #eaeaea',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 'flex',
        }}
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <Box
          as="span"
          style={{
            height: '1em',
            marginLeft: '0.5rem',
          }}
        >
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </Box>
      </Link>
    </Box>
  );
};

export default Footer;
