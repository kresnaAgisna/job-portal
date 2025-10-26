import { Stack, styled } from '@mui/material';
import TextInput from '../../components/atom/TextInput';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Colors } from '../../constants/color';
import EmptyState from './components/EmptyState';
import CreateJobCard from './components/CreateJobCard';

const Container = styled(Stack)({
  flexDirection: 'row',
  paddingTop: 36,
  paddingLeft: 24,
  paddingRight: 48,
  gap: 24,
  flexGrow: 1,
});

function Home() {
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
        <EmptyState jobPosting={[]} />
      </Stack>
      <Stack flex={1}>
        <CreateJobCard />
      </Stack>
    </Container>
  );
}

export default Home;
