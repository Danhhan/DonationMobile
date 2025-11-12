import { View, ViewStyle } from 'react-native';

import Avatar from '@/components/Avatar';
import { Text } from '@/components/Text';
import { useAuth } from '@/context/AuthContext';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

const UserInfo: React.FC = () => {
  const { themed } = useAppTheme();
  const { user } = useAuth();
  return (
    <View style={themed($header)}>
      <Avatar />
      <Text weight="bold" size="xl">
        {user?.firstName} {user?.lastName}
      </Text>
      <Text size="xs">{user?.email}</Text>
    </View>
  );
};

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  ...$styles.center,
  paddingVertical: spacing.lg,
});

export default UserInfo;
