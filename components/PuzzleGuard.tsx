'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PuzzleGuardProps {
  children: React.ReactNode
}

export default function PuzzleGuard({ children }: PuzzleGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkPuzzleStatus = () => {
      const puzzleSolved = localStorage.getItem('artprize2026_puzzle_solved')
      
      if (puzzleSolved === 'true') {
        setIsAuthorized(true)
      } else {
        router.push('/puzzle')
        return
      }
      
      setIsLoading(false)
    }

    checkPuzzleStatus()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-300 text-sm font-light">
            Verifying access...
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Will redirect to puzzle
  }

  return <>{children}</>
}