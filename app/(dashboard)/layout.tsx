import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-zinc-800">
        <Sidebar />
      </div>
      <main className="h-full flex flex-col md:pl-72 overflow-hidden">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
