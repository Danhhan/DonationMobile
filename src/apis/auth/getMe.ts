import { useQuery } from '@tanstack/react-query';

import { instance } from '@/lib/request/instance';
import { IUser } from '@/types/auth';
import { IDataResponse } from '@/types/common';

export const getAuthMeFn = async () => {
  try {
    const response = await instance.get('v1/auth/me');
    return response.json<IDataResponse<IUser>>();
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
