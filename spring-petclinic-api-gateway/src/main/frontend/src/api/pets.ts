import { apiFetch } from './client';
import type { Pet, PetFormPayload, PetType } from '../types/domain';

export function listPetTypes(): Promise<PetType[]> {
  return apiFetch<PetType[]>('/api/customer/petTypes');
}

export function getPet(ownerId: number | string, petId: number | string): Promise<Pet> {
  return apiFetch<Pet>(`/api/customer/owners/${ownerId}/pets/${petId}`);
}

export function createPet(ownerId: number | string, payload: PetFormPayload): Promise<Pet> {
  return apiFetch<Pet>(`/api/customer/owners/${ownerId}/pets`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updatePet(
  ownerId: number | string,
  petId: number | string,
  payload: PetFormPayload,
): Promise<void> {
  return apiFetch<void>(`/api/customer/owners/${ownerId}/pets/${petId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
