'use client'

import { clientQuery } from '@/config/query'
import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider } from 'react-query'

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={clientQuery}>{children}</QueryClientProvider>
  )
}
