import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatWidget from './ChatWidget';
import * as genaiApi from '../../api/genai';

describe('ChatWidget', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends a message and appends the bot reply, persisting to localStorage', async () => {
    vi.spyOn(genaiApi, 'sendChatMessage').mockResolvedValue('Hello! How can I help?');

    render(<ChatWidget />);

    const input = screen.getByPlaceholderText('Type a message...');
    await userEvent.type(input, 'What vaccinations does my pet need?');
    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => expect(screen.getByText('Hello! How can I help?')).toBeInTheDocument());
    expect(screen.getByText('What vaccinations does my pet need?')).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem('chatMessages') ?? '[]');
    expect(stored).toHaveLength(2);
    expect(stored[1]).toEqual({ role: 'bot', text: 'Hello! How can I help?' });
  });
});
