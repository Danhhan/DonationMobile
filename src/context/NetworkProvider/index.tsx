import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  NetInfoState,
  addEventListener,
} from '@react-native-community/netinfo';

export type NetworkContextType = {
  isConnected: boolean;
};

export const NetworkContext = createContext<NetworkContextType | null>(null);

export interface NetworkProviderProps {}

export const NetworkProvider: FC<PropsWithChildren<NetworkProviderProps>> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const ConnectivityChange = useCallback(
    (state: NetInfoState) => {
      const { isInternetReachable: newIsInternetReachable } = state;
      if (!newIsInternetReachable) {
        return;
      }
      setIsConnected(newIsInternetReachable);
      if (!isConnected && newIsInternetReachable) {
        // console.log('Reconnected after offline');
      } else {
        // console.log('Offline / lost connection');
      }
    },
    [isConnected],
  );

  useEffect(() => {
    const unsubscribe = addEventListener(ConnectivityChange);
    return unsubscribe;
  }, [ConnectivityChange]);

  const value = {
    isConnected,
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
