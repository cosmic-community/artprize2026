'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if puzzle has been solved
    const puzzleSolved = localStorage.getItem('artprize2026_puzzle_solved')
    
    if (puzzleSolved === 'true') {
      // If puzzle solved, go to main page
      router.push('/main')
    } else {
      // If not solved, go to puzzle page
      router.push('/puzzle')
    }
  }, [router])

  // Loading state while checking puzzle status
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-300 text-sm font-light">
          Preparing your journey...
        </p>
      </div>
    </div>
  )
}