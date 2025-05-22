import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  useDisclosure,
  Icon,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { HiCurrencyDollar, HiClipboardCheck, HiPlus } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';
import PageTransition from '../components/PageTransition';
import CostTable from '../components/CostTable';
import AddItemModal from '../components/AddItemModal';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    projectItems, 
    otherCosts, 
    addProjectItem,
    updateProjectItem,
    deleteProjectItem,
    addOtherCost,
    updateOtherCost,
    deleteOtherCost,
    getTotalProjectCost
  } = useProject();
  
  const {
    isOpen: isProjectModalOpen,
    onOpen: onProjectModalOpen,
    onClose: onProjectModalClose
  } = useDisclosure();
  
  const {
    isOpen: isOtherCostModalOpen,
    onOpen: onOtherCostModalOpen,
    onClose: onOtherCostModalClose
  } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.700');
  
  const projectColumns = [
    { key: 'name', label: 'Name' },
    { key: 'cost', label: 'Cost', prefix: '$', type: 'number' }
  ];

  const otherCostColumns = [
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount', prefix: '$', type: 'number' }
  ];

  const projectFields = [
    { key: 'name', label: 'Name', placeholder: 'Enter item name' },
    { key: 'cost', label: 'Cost', type: 'number', placeholder: 'Enter cost' }
  ];

  const otherCostFields = [
    { key: 'description', label: 'Description', placeholder: 'Enter description' },
    { key: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter amount' }
  ];
  
  return (
    <PageTransition>
      <Box bg="gray.50" minH="calc(100vh - 72px)" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack align="flex-start" spacing={1}>
                <Heading size="lg" color="gray.700">
                  Welcome to your Dashboard, {user.email}
                </Heading>
                <Text color="gray.500">
                  Track and manage your project costs
                </Text>
              </VStack>
            </MotionBox>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <MotionCard
                bg={cardBg}
                boxShadow="md"
                borderRadius="lg"
                borderTop="4px solid"
                borderColor="brand.500"
              >
                <CardBody>
                  <Stat>
                    <StatLabel>Total Projects</StatLabel>
                    <StatNumber>{projectItems.length}</StatNumber>
                    <StatHelpText>Project Items</StatHelpText>
                  </Stat>
                </CardBody>
              </MotionCard>

              <MotionCard
                bg={cardBg}
                boxShadow="md"
                borderRadius="lg"
                borderTop="4px solid"
                borderColor="accent.500"
              >
                <CardBody>
                  <Stat>
                    <StatLabel>Other Costs</StatLabel>
                    <StatNumber>{otherCosts.length}</StatNumber>
                    <StatHelpText>Additional Expenses</StatHelpText>
                  </Stat>
                </CardBody>
              </MotionCard>

              <MotionCard
                bg={cardBg}
                boxShadow="md"
                borderRadius="lg"
                borderTop="4px solid"
                borderColor="green.500"
              >
                <CardBody>
                  <Stat>
                    <StatLabel>Total Cost</StatLabel>
                    <StatNumber>${getTotalProjectCost()}</StatNumber>
                    <StatHelpText>Combined Total</StatHelpText>
                  </Stat>
                </CardBody>
              </MotionCard>
            </SimpleGrid>

            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Project Items</Heading>
                    <Button
                      leftIcon={<HiPlus />}
                      colorScheme="brand"
                      onClick={onProjectModalOpen}
                    >
                      Add Project Item
                    </Button>
                  </Flex>
                  <CostTable
                    items={projectItems}
                    onUpdate={updateProjectItem}
                    onDelete={deleteProjectItem}
                    type="project"
                    columns={projectColumns}
                  />
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Other Costs</Heading>
                    <Button
                      leftIcon={<HiPlus />}
                      colorScheme="brand"
                      onClick={onOtherCostModalOpen}
                    >
                      Add Other Cost
                    </Button>
                  </Flex>
                  <CostTable
                    items={otherCosts}
                    onUpdate={updateOtherCost}
                    onDelete={deleteOtherCost}
                    type="other"
                    columns={otherCostColumns}
                  />
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>

        <AddItemModal
          isOpen={isProjectModalOpen}
          onClose={onProjectModalClose}
          onAdd={addProjectItem}
          type="project"
          fields={projectFields}
        />

        <AddItemModal
          isOpen={isOtherCostModalOpen}
          onClose={onOtherCostModalClose}
          onAdd={addOtherCost}
          type="other"
          fields={otherCostFields}
        />
      </Box>
    </PageTransition>
  );
};

export default Dashboard;