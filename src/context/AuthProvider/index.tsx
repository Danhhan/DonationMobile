import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import BootSplash from 'react-native-bootsplash';

import { getAuthMeFn } from '@/apis/auth/getMe';
import HTTP_CODES_ENUM from '@/constants/httpCode';
import { IUser } from '@/types/auth';
import eventEmitter, { EXPIRED_TOKEN } from '@/utils/eventEmitter';
import {
  loadTokensInfo,
  saveTokensInfo as setTokensInfoToStorage,
} from '@/utils/storage/auth';
import { TokensInfo } from '@/utils/storage/type';

export type AuthContextType = {
  isAuthenticated: boolean;
  logOut: () => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  setTokensInfo: (tokensInfo: TokensInfo) => void;
  isLoaded?: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const setTokensInfo = useCallback((tokensInfo: TokensInfo) => {
    setTokensInfoToStorage(tokensInfo);

    if (!tokensInfo) {
      setUser(null);
    }
  }, []);

  const logOut = useCallback(() => {
    setTokensInfo(null);
  }, [setTokensInfo]);

  /**
   * NOTE: This function to handle init app and after login
   */
  const loadData = useCallback(async () => {
    const tokens = loadTokensInfo();

    try {
      if (tokens?.token) {
        const response = await getAuthMeFn();
        setUser(response?.data);
      }
    } catch (error: any) {
      if (error?.response?.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
        logOut();
      }
    } finally {
      setIsLoaded(true);
      await BootSplash.hide({ fade: true });
    }
  }, [logOut]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    eventEmitter.addListener(EXPIRED_TOKEN, () => {
      logOut();

      console.log('listen here :');
    });
    return () => {
      eventEmitter.removeListener(EXPIRED_TOKEN, () => {
        logOut();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    isAuthenticated: Boolean(user),
    logOut,
    user,
    setUser,
    setTokensInfo,
    isLoaded,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
