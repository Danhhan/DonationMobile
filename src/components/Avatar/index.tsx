import { Image, ImageStyle, Pressable } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface IAvatarProps {
  onNavigateProfile?: () => void;
  url?: string;
}

const Avatar: React.FC<IAvatarProps> = ({ onNavigateProfile, url }) => {
  const { themed } = useAppTheme();
  return (
    <Pressable onPress={onNavigateProfile}>
      <Image
        source={
          url ? { uri: url } : require('@/assets/images/default_avatar.png')
        }
        style={themed($avatar)}
      />
    </Pressable>
  );
};

const $avatar: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: 50,
  height: 50,
  borderRadius: spacing.md,
});

export default Avatar;
