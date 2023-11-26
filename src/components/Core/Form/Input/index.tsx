import { Input as InputBase, InputProps } from '@/components/Core/Input'
import { FC, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

export const Input: FC<InputProps> = ({ name = '', ...inputProps }) => {
  const { register, formState } = useFormContext()

  const error = useMemo(() => formState.errors?.[name], [formState, name])

  return (
    <InputBase
      {...inputProps}
      {...register(name)}
      helperText={error?.message?.toString() ?? inputProps?.helperText}
    />
  )
}
