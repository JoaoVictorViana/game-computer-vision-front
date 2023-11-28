import { User } from '@/types/api'
import { atom } from 'jotai'

export const userAtom = atom<User | undefined>(undefined)
