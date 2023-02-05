import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import classnames from 'classnames'

import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsDatePickerModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  isMemeMode?: boolean
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsDatePickerModalOpen,
  setIsSettingsModalOpen,
  isMemeMode,
}: Props) => {
  const logoClasses = classnames('logo flex shrink-0 grow-0 ml-1 w-7 h-7', {
    turd: isMemeMode,
  })

  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <div className="flex">
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          {ENABLE_ARCHIVED_GAMES && (
            <CalendarIcon
              className="ml-3 h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsDatePickerModalOpen(true)}
            />
          )}
        </div>
        <div className="flex grow justify-center">
          <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
          <div className={logoClasses}></div>
        </div>
        <div className="right-icons">
          <ChartBarIcon
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
