'use client'

import { Menu } from 'lucide-react'

import Sidebar from '@/components/sidebar'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useEffect, useState } from 'react'

interface MobileSidebarProps {
  apiLimitCount: number
  isPro: boolean
}

const SidebarMobile = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Sheet>
      <SheetTrigger className="md:hidden text-zinc-500 hover:text-zinc-900">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMobile
