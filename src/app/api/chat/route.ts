import { NextResponse } from 'next/server';
import companyKnowledge from '../../../data/company-knowledge.json';
import fs from 'fs/promises';
import path from 'path';
import { Resend } from 'resend';

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

CRITICAL INSTRUCTION: You are also a request-capture agent. Naturally ask follow-up questions in conversation until you have at least 'product_interest', 'buyer_name', and 'buyer_email' (or phone number). Once you have these three pieces of information, immediately call the 'submit_buyer_request' tool. Do not call it prematurely with incomplete info — ask first.

Company Data:
${JSON.stringify(companyKnowledge, null, 2)}`;

    // Format history for Anthropic API
    // The Anthropic API expects messages to start with a 'user' role and alternate.
    const messages: { role: string, content: string }[] = [];
    
    // Check if we've already submitted a request in this session to prevent duplicates
    const completionMessage = "your request has been sent to our team";
    let hasCompleted = false;

    if (history && Array.isArray(history)) {
      history.forEach((msg) => {
        if (msg.role === 'assistant' && msg.content.toLowerCase().includes(completionMessage)) {
          hasCompleted = true;
        }

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

    const tools = [
      {
        name: "submit_buyer_request",
        description: "Call this once you have enough information about what the buyer wants to submit their request to our sales team.",
        input_schema: {
          type: "object",
          properties: {
            product_interest: { type: "string", description: "e.g. water filling machine, RO plant, full turnkey line" },
            capacity_bph: { type: "string" },
            budget_range: { type: "string" },
            location_country: { type: "string" },
            buyer_name: { type: "string" },
            buyer_email: { type: "string" },
            buyer_phone: { type: "string" },
            additional_notes: { type: "string" }
          },
          required: ["product_interest", "buyer_name", "buyer_email"]
        }
      }
    ];

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
        messages: messages,
        // Only provide tools if we haven't already completed a request
        tools: hasCompleted ? undefined : tools
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API Error:', errorData);
      return NextResponse.json({ error: 'Failed to communicate with AI provider' }, { status: 502 });
    }

    const data = await response.json();

    // Check if the AI decided to use the tool
    const toolUse = data.content?.find((c: any) => c.type === 'tool_use' && c.name === 'submit_buyer_request');
    
    if (toolUse) {
      const input = toolUse.input;
      
      try {
        // 1. Log to file
        const logPath = path.join(process.cwd(), 'src/data/requests-log.json');
        let logs = [];
        try {
          const fileData = await fs.readFile(logPath, 'utf-8');
          logs = JSON.parse(fileData);
        } catch (e) {
          // File might not exist or be empty
        }
        logs.push({ ...input, timestamp: new Date().toISOString() });
        await fs.writeFile(logPath, JSON.stringify(logs, null, 2));

        // 2. Send Email via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL || 'contact@shivshaktiwaterequipment.com';
        if (resendApiKey) {
          const resend = new Resend(resendApiKey);
          await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', // Use a default sender if not configured
            to: [teamEmail, 'sonal.patel.email@example.com'], // Replace with actual emails
            subject: `New Buyer Request: ${input.product_interest} — ${input.buyer_name}`,
            html: `<p><strong>Name:</strong> ${input.buyer_name}</p>
                   <p><strong>Email:</strong> ${input.buyer_email}</p>
                   <p><strong>Phone:</strong> ${input.buyer_phone || 'N/A'}</p>
                   <p><strong>Product:</strong> ${input.product_interest}</p>
                   <p><strong>Capacity:</strong> ${input.capacity_bph || 'N/A'}</p>
                   <p><strong>Budget:</strong> ${input.budget_range || 'N/A'}</p>
                   <p><strong>Location:</strong> ${input.location_country || 'N/A'}</p>
                   <p><strong>Notes:</strong> ${input.additional_notes || 'N/A'}</p>`
          });
        } else {
           console.log("No RESEND_API_KEY found, skipping email.");
        }

        // 3. Send WhatsApp via Meta Cloud API (Placeholder structure)
        const waApiKey = process.env.WHATSAPP_API_KEY;
        const waTemplate = process.env.WHATSAPP_TEMPLATE_NAME;
        
        if (waApiKey && waTemplate) {
          // This is a generic WhatsApp Cloud API payload structure.
          // You will need to replace 'YOUR_PHONE_NUMBER_ID' with the actual ID.
          await fetch(`https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${waApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: "919712666160",
              type: "template",
              template: {
                name: waTemplate,
                language: { code: "en" },
                components: [
                  {
                    type: "body",
                    parameters: [
                      { type: "text", text: input.buyer_name },
                      { type: "text", text: input.product_interest }
                    ]
                  }
                ]
              }
            })
          }).catch(e => console.error("WhatsApp API Error:", e));
        } else {
           console.log("No WhatsApp API credentials found, skipping WhatsApp message.");
        }

      } catch (err) {
        // Fallback: Catch any errors so we don't break the user experience
        console.error("Failed to process notifications:", err);
      }

      // Return the hardcoded confirmation message to the user regardless of backend success
      return NextResponse.json({ 
        reply: `Thanks ${input.buyer_name}, your request has been sent to our team. We'll respond within 24 hours. You can also reach us directly on WhatsApp: https://wa.me/919712666160` 
      });
    }

    // Normal text response if tool was not used
    const textContent = data.content?.find((c: any) => c.type === 'text');
    return NextResponse.json({ reply: textContent ? textContent.text : "I couldn't process that request." });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
