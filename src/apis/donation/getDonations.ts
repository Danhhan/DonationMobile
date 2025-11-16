import { useQuery } from '@tanstack/react-query';

import { instance } from '@/lib/request/instance';
import { IDataResponse } from '@/types/common';
import { IDonation } from '@/types/donation';

export const getDonationsFn = async (searchParams?: any) => {
  try {
    // const defaultParams = {
    //   limit: 1,
    // };
    const parsedParams = {
      // ...defaultParams,
      ...searchParams,
    };
    const response = await instance.get('v1/donations', {
      searchParams: parsedParams,
    });
    return response.json<IDataResponse<IDonation[]>>();
  } catch (error) {
    throw error;
  }
};

export const useDonations = (searchParams?: any) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['donations', searchParams],
    queryFn: () => getDonationsFn(searchParams),
  });
  return { data, isLoading, error };
};
