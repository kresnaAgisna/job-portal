import { Stack, styled } from '@mui/material';
import { Colors } from '../../constants/color';
import { Button, CustomScrollbar, Text } from '../../components/atom';
import DetaiLogo from './assets/detail-logo.svg?react';
import { useNavigate } from 'react-router-dom';
import JobListCard from './components/JobListCard';
import Loading from '../../components/molecules/Loading';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../global/redux/store';
import {
  fetchJobList,
  selectJobListState,
  setSelectedJob,
} from './jobListSlice';
import { useSelector } from 'react-redux';
import { generateJobId } from './helpers';
import EmptyState from './components/EmptyState';
import ModalApplyJob from './components/ModalApplyJob';

const Container = styled(Stack)({
  height: '100vh',
  width: '100vw',
  backgroundColor: Colors.neutral[10],
});

const Navbar = styled(Stack)({
  height: 64,
  gap: 8,
  flexDirection: 'row-reverse',
  paddingLeft: 20,
  paddingRight: 20,
  alignItems: 'center',
  borderBottom: `1px solid ${Colors.neutral[40]}`,
  position: 'sticky',
  boxSizing: 'border-box',
});

const ContentContainer = styled(Stack)({
  padding: '40px 104px',
  flexDirection: 'row',
  justifyContent: 'center',
  flexGrow: 1,
  gap: 24,
});

const JobListContainer = styled(Stack)({
  height: 'calc(100vh - 64px - 80px)',
  flex: 1,
});

const JobDetailContainer = styled(Stack)({
  flex: 2,
  border: `1px solid ${Colors.neutral[40]}`,
  borderRadius: 8,
  padding: 24,
  gap: 24,
});

const JobDetailHeaderContainer = styled(Stack)({
  flexDirection: 'row',
  height: 108,
  paddingBottom: 24,
  gap: 24,
  borderBottom: `1px solid ${Colors.neutral[40]}`,
});

function JobList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { jobs, loading, selectedJob } = useSelector(selectJobListState);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchJobList());
  }, []);

  return (
    <Container>
      <Navbar>
        <Button
          sizeVariant="small"
          sx={{
            width: 'fit-content',
          }}
          onClick={() => navigate('/login')}
        >
          Sign in
        </Button>
        <Text size={16} bold color={Colors.neutral[100]}>
          Are you a recruiter ?
        </Text>
      </Navbar>

      <ContentContainer>
        {loading ? <Loading /> : null}

        {!loading && selectedJob ? (
          <>
            <JobListContainer>
              <CustomScrollbar
                style={{
                  height: '100%',
                  paddingRight: 22,
                }}
                autoHide={false}
                forceVisible="y"
              >
                {!loading
                  ? jobs.map((job) => {
                      const { author, createdDate } =
                        job.application_form.sections[0];
                      const id = generateJobId(author, createdDate);
                      const selectedId = generateJobId(
                        selectedJob.author,
                        selectedJob.createdDate,
                      );

                      return (
                        <JobListCard
                          active={id === selectedId}
                          key={author + createdDate}
                          job={job}
                          onClick={() => {
                            dispatch(
                              setSelectedJob(job.application_form.sections[0]),
                            );
                          }}
                        />
                      );
                    })
                  : null}
              </CustomScrollbar>
            </JobListContainer>
            <JobDetailContainer>
              <JobDetailHeaderContainer>
                <DetaiLogo />
                <Stack gap="8px" flex={1}>
                  <Stack
                    sx={{
                      borderRadius: '4px',
                      height: 24,
                      backgroundColor: Colors.success.main,
                      padding: '2px 8px',
                      width: 'fit-content',
                    }}
                  >
                    <Text color={Colors.neutral[10]} size={12}>
                      {selectedJob.jobType}
                    </Text>
                  </Stack>
                  <Stack>
                    <Text size={16} bold>
                      {selectedJob.jobName}
                    </Text>
                    <Text size={12} color={Colors.neutral[60]}>
                      [Company Name]
                    </Text>
                  </Stack>
                </Stack>
                <Button
                  colorVariant="secondary"
                  sx={{
                    width: 'fit-content',
                  }}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Apply
                </Button>
              </JobDetailHeaderContainer>
              <Text size={14} color={Colors.neutral[90]}>
                {selectedJob.jobDescription}
              </Text>
            </JobDetailContainer>
          </>
        ) : null}
        {!loading && !selectedJob ? <EmptyState /> : null}
      </ContentContainer>
      <ModalApplyJob
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </Container>
  );
}

export default JobList;
