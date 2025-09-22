import { CountdownTime } from '@/types'

export function parseTargetDate(dateString: string): Date {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string, using default:', dateString)
      return new Date('2026-09-18T10:00:00-04:00')
    }
    return date
  } catch (error) {
    console.error('Error parsing date:', error)
    return new Date('2026-09-18T10:00:00-04:00')
  }
}

export function calculateTimeRemaining(targetDate: Date): CountdownTime {
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false
  }
}