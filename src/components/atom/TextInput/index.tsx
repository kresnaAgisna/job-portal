import React from 'react';
import { styled, InputBase, InputBaseProps } from '@mui/material';
import { Colors } from '../../../constants/color';

// Custom props
interface CustomTextInputProps {
  placeholderColor?: string;
  borderColor?: string;
  textColor?: string;
  focusColor?: string;
}

type TextInputProps = CustomTextInputProps & InputBaseProps;

const StyledTextInput = styled(InputBase, {
  shouldForwardProp: (prop) =>
    !['placeholderColor', 'borderColor', 'textColor', 'focusColor'].includes(
      prop as string,
    ),
})<CustomTextInputProps>(
  ({ placeholderColor, borderColor, textColor, focusColor }) => ({
    width: '100%',
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: borderColor || Colors.neutral[40],
    padding: '8px 16px',
    fontFamily: 'Nunito Sans, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '24px',
    color: textColor || Colors.neutral[90],
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: Colors.neutral[10],
    WebkitFontSmoothing: 'antialiased',
    '& input::placeholder': {
      color: placeholderColor || Colors.neutral[60],
      opacity: 1,
    },

    '&:focus-within': {
      borderColor: focusColor || Colors.neutral[40],
    },

    '&.Mui-disabled': {
      backgroundColor: Colors.neutral[20],
      borderColor: Colors.neutral[60],
      color: Colors.neutral[60],
    },
  }),
);

const TextInput: React.FC<TextInputProps> = (props) => {
  return <StyledTextInput {...props} />;
};

export default TextInput;
