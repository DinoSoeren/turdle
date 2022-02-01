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
        Guess the color and frames of the TURDLE animation sequence in 6 tries.
        {' '}<strong>The order of the frames is always the same</strong> - only
        the starting frame can change. After each guess, the color of the tiles
        will change to show how close your guess was to the sequence.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="O" status="correct" />
        <Cell value="T" />
        <Cell value="H" />
        <Cell value="S" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Blue Turtle</strong> is in the sequence and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="S" />
        <Cell value="I" />
        <Cell value="R" status="present" />
        <Cell value="Z" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>White Turtle</strong> is in the sequence but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="X" />
        <Cell value="W" />
        <Cell value="D" />
        <Cell value="F" status="absent" />
        <Cell value="Z" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Purple Turtle</strong> is not in the sequence in any spot.
      </p>
    </BaseModal>
  )
}
