import { FC } from 'react';
import { Alert, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useAuth } from '@/context/AuthContext';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface ILogoutItemProps {}

export const LogoutItem: FC<ILogoutItemProps> = () => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();
  const { logOut } = useAuth();

  const onLogout = () => {
    Alert.alert(
      'Log out of your account?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logOut(),
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <TouchableOpacity onPress={onLogout}>
      <View style={themed($item)}>
        <View style={themed([$leftContent])}>
          <Icon color={colors.palette.angry900} icon="login" size={18} />
          <Text
            style={themed({ color: colors.palette.angry900 })}
            weight="medium"
            size="sm"
          >
            Log Out
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const $item: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing.md,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
});

const $leftContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.xs,
});
