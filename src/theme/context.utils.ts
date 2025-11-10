import { Platform, StatusBar } from 'react-native';

import type { Theme } from './types';

/**
 * Set the status bar / system background color for CLI apps
 */
export const setSystemUIBackgroundColor = (color: string) => {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(color, true);
  }
  // iOS: background handled via SafeAreaView or root container color
};

/**
 * Apply imperative theming for CLI (React Native core)
 */
export const setImperativeTheming = (theme: Theme) => {
  setSystemUIBackgroundColor(theme.colors.background);
};
