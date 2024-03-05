'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Enzo Gorlomi',
    avatar: 'E',
    title: 'Stuntman',
    description: "This is the best application I've ever used",
  },
  {
    name: 'Antonio Margheriti',
    avatar: 'A',
    title: 'Cameraman',
    description: 'What took me whole day, I can now achieve in 10 minutes!',
  },
  {
    name: 'Dominick Decocco',
    avatar: 'D',
    title: 'Camera Asistant',
    description: 'This app is nothing short of spectacular!',
  },
  {
    name: 'Hans Landa',
    avatar: 'H',
    title: 'Colonel',
    description: 'By far the best AI tool on the market',
  },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((t, i) => (
          <Card key={i} className="bg-zinc-800 border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{t.name}</p>
                  <p className="text-sm text-zinc-400">{t.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">{t.description}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
