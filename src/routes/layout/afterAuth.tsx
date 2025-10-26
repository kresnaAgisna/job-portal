// src/layouts/AfterAuthLayout.tsx
import { Outlet, useMatches } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { RouteHandle } from '../../types/router';
import Text from '../../components/atom/Text';
import { Colors } from '../../constants/color';

const Container = styled(Stack)({
  width: '100vw',
  height: '100vh',
});

const Navbar = styled(Stack)({
  height: 64,
  flexDirection: 'row',
  paddingLeft: 20,
  paddingRight: 20,
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${Colors.neutral[40]}`,
});

export default function AfterAuthLayout() {
  const matches = useMatches() as { handle?: RouteHandle }[];
  const current = [...matches].reverse().find((m) => m.handle?.title);
  const title = current?.handle?.title ?? 'Default Title';

  return (
    <Container>
      <Navbar>
        <Text size={20} bold>
          {title}
        </Text>
      </Navbar>
      <Outlet />
    </Container>
  );
}
