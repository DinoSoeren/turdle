import { BiCookie } from 'react-icons/bi'

import {
  EXTRA_VISION_MODE_DESCRIPTION,
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
  MEME_MODE_DESCRIPTION,
} from '../../constants/strings'
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isFirstTimePlaying: boolean
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  isExtraVisionMode: boolean
  handleExtraVisionMode: Function
  isMemeMode: boolean
  handleMemeMode: Function
  setIsCookieModalOpen: (value: boolean) => void
  isAnalyticsAllowed: boolean
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isFirstTimePlaying,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  isExtraVisionMode,
  handleExtraVisionMode,
  isMemeMode,
  handleMemeMode,
  setIsCookieModalOpen,
  isAnalyticsAllowed,
}: Props) => {
  return (
    <BaseModal
      title="Settings"
      isOpen={isOpen}
      handleClose={handleClose}
      extraButton={BiCookie}
      extraButtonDesc="Cookie settings"
      handleExtraButtonClick={() => setIsCookieModalOpen(true)}
    >
      <div className="mt-2 flex flex-col divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
          isAnalyticsAllowed={isAnalyticsAllowed}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
          isAnalyticsAllowed={isAnalyticsAllowed}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
          isAnalyticsAllowed={isAnalyticsAllowed}
        />
        <SettingsToggle
          settingName="Auto-hide Bubbles"
          flag={!isExtraVisionMode}
          handleFlag={handleExtraVisionMode}
          inverted={true}
          description={EXTRA_VISION_MODE_DESCRIPTION}
          isAnalyticsAllowed={isAnalyticsAllowed}
        />
        {!isFirstTimePlaying && (
          <SettingsToggle
            settingName="💩"
            flag={isMemeMode}
            handleFlag={handleMemeMode}
            description={MEME_MODE_DESCRIPTION}
            isAnalyticsAllowed={isAnalyticsAllowed}
          />
        )}
      </div>
    </BaseModal>
  )
}
