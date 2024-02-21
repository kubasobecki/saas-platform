'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { formSchema, amountOptions, resolutionOptions } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select'

import { cn } from '@/lib/utils'
import { Download, ImageIcon } from 'lucide-react'
import Heading from '@/components/heading'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import AvatarUser from '@/components/avatar-user'
import AvatarBot from '@/components/avatar-bot'

type Query = {
  role: 'user' | 'agent'
  prompt?: string
  generatedImages?: string[]
}

const ImagePage = () => {
  const router = useRouter()
  const promptInput = useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<Query[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
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
      const response = await axios.post('/api/image', values)
      const urls = response.data.map((image: { url: string }) => image.url)
      setMessages(prev => [...prev, { role: 'agent', generatedImages: urls }])
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
        title="Image Generation"
        description="Turn your prompt into image"
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
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
            {msg.generatedImages && (
              <div className="flex flex-col md:flex-row gap-2">
                <AvatarBot />
                <div className="flex flex-wrap gap-2">
                  {msg.generatedImages.map((url, i) => (
                    <Card key={i} className="rounded-lg overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          alt="AI Image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={url}
                        />
                      </div>
                      <CardFooter className="p-2">
                        <Button
                          onClick={() => window.open(url)}
                          variant="secondary"
                          className="w-full"
                        >
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
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
        <Empty label="No images generated" />
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
                <FormItem className="col-span-12 lg:col-span-6">
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
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map(({ value, label }, i) => (
                        <SelectItem key={i} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />{' '}
            <FormField
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map(({ value, label }, i) => (
                        <SelectItem key={i} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default ImagePage
