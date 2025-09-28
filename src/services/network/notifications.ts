import { toast, type ToastOptions, type Id } from 'react-toastify';
import { HTTP_STATUS, type HttpStatusCode } from './config';

// Toast configuration
const DEFAULT_TOAST_CONFIG: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Status to toast type mapping
const STATUS_TOAST_MAP: Record<
  number,
  'success' | 'error' | 'warning' | 'info'
> = {
  [HTTP_STATUS.OK]: 'success',
  [HTTP_STATUS.CREATED]: 'success',
  [HTTP_STATUS.NO_CONTENT]: 'success',
  [HTTP_STATUS.BAD_REQUEST]: 'error',
  [HTTP_STATUS.UNAUTHORIZED]: 'error',
  [HTTP_STATUS.FORBIDDEN]: 'error',
  [HTTP_STATUS.NOT_FOUND]: 'error',
  [HTTP_STATUS.CONFLICT]: 'warning',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'warning',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 'warning',
  [HTTP_STATUS.BAD_GATEWAY]: 'error',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'warning',
  [HTTP_STATUS.GATEWAY_TIMEOUT]: 'error',
};

// Error messages mapping
const ERROR_MESSAGES: Record<number, string> = {
  [HTTP_STATUS.BAD_REQUEST]: 'Invalid request. Please check your input.',
  [HTTP_STATUS.UNAUTHORIZED]: 'Authentication required. Please login.',
  [HTTP_STATUS.FORBIDDEN]: 'You do not have permission to perform this action.',
  [HTTP_STATUS.NOT_FOUND]: 'The requested resource was not found.',
  [HTTP_STATUS.CONFLICT]:
    'A conflict occurred. The resource may already exist.',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'The data provided is invalid.',
  [HTTP_STATUS.TOO_MANY_REQUESTS]:
    'Too many requests. Please wait a moment and try again.',
  [HTTP_STATUS.BAD_GATEWAY]: 'Server error. Please try again later.',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable.',
  [HTTP_STATUS.GATEWAY_TIMEOUT]: 'Request timeout. Please try again.',
};

export class NotificationService {
  static success(message: string, options?: ToastOptions): Id {
    return toast.success(message, { ...DEFAULT_TOAST_CONFIG, ...options });
  }

  static error(message: string, options?: ToastOptions): Id {
    return toast.error(message, { ...DEFAULT_TOAST_CONFIG, ...options });
  }

  static warning(message: string, options?: ToastOptions): Id {
    return toast.warning(message, { ...DEFAULT_TOAST_CONFIG, ...options });
  }

  static info(message: string, options?: ToastOptions): Id {
    return toast.info(message, { ...DEFAULT_TOAST_CONFIG, ...options });
  }

  static handleApiResponse(status: HttpStatusCode, message?: string): void {
    if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      console.error('Internal server error occurred');
      return;
    }

    const toastType = STATUS_TOAST_MAP[status];
    const defaultMessage = ERROR_MESSAGES[status];
    const displayMessage =
      message || defaultMessage || `Request completed with status ${status}`;

    if (!toastType) {
      console.warn(`Unhandled status code: ${status}`);
      return;
    }

    switch (toastType) {
      case 'success':
        this.success(displayMessage);
        break;
      case 'error':
        this.error(displayMessage);
        break;
      case 'warning':
        this.warning(displayMessage);
        break;
      case 'info':
        this.info(displayMessage);
        break;
    }
  }

  static handleApiError(
    status: HttpStatusCode,
    message?: string,
    details?: unknown
  ): void {
    // Log error details for debugging
    console.error('API Error:', { status, message, details });

    if (status !== HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      this.handleApiResponse(status, message);
    }
  }

  static dismissAll(): void {
    toast.dismiss();
  }

  static dismiss(toastId: Id): void {
    toast.dismiss(toastId);
  }
}

export const notify = NotificationService;
