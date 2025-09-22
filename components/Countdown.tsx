'use client'

import { useState, useEffect } from 'react'
import { calculateTimeRemaining } from '@/lib/time'
import { CountdownTime } from '@/types'

interface CountdownProps {
  targetDate: Date
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining(targetDate))
    }

    // Initial calculation
    updateTimer()

    // Update every second
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  if (timeRemaining.isExpired) {
    return (
      <div className="text-6xl md:text-8xl font-light tracking-tight">
        <span className="block text-center">It begins.</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4 sm:gap-8">
      <TimeUnit value={timeRemaining.days} label="Days" />
      <TimeUnit value={timeRemaining.hours} label="Hours" />
      <TimeUnit value={timeRemaining.minutes} label="Minutes" />
      <TimeUnit value={timeRemaining.seconds} label="Seconds" />
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl sm:text-6xl md:text-7xl font-light counter-digit tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs sm:text-sm uppercase tracking-wide text-gray-300 font-light mt-2">
        {label}
      </div>
    </div>
  )
}