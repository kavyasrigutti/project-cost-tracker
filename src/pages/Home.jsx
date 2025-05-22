import { 
  Box, 
  Button, 
  Container,
  Heading, 
  Text, 
  VStack,
  Image,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../contexts/AuthContext';

const MotionBox = motion(Box);

const Home = () => {
  const { isAuthenticated } = useAuth();
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl', lg: '3xl' });
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  
  return (
    <PageTransition>
      <Box bg="gray.50" minH="calc(100vh - 72px)">
        <Container maxW="container.xl" py={{ base: 10, md: 20 }}>
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between"
            gap={{ base: 10, md: 8 }}
          >
            <VStack 
              align={{ base: 'center', md: 'flex-start' }} 
              spacing={6}
              maxW={{ base: 'full', md: '50%' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Heading 
                  as="h1" 
                  size={headingSize}
                  fontWeight="bold"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  Track Your Project Costs with Ease and Precision
                </Heading>
              </MotionBox>
              
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Text fontSize={textSize} color="gray.600">
                  Get a clear overview of your project expenses, track budgets, and make informed decisions to keep your projects profitable.
                </Text>
              </MotionBox>
              
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                width={{ base: 'full', md: 'auto' }}
              >
                {isAuthenticated ? (
                  <Button
                    as={RouterLink}
                    to="/dashboard"
                    colorScheme="brand"
                    size={buttonSize}
                    width={{ base: 'full', md: 'auto' }}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button
                    as={RouterLink}
                    to="/register"
                    colorScheme="brand"
                    size={buttonSize}
                    width={{ base: 'full', md: 'auto' }}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </MotionBox>
            </VStack>
            
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              maxW={{ base: '100%', md: '45%' }}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="xl"
            >
              <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Project Cost Management"
                objectFit="cover"
                width="100%"
              />
            </MotionBox>
          </Flex>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Home;