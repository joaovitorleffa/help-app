import { Platform, StatusBarStyle } from 'react-native';

export default {
  title: 'light',

  bar: {
    style: Platform.OS === 'android' ? 'light-content' : ('dark-content' as StatusBarStyle),
  },

  colors: {
    primary: '#7E6EF5',
    primary_50: 'rgba(126, 110, 245, 0.4)',
    primary_100: '#5D4AED',
    primary_200: '#513DEB',
    gradient: ['#7E6EF5', '#5D4AED', '#5D4AED'],
    tabBarFocused: '#7E6EF5',
    secondary: '#AE9DE5',
    secondary_50: '#F0ECFF',
    background: '#FFFFFF',
    button: '#7E6EF5',
    defaultButton: '#FFFFFF',
    gray: '#F2F2F2',
    gray_50: '#e7e7e7',
    gray_100: '#e0e0e0',
    success: '#25D366',
    success_50: '#CFFFE1',
    error: '#F04E40',
    error_50: '#FECACA',
    input_error: '#F04E40',
    input_error_50: '#FECACA',
    underlay: 'rgba(0, 0, 0, 0.2)',
    title: '#41414D',
    title_secondary: '#FFFFFF',
    text: '#64646D',
    placeholder: '#959494',
  },
  fonts: {
    regular: 'NotoSansJP_400Regular',
    medium: 'NotoSansJP_500Medium',
    bold: 'NotoSansJP_700Bold',
    size: {
      xs: 0.6,
      sm: 0.8,
      md: 1,
      lg: 1.35,
      xl: 2,
    },
  },
  spacing: {
    grid: 24,
  },
};
