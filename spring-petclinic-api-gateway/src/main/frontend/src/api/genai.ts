export async function sendChatMessage(query: string): Promise<string> {
  const response = await fetch('/api/genai/chatclient', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });
  return response.text();
}
