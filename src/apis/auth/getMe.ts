import { useQuery } from '@tanstack/react-query';

import { IUser } from '@/types/auth';
import { instance } from '@/utils/request/instance';

export const getAuthMeFn = async () => {
  try {
    const response = await instance.get('v1/auth/me');
    return response.json<IUser>();
  } catch (error) {
    throw error;
  }
};

export const useAuthMe = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth-me'],
    queryFn: getAuthMeFn,
  });
  return { data, isLoading, error };
};
