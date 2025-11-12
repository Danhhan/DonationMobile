import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

import { AuthProvider } from './context/AuthContext';
import { queryConfig } from './lib/reactQuery';
import { AppNavigator } from './navigators/AppNavigator';
import { ThemeProvider } from './theme/context';

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <AuthProvider>
              <ThemeProvider>
                <AppNavigator />
                {/* <NavigationContainer>
                  <TabsNavigator />
                </NavigationContainer> */}
                <Toaster />
              </ThemeProvider>
            </AuthProvider>
          </KeyboardProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
