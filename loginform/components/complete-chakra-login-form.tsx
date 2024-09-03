'use client'

import React, { useState, useEffect } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

interface PasswordRequirement {
  regex: RegExp;
  message: string;
}

const passwordRequirements: PasswordRequirement[] = [
  { regex: /.{9,}/, message: "At least 9 characters long" },
  { regex: /[a-z]/, message: "At least one lowercase letter" },
  { regex: /[A-Z]/, message: "At least one uppercase letter" },
  { regex: /[0-9]/, message: "At least one number" },
  { regex: /[^A-Za-z0-9]/, message: "At least one special character" },
]

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const bgColor = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')

  useEffect(() => {
    const isValid = passwordRequirements.every(req => req.regex.test(password))
    setIsPasswordValid(isValid)
  }, [password])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isPasswordValid && email) {
      console.log('Login attempted with:', { email, password })
    }
  }

  return (
    <Center maxW="md" py={12} border={'solid 1 px red'}>
      <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="lg">
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading size="lg" mb={2}>Login</Heading>
            <Text color={textColor}>Enter your credentials to access your account.</Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Box width="100%">
                <Text fontWeight="medium" mb={2}>Password requirements:</Text>
                <VStack align="start" spacing={1}>
                  {passwordRequirements.map((req, index) => (
                    <HStack key={index}>
                      <Icon
                        as={req.regex.test(password) ? CheckIcon : CloseIcon}
                        color={req.regex.test(password) ? "green.500" : "red.500"}
                      />
                      <Text fontSize="sm">{req.message}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                size="lg"
                mt={4}
                isDisabled={!isPasswordValid || !email}
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Center>
  )
}

export function CompleteChakraLoginForm() {
  return (
    <ChakraProvider theme={theme}>
      <LoginForm />
    </ChakraProvider>
  )
}