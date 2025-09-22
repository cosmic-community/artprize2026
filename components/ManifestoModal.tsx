'use client'

import { useState, useEffect } from 'react'

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
        className="text-lg font-light underline decoration-1 underline-offset-4 hover:no-underline transition-all duration-200 focus-ring cursor-help"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        Manifesto
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center p-4 ${
            disableAnimations ? '' : isAnimating ? 'animate-fade-in' : 'animate-fade-out'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="manifesto-title"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-3xl max-h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6 text-center">
              <button
                onClick={closeModal}
                className="float-right text-gray-300 hover:text-white text-2xl font-light focus-ring w-8 h-8 flex items-center justify-center"
                aria-label="Close manifesto"
              >
                ×
              </button>
              
              <div 
                className="manifesto-content text-white prose prose-invert max-w-none [&>*:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: manifesto }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}