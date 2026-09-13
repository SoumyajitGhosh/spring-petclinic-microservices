export interface PetType {
  id?: number;
  name: string;
}

export interface Visit {
  id?: number;
  petId?: number;
  date: string; // "yyyy-MM-dd"
  description: string;
}

export interface Pet {
  id?: number;
  name: string;
  birthDate: string;
  type: PetType;
  visits: Visit[];
}

export interface Owner {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
  pets: Pet[];
}

export type OwnerDetails = Owner;

export interface Specialty {
  id?: number;
  name: string;
}

export interface Vet {
  id?: number;
  firstName: string;
  lastName: string;
  specialties: Specialty[];
}

export interface PetFormPayload {
  id: number;
  name: string;
  birthDate: string;
  typeId: string;
}

export interface ApiFieldError {
  field: string;
  defaultMessage: string;
}

export interface ApiErrorResponse {
  error?: string;
  errors?: ApiFieldError[];
}
