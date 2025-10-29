import React from 'react';
import { CSSProperties, Stack, styled } from '@mui/material';
import { Text } from '../../atom';
import { Colors } from '../../../constants/color';

interface TextInputWrapperProps {
  children: React.ReactNode;
  label: string;
  bottomDescription?: React.ReactNode;
  required?: boolean;
  containerStyle?: CSSProperties;
}

const Container = styled(Stack)({
  gap: 8,
});

const TextInputWrapper: React.FC<TextInputWrapperProps> = ({
  children,
  label,
  bottomDescription,
  required,
  containerStyle,
}) => {
  return (
    <Container sx={containerStyle}>
      <Text size={12} color={Colors.neutral[90]}>
        {label}
        {required ? (
          <Text size={12} color={Colors.danger.main} component="span">
            *
          </Text>
        ) : null}
      </Text>
      {children}
      {bottomDescription ? bottomDescription : null}
    </Container>
  );
};

export default TextInputWrapper;
