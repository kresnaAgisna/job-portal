import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

type CustomSize = 10 | 12 | 14 | 16 | 20 | 24 | 32 | 48;

interface CustomTypographyProps extends TypographyProps {
  size?: CustomSize;
  bold?: boolean;
  children: React.ReactNode;
}

const FONT_STYLES: Record<
  CustomSize,
  { fontSize: number; lineHeight: number }
> = {
  10: { fontSize: 10, lineHeight: 16 },
  12: { fontSize: 12, lineHeight: 20 },
  14: { fontSize: 14, lineHeight: 24 },
  16: { fontSize: 16, lineHeight: 28 },
  20: { fontSize: 20, lineHeight: 32 },
  24: { fontSize: 24, lineHeight: 36 },
  32: { fontSize: 32, lineHeight: 44 },
  48: { fontSize: 48, lineHeight: 64 },
};

export default function Text({
  size = 14,
  bold = false,
  children,
  sx,
  ...props
}: CustomTypographyProps) {
  const fontStyle = FONT_STYLES[size];
  const fontWeight = bold ? 700 : 400;

  return (
    <Typography
      sx={{
        fontSize: fontStyle.fontSize,
        lineHeight: `${fontStyle.lineHeight}px`,
        fontWeight,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
