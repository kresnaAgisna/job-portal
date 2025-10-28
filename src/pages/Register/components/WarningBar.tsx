import React from 'react';
import { Text } from '../../../components/atom';
import { Colors } from '../../../constants/color';
import { Stack, styled } from '@mui/material';

type WarningBarProps = {
  onClick: () => void;
};

const BarContainer = styled(Stack)({
  height: 24,
  flexDirection: 'row',
  border: `1px solid ${Colors.danger.border}`,
  borderRadius: 4,
  backgroundColor: Colors.danger.surface,
  justifyContent: 'center',
  alignItems: 'center',
});

const WarningBar: React.FC<WarningBarProps> = ({ onClick }) => {
  return (
    <BarContainer>
      <Text size={12} color={Colors.danger.main}>
        Email ini sudah terdaftar sebagai akun di Rakamin Academy.{' '}
        <Text
          onClick={onClick}
          component="a"
          color={Colors.danger.main}
          size={12}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: Colors.danger.hover,
              textDecoration: 'underline',
            },
          }}
          bold
        >
          Masuk
        </Text>
      </Text>
    </BarContainer>
  );
};

export default WarningBar;
