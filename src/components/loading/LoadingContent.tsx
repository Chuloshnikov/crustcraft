"use client"

import { useState, useEffect } from "react"
import { Pizza, Flame, Clock } from "lucide-react"

export function LoadingContent() {
  const [loadingText, setLoadingText] = useState("Preparing your order...")
  const [progress, setProgress] = useState(0)

  const loadingMessages = [
    "Preparing your order...",
    "Kneading fresh dough...",
    "Adding delicious toppings...",
    "Firing up the oven...",
    "Baking to perfection...",
    "Almost ready...",
  ]

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % loadingMessages.length
        return loadingMessages[nextIndex]
      })
    }, 2000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + Math.random() * 15
      })
    }, 300)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [loadingMessages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
            <Pizza className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            CRUSTCRAFT
          </span>
        </div>

        {/* Main Loading Animation */}
        <div className="relative mb-8">
          {/* Spinning Pizza */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-spin-slow opacity-20"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-spin opacity-40"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Pizza className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -left-4 animate-bounce delay-100">
            <div className="bg-orange-200 w-3 h-3 rounded-full"></div>
          </div>
          <div className="absolute -top-2 -right-6 animate-bounce delay-300">
            <div className="bg-red-200 w-2 h-2 rounded-full"></div>
          </div>
          <div className="absolute -bottom-4 -left-2 animate-bounce delay-500">
            <div className="bg-yellow-200 w-4 h-4 rounded-full"></div>
          </div>
          <div className="absolute -bottom-2 -right-4 animate-bounce delay-700">
            <div className="bg-orange-300 w-3 h-3 rounded-full"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-pulse">{loadingText}</h2>
          <p className="text-gray-600">Please wait while we craft your experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{Math.round(Math.min(progress, 100))}% complete</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3">
            <Flame className="h-6 w-6 text-orange-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Fresh & Hot</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3">
            <Clock className="h-6 w-6 text-orange-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Fast Service</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3">
            <Pizza className="h-6 w-6 text-orange-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Handcrafted</p>
          </div>
        </div>

        {/* Fun Loading Message */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 italic">&ldquo;Good things take time... great pizza is worth the wait!&rdquo; 🍕</p>
        </div>
      </div>
    </div>
  )
}
