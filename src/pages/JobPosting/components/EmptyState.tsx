import { Stack } from '@mui/material';
import EmptyIcon from '../assets/empty.svg?react';
import Text from '../../../components/atom/Text';
import Button from '../../../components/atom/Button';
import Loading from './Loading';

interface EmptyStateProps {
  onClick: () => void;
  loading: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClick, loading }) => {
  return (
    <Stack flexGrow={1} justifyContent="center">
      {loading ? (
        <Loading />
      ) : (
        <Stack alignItems="center" gap="16px">
          <EmptyIcon />
          <Stack alignItems="center">
            <Text size={20} bold>
              No job openings available
            </Text>
            <Text size={16}>
              Create a job opening now and start the candidate process.
            </Text>
          </Stack>
          <Button
            onClick={onClick}
            colorVariant="secondary"
            sizeVariant="large"
            sx={{
              width: 160,
            }}
          >
            Create a new job
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default EmptyState;
