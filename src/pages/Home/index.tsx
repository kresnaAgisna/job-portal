import { Stack } from '@mui/material';
import Text from '../../components/atom/Text';
import Button from '../../components/atom/Button';

function Home() {
  return (
    <Stack>
      <Text size={48}>Home</Text>
      <Button
        sx={{
          width: '48px',
        }}
      >
        Button
      </Button>
    </Stack>
  );
}

export default Home;
