import { Stack } from '@mui/material';
import Text from '../../components/atom/Text';
import Button from '../../components/atom/Button';
import CheckBox from '../../components/atom/Checkbox';
import TextInput from '../../components/atom/TextInput';
import { Colors } from '../../constants/color';

function Home() {
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    ></Stack>
  );
}

export default Home;
