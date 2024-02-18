'use client'

import { useEffect, useRef, useState } from 'react'
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

import { cn } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import Heading from '@/components/heading'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import AvatarUser from '@/components/avatar-user'
import AvatarBot from '@/components/avatar-bot'

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

  useEffect(() => {
    const lastMessage = document.querySelector('#messages > *:last-child')
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth' })
      console.log(promptInput.current)
      promptInput?.current?.focus()
    }
  })

  const promptInput = useRef<HTMLInputElement>(null)

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
        className="flex flex-col flex-1 gap-y-2 py-4 pl-4 pr-2 md:pl-8 md:pr-6 pb-4 overflow-y-auto overflow-x-hidden h-full [scrollbar-gutter:stable]"
        id="messages"
      >
        {messages.map((msg, i) => {
          return (
            <div
              key={i}
              className={cn(
                'px-2 md:px-4 py-2 rounded-lg md:max-w-[90%] text-sm whitespace-pre-wrap',
                msg.role === 'user'
                  ? 'bg-blue-100 self-end md:pr-2'
                  : 'bg-violet-100 self-start md:pl-2'
              )}
            >
              {/* <Markdown>{msg.content as string}</Markdown> */}
              <div
                className={cn(
                  'flex-col md:flex-row gap-2',
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                {msg.role === 'user' ? <AvatarUser /> : <AvatarBot />}
                <div>
                  <Markdown
                    children={msg.content as string}
                    components={{
                      code(props) {
                        const { children, className, node, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            wrapLongLines={true}
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={vscDarkPlus}
                          />
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center">
            <Loader />
          </div>
        )}
        {messages.length < 1 && !isLoading && (
          <Empty label="No conversation started" />
        )}
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

export default ConversationPage
