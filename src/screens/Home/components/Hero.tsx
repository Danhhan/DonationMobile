import { memo } from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

const Hero: React.FC = () => {
  const { themed } = useAppTheme();
  return (
    <View style={themed($hero)}>
      <Image
        source={require('@/assets/images/banner.png')}
        style={themed($heroImage)}
      />
    </View>
  );
};

const $hero: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  overflow: 'hidden',
  borderRadius: spacing.md,
  marginVertical: spacing.lg,
});

const $heroImage: ThemedStyle<ImageStyle> = () => ({
  width: '100%',
  height: 160,
});

export default memo(Hero);
