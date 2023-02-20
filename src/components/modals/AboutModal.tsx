import { gaEvent } from '../../lib/browser'
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
          href="https://github.com/dinosoeren/turdle"
          className="font-bold underline"
          onClick={() => gaEvent({ category: 'UI Event', action: 'Github' })}
        >
          open source
        </a>{' '}
        clone of the game Wordle developed by{' '}
        <a href="https://sushi2.games" className="font-bold underline">
          SUSHI² Games
        </a>
        . It is a fork of{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="font-bold underline"
        >
          Reactle
        </a>
        .
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        Developed for{' '}
        <a
          href="https://globalgamejam.org/2022/games/turdlexyz-4"
          className="font-bold underline"
          onClick={() =>
            gaEvent({ category: 'UI Event', action: 'Global Game Jam' })
          }
        >
          Global Game Jam
        </a>{' '}
        2022.
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        Copyright &copy; 2023 Sushi Squared LLC
      </p>
      <h4 className="mt-4 text-gray-900 dark:text-gray-100">Artwork Credits</h4>
      <hr />
      <ul className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        <li>
          Turtle animation by{' '}
          <a
            href="https://tenor.com/users/totallyturtley"
            className="font-bold underline"
          >
            totallyturtley
          </a>
          .
        </li>
        <li>
          Turd emojis by{' '}
          <a
            href="https://emoji.gg/user/824305925091229726"
            className="font-bold underline"
          >
            Blair ?!
          </a>
          ,{' '}
          <a
            href="https://emoji.gg/user/531128263062585344"
            className="font-bold underline"
          >
            yusuf !!
          </a>
          ,{' '}
          <a
            href="https://emoji.gg/user/814464599273111582"
            className="font-bold underline"
          >
            Germ
          </a>
          ,{' '}
          <a
            href="https://emoji.gg/user/675328342882517034"
            className="font-bold underline"
          >
            di_Vibil
          </a>
          , and{' '}
          <a
            href="https://emoji.gg/user/707286221516439665"
            className="font-bold underline"
          >
            Box
          </a>
          .
        </li>
      </ul>
    </BaseModal>
  )
}
