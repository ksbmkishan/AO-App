import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF8C00',
    secondary: '#FFB347',
    tertiary: '#FFA500',
    background: '#FFF8F0',
    surface: '#FFFFFF',
    surfaceVariant: '#FFF5E6',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#8B4513',
    onSurface: '#8B4513',
    outline: '#FFB347',
    error: '#FF6B6B',
    success: '#4CAF50',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: 'System',
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
  },
};

export const gradients = {
  primary: ['#FF8C00', '#FFA500'],
  background: ['#FFF8F0', '#FFE4B5'],
  card: ['#FFFFFF', '#FFF5E6'],
};
