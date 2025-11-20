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
import useIsOffline from '@/hooks/useIsOffline';
import { IUser } from '@/types/auth';
import eventEmitter, { EXPIRED_TOKEN } from '@/utils/eventEmitter';
import {
  getUserInfo,
  loadTokensInfo,
  removeUserInfo,
  saveUserInfo as saveUserInfoToStorage,
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
  onUpdateIsAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const isOffline = useIsOffline();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onUpdateIsAuthenticated = useCallback(
    (value: boolean) => {
      setIsAuthenticated(value);
    },
    [setIsAuthenticated],
  );

  const setTokensInfo = useCallback((tokensInfo: TokensInfo) => {
    setTokensInfoToStorage(tokensInfo);
    if (!tokensInfo) {
      setUser(null);
    }
  }, []);

  const logOut = useCallback(() => {
    setTokensInfo(null);
    removeUserInfo();
    onUpdateIsAuthenticated(false);
  }, [setTokensInfo, onUpdateIsAuthenticated]);

  /**
   * NOTE: This function to handle init app and after login
   */
  const loadData = useCallback(async () => {
    setIsLoaded(true);
    if (isOffline) {
      const cachedUser = getUserInfo();
      if (cachedUser) {
        setUser(cachedUser);
      }
      setIsLoaded(false);
      return;
    }
    const tokens = loadTokensInfo();
    try {
      if (tokens?.token) {
        const response = await getAuthMeFn();
        setUser(response?.data);
        saveUserInfoToStorage(response?.data);
      }
    } catch (error: any) {
      if (error?.response?.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
        logOut();
      }
    } finally {
      setIsLoaded(false);
      await BootSplash.hide({ fade: true });
    }
  }, [logOut, isOffline]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  // IF network offline we will load user info from storage

  useEffect(() => {
    eventEmitter.addListener(EXPIRED_TOKEN, () => {
      logOut();
    });
    return () => {
      eventEmitter.removeListener(EXPIRED_TOKEN, () => {
        logOut();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finalIsAuthenticated =
    isAuthenticated || Boolean(loadTokensInfo()?.token);

  const value = {
    isAuthenticated: finalIsAuthenticated,
    logOut,
    user,
    setUser,
    setTokensInfo,
    isLoaded,
    onUpdateIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
