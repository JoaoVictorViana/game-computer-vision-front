'use client'

import { userAtom } from '@/states/atoms/user'
import { User } from '@/types/api'
import { useAtom } from 'jotai'
import { FC, PropsWithChildren, useEffect } from 'react'

export const UserProvider: FC<PropsWithChildren<{ user: User }>> = ({
  children,
  user,
}) => {
  const [, setUser] = useAtom(userAtom)

  useEffect(() => {
    setUser(user)
  }, [user])

  return children
}
