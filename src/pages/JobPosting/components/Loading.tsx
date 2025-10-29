// components/atom/Loading.tsx
import { CircularProgress, Stack, styled, Typography } from '@mui/material';
import { Colors } from '../../../constants/color';

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
      <Typography sx={{ mt: 1, color: Colors.primary.main }}>{text}</Typography>
    </Container>
  );
};

export default Loading;
