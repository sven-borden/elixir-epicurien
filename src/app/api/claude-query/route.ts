import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const response = await fetch('https://api.claude-sonnet.com/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CLAUDE_SONNET_API_KEY}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}