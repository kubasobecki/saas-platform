import { Children } from 'react'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-zinc-900 overflow-auto">
      <div className="h-full max-w-screen-xl mx-auto">{children}</div>
    </main>
  )
}

export default LandingLayout
