import { describe, expect, it, vi, afterEach } from 'vitest';
import { apiFetch, ApiError } from './client';

describe('apiFetch', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('resolves with parsed JSON on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1 }),
      }),
    );

    const result = await apiFetch<{ id: number }>('/api/customer/owners/1');
    expect(result).toEqual({ id: 1 });
  });

  it('throws ApiError with the server message on a known error shape', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({
            error: 'Validation failed',
            errors: [{ field: 'firstName', defaultMessage: 'must not be blank' }],
          }),
      }),
    );

    await expect(apiFetch('/api/customer/owners')).rejects.toBeInstanceOf(ApiError);
    await expect(apiFetch('/api/customer/owners')).rejects.toThrow(
      'Validation failed\nfirstName: must not be blank',
    );
  });

  it('falls back to a generic message when the error body has an unknown shape', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ timestamp: '...', status: 500 }),
      }),
    );

    await expect(apiFetch('/api/customer/owners')).rejects.toThrow('Request failed (500)');
  });
});
