import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import useIsOffline from '@/hooks/useIsOffline';
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
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Required network connection.
   */
  requiredNetwork?: boolean;
}

const Button = (props: IButtonProps) => {
  const { themed } = useAppTheme();

  const {
    children,
    isLoading,
    style: $viewStyleOverride,
    requiredNetwork,
  } = props;

  const isOffline = useIsOffline();
  const isDisabled = requiredNetwork && isOffline;

  function $viewStyle(): StyleProp<ViewStyle> {
    return [
      themed($baseViewStyle),
      isDisabled && themed($disabledViewStyle),
      $viewStyleOverride,
    ];
  }

  return (
    <Pressable
      disabled={isDisabled || isLoading}
      style={$viewStyle()}
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

const $baseViewStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  minHeight: 55,
  borderRadius: spacing.lg,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: 'hidden',
  backgroundColor: colors.palette.primary500,
});

const $text: ThemedStyle<TextStyle> = ({ colors, typography, spacing }) => ({
  color: colors.palette.neutral100,
  fontSize: 16,
  fontFamily: typography.primary.medium,
  marginLeft: spacing.xxs,
});

const $disabledViewStyle: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.5,
});

export default Button;
