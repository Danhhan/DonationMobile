import { useMutation } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/reactQuery';
import { instance } from '@/lib/request/instance';
import { ITokens, IUser } from '@/types/auth';
import { IDataResponse } from '@/types/common';

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = ITokens & {
  user: IUser;
};

const authLoginFn = async (
  data: AuthLoginRequest,
): Promise<IDataResponse<AuthLoginResponse>> => {
  try {
    // v1/auth/login
    const response = await instance
      .post('v1/users/token', {
        json: { ...data, country: 'VN' },
      })
      .json<IDataResponse<AuthLoginResponse>>();

    return response;
  } catch (error: any) {
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
