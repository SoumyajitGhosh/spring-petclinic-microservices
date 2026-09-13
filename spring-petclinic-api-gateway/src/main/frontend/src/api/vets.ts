import { apiFetch } from './client';
import type { Vet } from '../types/domain';

export function listVets(): Promise<Vet[]> {
  return apiFetch<Vet[]>('/api/vet/vets');
}
