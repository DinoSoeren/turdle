import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  extraVision?: boolean
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, extraVision = false }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
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
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} extraVision={extraVision} status={charStatuses['Q']} />
        <Key value="W" onClick={onClick} extraVision={extraVision} status={charStatuses['W']} />
        <Key value="E" onClick={onClick} extraVision={extraVision} status={charStatuses['E']} />
        <Key value="R" onClick={onClick} extraVision={extraVision} status={charStatuses['R']} />
        <Key value="T" onClick={onClick} extraVision={extraVision} status={charStatuses['T']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="Y" onClick={onClick} extraVision={extraVision} status={charStatuses['Y']} />
        <Key value="U" onClick={onClick} extraVision={extraVision} status={charStatuses['U']} />
        <Key value="I" onClick={onClick} extraVision={extraVision} status={charStatuses['I']} />
        <Key value="O" onClick={onClick} extraVision={extraVision} status={charStatuses['O']} />
        <Key value="P" onClick={onClick} extraVision={extraVision} status={charStatuses['P']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} extraVision={extraVision} status={charStatuses['A']} />
        <Key value="S" onClick={onClick} extraVision={extraVision} status={charStatuses['S']} />
        <Key value="D" onClick={onClick} extraVision={extraVision} status={charStatuses['D']} />
        <Key value="F" onClick={onClick} extraVision={extraVision} status={charStatuses['F']} />
        <Key value="G" onClick={onClick} extraVision={extraVision} status={charStatuses['G']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="H" onClick={onClick} extraVision={extraVision} status={charStatuses['H']} />
        <Key value="J" onClick={onClick} extraVision={extraVision} status={charStatuses['J']} />
        <Key value="K" onClick={onClick} extraVision={extraVision} status={charStatuses['K']} />
        <Key value="L" onClick={onClick} extraVision={extraVision} status={charStatuses['L']} />
        <Key value="Z" onClick={onClick} extraVision={extraVision} status={charStatuses['Z']} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="X" onClick={onClick} extraVision={extraVision} status={charStatuses['X']} />
        <Key value="C" onClick={onClick} extraVision={extraVision} status={charStatuses['C']} />
        <Key value="V" onClick={onClick} extraVision={extraVision} status={charStatuses['V']} />
        <Key value="B" onClick={onClick} extraVision={extraVision} status={charStatuses['B']} />
        <Key value="N" onClick={onClick} extraVision={extraVision} status={charStatuses['N']} />
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
