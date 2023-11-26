import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, PropsWithChildren } from 'react'
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { ZodType } from 'zod'

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>
  defaultValues?: DefaultValues<T>
  schema?: ZodType<T>
} & HTMLAttributes<HTMLFormElement>

export function Form<TFields extends FieldValues = FieldValues>({
  children,
  defaultValues,
  schema,
  ...formProps
}: PropsWithChildren<FormProps<TFields>>) {
  const methods = useForm({
    defaultValues,
    resolver: schema && zodResolver(schema),
  })

  return (
    <FormProvider {...methods}>
      <form {...formProps} onSubmit={methods.handleSubmit(formProps.onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}
