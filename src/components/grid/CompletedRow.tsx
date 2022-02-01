import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  extraVision?: boolean
}

export const CompletedRow = ({ guess, extraVision = false }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell key={i} value={letter} extraVision={extraVision} status={statuses[i]} />
      ))}
    </div>
  )
}
