'use client'

import { useState, useEffect } from 'react'
import EmailSignup from './EmailSignup'

interface ManifestoModalProps {
  manifesto: string
}

export default function ManifestoModal({ manifesto }: ManifestoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
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
      setTimeout(() => setIsOpen(false), 300)
    } else {
      setIsOpen(false)
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
      <button
        onClick={openModal}
        className="text-lg font-light underline decoration-1 underline-offset-4 hover:no-underline transition-all duration-200 focus-ring"
        aria-label="Read the manifesto"
      >
        Read the Manifesto
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4 ${
            disableAnimations ? '' : isAnimating ? 'animate-fade-in' : 'animate-fade-out'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="manifesto-title"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-4xl max-h-full overflow-y-auto bg-black border border-gray-800 rounded-lg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 
                  id="manifesto-title"
                  className="text-xl font-light text-white"
                >
                  The Manifesto
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl font-light focus-ring w-8 h-8 flex items-center justify-center"
                  aria-label="Close manifesto"
                >
                  ×
                </button>
              </div>
              
              <div className="prose prose-invert prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: manifesto }} />
              </div>

              {/* Email Signup Section */}
              <div className="border-t border-gray-800 pt-8">
                <div className="max-w-2xl mx-auto">
                  <EmailSignup />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}