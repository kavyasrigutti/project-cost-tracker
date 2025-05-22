import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack,
  Image
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const MotionBox = motion(Box);

const NotFound = () => {
  return (
    <PageTransition>
      <Box bg="gray.50" minH="calc(100vh - 72px)">
        <Container maxW="container.md" py={20}>
          <VStack spacing={8} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading as="h1" size="2xl">
                404
              </Heading>
              <Text fontSize="xl" fontWeight="bold" mt={2}>
                Page Not Found
              </Text>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image 
                src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Not Found"
                borderRadius="lg"
                maxH="300px"
                objectFit="cover"
              />
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Text color="gray.600" mb={6}>
                The page you're looking for doesn't exist or has been moved.
              </Text>
              
              <Button
                as={RouterLink}
                to="/"
                colorScheme="brand"
                size="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Go Home
              </Button>
            </MotionBox>
          </VStack>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default NotFound;