// src/layouts/AfterAuthLayout.tsx
import { Outlet, useMatches } from 'react-router-dom';
import { Stack, styled } from '@mui/material';
import { RouteHandle } from '../../global/types/router';
import Text from '../../components/atom/Text';
import { Colors } from '../../constants/color';
import CustomScrollbar from '../../components/atom/CustomScrollbar';

const Container = styled(Stack)({
  height: 'calc(100vh - 64px)',
  boxSizing: 'border-box',
});

const Navbar = styled(Stack)({
  height: 64,
  flexDirection: 'row',
  paddingLeft: 20,
  paddingRight: 20,
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${Colors.neutral[40]}`,
  position: 'sticky',
  boxSizing: 'border-box',
});

export default function AfterAuthLayout() {
  const matches = useMatches() as { handle?: RouteHandle }[];
  const current = [...matches].reverse().find((m) => m.handle?.title);
  const title = current?.handle?.title ?? 'Default Title';

  return (
    <>
      <Navbar>
        <Text size={20} bold>
          {title}
        </Text>
      </Navbar>
      <CustomScrollbar
        style={{
          height: 'calc(100vh - 64px)',
          overflowX: 'hidden',
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </CustomScrollbar>
    </>
  );
}
