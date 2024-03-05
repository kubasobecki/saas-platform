'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import TypewriterComponent from 'typewriter-effect'
import { Button } from '@/components/ui/button'

export const LandingHero = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className="font-bold text-white text-center space-y-5 py-36">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The best AI tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot.',
                'Text-to-Speech Generation.',
                'Music Generation.',
                'Photo Generation.',
                'Video Generation.',
                'Code Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required
      </div>
    </div>
  )
}
