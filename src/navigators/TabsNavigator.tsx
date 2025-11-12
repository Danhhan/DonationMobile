import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import { Icon, IconTypes } from '@/components/Icon';
import { HomeScreen } from '@/screens/Home';
import SettingsScreen from '@/screens/Settings';

import { TabsParamList } from './navigationTypes';

const Tab = createBottomTabNavigator<TabsParamList>();

function renderTabIcon({
  route,
  color,
  size,
}: {
  route: RouteProp<TabsParamList, keyof TabsParamList>;
  color: string;
  size: number;
}) {
  let iconName: IconTypes;

  switch (route.name) {
    case 'Home':
      iconName = 'heart';
      break;
    case 'Account':
      iconName = 'user';
      break;
    default:
      iconName = 'heart';
  }

  return <Icon icon={iconName} size={size} color={color} />;
}
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => renderTabIcon({ route, color, size }),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export { TabsNavigator };
