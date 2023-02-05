import { useEffect } from 'react'

import { DELETE_TEXT, ENTER_TEXT } from '../../constants/strings'
import { isDisabled, letterToFrameIdx } from '../../constants/validGuesses'
import { localeAwareUpperCase } from '../../lib/words'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'

type Props = {
  onChar: (value: string, replace: boolean) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  currentGuess: string
  extraVision?: boolean
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  currentGuess,
  extraVision,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(solution, guesses)

  const onClick = (value: string, disabled: boolean) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      if (disabled) {
        if (letterToFrameIdx(value) === letterToFrameIdx(currentGuess[currentGuess.length - 1])) {
          onChar(value, true)
        }
      } else {
        if (!currentGuess.includes(value)) {
          onChar(value, false)
        }
      }
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = localeAwareUpperCase(e.key)
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          if (isDisabled(key, currentGuess)) {
            if (letterToFrameIdx(key) === letterToFrameIdx(currentGuess[currentGuess.length - 1])) {
              onChar(key, true)
            }
          } else {
            if (!currentGuess.includes(key)) {
              onChar(key, false)
            }
          }
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar, currentGuess])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {['Q', 'W', 'E', 'R', 'T'].map((key) => (
          <Key
            value={key}
            onClick={onClick}
            extraVision={extraVision}
            status={charStatuses[key]}
            disabled={isDisabled(key, currentGuess)}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {['Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            onClick={onClick}
            extraVision={extraVision}
            status={charStatuses[key]}
            disabled={isDisabled(key, currentGuess)}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {['A', 'S', 'D', 'F', 'G'].map((key) => (
          <Key
            value={key}
            onClick={onClick}
            extraVision={extraVision}
            status={charStatuses[key]}
            disabled={isDisabled(key, currentGuess)}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {['H', 'J', 'K', 'L', 'Z'].map((key) => (
          <Key
            value={key}
            onClick={onClick}
            extraVision={extraVision}
            status={charStatuses[key]}
            disabled={isDisabled(key, currentGuess)}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {['X', 'C', 'V', 'B', 'N'].map((key) => (
          <Key
            value={key}
            onClick={onClick}
            extraVision={extraVision}
            status={charStatuses[key]}
            disabled={isDisabled(key, currentGuess)}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
