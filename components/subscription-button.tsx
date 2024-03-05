'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

interface SubscriptionButtonProps {
  isPro: boolean
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      console.log('BILLING_ERROR', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={loading}
      variant={isPro ? 'default' : 'premium'}
      onClick={onClick}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
      {!isPro && <Zap className="size-4 ml-2 fill-white" />}
    </Button>
  )
}

export default SubscriptionButton
