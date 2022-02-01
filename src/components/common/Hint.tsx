import { turtleFilter, turtleTransform } from '../../constants/filter'
import classnames from 'classnames'
import { letterToFrameIdx, letterToColorCode, turdleId } from '../../constants/validGuesses'

type Props = {
  value?: string
}

const inColorBlindMode = true;

export const Hint = ({ value }: Props) => {
  const idClasses = classnames(
    'absolute text-black px-1 opacity-70 bottom-0 right-0 bg-white rounded-lg leading-none text-xs select-none',
    {
      'hidden': !inColorBlindMode || !value || value.length > 1,
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
