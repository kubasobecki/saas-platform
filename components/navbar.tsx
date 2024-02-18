import { UserButton } from '@clerk/nextjs'
import SidebarMobile from '@/components/sidebar-mobile'

const Navbar = () => {
  return (
    <div className="h-12 bg-zinc-100 flex items-center p-4" id="navbar">
      <SidebarMobile />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
