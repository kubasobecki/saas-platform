import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount()

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 bg-zinc-800">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="h-full flex flex-col md:pl-72 overflow-hidden">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
