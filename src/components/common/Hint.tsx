import classnames from 'classnames'
import { useEffect, useState } from 'react'

import {
  letterToColorCode,
  letterToFrameIdx,
  turdleIdToLetter,
} from '../../constants/validGuesses'

type Props = {
  value?: string
  turdleId?: string
  visible?: boolean
  hovered?: boolean
  inline?: boolean
}

export const Hint = ({ value, turdleId, visible, hovered, inline }: Props) => {
  const [isInitialized, setInitialized] = useState(false)
  if (!value && turdleId) {
    value = turdleIdToLetter(turdleId)
  }

  useEffect(() => {
    if (visible) {
      setInitialized(false)
    }
    if (!isInitialized) {
      const timer = setTimeout(() => {
        if (!isInitialized) setInitialized(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInitialized, visible])

  const idClasses = classnames(
    'unshadowed text-black font-bold px-1 opacity-1 animation-none bg-white rounded-lg leading-none text-xs select-none transition-opacity delay-0',
    {
      'inline-block': inline,
      'block absolute bottom-[-2px] right-[-2px]': !inline,
      'hint-animation':
        isInitialized &&
        !inline &&
        !hovered &&
        !visible &&
        !!value &&
        value?.length === 1,
      'opacity-0':
        (isInitialized && !inline && !hovered && !visible) ||
        !value ||
        value.length > 1,
    }
  )

  const colorClasses = classnames({
    'text-gray-500': 'W' === letterToColorCode(value),
    'text-purple-500': 'P' === letterToColorCode(value),
    'text-red-500': 'R' === letterToColorCode(value),
    'text-blue-500': 'B' === letterToColorCode(value),
    'text-green-500': 'G' === letterToColorCode(value),
  })

  return (
    <span className={idClasses}>
      <span>{letterToFrameIdx(value)}</span>
      <span className={colorClasses}>{letterToColorCode(value)}</span>
    </span>
  )
}
