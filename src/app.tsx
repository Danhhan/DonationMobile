if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require('./devtools/ReactotronConfig.ts');
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

import { AuthProvider } from './context/AuthProvider';
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
