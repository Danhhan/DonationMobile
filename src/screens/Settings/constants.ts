import { IconTypes } from '@/components/Icon';

interface IMenuItem {
  icon: IconTypes;
  title: string;
  value?: string;
}

export const MENU_VALUES = {
  PROFILE: 'Profile',
  NOTIFICATIONS: 'Notifications',
  PREFERENCES: 'Preferences',
};

export const ACCOUNT_ITEMS: IMenuItem[] = [
  {
    icon: 'user',
    title: 'Profile',
    value: MENU_VALUES.PROFILE,
  },
  {
    icon: 'notification',
    title: 'Notifications',
    value: MENU_VALUES.NOTIFICATIONS,
  },
  {
    icon: 'setting2',
    title: 'Preferences',
    value: MENU_VALUES.PREFERENCES,
  },
];

export const ACTIVITY_ITEMS: IMenuItem[] = [
  {
    icon: 'heart',
    title: 'My donations',
  },
  {
    icon: 'heart',
    title: 'Help',
  },
  {
    icon: 'heart',
    title: "What's new",
  },
];
