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
            // request.headers.set('Authorization', `Bearer ${tokens?.token}`);

            console.log(' :', `NH ${tokens?.token}`);
            request.headers.set('Authorization', `NH ${tokens?.token}`);
          }
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          const result = await response
            .clone()
            .json()
            .catch(() => ({}));
          if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
            eventEmitter.emit(EXPIRED_TOKEN);
            return;
          }
          if (!response.ok) {
            console.log('occur error :', response);
            Promise.reject(response);
          }
          return result;
        },
      ],
    },
  });
};

export const instance = createInstance();
