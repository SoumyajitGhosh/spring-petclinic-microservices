import { apiFetch } from './client';
import type { Visit } from '../types/domain';

export function listVisits(ownerId: number | string, petId: number | string): Promise<Visit[]> {
  return apiFetch<Visit[]>(`/api/visit/owners/${ownerId}/pets/${petId}/visits`);
}

export function createVisit(
  ownerId: number | string,
  petId: number | string,
  visit: Pick<Visit, 'date' | 'description'>,
): Promise<Visit> {
  return apiFetch<Visit>(`/api/visit/owners/${ownerId}/pets/${petId}/visits`, {
    method: 'POST',
    body: JSON.stringify(visit),
  });
}
