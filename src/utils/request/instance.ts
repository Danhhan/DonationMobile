import ky from 'ky';

import { AUTH_STORAGE_KEY } from '@/context/AuthContext';

import { loadString } from '../storage';

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
          const token = loadString(AUTH_STORAGE_KEY);
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        },
      ],
    },
  });
};

export const instance = createInstance();
