'use client'

import { cn } from '@/lib/utils'
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Speech,
  Settings,
  Video,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation',
  },
  {
    label: 'Text to Speech',
    icon: Speech,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    href: '/speech',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/music',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-600/10',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: Video,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    href: '/code',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-zinc-400',
  },
]

const Sidebar = () => {
  const pathName = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-zinc-800 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <Image width="143" height="36" alt="Logo" src="/logo.png" />
        </Link>
        <div className="space-y-1">
          {routes.map(route => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded',
                pathName === route.href
                  ? 'bg-white/10 rounded'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
