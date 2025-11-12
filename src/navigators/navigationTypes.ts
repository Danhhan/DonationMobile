import { ComponentProps } from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// App Stack Navigator types
export type AppStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  DonationDetail: undefined;
  Settings: undefined;
  Profile: undefined;
  Account: undefined;
  Tabs: NavigatorScreenParams<TabsParamList>;
};

export type TabsParamList = {
  Home: undefined;
  Account: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export interface NavigationProps
  extends Partial<
    ComponentProps<typeof NavigationContainer<AppStackParamList>>
  > {}
