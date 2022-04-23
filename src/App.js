import React from 'react';
import {
  Box,
  Text,
  Link,
  theme,
  Button,
  Heading,
  SimpleGrid,
  ChakraProvider,
} from '@chakra-ui/react';
import { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import BitsArray from './components/BitsArray';
import useHammingCode from './services/HammingCode/useHammingCode';

function App() {
  const {
    hammingCode: bitsArray,
    getHammingCode,
    isLoading,
  } = useHammingCode();

  const [dataBits, setDataBits] = useState([]);

  const onSubmit = (input, flag) => {
    const bits = input.split('').map(bit => parseInt(bit));
    setDataBits(() => bits);
    getHammingCode(bits, flag);
  };
  return (
    <ChakraProvider theme={theme}>
      <Header />

      {/* Main App */}
      <Box as="main" p={4} minH="calc(100vh - 70px - 70px)">
        <SimpleGrid columns={1}>
          <Box as="section" p="3" mb="3">
            <UserInput onSubmit={onSubmit} isLoading={isLoading} />
          </Box>

          {dataBits.length ? (
            <Box as="section" px="2">
              <Heading fontSize="md" mb="2">
                Data Bits
              </Heading>

              <Box d="flex" flexWrap="wrap">
                {dataBits.map((bit, bitIndex) => {
                  return (
                    <Button
                      m="1px"
                      size="xs"
                      key={bitIndex}
                      colorScheme="cyan"
                      borderRadius="none"
                    >
                      {bit}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          ) : null}
          {bitsArray.length ? (
            <Box as="section" p="3">
              <Heading size="lg" mb="3">
                Hamming Code
              </Heading>

              <BitsArray bitsArray={bitsArray} />
            </Box>
          ) : null}
        </SimpleGrid>
      </Box>

      {/* Footer */}
      <Box
        p={2}
        d="flex"
        shadow="sm"
        as="footer"
        height={70}
        borderTop="1px"
        alignItems="center"
        borderColor="gray.700"
      >
        <Text align="center" flexGrow={1}>
          Developed by{' '}
          <Link target="_blank" href="http://github.com/i-naeem">
            Mohammad Naeem
          </Link>
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
