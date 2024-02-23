import * as z from 'zod'

export const formSchema = z.object({
  input: z.string().min(1, {
    message: 'Prompt is required',
  }),
  voice: z.string().min(1),
  format: z.string().min(1),
  speed: z.coerce.number().min(0.25).max(4),
})

export const voiceOptions = [
  { value: 'alloy', label: 'Alloy' },
  { value: 'echo', label: 'Echo' },
  { value: 'fable', label: 'Fable' },
  { value: 'onyx', label: 'Onyx' },
  { value: 'nova', label: 'Nova' },
  { value: 'shimmer', label: 'Shimmer' },
]

export const formatOptions = [
  { value: 'mp3', label: 'mp3' },
  { value: 'opus', label: 'opus' },
  { value: 'aac', label: 'aac' },
  { value: 'flac', label: 'flac' },
]

export const speedOptions = {
  min: 0.25,
  max: 4,
}
