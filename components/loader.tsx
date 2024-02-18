import { Loader2 } from 'lucide-react'

export const Loader = () => (
  <div className="h-full flex flex-col gap-y-4 items-center justify-center">
    <div className="relative animate-spin">
      <Loader2 size={48} color="#ddd6fe" />
    </div>
    <p className="text-sm text-muted-foreground">AI is Thinking...</p>
  </div>
)
