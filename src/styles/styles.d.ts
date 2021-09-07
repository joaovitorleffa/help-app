import 'styled-components';
import lightTheme from './light';
import type { ResponsiveTheme } from './ThemeProvider';

declare module 'styled-components' {
  type ThemeType = typeof lightTheme;
  export interface DefaultTheme extends ResponsiveTheme, ThemeType {}
}
