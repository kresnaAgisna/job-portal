import { Stack } from '@mui/material';
import { Text } from '../../atom';
import { Colors } from '../../../constants/color'; // adjust path as needed

type TagProps = {
  variant?: 'primary' | 'danger' | 'warning' | 'date';
  text: string;
};

type TagStyles = {
  border: string;
  bg: string;
  color: string;
};

const getTagStyles = (variant: TagProps['variant'] = 'primary'): TagStyles => {
  switch (variant) {
    case 'danger':
      return {
        border: Colors.danger.border,
        bg: Colors.danger.surface,
        color: Colors.danger.main,
      };
    case 'warning':
      return {
        border: Colors.secondary.border,
        bg: Colors.secondary.surface,
        color: Colors.secondary.main,
      };
    case 'date':
      return {
        border: Colors.neutral[40],
        bg: Colors.neutral[10],
        color: Colors.neutral[90],
      };
    case 'primary':
    default:
      return {
        border: Colors.success.border,
        bg: Colors.success.surface,
        color: Colors.success.main,
      };
  }
};

const Tag: React.FC<TagProps> = ({ variant = 'primary', text }) => {
  const { border, bg, color } = getTagStyles(variant);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 'fit-content',
        borderRadius: variant === 'date' ? '4px' : '8px',
        height: '32px',
        padding: '4px 16px',
        border: `1px solid ${border}`,
        backgroundColor: bg,
        color: color,
      }}
    >
      <Text size={14} bold={variant !== 'date'}>
        {text}
      </Text>
    </Stack>
  );
};

export default Tag;
