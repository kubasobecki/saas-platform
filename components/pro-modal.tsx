'use client'

import { useState } from 'react'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Check,
  Code,
  Image,
  MessageSquare,
  Music,
  Speech,
  Video,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Speech Generation',
    icon: Speech,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: Image,
    color: 'text-pink-600',
    bgColor: 'bg-pink-600/10',
  },
  {
    label: 'Video Generation',
    icon: Video,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
]

const ProModal = () => {
  const proModal = useProModal()
  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      console.log(error, 'STRIPE_CLIENT_ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-y-4 pb-2 justify-center items-center">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Premium
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool, i) => (
              <Card
                key={i}
                className="p-3 border-black/5 flex justify-between items-center"
              >
                <div className="flex items-center gap-x-4">
                  <div
                    className={cn('flex p-2 w-fit rounded-md', tool.bgColor)}
                  >
                    <tool.icon className={cn('size-6', tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary size-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="size-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
