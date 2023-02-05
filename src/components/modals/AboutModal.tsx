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
          href="https://github.com/DinoSoeren/turdle"
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
        Copyright &copy; 2023 Sushi Squared LLC
      </p>
      <h4 className="mt-4">Artwork Credits</h4>
      <hr />
      <ul className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        <li>Turtle animation by{' '}
          <a
            href="https://tenor.com/users/totallyturtley"
            className="underline font-bold"
          >
            totallyturtley
          </a>.
        </li>
        <li>Turd emojis by{' '}
          <a
            href="https://emoji.gg/user/824305925091229726"
            className="underline font-bold"
          >
            Blair ?!
          </a>,{' '}
          <a
            href="https://emoji.gg/user/531128263062585344"
            className="underline font-bold"
          >
            yusuf !!
          </a>,{' '}
          <a
            href="https://emoji.gg/user/814464599273111582"
            className="underline font-bold"
          >
            Germ
          </a>,{' '}
          <a
            href="https://emoji.gg/user/675328342882517034"
            className="underline font-bold"
          >
            di_Vibil
          </a>, and{' '}
          <a
            href="https://emoji.gg/user/707286221516439665"
            className="underline font-bold"
          >
            Box
          </a>.
        </li>
      </ul>
    </BaseModal>
  )
}
