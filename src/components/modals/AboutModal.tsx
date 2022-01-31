import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This is an{' '}
        <a
          href="https://github.com/SWalls/turdle"
          className="underline font-bold"
        >
          open source
        </a>
        {' '}clone of the game Wordle developed by{' '}
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
        </a>. Turtle animation by{' '}
        <a
          href="https://tenor.com/users/totallyturtley"
          className="underline font-bold"
        >
          totallyturtley
        </a>.
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        Developed for{' '}
        <a
          href="https://globalgamejam.org/2022/games/turdlexyz-4"
          className="underline font-bold"
        >
          Global Game Jam
        </a>
        {' '}2022.
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        Copyright &copy; 2022 Sushi Squared LLC
      </p>
    </BaseModal>
  )
}
