import type { ApiErrorResponse } from '../types/domain';

export class ApiError extends Error {}

async function buildErrorMessage(response: Response): Promise<string> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return `Request failed (${response.status})`;
  }

  const errorBody = body as ApiErrorResponse;
  if (errorBody && typeof errorBody.error === 'string') {
    const fieldMessages = (errorBody.errors ?? [])
      .map((e) => `${e.field}: ${e.defaultMessage}`)
      .join('\n');
    return fieldMessages ? `${errorBody.error}\n${fieldMessages}` : errorBody.error;
  }

  return `Request failed (${response.status})`;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Cache-Control': 'no-cache',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(await buildErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
