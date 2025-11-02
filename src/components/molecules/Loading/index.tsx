// components/atom/Loading.tsx
import { CircularProgress, Stack, styled } from '@mui/material';
import { Colors } from '../../../constants/color';
import { Text } from '../../atom';

const Container = styled(Stack)({
  width: '100%',
  height: '200px',
  justifyContent: 'center',
  alignItems: 'center',
});

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <Container>
      <CircularProgress sx={{ color: Colors.primary.main }} />
      <Text size={12} sx={{ mt: 1, color: Colors.primary.main }}>
        {text}
      </Text>
    </Container>
  );
};

export default Loading;
