'use client'

import ArrowIcon from '@/assets/arrow.svg'
import { useGameCam } from './hook'

export const GameCam = () => {
  const { keyboad } = useGameCam()

  return (
    <section>
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-[repeat(3,1fr)]">
          <span />
          <span
            aria-hidden
            className={`w-10 h-10 ${
              keyboad === 'ArrowUp' && 'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow" />
          </span>
          <span />
          <span
            aria-hidden
            className={`w-10 h-10 ${
              keyboad === 'ArrowLeft' && 'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow rotate-[-90deg]" />
          </span>
          <span
            aria-hidden
            className={`w-10 h-10 ${
              keyboad === 'ArrowDown' && 'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow rotate-180" />
          </span>
          <span
            aria-hidden
            className={`w-10 h-10 ${
              keyboad === 'ArrowRight' && 'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow rotate-90" />
          </span>
        </div>
      </div>
    </section>
  )
}
