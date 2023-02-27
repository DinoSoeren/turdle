import { useEffect, useState } from 'react'

import {
  COOKIE_STATEMENT,
  ESSENTIAL_GAMEPLAY_DESCRIPTION,
  USAGE_STATISTICS_DESCRIPTION,
} from '../../constants/strings'
import { useGaContext } from '../../context/GaContext'
import { PurposeCookieType } from '../../lib/browser'
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  acceptCookies: (cookies: PurposeCookieType) => void
}

export const CookieModal = ({ isOpen, handleClose, acceptCookies }: Props) => {
  const { isGaAllowed } = useGaContext()
  const [isGaToggled, setIsGaToggled] = useState(isGaAllowed)
  const close = ({ accept }: { accept?: boolean } = {}) => {
    if (accept || isGaToggled) {
      acceptCookies({ necessary: true, statistics: isGaToggled })
    } else {
      // Reset toggle state to match cookie value if changes were not saved
      setTimeout(() => setIsGaToggled(isGaAllowed), 500)
    }
    handleClose()
  }

  useEffect(() => {
    setIsGaToggled(isGaAllowed)
  }, [isGaAllowed])

  return (
    <BaseModal title="Cookie settings" isOpen={isOpen} handleClose={close}>
      <p className="mt-2 mb-2 flex text-sm italic text-gray-500 dark:text-gray-300">
        {COOKIE_STATEMENT}
      </p>
      <div className="mb-2 flex flex-col divide-y">
        <SettingsToggle
          settingName="Essential gameplay"
          flag={true}
          description={ESSENTIAL_GAMEPLAY_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Collect usage statistics"
          flag={isGaToggled}
          handleFlag={setIsGaToggled}
          description={USAGE_STATISTICS_DESCRIPTION}
        />
      </div>
      <div className="flex">
        <button
          className="flex-1 rounded border-b-4 border-blue-700 bg-blue-500 py-1 px-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={() => close({ accept: true })}
        >
          Save and accept
        </button>
      </div>
    </BaseModal>
  )
}
