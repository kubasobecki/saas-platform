import { UserButton } from '@clerk/nextjs'
import SidebarMobile from '@/components/sidebar-mobile'
import { getApiLimitCount } from '@/lib/api-limit'

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount()

  return (
    <div className="h-12 bg-zinc-100 flex items-center p-4" id="navbar">
      <SidebarMobile apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
