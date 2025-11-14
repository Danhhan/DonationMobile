import { FC } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '@/context/AuthProvider';

import { MenuItem } from './MenuItem';

interface ILogoutItemProps {}

export const LogoutItem: FC<ILogoutItemProps> = () => {
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
  return <MenuItem title="Log out" icon="login" onPress={onLogout} />;
};
