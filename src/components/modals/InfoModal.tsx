import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  extraVision?: boolean
}

export const InfoModal = ({ isOpen, handleClose, extraVision }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the <em>frames</em> (<strong>1-5</strong>) and <em>colors</em>
        {' '}(<span className="text-gray-500">W</span>,<span className="text-blue-500">B</span>,<span className="text-purple-500">P</span>,<span className="text-red-500">R</span>,
        <span className="text-green-500">G</span>) of the TURDLE animation sequence in 6 tries.
        {' '}<strong>The order of the frames is always the same</strong> - only
        the starting frame can change. After each guess, the color of the tiles
        will change to show how close your guess was to the sequence.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="O" extraVision={true} status="correct" />
        <Cell value="T" extraVision={true} />
        <Cell value="H" extraVision={true} />
        <Cell value="S" extraVision={true} />
        <Cell value="K" extraVision={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Blue Turtle</strong>
        {' '}(<strong>4<span className="text-blue-500">B</span></strong>)
        is in the sequence and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="I" extraVision={true} />
        <Cell value="R" extraVision={true} />
        <Cell value="Z" extraVision={true} status="present" />
        <Cell value="Y" extraVision={true} />
        <Cell value="S" extraVision={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Red Turtle</strong>
        {' '}(<strong>5<span className="text-red-500">R</span></strong>)
        is in the sequence but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Z" extraVision={true} />
        <Cell value="X" extraVision={true} />
        <Cell value="W" extraVision={true} />
        <Cell value="D" extraVision={true} status="absent" />
        <Cell value="F" extraVision={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Purple Turtle</strong>
        {' '}(<strong>3<span className="text-purple-500">P</span></strong>)
        is not in the sequence in any spot.
      </p>

      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/DinoSoeren/turdle"
          className="font-bold underline"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
