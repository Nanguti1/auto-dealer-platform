import type { LeadRecord } from './types';

export function leadName(lead: LeadRecord): string {
  return [lead.first_name, lead.last_name].filter(Boolean).join(' ').trim() || lead.email || `Lead #${lead.id}`;
}

export function leadInitials(lead: LeadRecord): string {
  return leadName(lead).split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2) || 'LD';
}

export function leadStageName(lead: LeadRecord): string {
  return lead.crm_stage?.name ?? lead.crmStage?.name ?? lead.status ?? 'New';
}

export function assignedTo(lead: LeadRecord): string {
  return lead.assigned_user?.name ?? lead.assignedUser?.name ?? 'Unassigned';
}

export function formatDateTime(value?: string): string {
  return value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
}
