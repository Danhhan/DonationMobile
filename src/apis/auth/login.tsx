import { useMutation } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/reactQuery';
import { IUser } from '@/types/auth';
import { instance } from '@/utils/request/instance';

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  token: string;
  refreshToken: string;
  user: IUser;
};

const authLoginFn = async (
  data: AuthLoginRequest,
): Promise<AuthLoginResponse> => {
  try {
    const response = await instance
      .post('v1/auth/email/login', {
        json: data,
      })
      .json<AuthLoginResponse>();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type UseAuthLoginOptions = {
  mutationConfig?: MutationConfig<typeof authLoginFn>;
};

export const useAuthLogin = ({ mutationConfig }: UseAuthLoginOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: authLoginFn,
  });
};
