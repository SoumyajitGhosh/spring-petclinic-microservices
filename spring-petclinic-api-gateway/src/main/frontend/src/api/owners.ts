import { apiFetch } from './client';
import type { Owner, OwnerDetails } from '../types/domain';

export function listOwners(): Promise<Owner[]> {
  return apiFetch<Owner[]>('/api/customer/owners');
}

export function getOwner(ownerId: number | string): Promise<Owner> {
  return apiFetch<Owner>(`/api/customer/owners/${ownerId}`);
}

export function getOwnerDetails(ownerId: number | string): Promise<OwnerDetails> {
  return apiFetch<OwnerDetails>(`/api/gateway/owners/${ownerId}`);
}

export function createOwner(owner: Owner): Promise<Owner> {
  return apiFetch<Owner>('/api/customer/owners', {
    method: 'POST',
    body: JSON.stringify(owner),
  });
}

export function updateOwner(ownerId: number | string, owner: Owner): Promise<void> {
  return apiFetch<void>(`/api/customer/owners/${ownerId}`, {
    method: 'PUT',
    body: JSON.stringify(owner),
  });
}
