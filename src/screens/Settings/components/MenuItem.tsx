import { FC } from 'react';
import { Alert, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Icon, IconTypes } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import hexToRgba from '@/utils/hexToRgba';

interface IMenuItemProps {
  title: string;
  icon: IconTypes;
  isLast?: boolean;
}

export const MenuItem: FC<IMenuItemProps> = ({ title, icon, isLast }) => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();

  return (
    <TouchableOpacity onPress={() => Alert.alert('Not implemented')}>
      <View style={themed([$item, !isLast && $borderBottom])}>
        <View style={themed([$leftContent])}>
          <Icon color={colors.palette.neutral600} icon={icon} size={18} />
          <Text weight="medium" size="sm">
            {title}
          </Text>
        </View>
        <Icon color={colors.palette.neutral600} icon="arrowRight" size={18} />
      </View>
    </TouchableOpacity>
  );
};

const $item: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing.md,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
});

const $borderBottom: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: 1,
  borderBottomColor: hexToRgba(colors.border, 0.3),
});

const $leftContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.xs,
});
