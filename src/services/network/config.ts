import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';

// API Configuration
export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  POLYGON_BASE_URL:
    import.meta.env.VITE_POLYGON_API_BASE_URL ||
    'https://api.polygon.io/v3/reference',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Types for API requests
export interface ApiRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandling?: boolean;
  retryOnFailure?: boolean;
  metadata?: { startTime: Date };
}

const requestInterceptor = (config: ApiRequestConfig) => {
  // Add timestamp to requests for debugging
  config.metadata = { startTime: new Date() };

  const token = localStorage.getItem('auth-token');
  if (token && !config.skipAuth) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Log request in development
  if (import.meta.env.DEV) {
    console.log(' API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      params: config.params,
      data: config.data,
    });
  }

  return config;
};

// Response interceptor for logging and error handling
const responseInterceptor = (response: AxiosResponse) => {
  const config = response.config as ApiRequestConfig;
  const duration = config.metadata?.startTime
    ? new Date().getTime() - config.metadata.startTime.getTime()
    : 0;

  if (import.meta.env.DEV) {
    console.log('API Response:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      status: response.status,
      duration: `${duration}ms`,
      data: response.data,
    });
  }

  return response;
};

// Error interceptor for centralized error handling
const errorInterceptor = (error: AxiosError<ApiErrorResponse>) => {
  const config = error.config as ApiRequestConfig | undefined;
  const duration = config?.metadata
    ? new Date().getTime() - config.metadata.startTime.getTime()
    : 0;

  if (import.meta.env.DEV) {
    console.error('API Error:', {
      method: config?.method?.toUpperCase(),
      url: config?.url,
      status: error.response?.status,
      duration: `${duration}ms`,
      message: error.message,
      response: error.response?.data,
    });
  }

  if (config?.skipErrorHandling) {
    return Promise.reject(error);
  }

  if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
    localStorage.removeItem('auth-token');
    if (!config?.skipAuth) {
      toast.error('Session expired. Please log in again.');
      // Could add navigation to login page here
    }
  } else if (error.response?.status === HTTP_STATUS.FORBIDDEN) {
    toast.error("Access denied. You don't have permission for this action.");
  } else if (error.response?.status === HTTP_STATUS.NOT_FOUND) {
    toast.error('Resource not found.');
  } else if (
    error.response?.status &&
    error.response.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR
  ) {
    toast.error('Server error. Please try again later.');
  } else if (!error.response && error.code === 'NETWORK_ERROR') {
    toast.error('Network error. Please check your connection.');
  }

  return Promise.reject(error);
};

export const createApiClient = (
  options: {
    skipInterceptors?: boolean;
    baseURL?: string;
    timeout?: number;
  } = {}
): AxiosInstance => {
  const client = axios.create({
    baseURL: options.baseURL ?? API_CONFIG.BASE_URL,
    timeout: options.timeout ?? API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!options.skipInterceptors) {
    client.interceptors.request.use(requestInterceptor);
    client.interceptors.response.use(responseInterceptor, errorInterceptor);
  }

  return client;
};

export const apiClient = createApiClient();

export interface ApiErrorResponse {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
  timestamp: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  timestamp: string;
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
