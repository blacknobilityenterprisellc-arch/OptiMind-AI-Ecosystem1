import { NextRequest, NextResponse } from 'next/server';
import { aiService, AI_MODELS } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model, temperature = 0.7, maxTokens = 1000 } = body;

    // Validate required fields
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Validate model if provided
    if (model && !AI_MODELS[model as keyof typeof AI_MODELS]) {
      return NextResponse.json(
        { error: 'Invalid model specified' },
        { status: 400 }
      );
    }

    // Get chat response from AI service
    const result = await aiService.chat({
      messages,
      model: model || 'openai/gpt-4-turbo',
      temperature,
      maxTokens,
      stream: false
    });

    return NextResponse.json({
      success: true,
      response: result.content,
      model: result.model,
      usage: result.usage,
      cost: result.cost
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to get chat response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return available models
  return NextResponse.json({
    models: AI_MODELS,
    defaultModel: 'openai/gpt-4-turbo'
  });
}