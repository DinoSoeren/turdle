import { useState } from 'react'

import {
  COOKIE_STATEMENT,
  ESSENTIAL_GAMEPLAY_DESCRIPTION,
  USAGE_STATISTICS_DESCRIPTION,
} from '../../constants/strings'
import { PurposeCookieType } from '../common/CookieToast'
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  acceptCookies: (cookies: PurposeCookieType) => void
  consent: PurposeCookieType
}

export const CookieModal = ({
  isOpen,
  handleClose,
  acceptCookies,
  consent,
}: Props) => {
  const [isStatisticsAllowed, setIsStatisticsAllowed] = useState<boolean>(
    () => consent.statistics ?? true
  )

  const onClose = () => {
    acceptCookies({ necessary: true, statistics: isStatisticsAllowed })
    handleClose()
  }

  return (
    <BaseModal title="Cookie settings" isOpen={isOpen} handleClose={onClose}>
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
          flag={isStatisticsAllowed}
          handleFlag={setIsStatisticsAllowed}
          description={USAGE_STATISTICS_DESCRIPTION}
        />
      </div>
      <div className="flex">
        <button
          className="flex-1 rounded border-b-4 border-blue-700 bg-blue-500 py-1 px-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={onClose}
        >
          Save and accept
        </button>
      </div>
    </BaseModal>
  )
}
