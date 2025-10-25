import React from 'react';
import { styled } from '@mui/material/styles';
import { Colors } from '../../../constants/color';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholderColor?: string;
  borderColor?: string;
  textColor?: string;
  focusColor?: string;
}

const StyledTextInput = styled('input')<TextInputProps>(
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

    '&::placeholder': {
      color: placeholderColor || Colors.neutral[60],
      opacity: 1,
    },

    '&:focus': {
      borderColor: focusColor || Colors.neutral[40],
    },

    '&:disabled': {
      backgroundColor: Colors.neutral[20],
      borderColor: Colors.neutral[60],
      color: Colors.neutral[60],
    },
  }),
);

const TextInput: React.FC<TextInputProps> = ({
  placeholderColor,
  borderColor,
  textColor,
  focusColor,
  ...props
}) => {
  return (
    <StyledTextInput
      placeholderColor={placeholderColor}
      borderColor={borderColor}
      textColor={textColor}
      focusColor={focusColor}
      {...props}
    />
  );
};

export default TextInput;
