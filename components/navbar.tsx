import { UserButton } from '@clerk/nextjs'
import SidebarMobile from '@/components/sidebar-mobile'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscripton } from '@/lib/subscription'

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscripton()

  return (
    <div className="h-12 bg-zinc-100 flex items-center p-4" id="navbar">
      <SidebarMobile isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
