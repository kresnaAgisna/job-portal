import React from 'react';
import { Stack } from '@mui/material';
import { ExclamationTriangleIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Colors } from '../../../constants/color';
import { Text } from '../../../components/atom';

interface InputBottomDescProps {
  errorMessage?: string;
  emailValue?: string;
  success: boolean;
}

const InputBottomDesc: React.FC<InputBottomDescProps> = ({
  errorMessage,
  emailValue,
  success,
}) => {
  if (errorMessage && emailValue) {
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

  if (success) {
    return (
      <Stack direction="row" alignItems="center" gap="4px">
        <CheckIcon
          width={16}
          height={16}
          style={{
            color: Colors.primary.main,
          }}
        />
        <Text size={12} color={Colors.primary.main}>
          Alamat email teridentifikasi
        </Text>
      </Stack>
    );
  }

  return null;
};

export default InputBottomDesc;
