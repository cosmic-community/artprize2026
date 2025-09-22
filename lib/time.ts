export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function parseTargetDate(dateString: string): Date {
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? new Date('2026-09-18T10:00:00-04:00') : date
}

export function calculateCountdown(targetDate: Date): CountdownTime {
  const now = new Date()
  const timeLeft = targetDate.getTime() - now.getTime()

  if (timeLeft <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isExpired: false }
}