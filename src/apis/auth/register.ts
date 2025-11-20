import { useMutation } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/reactQuery';
import { instance } from '@/lib/request/instance';
import { ITokens, IUser } from '@/types/auth';

export type AuthRegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  bizName: string;
};

export type AuthRegisterResponse = ITokens & {
  user: IUser;
};

const authRegisterFn = async (
  data: AuthRegisterRequest,
): Promise<AuthRegisterResponse> => {
  try {
    const response = await instance
      .post('v1/auth/register-admin', {
        json: data,
      })
      .json<AuthRegisterResponse>();
    return response;
  } catch (error: any) {
    throw error;
  }
};

type UseAuthRegisterOptions = {
  mutationConfig?: MutationConfig<typeof authRegisterFn>;
};

export const useAuthRegister = ({
  mutationConfig,
}: UseAuthRegisterOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: authRegisterFn,
  });
};
