'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// The cipher maps letters to symbols - visitors need to decode "ENTER" to proceed
const CIPHER_MAP: Record<string, string> = {
  'A': '◆', 'B': '◇', 'C': '●', 'D': '○', 'E': '▲', 'F': '△', 'G': '■', 'H': '□',
  'I': '★', 'J': '☆', 'K': '♦', 'L': '♢', 'M': '♠', 'N': '♡', 'O': '♣', 'P': '♧',
  'Q': '◎', 'R': '◉', 'S': '▼', 'T': '▽', 'U': '◀', 'V': '▶', 'W': '▸', 'X': '◂',
  'Y': '⬆', 'Z': '⬇'
}

const REVERSE_CIPHER = Object.fromEntries(
  Object.entries(CIPHER_MAP).map(([key, value]) => [value, key])
)

const TARGET_WORD = "ENTER"
const ENCODED_TARGET = TARGET_WORD.split('').map(letter => CIPHER_MAP[letter]).join(' ')

export default function PuzzlePage() {
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showCipher, setShowCipher] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [timeOnPage, setTimeOnPage] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Show hint after 2 minutes or 3 failed attempts
  useEffect(() => {
    if (timeOnPage >= 120 || attempts >= 3) {
      setShowHint(true)
    }
  }, [timeOnPage, attempts])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const upperGuess = guess.toUpperCase().trim()
    
    if (upperGuess === TARGET_WORD) {
      // Store successful puzzle completion
      localStorage.setItem('artprize2026_puzzle_solved', 'true')
      router.push('/main')
    } else {
      setAttempts(prev => prev + 1)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setGuess('')
    }
  }

  const renderCipherReference = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    return (
      <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-13 gap-2 text-xs">
        {letters.map(letter => (
          <div key={letter} className="text-center">
            <div className="text-gray-400 mb-1">{letter}</div>
            <div className="text-white text-sm">{CIPHER_MAP[letter]}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-xs uppercase tracking-[0.3em] text-gray-300 font-light">
            The Gateway Awaits
          </h1>
          <div className="w-32 h-px bg-gray-700 mx-auto" />
        </div>

        {/* Mystery Text */}
        <div className="space-y-6">
          <p className="text-gray-300 font-light text-sm leading-relaxed">
            Before you may witness the experiment, you must prove your worthiness.
            <br />
            Decipher the ancient symbols to unlock the path forward.
          </p>

          {/* The Encoded Message */}
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <div className="space-y-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide">
                The Key to Passage:
              </p>
              <div 
                className="text-4xl sm:text-5xl font-light tracking-widest text-white select-all"
                style={{ fontFamily: 'monospace' }}
              >
                {ENCODED_TARGET}
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="cipher-guess" className="block text-sm text-gray-400 font-light">
              Speak the decoded word:
            </label>
            <input
              id="cipher-guess"
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className={`w-full max-w-md mx-auto block bg-gray-900 border ${
                isShaking ? 'border-red-500 animate-pulse' : 'border-gray-700'
              } rounded px-4 py-3 text-white text-center text-lg font-light tracking-widest uppercase placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 ${
                isShaking ? 'shake' : ''
              }`}
              placeholder="DECODE THE SYMBOLS"
              maxLength={10}
            />
          </div>
          
          <button
            type="submit"
            disabled={!guess.trim()}
            className="px-8 py-3 bg-white text-black font-light text-sm uppercase tracking-wide hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Attempt Passage
          </button>
        </form>

        {/* Attempts Counter */}
        {attempts > 0 && (
          <div className="text-red-400 text-sm font-light">
            Failed attempts: {attempts}
          </div>
        )}

        {/* Progressive Hints */}
        {showHint && !showCipher && (
          <div className="space-y-4 border-t border-gray-800 pt-8">
            <p className="text-yellow-400 text-sm font-light">
              The symbols follow a pattern. Each unique symbol represents a letter.
              <br />
              <em className="text-gray-400">
                {timeOnPage >= 120 
                  ? "Time has revealed this hint to you..." 
                  : "Your persistence has earned you this guidance..."
                }
              </em>
            </p>
            
            {(timeOnPage >= 180 || attempts >= 5) && (
              <button
                onClick={() => setShowCipher(true)}
                className="text-xs text-gray-400 underline hover:text-gray-300 transition-colors"
              >
                Reveal the cipher key
              </button>
            )}
          </div>
        )}

        {/* Full Cipher Reference */}
        {showCipher && (
          <div className="space-y-4 border-t border-gray-800 pt-8">
            <h3 className="text-sm text-yellow-400 font-light">The Cipher Unveiled:</h3>
            <div className="bg-gray-900 border border-gray-700 p-4 rounded">
              {renderCipherReference()}
            </div>
            <p className="text-gray-400 text-xs">
              Use this key to decode the symbols above.
            </p>
          </div>
        )}

        {/* Mysterious Footer */}
        <div className="text-xs text-gray-500 pt-8">
          <p>Only those who understand symbols may witness the experiment.</p>
        </div>
      </div>

      <style jsx>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  )
}