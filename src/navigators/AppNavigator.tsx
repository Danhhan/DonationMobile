import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/context/AuthContext';
import { LoginScreen } from '@/screens/Auth/Login';
import { RegisterScreen } from '@/screens/Auth/Register';
import { HomeScreen } from '@/screens/Home';
import { useAppTheme } from '@/theme/context';

import { AppStackParamList, NavigationProps } from './navigationTypes';

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const { isAuthenticated } = useAuth();

  const {
    theme: { colors },
  } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
    >
      {isAuthenticated && (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  );
};

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme();

  // useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer theme={navigationTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
