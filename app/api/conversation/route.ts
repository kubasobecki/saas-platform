import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import OpenAI from 'openai'
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'
import { checkSubscripton } from '@/lib/subscription'

const openai = new OpenAI()

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscripton()

    if (!freeTrial && !isPro)
      return new NextResponse('Free trial has expired.', { status: 403 })

    const body = await req.json()
    const { messages } = body
    if (!messages)
      return new NextResponse('Messages are required', { status: 400 })

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
    })

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(response.choices[0].message, { status: 200 })
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
