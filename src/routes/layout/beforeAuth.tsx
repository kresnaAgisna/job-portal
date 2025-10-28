import { Navigate, Outlet } from 'react-router-dom';
import { Stack, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLoginState } from '../../pages/Login/loginSlice';
import { Colors } from '../../constants/color';

const Container = styled(Stack)({
  height: '100vh',
  width: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.neutral[20],
});

export default function BeforeAuthLayout() {
  const { userData } = useSelector(selectLoginState);

  if (userData) {
    return <Navigate to="/job-posting" replace />;
  }

  return (
    <Container>
      <Outlet />
    </Container>
  );
}
