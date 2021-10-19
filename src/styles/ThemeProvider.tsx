import React, { useMemo } from 'react';
import {
  useScreen,
  ScreenContextData,
  MediaQuery,
  BreakpointValues,
  rem,
  getNearestBreakpointValue,
  validateMediaQuery,
} from 'responsive-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import light from './light';

type Query = Omit<MediaQuery, 'currentBreakpoint'>;

type Screen = Pick<ScreenContextData, 'breakpoint' | 'padding'> & {
  breakpointValue<T = unknown>(values: BreakpointValues): T | undefined;
  mediaQuery(query: Query): boolean;
  rem(size: number, shouldScale?: boolean): number;
};

export interface ResponsiveTheme {
  screen: Screen;
}

interface Props {
  children?: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const { breakpoint, padding, baseFontSize, fontScaleFactor } = useScreen();

  const theme = useMemo(() => {
    return {
      ...light,
      screen: {
        breakpoint,
        padding,
        rem: (size: number, shouldScale?: boolean) => {
          return rem({
            size,
            shouldScale,
            baseFontSize,
            fontScaleFactor,
          });
        },
        breakpointValue: (values: BreakpointValues) => {
          return getNearestBreakpointValue({
            breakpoint: breakpoint.size,
            values,
          });
        },
        mediaQuery: ({ minBreakpoint, maxBreakpoint, platform }: Query) => {
          return validateMediaQuery({
            minBreakpoint,
            maxBreakpoint,
            platform,
            currentBreakpoint: breakpoint.size,
          });
        },
      },
    };
  }, [breakpoint, padding, baseFontSize, fontScaleFactor]);

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
