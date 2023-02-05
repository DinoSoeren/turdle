import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  solution: string
  guesses: string[]
  currentGuess: string
  extraVision?: boolean
  isRevealing?: boolean
  isMemeMode?: boolean
  isHighContrast?: boolean
  currentRowClassName: string
}

export const Grid = ({
  solution,
  guesses,
  currentGuess,
  extraVision,
  isRevealing,
  isMemeMode,
  isHighContrast,
  currentRowClassName,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          extraVision={extraVision}
          isRevealing={isRevealing && guesses.length - 1 === i}
          isMemeMode={isMemeMode}
          isHighContrast={isHighContrast}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow
          guess={currentGuess}
          extraVision={extraVision}
          isMemeMode={isMemeMode}
          isHighContrast={isHighContrast}
          className={currentRowClassName}
        />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
