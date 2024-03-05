import { Settings } from 'lucide-react'
import Heading from '@/components/heading'
import { checkSubscripton } from '@/lib/subscription'
import SubscriptionButton from '@/components/subscription-button'

const settingsPage = async () => {
  const isPro = await checkSubscripton()

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
        iconColor="text-gray-500"
        bgColor="bg-gray-500/20"
      />
      <div className="p-4 lg:p-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? 'You are currently on a Pro plan'
            : 'You are currently on a free plan'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default settingsPage
