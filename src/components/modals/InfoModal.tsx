import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the TURDLE animation sequence in 6 tries. After each guess, the color of the tiles
        will change to show how close your guess was to the sequence.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Q" status="correct" />
        <Cell value="W" />
        <Cell value="D" />
        <Cell value="F" />
        <Cell value="Z" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>1st Turtle</strong> is in the sequence and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="O" />
        <Cell value="T" />
        <Cell value="H" status="present" />
        <Cell value="S" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>3rd Turtle</strong> is in the sequence but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="N" />
        <Cell value="X" />
        <Cell value="J" />
        <Cell value="I" status="absent" />
        <Cell value="F" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>4th Turtle</strong> is not in the sequence in any spot.
      </p>
    </BaseModal>
  )
}
