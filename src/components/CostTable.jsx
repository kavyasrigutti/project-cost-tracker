import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';

const CostTable = ({ 
  items, 
  onUpdate, 
  onDelete, 
  type = 'project',
  columns 
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    onOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingItem.id, formData);
    onClose();
    toast({
      title: 'Item updated',
      status: 'success',
      duration: 2000,
    });
  };

  const handleDelete = (id) => {
    onDelete(id);
    toast({
      title: 'Item deleted',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            <Th width="100px">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              {columns.map((column) => (
                <Td key={`${item.id}-${column.key}`}>
                  {column.prefix && column.prefix}
                  {item[column.key]}
                </Td>
              ))}
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<HiPencil />}
                    aria-label="Edit"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  />
                  <IconButton
                    icon={<HiTrash />}
                    aria-label="Delete"
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(item.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit {type === 'project' ? 'Project Item' : 'Other Cost'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                {columns.map((column) => (
                  <FormControl key={column.key}>
                    <FormLabel>{column.label}</FormLabel>
                    <Input
                      type={column.type || 'text'}
                      value={formData[column.key] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        [column.key]: e.target.value
                      })}
                    />
                  </FormControl>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="brand" type="submit">
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CostTable;