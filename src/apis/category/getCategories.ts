import { useQuery } from '@tanstack/react-query';

import { instance } from '@/lib/request/instance';
import { ICategory } from '@/types/category';
import { IDataResponse } from '@/types/common';

export const getCategoriesFn = async () => {
  try {
    const response = await instance.get('v1/categories');
    return response.json<IDataResponse<ICategory[]>>();
  } catch (error) {
    throw error;
  }
};

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesFn,
  });
  return { data, isLoading, error };
};
