import { Image, ImageStyle, Pressable, StyleProp } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

type Sizes = keyof typeof $sizeStyles;
interface IAvatarProps {
  onNavigateProfile?: () => void;
  url?: string;
  size?: Sizes;
}

const Avatar = ({ onNavigateProfile, url, size }: IAvatarProps) => {
  const { themed } = useAppTheme();
  const $styles: StyleProp<ImageStyle> = [
    themed($baseStyle),
    size && $sizeStyles[size],
  ];
  return (
    <Pressable onPress={onNavigateProfile}>
      <Image
        source={
          url ? { uri: url } : require('@/assets/images/default_avatar.png')
        }
        style={$styles}
      />
    </Pressable>
  );
};

const $sizeStyles = {
  xs: { width: 40, height: 40 } satisfies ImageStyle,
  sm: { width: 60, height: 60 } satisfies ImageStyle,
  md: { width: 80, height: 80 } satisfies ImageStyle,
  lg: { width: 100, height: 100 } satisfies ImageStyle,
};

const $baseStyle: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  ...$sizeStyles.sm,
  borderRadius: spacing.xxl,
});

export default Avatar;
