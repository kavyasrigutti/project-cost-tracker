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
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import FormField from '../components/FormField';
import PageTransition from '../components/PageTransition';

const MotionBox = motion(Box);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page they were trying to access or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const success = login(email, password);
      
      if (success) {
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Navigate to the page they were trying to access, or dashboard
        navigate(from, { replace: true });
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message || 'An error occurred during login',
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
                  Welcome Back
                </Heading>
                <Text color="gray.600" textAlign="center">
                  Log in to access your project dashboard
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
                  
                  <Button 
                    type="submit" 
                    colorScheme="brand" 
                    size="lg" 
                    width="full"
                    mt={4}
                    isLoading={isLoading}
                    loadingText="Logging in"
                  >
                    Login
                  </Button>
                </VStack>
              </form>
              
              <Flex justify="center" mt={4}>
                <Text>
                  Don't have an account?{' '}
                  <ChakraLink as={RouterLink} to="/register" color="brand.500" fontWeight="medium">
                    Register
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

export default Login;