import validators from '@/enums/validators'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, validators.REQUIRED),
  email: z.string().min(1, validators.REQUIRED).email(validators.EMAIL),
  password: z.string().min(1, validators.REQUIRED),
})

export default schema
