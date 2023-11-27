'use client'

import ArrowIcon from '@/assets/arrow.svg'
import { useKeyboardMapping } from './hook'

export const KeyboardCam = () => {
  const { handleChoiceKeyboard, keyboad, keyboadMappeds } = useKeyboardMapping()

  return (
    <section>
      <span>Selecione qual tecla você quer mapear</span>

      <div className="flex justify-center items-center w-full mt-10">
        <div className="grid grid-cols-[repeat(3,1fr)]">
          <span />
          <span
            aria-hidden
            onClick={() => handleChoiceKeyboard('ArrowUp')}
            className={`w-10 h-10 ${
              (keyboad === 'ArrowUp' || keyboadMappeds.ArrowUp) &&
              'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow" />
          </span>
          <span />
          <span
            aria-hidden
            onClick={() => handleChoiceKeyboard('ArrowLeft')}
            className={`w-10 h-10 ${
              (keyboad === 'ArrowLeft' || keyboadMappeds.ArrowLeft) &&
              'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow rotate-[-90deg]" />
          </span>
          <span
            aria-hidden
            onClick={() => handleChoiceKeyboard('ArrowDown')}
            className={`w-10 h-10 ${
              (keyboad === 'ArrowDown' || keyboadMappeds.ArrowDown) &&
              'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow rotate-180" />
          </span>
          <span
            aria-hidden
            onClick={() => handleChoiceKeyboard('ArrowRight')}
            className={`w-10 h-10 ${
              (keyboad === 'ArrowRight' || keyboadMappeds.ArrowRight) &&
              'bg-primary-900 fill-white rounded-lg'
            }`}
          >
            <ArrowIcon className="arrow rotate-90" />
          </span>
        </div>
      </div>
    </section>
  )
}
