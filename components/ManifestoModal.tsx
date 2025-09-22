'use client'

import { useState } from 'react'
import EmailSignup from './EmailSignup'

interface ManifestoModalProps {
  manifesto: string
}

export default function ManifestoModal({ manifesto }: ManifestoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-lg font-light underline decoration-1 underline-offset-4 hover:no-underline transition-all duration-200 focus-ring"
      >
        The Experiment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-gray-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div 
                    className="prose prose-sm prose-invert max-w-none text-gray-300 font-light leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: manifesto }}
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-4 text-gray-500 hover:text-white transition-colors p-1"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Email Signup Section */}
              <div className="border-t border-gray-800 pt-6">
                <EmailSignup />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}