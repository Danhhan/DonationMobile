import {
  ActivityIndicator as RNActivityIndicator,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';

type ActivityIndicatorProps = {
  /** Color of the loading indicator */
  color?: string;
  /** Size of the indicator (small or large) */
  size?: 'small' | 'large' | number;
  /** Additional styles to apply to the container */
  style?: ViewStyle;
  /** Whether to show the indicator (defaults to true) */
  animating?: boolean;
  /** Whether to show the indicator (defaults to true) */
  hidesWhenStopped?: boolean;
  /** Test ID for testing */
  testID?: string;
  /** Extra small size */
  extraSmall?: boolean;
};

const ActivityIndicator = ({
  color,
  size = 'small',
  style,
  animating = true,
  hidesWhenStopped = true,
  testID,
  extraSmall,
}: ActivityIndicatorProps) => {
  const {
    theme: { colors },
  } = useAppTheme();

  // Use the provided color or default to theme's primary color
  const indicatorColor = color || colors.palette.primary600;

  return (
    <RNActivityIndicator
      testID={testID}
      animating={animating}
      color={indicatorColor}
      size={extraSmall ? 'small' : size}
      style={[$styles.center, style]}
      hidesWhenStopped={hidesWhenStopped}
    />
  );
};

export default ActivityIndicator;
