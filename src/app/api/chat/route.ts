import { NextResponse } from 'next/server';
import companyKnowledge from '../../../data/company-knowledge.json';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key is not configured' }, { status: 500 });
    }

    const systemPrompt = `You are a helpful customer support assistant for SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.
Answer ONLY using the provided company data below. If the question is outside this scope (e.g., pricing negotiation, custom specs, order status, or general unrelated topics), politely direct the user to Request a Quote or WhatsApp us at +91 9712666160 rather than guessing or answering.

Company Data:
${JSON.stringify(companyKnowledge, null, 2)}`;

    // Format history for Anthropic API
    // The Anthropic API expects messages to start with a 'user' role and alternate.
    const messages: { role: string, content: string }[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((msg) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          // Skip leading assistant messages
          if (messages.length === 0 && msg.role === 'assistant') {
            return;
          }
          // Merge consecutive messages of the same role
          if (messages.length > 0 && messages[messages.length - 1].role === msg.role) {
            messages[messages.length - 1].content += "\n" + msg.content;
          } else {
            messages.push({ role: msg.role, content: msg.content });
          }
        }
      });
    }

    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      messages[messages.length - 1].content += "\n" + message;
    } else {
      messages.push({ role: 'user', content: message });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API Error:', errorData);
      return NextResponse.json({ error: 'Failed to communicate with AI provider' }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.content[0].text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
