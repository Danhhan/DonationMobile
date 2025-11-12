import { useQuery } from '@tanstack/react-query';

import { instance } from '@/lib/request/instance';
import { IUser } from '@/types/auth';

export const getAuthMeFn = async () => {
  try {
    const response = await instance.get('v1/auth/me');
    return response.json<IUser>();
  } catch (error) {
    console.log('error :', error);
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
