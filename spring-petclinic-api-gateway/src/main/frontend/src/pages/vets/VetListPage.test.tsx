import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VetListPage from './VetListPage';
import * as vetsApi from '../../api/vets';

describe('VetListPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders vets returned by the API', async () => {
    vi.spyOn(vetsApi, 'listVets').mockResolvedValue([
      { id: 1, firstName: 'James', lastName: 'Carter', specialties: [{ id: 1, name: 'radiology' }] },
    ]);

    render(
      <MemoryRouter>
        <VetListPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText('James Carter')).toBeInTheDocument());
    expect(screen.getByText('radiology')).toBeInTheDocument();
  });
});
