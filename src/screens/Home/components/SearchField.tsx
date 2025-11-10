import { View, ViewStyle } from 'react-native';

import { Icon } from '@/components/Icon';
import { TextInput } from '@/components/TextInput';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

const SearchField: React.FC = () => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();
  return (
    <View style={themed($container)}>
      <Icon icon="search" size={22} color={colors.palette.primary50} />
      <TextInput placeholder="Search" />
    </View>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.md,
  backgroundColor: colors.palette.gray100,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
  borderRadius: spacing.md,
});

export default SearchField;
