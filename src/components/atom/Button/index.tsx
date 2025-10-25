import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const colors = {
    primary: {
      background: '#01959F',
      color: '#FFFFFF',
    },
    secondary: {
      background: '#FBC037',
      color: '#404040',
    },
    white: {
      background: '#FFFFFF',
      color: '#1D1F20',
    },
  }[colorVariant];

  const sizes = {
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
    backgroundColor: colors.background,
    color: colors.color,
    height: sizes.height,
    padding: sizes.padding,
    '&:hover': {
      backgroundColor: colors.background,
      opacity: 0.9,
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
