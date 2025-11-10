import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { getFontFamily } from '@/theme/typography';

export const Header: React.FC = () => {
  const { themed } = useAppTheme();

  return (
    <View style={themed($header)}>
      <View>
        <Text style={themed($greeting)}>Hello,</Text>
        <Text style={themed($userName)}>Azzahri A.👋 </Text>
      </View>
      <Image
        source={require('@/assets/images/default_avatar.png')}
        style={themed($avatar)}
      />
    </View>
  );
};

const $greeting: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral600,
  fontFamily: getFontFamily('SpaceGrotesk', '100'),
});

const $userName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral900,
  fontFamily: getFontFamily('SpaceGrotesk', '600'),
  fontSize: 24,
});

const $avatar: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: 50,
  height: 50,
  borderRadius: spacing.md,
});

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.md,
});
