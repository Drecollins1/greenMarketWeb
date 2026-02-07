// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid messages array' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is missing in .env.local');
      return res.status(500).json({ error: 'Server configuration error: API key missing' });
    }

    // Retry logic for handling rate limits
    let openRouterResponse: Response | undefined;
    const maxRetries = 3;
    const retryDelays = [1000, 2000, 4000];

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://escrow.greenmarket.com.ng',
          'X-Title': 'GreenMarket AI Assistant',
        },
        body: JSON.stringify({
          // Use OpenRouter's free model router - automatically selects from available free models
          model: 'openrouter/free',
          // This router auto-selects from models like:
          // - deepseek/deepseek-r1:free
          // - google/gemini-2.0-flash-exp:free  
          // - deepseek/deepseek-v3:free
          messages: [
            {
              role: 'system',
              content: `You are GreenMarket AI, a friendly and knowledgeable agricultural assistant for GreenMarket Nigeria - an online marketplace for fresh farm products and organic foods. Your role is to help customers with:

1. Product Information: Answer questions about farm products, organic foods, vegetables, fruits, grains, and agricultural supplies available on the marketplace.

2. Farming Advice: Provide practical agricultural tips, organic farming methods, crop recommendations, planting schedules, and best practices for Nigerian climate and soil conditions.

3. Seasonal Guidance: Recommend seasonal crops and products suitable for different times of the year in Nigeria.

4. Organic & Sustainable Practices: Educate about organic farming, natural fertilizers, pest control, soil health, and sustainable agriculture.

5. Nutrition & Usage: Share information about nutritional benefits, storage tips, recipe ideas, and best ways to use different farm products.

6. Shopping Assistance: Help customers find the right products for their needs, understand product quality indicators, and make informed purchasing decisions.

Guidelines:
- Be warm, friendly, and encouraging
- Use farming and nature-related emojis sparingly (🌱🌾🥕🍅🌽)
- Provide practical, actionable advice suitable for Nigerian context
- If asked about specific prices or inventory, politely mention that they should check the marketplace for current availability and pricing
- Focus on education, empowerment, and sustainable practices
- Keep responses concise but informative (2-4 paragraphs unless more detail is requested)
- If unsure about something specific to Nigeria or the platform, be honest and suggest checking with local agricultural experts or the marketplace support

Remember: You're representing GreenMarket, a platform connecting farmers directly with consumers for fresh, quality produce.`,
            },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (openRouterResponse.ok) {
        break;
      }

      if (openRouterResponse.status === 429 && attempt < maxRetries - 1) {
        console.log(`Rate limited, retrying in ${retryDelays[attempt]}ms... (attempt ${attempt + 1}/${maxRetries})`);
        await wait(retryDelays[attempt]);
        continue;
      }

      break;
    }

    // Check if response exists
    if (!openRouterResponse) {
      return res.status(500).json({ error: 'Failed to connect to AI service' });
    }

    if (!openRouterResponse.ok) {
      const errorBody = await openRouterResponse.text();
      console.error(`OpenRouter failed → ${openRouterResponse.status}: ${errorBody}`);
      
      if (openRouterResponse.status === 429) {
        return res.status(503).json({
          error: 'The AI service is temporarily busy. Please try again in a moment.',
        });
      }
      
      return res.status(openRouterResponse.status).json({
        error: `OpenRouter error: ${openRouterResponse.status}`,
      });
    }

    const data = await openRouterResponse.json();
    const assistantMessage = data.choices?.[0]?.message?.content?.trim() || '';

    if (!assistantMessage) {
      return res.status(500).json({ error: 'No content received from model' });
    }

    return res.status(200).json({ message: assistantMessage });
  } catch (err: any) {
    console.error('API route error:', err.message, err.stack);
    return res.status(500).json({ error: 'Internal server error - check server logs' });
  }
}