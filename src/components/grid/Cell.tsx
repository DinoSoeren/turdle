import { CharStatus } from '../../lib/statuses'
import { turtleFilter, turtleTransform } from '../../constants/filter'
import classnames from 'classnames'
import { letterToFrameIdx } from '../../constants/validGuesses'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const divClasses = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-500 dark:bg-yellow-700 text-white border-yellow-500 dark:border-yellow-700':
        status === 'present',
      'cell-animation': !!value,
    }
  )

  const imgClasses = classnames(
    {
      'opacity-0': !value,
    }
  )

  const imgStyles = {
    'filter': turtleFilter(value),
    'transform': turtleTransform(value),
  } as React.CSSProperties;

  return <div className={divClasses}>
    <img src={'res/img/turtle_' + letterToFrameIdx(value) + '.png'}
      className={imgClasses}
      style={imgStyles} alt={value} />
  </div>
}
