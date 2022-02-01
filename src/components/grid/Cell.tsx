import { CharStatus } from '../../lib/statuses'
import { Hint } from '../common/Hint'
import { turtleFilter, turtleTransform } from '../../constants/filter'
import classnames from 'classnames'
import { letterToFrameIdx, turdleId } from '../../constants/validGuesses'
import { useState } from 'react'

type Props = {
  value?: string
  status?: CharStatus
  extraVision?: boolean
}

export const Cell = ({ value, status, extraVision = false }: Props) => {
  const divClasses = classnames(
    'w-14 h-14 relative border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-green-500 text-white border-green-600 dark:border-green-300': status === 'correct',
      'bg-yellow-500 dark:bg-yellow-700 text-white border-yellow-600 dark:border-yellow-550':
        status === 'present',
      'cell-animation': !!value,
    }
  )

  const imgClasses = classnames(
    'select-none',
    {
      'hidden': !value,
    }
  )

  const imgStyles = {
    'filter': turtleFilter(value),
    'transform': turtleTransform(value),
  } as React.CSSProperties;

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return <div className={divClasses}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <img src={'res/img/turtle_' + letterToFrameIdx(value) + '.png'}
      className={imgClasses}
      style={imgStyles} alt={turdleId(value)} />
    <Hint value={value} visible={extraVision} hovered={isHovered} />
  </div>
}
