import { isAxiosError } from 'axios';

export const parseApiError = (error: unknown, fallback = 'An unexpected error occurred'): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.error || error.response?.data?.message || fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};
