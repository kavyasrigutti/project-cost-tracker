import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#E6F6FF',
    100: '#CCEAFF',
    200: '#99D1FF',
    300: '#66B8FF',
    400: '#339FFF',
    500: '#0086FF', // primary
    600: '#006ACC',
    700: '#004F99',
    800: '#003366',
    900: '#001833',
  },
  accent: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795', // accent
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
  },
  success: {
    500: '#38A169', // success
  },
  warning: {
    500: '#DD6B20', // warning
  },
  error: {
    500: '#E53E3E', // error
  },
};

const fonts = {
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const fontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const space = {
  px: '1px',
  0.5: '4px',
  1: '8px',
  1.5: '12px',
  2: '16px',
  2.5: '20px',
  3: '24px',
  3.5: '28px',
  4: '32px',
  5: '40px',
  6: '48px',
  8: '64px',
  10: '80px',
  12: '96px',
};

const theme = extendTheme({
  colors,
  fonts,
  fontWeights,
  space,
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
            transform: 'translateY(-2px)',
            boxShadow: 'md',
          },
          transition: 'all 0.2s ease-in-out',
        }),
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
});

export default theme;