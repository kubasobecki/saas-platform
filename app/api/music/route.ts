import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import Replicate from 'replicate'
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const freeTrial = await checkApiLimit()
    if (!freeTrial)
      return new NextResponse('Free trial has expired.', { status: 403 })

    const body = await req.json()
    const { prompt, style } = body
    if (!prompt)
      return new NextResponse('Messages are required', { status: 400 })

    const response = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          alpha: 0.5,
          prompt_a: prompt,
          prompt_b: style,
          denoising: 0.75,
          seed_image_id: 'vibes',
          num_inference_steps: 50,
        },
      }
    )

    await increaseApiLimit()

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.log('[MUSIC_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
