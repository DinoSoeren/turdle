import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        This is a clone of the game Wordle developed by{' '}
        <a
          href="https://sushi2.games"
          className="underline font-bold"
        >
          SUSHI² Games
        </a>
        . Play the original{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          here
        </a>
      </p>
    </BaseModal>
  )
}
