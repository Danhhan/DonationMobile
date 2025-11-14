import { View, ViewStyle } from 'react-native';

import Avatar from '@/components/Avatar';
import { Text } from '@/components/Text';
import { useAuth } from '@/context/AuthContext';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

const Header: React.FC = () => {
  const { themed } = useAppTheme();
  const { user } = useAuth();
  return (
    <View style={themed($header)}>
      <Avatar />
      <View>
        <Text weight="bold">{user?.fullName}</Text>
        <Text
          style={themed(({ colors }) => ({ color: colors.palette.neutral600 }))}
          size="xxs"
        >
          {user?.email}
        </Text>
      </View>
    </View>
  );
};

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  ...$styles.row,
  alignItems: 'center',
  gap: spacing.xs,
});

export default Header;
