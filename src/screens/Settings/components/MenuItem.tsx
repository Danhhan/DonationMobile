import { FC } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { Icon, IconTypes } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface IMenuItemProps {
  title: string;
  icon: IconTypes;
  onPress?: () => void;
}

export const MenuItem: FC<IMenuItemProps> = ({ title, icon, onPress }) => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={themed([$item, pressed && $pressedItem])}>
          <View style={themed([$leftContent])}>
            <Icon
              icon={icon}
              size={18}
              color={
                pressed ? colors.palette.primary50 : colors.palette.neutral600
              }
            />
            <Text
              weight="medium"
              size="xs"
              style={{
                color: colors.palette.neutral900,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const $item: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing.md,
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xs + spacing.xxs,
  borderRadius: spacing.xs,
});

const $pressedItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral200,
});

const $leftContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.xs,
});
