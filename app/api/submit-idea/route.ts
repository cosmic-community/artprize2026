import { NextRequest, NextResponse } from 'next/server'
import { submitIdea } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json()

    if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
      return NextResponse.json(
        { error: 'Idea is required' },
        { status: 400 }
      )
    }

    if (idea.length > 1000) {
      return NextResponse.json(
        { error: 'Idea must be 1000 characters or less' },
        { status: 400 }
      )
    }

    const success = await submitIdea(idea.trim())

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to submit idea' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in submit-idea API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}