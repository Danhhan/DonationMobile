import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
} from 'react';
import { useMMKVString } from 'react-native-mmkv';

export const AUTH_STORAGE_KEY = 'AuthProvider.authToken';
const AUTH_EMAIL_STORAGE_KEY = 'AuthProvider.authEmail';

export type AuthContextType = {
  isAuthenticated: boolean;
  authToken?: string;
  authEmail?: string;
  setAuthToken: (token?: string) => void;
  setAuthEmail: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useMMKVString(AUTH_STORAGE_KEY);
  const [authEmail, setAuthEmail] = useMMKVString(AUTH_EMAIL_STORAGE_KEY);

  const logout = useCallback(() => {
    setAuthToken(undefined);
    setAuthEmail('');
  }, [setAuthEmail, setAuthToken]);

  const value = {
    isAuthenticated: !!authToken,
    authToken,
    authEmail,
    setAuthToken,
    setAuthEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
