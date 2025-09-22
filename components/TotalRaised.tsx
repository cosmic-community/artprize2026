'use client'

import { useState, useEffect } from 'react'
import { formatCurrency } from '@/lib/format'

interface TotalRaisedProps {
  amount: number
}

export default function TotalRaised({ amount }: TotalRaisedProps) {
  const [displayAmount, setDisplayAmount] = useState(amount)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (amount !== displayAmount) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setDisplayAmount(amount)
        setIsAnimating(false)
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [amount, displayAmount])

  return (
    <div 
      className={`text-5xl sm:text-7xl md:text-8xl font-bold counter-digit tabular-nums transition-transform duration-500 ${
        isAnimating ? 'animate-counter' : ''
      }`}
    >
      {formatCurrency(displayAmount)}
    </div>
  )
}