import { CharStatus } from '../../lib/statuses'
import { letterToTurtleIdx, turtleFilter, turtleTransform } from '../../constants/filter'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const divClasses = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-white border-slate-200': !status,
      'border-black': value && !status,
      'bg-slate-400 text-white border-slate-400': status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-500 text-white border-yellow-500': status === 'present',
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
    <img src={'res/img/turtle_' + letterToTurtleIdx(value) + '.png'} className={imgClasses}
      style={imgStyles} alt={value} />
  </div>
}
