import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BootSplash from 'react-native-bootsplash';
import { useMMKVString } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getAuthMeFn } from './apis/auth/getMe';
import HTTP_CODES_ENUM from './constants/httpCode';
import { AUTH_STORAGE_KEY, AuthProvider } from './context/AuthContext';
import { queryConfig } from './lib/reactQuery';
import { AppNavigator } from './navigators/AppNavigator';
import { ThemeProvider } from './theme/context';

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

function App() {
  const [_, setIsReady] = useState(false);
  const [authToken, setAuthToken] = useMMKVString(`${AUTH_STORAGE_KEY}`);
  // init app
  useEffect(() => {
    async function onLaunch() {
      try {
        setIsReady(true);
        if (authToken) {
          const response = await getAuthMeFn();
          console.log('response :', response);
        } else {
          setAuthToken(undefined);
        }
      } catch (e: any) {
        if (e?.response?.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          setAuthToken(undefined);
        }
        console.error(e?.response);
      } finally {
        setIsReady(true);
        await BootSplash.hide({ fade: true });
      }
    }
    onLaunch();
  }, [authToken, setAuthToken]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
