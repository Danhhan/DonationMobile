import {
  PressableStateCallbackType,
  StyleProp,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

import { IProfileMenuItem } from '../types';

interface IProfileMenuItemsProps {
  menuItems: IProfileMenuItem[];
}

export const ProfileMenuItems = ({ menuItems }: IProfileMenuItemsProps) => {
  const { themed } = useAppTheme();

  function $menuItemStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [themed($baseStyle), pressed && themed($pressedStyle)];
  }

  return (
    <>
      {menuItems.map((item, index) => (
        <Pressable onPress={item.action} key={index}>
          {({ pressed }) => (
            <View style={themed($menuItemStyle({ pressed }))}>
              <View>
                {item.title && (
                  <Text style={themed($title)} size="xxs">
                    {item.title}
                  </Text>
                )}
                <Text size="xs">{item.description}</Text>
              </View>
              <Icon icon="arrowRight" size={14} />
            </View>
          )}
        </Pressable>
      ))}
    </>
  );
};

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral600,
});

const $baseStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  justifyContent: 'space-between',
  alignItems: 'center',
  ...$styles.row,
  minHeight: 50,
});

const $pressedStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral300,
});
