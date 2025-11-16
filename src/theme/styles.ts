import { ViewStyle } from 'react-native';

import { spacing } from './spacing';

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  flex: { display: 'flex' } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: 'wrap' } as ViewStyle,
  row: { flexDirection: 'row' } as ViewStyle,
  center: { alignItems: 'center', justifyContent: 'center' } as ViewStyle,

  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,

  toggleInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as ViewStyle,
};
