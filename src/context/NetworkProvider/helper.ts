import { NetInfoState } from '@react-native-community/netinfo';

function getIsOnline(state: NetInfoState) {
  if (
    typeof state.isConnected !== 'boolean' ||
    typeof state.isInternetReachable !== 'boolean'
  ) {
    return true;
  }
  return state.isConnected && state.isInternetReachable;
}

export { getIsOnline };
