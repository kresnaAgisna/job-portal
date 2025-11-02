import React from 'react';
import SimpleBar from 'simplebar-react';
import { styled } from '@mui/material/styles';
import 'simplebar-react/dist/simplebar.min.css';
import { Colors } from '../../../constants/color';
import { CSSProperties } from '@mui/material';

interface CustomScrollbarProps extends React.ComponentProps<typeof SimpleBar> {
  children: React.ReactNode;
  style?: CSSProperties;
}

const StyledSimpleBar = styled(SimpleBar)(() => ({
  '.simplebar-track.simplebar-vertical': {
    width: 10,
    right: 0,
    backgroundColor: Colors.neutral[40],
    borderRadius: 8,
  },
  '.simplebar-scrollbar': {
    width: '100%',
    borderRadius: 8,
  },
  '.simplebar-scrollbar:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary.main,
    borderRadius: 8,
    opacity: 1,
  },
}));

export default function CustomScrollbar({
  children,
  style,
  ...props
}: CustomScrollbarProps) {
  return (
    <StyledSimpleBar autoHide={false} style={{ ...style }} {...props}>
      {children}
    </StyledSimpleBar>
  );
}
