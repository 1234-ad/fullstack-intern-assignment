import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const formatRuntime = (runtime: string): string => {
  if (!runtime || runtime === 'N/A') return 'N/A';
  
  const minutes = parseInt(runtime.replace(' min', ''));
  if (isNaN(minutes)) return runtime;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${minutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  
  return `${hours}h ${remainingMinutes}m`;
};

export const formatYear = (year: string): string => {
  if (!year || year === 'N/A') return 'N/A';
  
  // Handle year ranges like "2019–2023"
  if (year.includes('–')) {
    const [start, end] = year.split('–');
    return `${start}–${end || 'Present'}`;
  }
  
  return year;
};

export const getImageUrl = (poster: string): string => {
  if (!poster || poster === 'N/A') {
    return '/placeholder-movie.jpg';
  }
  return poster;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const getRatingColor = (rating: string): string => {
  const numRating = parseFloat(rating);
  
  if (isNaN(numRating)) return 'text-gray-500';
  
  if (numRating >= 8) return 'text-green-500';
  if (numRating >= 6) return 'text-yellow-500';
  if (numRating >= 4) return 'text-orange-500';
  return 'text-red-500';
};

export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to get from localStorage:', error);
    return defaultValue;
  }
};