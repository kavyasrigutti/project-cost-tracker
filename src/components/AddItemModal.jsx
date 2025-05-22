import {
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

const AddItemModal = ({ isOpen, onClose, onAdd, type = 'project', fields }) => {
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({});
    onClose();
    toast({
      title: 'Item added successfully',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add {type === 'project' ? 'Project Item' : 'Other Cost'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {fields.map((field) => (
                <FormControl key={field.key} isRequired>
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    type={field.type || 'text'}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      [field.key]: e.target.value
                    })}
                    placeholder={field.placeholder}
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
              Add Item
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddItemModal;