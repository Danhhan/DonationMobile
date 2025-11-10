// eslint-disable-next-line no-restricted-imports
import { Text as RNText, TextProps, TextStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

const $text: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.neutral100,
  fontSize: 16,
  fontFamily: typography.primary.medium,
});

export function Text(props: TextProps) {
  const { themed } = useAppTheme();
  return <RNText style={themed($text)} {...props} />;
}
