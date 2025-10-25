import { Checkbox, CheckboxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Colors } from '../../../constants/color';

const StyledCheckbox = styled(Checkbox)({
  padding: 0,
  width: 20,
  height: 20,
  '& .MuiTouchRipple-root': { display: 'none' },
});

export default function CheckBox(props: CheckboxProps) {
  const isDisabled = props.disabled;

  const baseBox = {
    width: 20,
    height: 20,
    borderRadius: 4,
    border: `2px solid ${
      isDisabled ? Colors.neutral[60] : Colors.primary.main
    }`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box' as const,
  };

  const uncheckedIcon = (
    <span
      style={{
        ...baseBox,
        backgroundColor: 'transparent',
      }}
    />
  );

  const checkedIcon = (
    <span
      style={{
        ...baseBox,
        backgroundColor: isDisabled ? Colors.neutral[60] : Colors.primary.main,
      }}
    >
      <CheckIcon
        style={{
          width: 12,
          height: 12,
          color: 'transparent',
          stroke: '#FFFFFF',
          strokeWidth: 2,
        }}
      />
    </span>
  );

  return (
    <StyledCheckbox
      disableRipple
      icon={uncheckedIcon}
      checkedIcon={checkedIcon}
      {...props}
    />
  );
}
