import lightTheme from "./light";

declare module "styled-components" {
  type ThemeType = typeof lightTheme;
  export interface DefaultTheme extends ThemeType {}
}
