// src/layouts/AfterAuthLayout.tsx
import { Outlet } from 'react-router-dom';
import { Stack, styled } from '@mui/material';
import { Colors } from '../../constants/color';

const Container = styled(Stack)({
  height: '100vh',
  width: '100vw',
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.neutral[20],
});

export default function BeforeAuthLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
