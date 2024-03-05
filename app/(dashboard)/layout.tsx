import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscripton } from '@/lib/subscription'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const isPro = await checkSubscripton()
  const apiLimitCount = await getApiLimitCount()

  console.log(isPro)
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 bg-zinc-800">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="h-full flex flex-col md:pl-72 overflow-hidden">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
