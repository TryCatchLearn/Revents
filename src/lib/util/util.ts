import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import {format, formatDistanceToNow} from 'date-fns';

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

export const convertTimestamps = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map(convertTimestamps);
  } else if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  } else if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, convertTimestamps(value)])
    )
  }
  return data;
}

export function handleError(error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else if (typeof error === 'string') {
    toast.error(error);
  } else {
    toast.error('Something went wrong');
  }
}

export const formatDateTime = (date: string) => {
  return format(new Date(date), 'dd MMM yyyy h:mm a');
}

export const timeAgo = (date: string | number) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
}