import { Radio, RadioProps, Stack, styled } from '@mui/material';
import { Colors } from '../../../constants/color';

const StyledRadio = styled(Radio)(() => ({
  padding: 0,
  width: 20,
  height: 20,
  color: Colors.neutral[90],
  '&.Mui-checked': {
    color: Colors.primary.main,
  },
  '&.Mui-disabled': {
    color: Colors.neutral[60],
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));

export default function RadioButton(props: RadioProps) {
  return (
    <Stack
      sx={{
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledRadio {...props} />
    </Stack>
  );
}
