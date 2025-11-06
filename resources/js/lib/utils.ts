import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-NG', {
        // 'en-NG' for English (Nigeria) locale
        style: 'currency',
        currency: 'NGN', // Nigerian Naira
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
