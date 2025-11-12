import { TokensInfo } from './type';

import { loadString, remove, saveString } from '.';

const AUTH_LOGIN_STORAGE_KEY = 'authLogin';
const AUTH_TOKEN_STORAGE_KEY = 'authToken';

export const saveAuthInfo = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  saveString(AUTH_LOGIN_STORAGE_KEY, JSON.stringify({ email, password }));
};

export const loadAuthInfo = () => {
  const authInfo = loadString(AUTH_LOGIN_STORAGE_KEY);
  return authInfo ? JSON.parse(authInfo) : null;
};

export const saveTokensInfo = (token: TokensInfo) => {
  saveString(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token));
};

export const loadTokensInfo = () => {
  const tokensInfo = loadString(AUTH_TOKEN_STORAGE_KEY);
  return tokensInfo ? (JSON.parse(tokensInfo) as TokensInfo) : null;
};

export const removeTokensInfo = () => {
  remove(AUTH_TOKEN_STORAGE_KEY);
};
