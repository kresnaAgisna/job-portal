import React, { useState } from 'react';
import { Stack, styled, Menu, MenuItem } from '@mui/material';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Colors } from '../../../constants/color';
import { Text } from '../../atom';

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface DropdownProps {
  options: Option[];
  initialValue?: Option;
  width?: number | string;
  sx?: object;
}

const StyledInputDisplay = styled(Stack)({
  width: '100%',
  height: 40,
  borderRadius: 8,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: Colors.neutral[40],
  padding: '8px 16px',
  backgroundColor: Colors.neutral[10],
  cursor: 'pointer',
  transition: 'border-color 200ms',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    borderColor: Colors.neutral[60],
  },
});

const StyledMenuItem = styled(MenuItem)<{
  isSelected?: boolean;
  isDisabled?: boolean;
}>(({ isSelected, isDisabled }) => ({
  minHeight: 36,
  padding: '8px 16px',
  gap: 8,
  color: isDisabled ? Colors.neutral[60] : Colors.neutral[90],
  opacity: isDisabled ? 0.6 : 1,
  pointerEvents: isDisabled ? 'none' : 'auto',
  justifyContent: 'space-between',
  ...(isSelected && {
    color: Colors.primary.main,
    backgroundColor: '#01959F0A',
  }),
  '&:hover': {
    backgroundColor:
      !isSelected && !isDisabled ? Colors.neutral[10] : undefined,
    color: !isDisabled ? Colors.primary.main : undefined,
  },
}));

const Dropdown: React.FC<DropdownProps> = ({
  options,
  initialValue,
  width = '100%',
  sx = {},
}) => {
  const [selected, setSelected] = useState<Option>(initialValue ?? options[0]);

  // anchorEl still used for placement — but we capture width separately
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorWidth, setAnchorWidth] = useState<number | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    setAnchorEl(el);
    setAnchorWidth(el.offsetWidth || el.getBoundingClientRect().width || null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: Option) => {
    if (!option.disabled) {
      setSelected(option);
      handleClose();
    }
  };

  return (
    <Stack sx={{ width, ...sx, gap: 1 }}>
      <StyledInputDisplay onClick={handleClick}>
        <Text
          size={14}
          color={Colors.neutral[90]}
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {selected?.label ?? ''}
        </Text>

        <ChevronDownIcon
          color={Colors.neutral[60]}
          style={{
            height: 16,
            width: 16,
            transition: 'transform 200ms',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </StyledInputDisplay>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disablePortal
        keepMounted
        PaperProps={{
          sx: {
            width: anchorWidth ? `${anchorWidth}px` : '100%',
            boxShadow: 'none',
            border: `1px solid ${Colors.neutral[40]}`,
            mt: 1,
            maxHeight: 200,
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          },
        }}
      >
        {options.map((option) => {
          const isSelected = selected?.value === option.value;
          const isDisabled = !!option.disabled;

          return (
            <StyledMenuItem
              key={option.value}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onClick={() => handleSelect(option)}
            >
              <Text
                size={14}
                color={
                  isSelected
                    ? Colors.primary.main
                    : isDisabled
                      ? Colors.neutral[60]
                      : Colors.neutral[90]
                }
                sx={{ flexGrow: 1 }}
              >
                {option.label}
              </Text>

              {isSelected && (
                <CheckIcon
                  color={Colors.primary.main}
                  style={{ height: 16, width: 16 }}
                />
              )}
            </StyledMenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
};

export default Dropdown;
