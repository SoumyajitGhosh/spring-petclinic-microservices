import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import OwnerFormPage from './OwnerFormPage';

describe('OwnerFormPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a required-field message once a required field is touched and left empty', async () => {
    render(
      <MemoryRouter initialEntries={['/owners/new']}>
        <OwnerFormPage />
      </MemoryRouter>,
    );

    const firstNameInput = screen.getByLabelText('First name');
    await userEvent.click(firstNameInput);
    await userEvent.tab();

    await waitFor(() => expect(screen.getByText('First name is required.')).toBeInTheDocument());
  });
});
