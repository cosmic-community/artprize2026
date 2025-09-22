'use client'

import { useState, useEffect } from 'react'

interface IdeaModalProps {
  children: React.ReactNode
}

export default function IdeaModal({ children }: IdeaModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [idea, setIdea] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const disableAnimations = process.env.NEXT_PUBLIC_DISABLE_MANIFESTO_ANIMATIONS === 'true'

  const openModal = () => {
    setIsOpen(true)
    if (!disableAnimations) {
      setIsAnimating(true)
    }
  }

  const closeModal = () => {
    if (!disableAnimations) {
      setIsAnimating(false)
      setTimeout(() => {
        setIsOpen(false)
        resetForm()
      }, 300)
    } else {
      setIsOpen(false)
      resetForm()
    }
  }

  const resetForm = () => {
    setIdea('')
    setSubmitStatus('idle')
    setIsSubmitting(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim() || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: idea.trim() }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          closeModal()
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting idea:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <div onClick={openModal} className="cursor-pointer">
        {children}
      </div>

      {isOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center p-4 ${
            disableAnimations ? '' : isAnimating ? 'animate-fade-in' : 'animate-fade-out'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="idea-form-title"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-gray-800 rounded-lg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 
                  id="idea-form-title"
                  className="text-xl font-light text-white"
                >
                  Whisper Your Ideas
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl font-light focus-ring w-8 h-8 flex items-center justify-center"
                  aria-label="Close form"
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-300 text-sm font-light">
                Share your vision for what should be done with the raised funds. Your idea becomes part of the collective consciousness shaping this experiment.
              </p>

              {submitStatus === 'success' ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-green-400 text-lg font-light">
                    Your idea has been whispered into the void.
                  </div>
                  <p className="text-gray-400 text-sm">
                    It now joins the collective unconscious guiding this experiment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="idea" className="sr-only">
                      Your idea for the funds
                    </label>
                    <textarea
                      id="idea"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="What should be done with the money? Let your imagination guide the experiment..."
                      className="w-full h-40 bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 resize-none"
                      maxLength={1000}
                      disabled={isSubmitting}
                      required
                    />
                    <div className="text-right mt-1">
                      <span className="text-xs text-gray-500">
                        {idea.length}/1000
                      </span>
                    </div>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-sm text-center">
                      Something went wrong. The void did not receive your whisper. Please try again.
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={!idea.trim() || isSubmitting}
                      className="px-8 py-3 bg-white text-black font-light text-sm uppercase tracking-wide hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isSubmitting ? 'Whispering...' : 'Submit to the Void'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}