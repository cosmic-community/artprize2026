import { NextRequest, NextResponse } from 'next/server'
import { subscribeEmail } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const success = await subscribeEmail(email.trim().toLowerCase())

    if (!success) {
      return NextResponse.json(
        { error: 'This email has already joined the experiment' },
        { status: 409 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in subscribe API:', error)
    return NextResponse.json(
      { error: 'The void did not receive your signal. Please try again.' },
      { status: 500 }
    )
  }
}