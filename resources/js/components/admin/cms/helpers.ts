import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatFileSize } from '@/lib/format-utils';

export { formatDate, formatDateTime, formatFileSize };

export function userName(user?: { name?: string; email?: string }): string { return user?.name ?? user?.email ?? 'Unknown'; }
export function categoryName(category?: { name?: string }): string { return category?.name ?? 'Uncategorized'; }
export function truncateText(text?: string, maxLength: number = 100): string { return text && text.length > maxLength ? text.slice(0, maxLength) + '...' : text ?? '—'; }
