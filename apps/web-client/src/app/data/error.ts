import axios from 'axios';

export const onError = (
  error: unknown,
  onErrorCallback: (err: string) => void,
) => {
  if (axios.isAxiosError(error)) {
    onErrorCallback(
      error?.response?.data?.message ||
        'Something went wrong. Please try again.',
    );
  } else {
    onErrorCallback('Something went wrong. Please try again.');
  }
};
