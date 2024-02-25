import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

const openai = new OpenAI()

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown snippets. Use code comments for explanations.',
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const freeTrial = await checkApiLimit()
    if (!freeTrial)
      return new NextResponse('Free trial has expired.', { status: 403 })

    const body = await req.json()
    const { messages } = body
    if (!messages)
      return new NextResponse('Messages are required', { status: 400 })

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    })

    await increaseApiLimit()

    return NextResponse.json(response.choices[0].message, { status: 200 })
  } catch (error) {
    console.log('[CODE_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
