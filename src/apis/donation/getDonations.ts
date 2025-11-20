import { useInfiniteQuery } from '@tanstack/react-query';

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
  return useInfiniteQuery({
    queryKey: ['donations', searchParams],
    async queryFn({ pageParam = 1 }) {
      const res = await instance.get('v1/donations', {
        searchParams: {
          ...searchParams,
          page: pageParam,
          limit: 4,
        },
      });
      return res.json<IDataResponse<IDonation[]>>();
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      console.log('lastPage?.meta?.page :', lastPage?.meta?.page);
      const hasLoadMore = lastPage?.meta?.page < lastPage?.meta?.totalPages;
      return hasLoadMore ? lastPage?.meta?.page + 1 : undefined;
    },
  });
};
