import ky from 'ky';

import HTTP_CODES_ENUM from '@/constants/httpCode';
import eventEmitter, { EXPIRED_TOKEN } from '@/utils/eventEmitter';
import { loadTokensInfo } from '@/utils/storage/auth';

const prefixUrl = `${process.env.API_URL ?? ''}/`;

// Create base instance without token
const baseInstance = ky.create({
  headers: {
    Accept: 'application/json',
  },
  prefixUrl,
});

// Function to create an instance with token
export const createInstance = () => {
  return baseInstance.extend({
    hooks: {
      beforeRequest: [
        request => {
          const tokens = loadTokensInfo();
          if (tokens?.token) {
            request.headers.set('Authorization', `Bearer ${tokens?.token}`);
          }
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          const result = await response
            .clone()
            .json()
            .catch(() => ({}));
          const isLogin = response?.url.includes('login');
          if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED && !isLogin) {
            eventEmitter.emit(EXPIRED_TOKEN);
            return;
          }

          if (!response.ok) {
            console.error('occur error when fetching', result);
            return Promise.reject(result);
          }
          return result;
        },
      ],
    },
  });
};

export const instance = createInstance();
