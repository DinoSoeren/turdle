import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  extraVision?: boolean
  isMemeMode?: boolean
}

export const InfoModal = ({ isOpen, handleClose, extraVision, isMemeMode }: Props) => {
  const object = isMemeMode ? 'Turd' : 'Turtle'

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
        <Cell value="O" extraVision={true} isMemeMode={isMemeMode} status="correct" />
        <Cell value="T" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="H" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="S" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="K" extraVision={true} isMemeMode={isMemeMode} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Blue {object}</strong>
        {' '}(<strong>4<span className="text-blue-500">B</span></strong>)
        is in the sequence and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="I" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="R" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="Z" extraVision={true} isMemeMode={isMemeMode} status="present" />
        <Cell value="Y" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="S" extraVision={true} isMemeMode={isMemeMode} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Red {object}</strong>
        {' '}(<strong>5<span className="text-red-500">R</span></strong>)
        is in the sequence but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Z" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="X" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="W" extraVision={true} isMemeMode={isMemeMode} />
        <Cell value="D" extraVision={true} isMemeMode={isMemeMode} status="absent" />
        <Cell value="F" extraVision={true} isMemeMode={isMemeMode} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The <strong>Purple {object}</strong>
        {' '}(<strong>3<span className="text-purple-500">P</span></strong>)
        is not in the sequence in any spot.
      </p>

      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
        Don't get it? No worries, try playing anyway! The buttons will guide you.
      </p>
    </BaseModal>
  )
}
