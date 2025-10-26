import { Stack } from '@mui/material';
import EmptyIcon from '../assets/empty.svg?react';
import Text from '../../../components/atom/Text';
import Button from '../../../components/atom/Button';
import CustomScrollbar from '../../../components/atom/CustomScrollbar';

interface EmptyStateProps {
  jobPosting: any[];
}

const EmptyState: React.FC<EmptyStateProps> = ({ jobPosting }) => {
  return (
    <Stack flexGrow={1} justifyContent="center">
      {jobPosting && jobPosting.length > 0 ? (
        <CustomScrollbar
          style={{
            height: 500,
            overflow: 'hidden',
          }}
        >
          <Stack bgcolor={'red'} alignItems={'center'}>
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
              colorVariant="secondary"
              sizeVariant="large"
              sx={{
                width: 160,
              }}
            >
              Create a new job
            </Button>
          </Stack>
        </CustomScrollbar>
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
