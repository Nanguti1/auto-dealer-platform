import { formatDate } from '@/lib/date-utils';

export { formatDate };

export function previewValue(value: unknown, maxLength = 90): string {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const normalized = typeof value === 'string' ? value : JSON.stringify(value);

  return normalized.length > maxLength ? `${normalized.slice(0, maxLength)}…` : normalized;
}
