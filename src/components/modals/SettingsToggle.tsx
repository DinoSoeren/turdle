import classnames from 'classnames'

import { gaEvent } from '../../lib/browser'

type Props = {
  settingName: string
  flag: boolean
  handleFlag: Function
  inverted?: boolean
  description?: string
}

export const SettingsToggle = ({
  settingName,
  flag,
  handleFlag,
  inverted,
  description,
}: Props) => {
  const toggleHolder = classnames(
    'w-14 h-8 flex shrink-0 items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer',
    {
      'bg-green-400': flag,
    }
  )
  const toggleButton = classnames(
    'bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out cursor-pointer',
    {
      'translate-x-6': flag,
    }
  )

  return (
    <>
      <div className="flex justify-between gap-4 py-3">
        <div className="mt-2 text-left text-gray-500 dark:text-gray-300">
          <p className="leading-none">{settingName}</p>
          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        <div
          className={toggleHolder}
          onClick={() => {
            const newFlag = inverted ? flag : !flag
            handleFlag(newFlag)
            gaEvent({
              category: 'UI Event',
              action: `Toggle ${
                settingName === '💩' ? '💩 Meme Mode' : settingName
              }`,
              value: newFlag ? 1 : 0,
              label: newFlag ? 'enable' : 'disable',
            })
          }}
        >
          <div className={toggleButton} />
        </div>
      </div>
    </>
  )
}
