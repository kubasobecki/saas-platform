'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('558e87fb-5254-4059-9c65-1f071d97434c')
  }, [])

  return null
}
