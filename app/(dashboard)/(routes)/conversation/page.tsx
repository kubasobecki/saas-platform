'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ChatCompletionUserMessageParam } from 'openai/resources/index.mjs'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { MessageSquare } from 'lucide-react'
import Heading from '@/components/heading'
import { cn } from '@/lib/utils'

const ConversationPage = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: values.prompt,
      }
      const newMessages = [...messages, userMessage]

      setMessages(current => [...current, userMessage])

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      })

      setMessages(current => [...current, response.data])

      form.reset()
    } catch (error: any) {
      // TODO: Open Pro Modal
      console.log(error)
    } finally {
      router.refresh()
    }
  }

  return (
    <>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div
        className="flex flex-col flex-1 gap-y-2 py-4 pl-8 pr-6 pb-4 overflow-y-auto h-full [scrollbar-gutter:stable]"
        id="messages"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'px-4 py-2 rounded-lg',
              msg.role === 'user'
                ? 'bg-blue-100 self-end'
                : 'bg-violet-100 self-start'
            )}
          >
            {msg.content as string}
          </div>
        ))}
      </div>
      <Form {...form}>
        <div className="px-4 lg:px-8 bg-zinc-100">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full py-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="ex. How do I calculate the radius of a circle?"
                      {...field}
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

export default ConversationPage
