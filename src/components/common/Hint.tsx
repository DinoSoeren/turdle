import classnames from 'classnames'
import { useEffect, useState } from 'react';
import { letterToFrameIdx, letterToColorCode } from '../../constants/validGuesses'

type Props = {
  value?: string
  visible?: boolean
  hovered?: boolean
}

export const Hint = ({ value, visible = false, hovered = false }: Props) => {

  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (visible) {
        setInitialized(true);
      } else {
        const timer = setTimeout(() => {
          if (!isInitialized)
            setInitialized(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isInitialized, visible]);

  const idClasses = classnames(
    'absolute text-black px-1 opacity-1 bottom-[-2px] right-[-2px] animation-none bg-white rounded-lg leading-none text-xs select-none transition-opacity',
    {
      'hint-animation': isInitialized && !hovered && !visible && !!value && value?.length === 1,
      'opacity-0': (isInitialized && !hovered && !visible) || !value || value.length > 1,
    }
  )

  const colorClasses = classnames(
    {
      'text-gray-500': 'W' === letterToColorCode(value),
      'text-purple-500': 'P' === letterToColorCode(value),
      'text-red-500': 'R' === letterToColorCode(value),
      'text-blue-500': 'B' === letterToColorCode(value),
      'text-green-500': 'G' === letterToColorCode(value)
    }
  )

  return <div className={idClasses}>
    <span>{letterToFrameIdx(value)}</span>
    <span className={colorClasses}>{letterToColorCode(value)}</span>
  </div>
}
