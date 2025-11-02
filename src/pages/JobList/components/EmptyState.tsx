import { Stack } from '@mui/material';
import Text from '../../../components/atom/Text';
import EmptyIcon from '../assets/empty.svg?react';

const EmptyState = () => {
  return (
    <Stack flexGrow={1} justifyContent="center">
      <Stack alignItems="center" gap="16px">
        <EmptyIcon />
        <Stack alignItems="center">
          <Text size={20} bold>
            No job openings available
          </Text>
          <Text size={16}>Please wait for the next batch of openings.</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EmptyState;
