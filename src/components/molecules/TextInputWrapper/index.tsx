import React from 'react';
import { CSSProperties, Stack, styled } from '@mui/material';
import { Text } from '../../atom';
import { Colors } from '../../../constants/color';

interface TextInputWrapperProps {
  children: React.ReactNode;
  label: string;
  errorMessage?: string;
  errorMessageStyle?: CSSProperties;
}

const Container = styled(Stack)({
  gap: 8,
});

const TextInputWrapper: React.FC<TextInputWrapperProps> = ({
  children,
  label,
  errorMessage,
  errorMessageStyle,
}) => {
  return (
    <Container>
      <Text size={12} color={Colors.neutral[90]}>
        {label}
      </Text>
      {children}
      {errorMessage ? (
        <Text size={12} sx={{ ...errorMessageStyle }}>
          {errorMessage}
        </Text>
      ) : null}
    </Container>
  );
};

export default TextInputWrapper;
