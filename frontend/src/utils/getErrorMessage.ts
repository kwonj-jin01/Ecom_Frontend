import axios, { AxiosError } from 'axios';

export interface LaravelErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

function isAxiosError<T = unknown>(err: unknown): err is AxiosError<T> {
  return axios.isAxiosError(err);
}

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<LaravelErrorResponse>(error)) {
    const { response } = error;

    if (response?.data?.message) {
      return response.data.message;
    }
    if (response?.data?.errors) {
      const first = Object.values(response.data.errors)[0];
      return first?.[0] ?? 'Validation error';
    }

    switch (response?.status) {
      case 400:
        return 'Invalid data provided. Please check your input.';
      case 401:
        return 'Invalid email or password.';
      case 409:
        return 'An account with this email already exists.';
      case 422:
        return 'Please check your input and try again.';
      case 500:
        return 'Server error. Please try again later.';
    }
  }

  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred.';
};
