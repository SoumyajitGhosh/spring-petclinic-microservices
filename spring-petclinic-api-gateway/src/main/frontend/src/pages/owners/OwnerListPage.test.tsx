import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import OwnerListPage from './OwnerListPage';
import * as ownersApi from '../../api/owners';

describe('OwnerListPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders owners and filters by the search query', async () => {
    vi.spyOn(ownersApi, 'listOwners').mockResolvedValue([
      { id: 1, firstName: 'George', lastName: 'Franklin', address: '110 W. Liberty St.', city: 'Madison', telephone: '6085551023', pets: [] },
      { id: 2, firstName: 'Betty', lastName: 'Davis', address: '638 Cardinal Ave.', city: 'Sun Prairie', telephone: '6085551749', pets: [] },
    ]);

    render(
      <MemoryRouter>
        <OwnerListPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText('George Franklin')).toBeInTheDocument());
    expect(screen.getByText('Betty Davis')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Search Filter'), 'Betty');

    expect(screen.queryByText('George Franklin')).not.toBeInTheDocument();
    expect(screen.getByText('Betty Davis')).toBeInTheDocument();
  });
});
