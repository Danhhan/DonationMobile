import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AnimatedBootSplash } from '@/components/BootSplash';
import { ErrorBoundary } from '@/components/Screen/ErrorScreen/ErrorBoundary';
import Config from '@/config';
import { useAuth } from '@/context/AuthProvider';
import { LoginScreen } from '@/screens/Auth/Login';
import { RegisterScreen } from '@/screens/Auth/Register';
import ProfileScreen from '@/screens/Settings/Profile';
import { useAppTheme } from '@/theme/context';

import { AppStackParamList, NavigationProps } from './navigationTypes';
import { TabsNavigator } from './TabsNavigator';

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const { isAuthenticated, isLoaded } = useAuth();
  const [visible, setVisible] = useState(true);
  const {
    theme: { colors },
  } = useAppTheme();

  useEffect(() => {
    if (isLoaded) {
      setVisible(false);
    }
  }, [isLoaded]);

  if (visible) {
    return (
      <AnimatedBootSplash
        onAnimationEnd={() => {
          if (!isLoaded) {
            setVisible(false);
          }
        }}
      />
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? 'Tabs' : 'Login'}
    >
      {isAuthenticated && (
        <>
          <Stack.Screen name="Tabs" component={TabsNavigator} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme();

  // useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer theme={navigationTheme} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  );
};
