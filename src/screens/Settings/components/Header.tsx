import { View, ViewStyle } from 'react-native';

import Avatar from '@/components/Avatar';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

const Header: React.FC = () => {
  const { themed } = useAppTheme();
  return (
    <View style={themed($header)}>
      <Avatar />
      <View>
        <Text weight="bold">John Doe</Text>
        <Text
          style={themed(({ colors }) => ({ color: colors.palette.neutral600 }))}
          size="xxs"
        >
          john.doe@example.com
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
