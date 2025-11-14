import { useCallback, useEffect, useState } from 'react';
import * as NetInfo from '@react-native-community/netinfo';

export default function useInternetStatus() {
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const onChange = useCallback(
    (state: NetInfo.NetInfoState) => {
      const { isInternetReachable: newIsInternetReachable } = state;
      if (!newIsInternetReachable) {
        return;
      }
      setIsInternetReachable(newIsInternetReachable);
      if (!isInternetReachable && newIsInternetReachable) {
        // console.log('Reconnected after offline')
      } else {
        // console.log('Offline / lost connection')
      }
    },
    [isInternetReachable],
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(onChange);
    return unsubscribe;
  }, [onChange]);

  return isInternetReachable;
}
