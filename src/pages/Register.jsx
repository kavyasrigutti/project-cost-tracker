import { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Heading, 
  Text, 
  VStack,
  useToast,
  Flex,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import FormField from '../components/FormField';
import PageTransition from '../components/PageTransition';


const MotionBox = motion(Box);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const success = register(email, password);
      
      if (success) {
        toast({
          title: 'Account created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: 'Registration failed',
          description: 'Unable to create account',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message || 'An error occurred during registration',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
    
  };
  
  return (
    <PageTransition>
      <Box 
        bg="gray.50" 
        minH="calc(100vh - 72px)"
        py={{ base: 10, md: 20 }}
      >
        <Container maxW="md">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="md"
          >
            <VStack spacing={6} align="stretch">
              <VStack spacing={2} align="center">
                <Heading as="h1" size="xl" textAlign="center">
                  Create an Account
                </Heading>
                <Text color="gray.600" textAlign="center">
                  Join us to start tracking your project costs
                </Text>
              </VStack>
              
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    isRequired
                  />
                  
                  <FormField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    isRequired
                  />
                  
                  <FormField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="******"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                    isRequired
                  />
                  
                  <Button 
                    type="submit" 
                    colorScheme="brand" 
                    size="lg" 
                    width="full"
                    mt={4}
                    isLoading={isLoading}
                    loadingText="Creating Account"
                  >
                    Register
                  </Button>
                </VStack>
              </form>
              
              <Flex justify="center" mt={4}>
                <Text>
                  Already have an account?{' '}
                  <ChakraLink as={RouterLink} to="/login" color="brand.500" fontWeight="medium">
                    Login
                  </ChakraLink>
                </Text>
              </Flex>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Register;