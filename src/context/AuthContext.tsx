import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useMMKVString } from 'react-native-mmkv';

import { IUser } from '@/types/auth';

export const AUTH_STORAGE_KEY = 'AuthProvider.authToken';
const AUTH_EMAIL_STORAGE_KEY = 'AuthProvider.authEmail';

export type AuthContextType = {
  isAuthenticated: boolean;
  authToken?: string;
  authEmail?: string;
  setAuthToken: (token?: string) => void;
  setAuthEmail: (email: string) => void;
  logout: () => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useMMKVString(AUTH_STORAGE_KEY);
  const [authEmail, setAuthEmail] = useMMKVString(AUTH_EMAIL_STORAGE_KEY);
  const [user, setUser] = useState<IUser | null>(null);

  const logout = useCallback(() => {
    setAuthToken(undefined);
    setAuthEmail('');
    setUser(null);
  }, [setAuthEmail, setAuthToken]);

  const value = {
    isAuthenticated: !!authToken,
    authToken,
    authEmail,
    setAuthToken,
    setAuthEmail,
    logout,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
