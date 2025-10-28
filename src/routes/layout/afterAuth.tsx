// src/layouts/AfterAuthLayout.tsx
import { Outlet, useMatches, Navigate } from 'react-router-dom';
import { IconButton, Stack, styled } from '@mui/material';
import { RouteHandle } from '../../global/types/router';
import Text from '../../components/atom/Text';
import { Colors } from '../../constants/color';
import CustomScrollbar from '../../components/atom/CustomScrollbar';
import { useSelector } from 'react-redux';
import { handleLogout, selectLoginState } from '../../pages/Login/loginSlice';
import { useAppDispatch } from '../../global/redux/store';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

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
  const dispatch = useAppDispatch();
  const { userData } = useSelector(selectLoginState);
  const matches = useMatches() as { handle?: RouteHandle }[];
  const current = [...matches].reverse().find((m) => m.handle?.title);
  const title = current?.handle?.title ?? 'Default Title';

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar>
        <Text size={20} bold>
          {title}
        </Text>
        <IconButton
          onClick={() => {
            dispatch(handleLogout());
          }}
          size="small"
          style={{
            borderRadius: 8,
          }}
        >
          <ArrowRightCircleIcon
            style={{ width: 20, height: 20, strokeWidth: 2 }}
            color={Colors.neutral[100]}
          />
          <Text
            size={14}
            style={{ cursor: 'pointer' }}
            color={Colors.neutral[100]}
            bold
          >
            Logout
          </Text>
        </IconButton>
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
