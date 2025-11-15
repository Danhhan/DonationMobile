import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';

import { getIsOnline } from './helper';

export type NetworkContextType = {
  isConnected: boolean;
};

export const NetworkContext = createContext<NetworkContextType | null>(null);

export interface NetworkProviderProps {}

export const NetworkProvider: FC<PropsWithChildren<NetworkProviderProps>> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const isOnlineRef = useRef<boolean | null>(null);
  const netInfoSubscriptionRef = useRef<NetInfoSubscription | null>(null);
  const offlineTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateIsOnline = useCallback((newIsOnline: boolean) => {
    isOnlineRef.current = newIsOnline;
    setIsOnline(newIsOnline);
  }, []);
  const debounceMs = 0;

  const handleNetworkStateChange = useCallback(
    (state: NetInfoState) => {
      const newIsOnline = getIsOnline(state);
      const oldIsOnline = isOnlineRef.current;

      if (newIsOnline === oldIsOnline || oldIsOnline === null) return;

      if (newIsOnline) {
        // We came back online within the debounce window, clear any pending offline update
        if (offlineTimerRef.current) {
          clearTimeout(offlineTimerRef.current);
          offlineTimerRef.current = null;
        } else {
          // analytics.track(analytics.event.networkStatusReconnected);
        }
        updateIsOnline(true);
      } else {
        if (debounceMs > 0) {
          if (!offlineTimerRef.current) {
            offlineTimerRef.current = setTimeout(() => {
              offlineTimerRef.current = null;
              // analytics.track(analytics.event.networkStatusOffline);
              updateIsOnline(false);
            }, debounceMs);
          }
        } else {
          // analytics.track(analytics.event.networkStatusOffline);
          updateIsOnline(false);
        }
      }
    },
    [debounceMs, updateIsOnline],
  );

  useEffect(() => {
    async function initIsOnlineSubscription() {
      const netInfoState = await NetInfo.fetch();
      handleNetworkStateChange(netInfoState);

      netInfoSubscriptionRef.current = NetInfo.addEventListener(state => {
        handleNetworkStateChange(state);
      });
    }

    function removeIsOnlineSubscription() {
      if (netInfoSubscriptionRef.current) {
        netInfoSubscriptionRef.current();
        netInfoSubscriptionRef.current = null;
      }
    }

    initIsOnlineSubscription();

    const appStateSubscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        removeIsOnlineSubscription();
        if (nextAppState === 'active') {
          await initIsOnlineSubscription();
        }
      },
    );

    return () => {
      appStateSubscription.remove();
      removeIsOnlineSubscription();
      if (offlineTimerRef.current) {
        clearTimeout(offlineTimerRef.current);
        offlineTimerRef.current = null;
      }
    };
  }, [handleNetworkStateChange]);

  const value = {
    isConnected: Boolean(isOnline),
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context)
    throw new Error('useNetwork must be used within an NetworkProvider');
  return context;
};
