export const formatDateTime = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
export const formatDate = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : '—';
export function userName(user?: { name?: string; email?: string }): string { return user?.name ?? user?.email ?? 'Unknown'; }
export function categoryName(category?: { name?: string }): string { return category?.name ?? 'Uncategorized'; }
export function truncateText(text?: string, maxLength: number = 100): string { return text && text.length > maxLength ? text.slice(0, maxLength) + '...' : text ?? '—'; }
export function formatFileSize(bytes?: number): string { if (!bytes) return '0 B'; const k = 1024; const sizes = ['B', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; }
