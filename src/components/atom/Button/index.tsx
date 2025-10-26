import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  styled,
} from '@mui/material';
import { Colors } from '../../../constants/color';

type ColorVariant = 'primary' | 'secondary' | 'white';
type SizeVariant = 'small' | 'medium' | 'large';

interface CustomButtonProps extends Omit<MUIButtonProps, 'color' | 'size'> {
  colorVariant?: ColorVariant;
  sizeVariant?: SizeVariant;
  bold?: boolean;
}

const StyledButton = styled(MUIButton)<CustomButtonProps>(({
  colorVariant = 'primary',
  sizeVariant = 'medium',
}) => {
  // Color mapping based on design tokens
  const colorMap = {
    primary: {
      background: Colors.primary.main,
      text: Colors.neutral[10],
      hover: Colors.primary.hover,
      pressed: Colors.primary.pressed,
      focus: Colors.primary.focus,
      border: Colors.primary.border,
    },
    secondary: {
      background: Colors.secondary.main,
      text: Colors.neutral[90],
      hover: Colors.secondary.hover,
      pressed: Colors.secondary.pressed,
      focus: Colors.secondary.focus,
      border: Colors.secondary.border,
    },
    white: {
      background: Colors.neutral[10],
      text: Colors.neutral[100],
      hover: Colors.neutral[30],
      pressed: Colors.neutral[40],
      focus: Colors.primary.focus,
      border: Colors.neutral[50],
    },
  }[colorVariant];

  // Size mapping
  const sizeMap = {
    small: {
      height: 28,
      padding: '4px 16px',
    },
    medium: {
      height: 32,
      padding: '4px 16px',
    },
    large: {
      height: 40,
      padding: '6px 16px',
    },
  }[sizeVariant];

  return {
    width: '100%',
    borderRadius: 8,
    fontWeight: 400,
    fontFamily: 'Nunito Sans, sans-serif',
    textTransform: 'none',
    backgroundColor: colorMap.background,
    color: colorMap.text,
    border: `1px solid ${colorMap.border}`,
    height: sizeMap.height,
    padding: sizeMap.padding,
    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: colorMap.hover,
    },
    '&:active': {
      backgroundColor: colorMap.pressed,
    },
    '&:focus-visible': {
      outline: `2px solid ${colorMap.focus}`,
      outlineOffset: 2,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };
});

export default function Button({
  colorVariant = 'primary',
  sizeVariant = 'medium',
  bold = false,
  ...props
}: CustomButtonProps) {
  return (
    <StyledButton
      colorVariant={colorVariant}
      sizeVariant={sizeVariant}
      sx={{ fontWeight: bold ? 700 : 400 }}
      {...props}
    />
  );
}
