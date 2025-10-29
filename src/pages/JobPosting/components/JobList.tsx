import { Stack } from '@mui/material';
import { CustomScrollbar } from '../../../components/atom';

const JobList = () => {
  return (
    <CustomScrollbar
      style={{
        height: 500,
        overflow: 'hidden',
      }}
    >
      <Stack bgcolor={'red'} alignItems={'center'}></Stack>
    </CustomScrollbar>
  );
};

export default JobList;
