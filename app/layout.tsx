import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/components/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kodeina',
  description: 'SaaS Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <ModalProvider />
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
