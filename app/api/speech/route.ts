import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
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
    console.log(body)
    if (!body) return new NextResponse('Prompt is required', { status: 400 })

    const fileName =
      'speech-' +
      new Date(Date.now())
        .toISOString()
        .slice(0, -1)
        .replace(/[-:.T]/g, '') +
      '.mp3'
    const speechFile = path.resolve(`./public/speech/${fileName}`)

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      ...body,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    await fs.promises.writeFile(speechFile, buffer)

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(fileName, { status: 200 })
  } catch (error) {
    console.log('[SPEECH_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
