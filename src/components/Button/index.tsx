import { Pressable, PressableProps, TextStyle, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import { Text } from '../Text';

interface IButtonProps extends PressableProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({ children, ...props }) => {
  const { themed } = useAppTheme();
  return (
    <Pressable style={themed($button)} accessibilityRole="button" {...props}>
      <Text style={themed($text)}>{children}</Text>
    </Pressable>
  );
};

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingVertical: spacing.md,
  borderRadius: spacing.xxxl,
  backgroundColor: colors.palette.primary500,
  alignItems: 'center',
});

const $text: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.neutral100,
  fontSize: 16,
  fontFamily: typography.primary.medium,
});

export default Button;
