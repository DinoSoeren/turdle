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
}

export const SettingsModal = ({
  isOpen,
  handleClose,
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
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-2 flex flex-col divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Auto-hide Bubbles"
          flag={!isExtraVisionMode}
          handleFlag={handleExtraVisionMode}
          inverted={true}
          description={EXTRA_VISION_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="💩"
          flag={isMemeMode}
          handleFlag={handleMemeMode}
          description={MEME_MODE_DESCRIPTION}
        />
      </div>
    </BaseModal>
  )
}
