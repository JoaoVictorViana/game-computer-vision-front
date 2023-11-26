import { ForwardRefExoticComponent, HTMLProps, Ref, forwardRef } from 'react'

export type InputProps = {
  label?: string
  helperText?: string
  ref?: Ref<HTMLInputElement>
} & HTMLProps<HTMLInputElement>

export const Input: ForwardRefExoticComponent<InputProps> = forwardRef(
  ({ helperText, label, ...inputProps }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputProps.id ?? inputProps.name}
            className="text-sm text-black-300"
          >
            {label}
          </label>
        )}
        <input {...inputProps} className="border p-2" ref={ref} />
        {helperText && <span>{helperText}</span>}
      </div>
    )
  }
)
