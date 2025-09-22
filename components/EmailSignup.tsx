'use client'

import { useState } from 'react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'exists'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || isSubmitting) return

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else if (response.status === 409) {
        setStatus('exists')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      setStatus('error')
      setErrorMessage('The void did not receive your signal. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center space-y-2">
        <div className="text-sm text-green-400 font-light">
          Your signal has been received.
        </div>
        <p className="text-xs text-gray-500">
          You are now part of the experiment. Updates will find you when the time is right.
        </p>
      </div>
    )
  }

  if (status === 'exists') {
    return (
      <div className="text-center space-y-2">
        <div className="text-sm text-yellow-400 font-light">
          You are already part of the experiment.
        </div>
        <p className="text-xs text-gray-500">
          Your consciousness is already woven into this digital tapestry.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-300 font-light leading-relaxed">
          To receive whispers from the void as the experiment unfolds, 
          <br />
          leave your digital imprint below.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Updates will arrive when the collective consciousness deems it necessary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.consciousness@digital.void"
            className="flex-1 bg-black border border-gray-800 rounded px-4 py-2 text-white text-sm placeholder-gray-600 focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            disabled={!email.trim() || isSubmitting}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-light border border-gray-700 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors duration-200 whitespace-nowrap"
          >
            {isSubmitting ? 'Transmitting...' : 'Join the Experiment'}
          </button>
        </div>

        {status === 'error' && (
          <div className="text-red-400 text-xs text-center">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  )
}