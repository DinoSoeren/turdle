import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { isDisabled, letterToFrameIdx } from '../../constants/validGuesses'

type Props = {
  onChar: (value: string, replace: boolean) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  currentGuess: string[]
  extraVision?: boolean
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, currentGuess, extraVision = false }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue, disabled: boolean) => {
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
        onChar(value, false)
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
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          if (isDisabled(key, currentGuess)) {
            if (letterToFrameIdx(key) === letterToFrameIdx(currentGuess[currentGuess.length - 1])) {
              onChar(key, true)
            }
          } else {
            onChar(key, false)
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
        <Key value="Q" onClick={onClick} extraVision={extraVision} status={charStatuses['Q']} disabled={isDisabled('Q', currentGuess)} />
        <Key value="W" onClick={onClick} extraVision={extraVision} status={charStatuses['W']} disabled={isDisabled('W', currentGuess)} />
        <Key value="E" onClick={onClick} extraVision={extraVision} status={charStatuses['E']} disabled={isDisabled('E', currentGuess)} />
        <Key value="R" onClick={onClick} extraVision={extraVision} status={charStatuses['R']} disabled={isDisabled('R', currentGuess)} />
        <Key value="T" onClick={onClick} extraVision={extraVision} status={charStatuses['T']} disabled={isDisabled('T', currentGuess)} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="Y" onClick={onClick} extraVision={extraVision} status={charStatuses['Y']} disabled={isDisabled('Y', currentGuess)} />
        <Key value="U" onClick={onClick} extraVision={extraVision} status={charStatuses['U']} disabled={isDisabled('U', currentGuess)} />
        <Key value="I" onClick={onClick} extraVision={extraVision} status={charStatuses['I']} disabled={isDisabled('I', currentGuess)} />
        <Key value="O" onClick={onClick} extraVision={extraVision} status={charStatuses['O']} disabled={isDisabled('O', currentGuess)} />
        <Key value="P" onClick={onClick} extraVision={extraVision} status={charStatuses['P']} disabled={isDisabled('P', currentGuess)} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} extraVision={extraVision} status={charStatuses['A']} disabled={isDisabled('A', currentGuess)} />
        <Key value="S" onClick={onClick} extraVision={extraVision} status={charStatuses['S']} disabled={isDisabled('S', currentGuess)} />
        <Key value="D" onClick={onClick} extraVision={extraVision} status={charStatuses['D']} disabled={isDisabled('D', currentGuess)} />
        <Key value="F" onClick={onClick} extraVision={extraVision} status={charStatuses['F']} disabled={isDisabled('F', currentGuess)} />
        <Key value="G" onClick={onClick} extraVision={extraVision} status={charStatuses['G']} disabled={isDisabled('G', currentGuess)} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="H" onClick={onClick} extraVision={extraVision} status={charStatuses['H']} disabled={isDisabled('H', currentGuess)} />
        <Key value="J" onClick={onClick} extraVision={extraVision} status={charStatuses['J']} disabled={isDisabled('J', currentGuess)} />
        <Key value="K" onClick={onClick} extraVision={extraVision} status={charStatuses['K']} disabled={isDisabled('K', currentGuess)} />
        <Key value="L" onClick={onClick} extraVision={extraVision} status={charStatuses['L']} disabled={isDisabled('L', currentGuess)} />
        <Key value="Z" onClick={onClick} extraVision={extraVision} status={charStatuses['Z']} disabled={isDisabled('Z', currentGuess)} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="X" onClick={onClick} extraVision={extraVision} status={charStatuses['X']} disabled={isDisabled('X', currentGuess)} />
        <Key value="C" onClick={onClick} extraVision={extraVision} status={charStatuses['C']} disabled={isDisabled('C', currentGuess)} />
        <Key value="V" onClick={onClick} extraVision={extraVision} status={charStatuses['V']} disabled={isDisabled('V', currentGuess)} />
        <Key value="B" onClick={onClick} extraVision={extraVision} status={charStatuses['B']} disabled={isDisabled('B', currentGuess)} />
        <Key value="N" onClick={onClick} extraVision={extraVision} status={charStatuses['N']} disabled={isDisabled('N', currentGuess)} />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
    </div>
  )
}
