import { 
  FormControl, 
  FormLabel, 
  Input, 
  FormErrorMessage, 
  InputGroup, 
  InputRightElement, 
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const FormField = ({ 
  id, 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error = '', 
  isRequired = false 
}) => {
  const [localType, setLocalType] = useState(type);
  const { isOpen, onToggle } = useDisclosure();

  const handleTogglePassword = () => {
    setLocalType(localType === 'password' ? 'text' : 'password');
    onToggle();
  };

  return (
    <FormControl id={id} isInvalid={!!error} isRequired={isRequired} mb={4}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {type === 'password' ? (
        <InputGroup>
          <Input
            id={id}
            type={localType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            focusBorderColor="brand.500"
          />
          <InputRightElement>
            <IconButton
              aria-label={isOpen ? 'Hide password' : 'Show password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              variant="ghost"
              onClick={handleTogglePassword}
              tabIndex="-1"
              size="sm"
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          focusBorderColor="brand.500"
        />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormField;