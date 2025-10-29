import React, { useState } from 'react';
import { Stack, Button, styled } from '@mui/material';
import { Colors } from '../../../constants/color';
import { Text } from '../../../components/atom';

const ToggleButton = styled(Button)<{ active?: boolean; disabled?: boolean }>(
  ({ active, disabled }) => ({
    height: 32,
    padding: '4px 12px',
    borderRadius: 16,
    border: `1px solid ${disabled ? Colors.neutral[40] : active ? Colors.primary.main : Colors.neutral[40]}`,
    color: disabled
      ? Colors.neutral[60]
      : active
        ? Colors.primary.main
        : Colors.neutral[90],
    textTransform: 'none',
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: disabled ? 'transparent' : 'rgba(0,0,0,0.04)',
    },
  }),
);

interface CustomRadioProps {
  value: 'mandatory' | 'optional' | 'off';
  onChange: (value: 'mandatory' | 'optional' | 'off') => void;
  disabled?: number[];
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  value,
  onChange,
  disabled = [],
}) => {
  const options: { label: string; key: 'mandatory' | 'optional' | 'off' }[] = [
    { label: 'Mandatory', key: 'mandatory' },
    { label: 'Optional', key: 'optional' },
    { label: 'Off', key: 'off' },
  ];

  return (
    <Stack direction="row" spacing={1}>
      {options.map((option, index) => (
        <ToggleButton
          key={option.key}
          active={value === option.key}
          disabled={disabled.includes(index)}
          onClick={() => onChange(option.key)}
        >
          <Text size={14}>{option.label}</Text>
        </ToggleButton>
      ))}
    </Stack>
  );
};

export default CustomRadio;
