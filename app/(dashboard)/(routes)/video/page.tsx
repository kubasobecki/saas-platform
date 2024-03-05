'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { Video } from 'lucide-react'
import Heading from '@/components/heading'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'

import AvatarUser from '@/components/avatar-user'
import AvatarBot from '@/components/avatar-bot'

import { useProModal } from '@/hooks/use-pro-modal'

type Query = {
  role: 'user' | 'agent'
  prompt?: string
  generatedVideo?: string
}

const VideoPage = () => {
  const proModal = useProModal()

  const router = useRouter()
  const [messages, setMessages] = useState<Query[]>([])
  const promptInput = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    const lastMessage = document.querySelector('#messages > *:last-child')
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth' })
      promptInput?.current?.focus()
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMessages(prev => [...prev, { role: 'user', prompt: values.prompt }])
      const response = await axios.post('/api/video', values)
      const music = response.data[0]
      setMessages(prev => [...prev, { role: 'agent', generatedVideo: music }])
      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen()
      else toast.error('Something went wrong')
    } finally {
      router.refresh()
    }
  }

  return (
    <>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video"
        icon={Video}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div
        className="flex flex-col flex-1 gap-y-2 py-4 pl-4 pr-2 md:pl-8 md:pr-6 pb-4 overflow-y-auto overflow-x-hidden h-full [scrollbar-gutter:stable]"
        id="messages"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'w-full md:w-auto px-2 md:px-4 py-2 rounded-lg md:max-w-[90%] text-sm whitespace-pre-wrap',
              msg.role === 'user'
                ? 'bg-blue-100 self-end md:pr-2'
                : 'bg-violet-100 self-start md:pl-2'
            )}
          >
            {msg.prompt && (
              <div className="flex flex-col md:flex-row-reverse gap-2">
                <AvatarUser />
                <p>{msg.prompt}</p>
              </div>
            )}
            {msg.generatedVideo && (
              <div className="flex flex-col md:flex-row gap-2">
                <AvatarBot />
                <div className="flex flex-wrap gap-2">
                  <video controls autoPlay src={msg.generatedVideo}>
                    Your browser does not support the audio element.
                  </video>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="p-8 rounded-lg w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {messages.length < 1 && !isLoading && (
        <Empty label="No video generated" />
      )}
      <Form {...form}>
        <div className="px-4 lg:px-8 bg-zinc-100">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full py-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Type your prompt here..."
                      autoFocus
                      {...field}
                      ref={promptInput}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </div>
      </Form>
    </>
  )
}

export default VideoPage
