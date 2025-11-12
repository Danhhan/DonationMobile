import {
  Pressable,
  PressableProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

import ActivityIndicator from '../ActivityIndicator';
import { Text } from '../Text';

interface IButtonProps extends PressableProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * Loading state.
   */
  isLoading?: boolean;
}

const Button: React.FC<IButtonProps> = ({ children, isLoading, ...props }) => {
  const { themed } = useAppTheme();
  return (
    <Pressable
      disabled={isLoading}
      style={themed($button)}
      accessibilityRole="button"
      {...props}
    >
      <View style={themed($styles.row)}>
        {isLoading && <ActivityIndicator color="white" size="small" />}
        <Text style={themed($text)}>{children}</Text>
      </View>
    </Pressable>
  );
};

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingVertical: spacing.md,
  borderRadius: spacing.xxxl,
  backgroundColor: colors.palette.primary500,
  alignItems: 'center',
});

const $text: ThemedStyle<TextStyle> = ({ colors, typography, spacing }) => ({
  color: colors.palette.neutral100,
  fontSize: 16,
  fontFamily: typography.primary.medium,
  marginLeft: spacing.xxs,
});

export default Button;
