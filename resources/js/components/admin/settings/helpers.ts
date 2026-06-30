export function formatDate(value?: string | null): string {
  return value ? new Date(value).toLocaleString() : '—';
}

export function previewValue(value: unknown, maxLength = 90): string {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const normalized = typeof value === 'string' ? value : JSON.stringify(value);

  return normalized.length > maxLength ? `${normalized.slice(0, maxLength)}…` : normalized;
}
