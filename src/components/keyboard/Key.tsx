import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'
import { turtleFilter, turtleTransform } from '../../constants/filter'
import { letterToFrameIdx } from '../../constants/validGuesses'
import { Hint } from '../common/Hint'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
  extraVision?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  extraVision = false,
}: Props) => {
  const classes = classnames(
    'flex relative items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none',
    {
      'bg-slate-200 hover:bg-slate-300 active:bg-slate-400': !status,
      'bg-slate-400 text-white': status === 'absent',
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct',
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  const imgClasses = classnames(
    {
      'opacity-0': !!children,
      'w-0': !!children,
    }
  )

  const imgStyles = {
    'filter': turtleFilter(value),
    'transform': turtleTransform(value),
  } as React.CSSProperties;

  return (
    <button
      style={{ width: `${width}px`, height: '58px' }}
      className={classes}
      onClick={handleClick}
    >
      {children}
      <img src={'res/img/turtle_' + letterToFrameIdx(value) + '.png'}
        className={imgClasses}
        style={imgStyles} alt={value} />
      <Hint value={value} visible={extraVision} />
    </button>
  )
}
