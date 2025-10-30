import { Stack, styled } from '@mui/material';
import TextInput from '../../components/atom/TextInput';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Colors } from '../../constants/color';
import EmptyState from './components/EmptyState';
import CreateJobCard from './components/CreateJobCard';
import ModalCreateJob from './components/ModalCreateJob';
import { useEffect, useState } from 'react';
import { fetchJobList, selectJobPostingState } from './jobPostingSlice';
import { useAppDispatch } from '../../global/redux/store';
import { useSelector } from 'react-redux';
import { CustomScrollbar } from '../../components/atom';
import JobCard from './components/JobCard';

const Container = styled(Stack)({
  flexDirection: 'row',
  paddingTop: 36,
  paddingLeft: 24,
  paddingRight: 48,
  gap: 24,
  flexGrow: 1,
});

function JobPosting() {
  const dispatch = useAppDispatch();
  const { jobs, loading } = useSelector(selectJobPostingState);
  const [openModal, setOpenModal] = useState(false);

  const toggleModalCreateJob = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchJobList());
  }, []);

  return (
    <Container>
      <Stack flex={3.5} gap="16px">
        <TextInput
          placeholder="Search by job details"
          endAdornment={
            <MagnifyingGlassIcon
              style={{
                height: 24,
                width: 24,
                color: Colors.primary.main,
                strokeWidth: 2,
              }}
            />
          }
        />
        {jobs.length === 0 ? (
          <EmptyState onClick={toggleModalCreateJob} loading={loading} />
        ) : (
          <CustomScrollbar
            style={{
              height: 500,
              paddingRight: '16px',
              paddingBottom: '16px',
            }}
          >
            {jobs.map((job) => (
              <JobCard job={job} />
            ))}
          </CustomScrollbar>
        )}
      </Stack>
      <Stack flex={1}>
        <CreateJobCard onClick={toggleModalCreateJob} />
      </Stack>

      <ModalCreateJob open={openModal} onClose={toggleModalCreateJob} />
    </Container>
  );
}

export default JobPosting;
