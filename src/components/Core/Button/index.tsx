import { FC, HTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = HTMLAttributes<HTMLButtonElement>

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className="bg-primary-400 text-white px-8 py-2 rounded-lg hover:bg-primary-600 active:bg-primary-800"
    >
      {children}
    </button>
  )
}
