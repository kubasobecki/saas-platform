import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import OpenAI from 'openai'
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

const openai = new OpenAI()

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const freeTrial = await checkApiLimit()
    if (!freeTrial)
      return new NextResponse('Free trial has expired.', { status: 403 })

    const body = await req.json()
    const { prompt, amount = 1, resolution = '512x512' } = body
    if (!prompt) return new NextResponse('Prompt are required', { status: 400 })
    if (!amount) return new NextResponse('Amount are required', { status: 400 })
    if (!resolution)
      return new NextResponse('Resolution are required', { status: 400 })

    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })

    await increaseApiLimit()

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.log('[IMAGE_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
