'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative mr-4">
          <Image width="143" height="36" alt="Logo" src="/logo.png" />
        </div>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="outline" className="rounded-full">
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
