export const Colors = {
  neutral: {
    10: '#FFFFFF',
    20: '#FAFAFA',
    30: '#EDEDED',
    40: '#E0E0E0',
    50: '#C2C2C2',
    60: '#9E9E9E',
    70: '#757575',
    80: '#616161',
    90: '#404040',
    100: '#1D1F20',
  },
  primary: {
    main: '#01959F',
    surface: '#F3FBFC',
    border: '#4DB5BC',
    hover: '#01777F',
    pressed: '#01595F',
    focus: 'rgba(1, 149, 159, 0.2)',
  },
  secondary: {
    main: '#FBC037',
    surface: '#FFFCF5',
    border: '#FEEABC',
    hover: '#F8A92F',
    pressed: '#FA9810',
    focus: 'rgba(251, 192, 55, 0.2)',
  },
  danger: {
    main: '#E01428',
    surface: '#FFF9FA',
    border: '#F5B1B7',
    hover: '#BC1121',
    pressed: '#700A14',
    focus: 'rgba(224, 20, 40, 0.2)',
  },
  warning: {
    main: '#CA7336',
    surface: '#FCF7F3',
    border: '#FEB17B',
    hover: '#B1652F',
    pressed: '#985628',
    focus: 'rgba(202, 115, 54, 0.2)',
  },
  success: {
    main: '#43936C',
    surface: '#F7F7F7',
    border: '#B8DBCA',
    hover: '#367A59',
    pressed: '#20573D',
    focus: 'rgba(67, 147, 108, 0.2)',
  },
} as const;

export type ColorCategory = keyof typeof Colors;
export type ColorVariant<C extends ColorCategory> = keyof (typeof Colors)[C];
export type ColorsType = typeof Colors;
