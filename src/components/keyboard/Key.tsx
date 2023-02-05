import classnames from 'classnames'
import { ReactNode, useState } from 'react'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { CharStatus } from '../../lib/statuses'
import { solution } from '../../lib/words'

import { turtleFilter, turtleTransform } from '../../constants/filter'
import { letterToFrameIdx } from '../../constants/validGuesses'
import { Hint } from '../common/Hint'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string, disabled: boolean) => void
  extraVision?: boolean
  disabled?: boolean
  isRevealing?: boolean
  isMemeMode?: boolean
  isHighContrast?: boolean
}

export const Key = ({
  children,
  status,
  width = 60,
  value,
  onClick,
  extraVision,
  disabled,
  isRevealing,
  isMemeMode,
  isHighContrast
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * solution.length

  const classes = classnames(
    'xxshort:h-8 xxshort:w-8 xxshort:text-xxs xshort:w-10 xshort:h-10 flex relative short:h-12 h-14 items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
        !status,
      'bg-slate-400 dark:bg-slate-800 text-white': status === 'absent',
      'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white':
        status === 'correct' && isHighContrast,
      'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white':
        status === 'present' && isHighContrast,
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct' && !isHighContrast,
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'present' && !isHighContrast,
      'opacity-20 cursor-default hover:bg-slate-300 active:bg-slate-400': disabled,
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value, disabled ?? false)
    event.currentTarget.blur()
  }

  const styles = {
    'transitionDelay': isRevealing ? `${keyDelayMs}ms` : 'unset',
    'width': `${width}px`,
    'height': '40px',
  } as React.CSSProperties

  const imgClasses = classnames(
    {
      'w-[40px] relative top-0.5': !children,
      'opacity-0': !!children,
      'w-0': !!children,
    }
  )

  const imgStyles = {
    'filter': turtleFilter({value, isMemeMode, isHighContrast}),
    'transform': turtleTransform(value),
  } as React.CSSProperties

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const ariaLabel = `${value}${status ? ' ' + status : ''}`
  const filePrefix = isMemeMode ? 'turd' : 'turtle'

  return (
    <button
      style={styles}
      className={classes}
      aria-label={ariaLabel}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <img src={'res/img/' + filePrefix + '_' + letterToFrameIdx(value) + '.png'}
        className={imgClasses} style={imgStyles} alt={ariaLabel} />
      <Hint value={value} visible={extraVision} hovered={isHovered && !disabled} />
    </button>
  )
}
