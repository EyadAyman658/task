import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NotificationService } from './network/notifications';
import type { ApiErrorResponse, HttpStatusCode } from './network/config';

// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache time: 10 minutes
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (
          axiosError.response?.status &&
          axiosError.response.status >= 400 &&
          axiosError.response.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: !import.meta.env.DEV,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: error => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error('Mutation failed:', axiosError);

        // Handle global mutation errors if not handled by individual mutation
        if (axiosError.response?.data?.message) {
          NotificationService.handleApiError(
            axiosError.response.status as HttpStatusCode,
            axiosError.response.data.message,
            axiosError.response.data.details
          );
        }
      },
    },
  },
});

queryClient.setMutationDefaults(['global'], {
  mutationFn: async () => {
    throw new Error('Default mutation function should be overridden');
  },
});

if (import.meta.env.DEV) {
  queryClient.getQueryCache().subscribe(event => {
    console.log('Query Cache Event:', event);
  });

  queryClient.getMutationCache().subscribe(event => {
    console.log('Mutation Cache Event:', event);
  });
}
