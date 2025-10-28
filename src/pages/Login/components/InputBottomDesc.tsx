import React from 'react';
import { Stack } from '@mui/material';
import { ExclamationTriangleIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Colors } from '../../../constants/color';
import { Text } from '../../../components/atom';

interface InputBottomDescProps {
  errorMessage?: string;
}

const InputBottomDesc: React.FC<InputBottomDescProps> = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <Stack direction="row" alignItems="center" gap="4px">
        <ExclamationTriangleIcon
          width={16}
          height={16}
          style={{
            color: 'white',
            stroke: Colors.danger.main,
            strokeWidth: 1.5,
          }}
        />
        <Text size={12} color={Colors.danger.main}>
          {errorMessage}
        </Text>
      </Stack>
    );
  }

  return null;
};

export default InputBottomDesc;
