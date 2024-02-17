import { UserButton } from '@clerk/nextjs'
import SidebarMobile from '@/components/sidebar-mobile'

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <SidebarMobile />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
