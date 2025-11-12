import { IconTypes } from '@/components/Icon';

interface IMenuItem {
  icon: IconTypes;
  title: string;
  isLast?: boolean;
}

export const accountItems: IMenuItem[] = [
  {
    icon: 'user',
    title: 'Profile',
  },
  {
    icon: 'notification',
    title: 'Notifications',
  },
  {
    icon: 'setting2',
    title: 'Preferences',
    isLast: true,
  },
];

export const activityItems: IMenuItem[] = [
  {
    icon: 'heart',
    title: 'My donations',
  },
  {
    icon: 'heart',
    title: 'Payment Methods',
    isLast: true,
  },
];
