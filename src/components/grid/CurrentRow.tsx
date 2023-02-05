import { solution, unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
  extraVision?: boolean
}

export const CurrentRow = ({ guess, className, extraVision }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `mb-1 flex justify-center ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} extraVision={extraVision} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
