import { Platform } from 'react-native';
import ky from 'ky';

import HTTP_CODES_ENUM from '@/constants/httpCode';
import eventEmitter, { EXPIRED_TOKEN } from '@/utils/eventEmitter';
import { loadTokensInfo } from '@/utils/storage/auth';

const getApiUrl = () => {
  const apiUrl = process.env.API_URL ?? '';
  if (__DEV__ && Platform.OS === 'android' && apiUrl.includes('localhost')) {
    return apiUrl.replace('localhost', '10.0.2.2');
  }
  return apiUrl;
};

const prefixUrl = `${getApiUrl()}/`;

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
          const clonedResponse = response.clone();
          const raw = await clonedResponse.json();
          const isLogin = response?.url.includes('login');
          if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED && !isLogin) {
            eventEmitter.emit(EXPIRED_TOKEN);
            return;
          }
          if (response.ok) {
            return response;
          }
          console.log('Raw response:', raw);
          return Promise.reject(raw);
        },
      ],
    },
    timeout: false,
    retry: 0,
  });
};

export const instance = createInstance();
