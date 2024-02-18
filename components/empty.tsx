import { Bird } from 'lucide-react'
import Image from 'next/image'

interface EmptyProps {
  label: string
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <Bird size={128} strokeWidth={1} color="#e4e4e7" />
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}
