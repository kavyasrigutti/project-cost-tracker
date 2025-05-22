import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  HStack, 
  Link as ChakraLink, 
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiOutlineUser, HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={bgColor}
      px={{ base: 4, md: 8 }}
      py={4}
      boxShadow="sm"
    >
      <Flex align="center" justify="space-between">
        <MotionBox
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              color="brand.500"
              letterSpacing="tight"
            >
              Project Cost Tracker
            </Text>
          </ChakraLink>
        </MotionBox>

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <HiX /> : <HiMenu />}
            variant="ghost"
            aria-label="Toggle Navigation"
            size="lg"
          />
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <HStack spacing={8} align="center">
            {isAuthenticated ? (
              <>
                <ChakraLink 
                  as={RouterLink} 
                  to="/dashboard"
                  color={textColor}
                  fontWeight="medium"
                  _hover={{ color: 'brand.500' }}
                >
                  Dashboard
                </ChakraLink>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<HiOutlineUser />}
                    variant="ghost"
                  >
                    {user.email}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <ChakraLink 
                  as={RouterLink} 
                  to="/login"
                  color={textColor}
                  fontWeight="medium"
                  _hover={{ color: 'brand.500' }}
                >
                  Login
                </ChakraLink>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="brand"
                  size="md"
                >
                  Register
                </Button>
              </>
            )}
          </HStack>
        )}
      </Flex>

      {/* Mobile Navigation */}
      {isMobile && (
        <Box 
          display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
          mt={4}
        >
          <Stack as="nav" spacing={4}>
            {isAuthenticated ? (
              <>
                <ChakraLink 
                  as={RouterLink} 
                  to="/dashboard"
                  color={textColor}
                  fontWeight="medium"
                  py={2}
                  _hover={{ color: 'brand.500' }}
                >
                  Dashboard
                </ChakraLink>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="medium">{user.email}</Text>
                  <Button 
                    variant="outline" 
                    colorScheme="brand" 
                    size="sm" 
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <ChakraLink 
                  as={RouterLink} 
                  to="/login"
                  color={textColor}
                  fontWeight="medium"
                  py={2}
                  _hover={{ color: 'brand.500' }}
                >
                  Login
                </ChakraLink>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="brand"
                  size="md"
                  w="full"
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;