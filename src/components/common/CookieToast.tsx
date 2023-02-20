import classNames from 'classnames'
import { ToastContentProps, toast } from 'react-toastify'

import { COOKIE_STATEMENT } from '../../constants/strings'
import { GameStats } from '../../lib/localStorage'

export type OpenToast = {
  canOpen: boolean
  acceptCookies: (cookies: PurposeCookieType) => void
  setIsCookieModalOpen: (open: boolean) => void
  consent: PurposeCookieType
  stats: GameStats
}

export type PurposeCookieType = {
  necessary?: boolean
  preferences?: boolean
  statistics?: boolean
  marketing?: boolean
}

export function openCookieToast({
  canOpen,
  acceptCookies,
  setIsCookieModalOpen,
  consent,
  stats,
}: OpenToast): boolean {
  if (!canOpen) return false
  if (
    !consent.necessary ||
    (consent.statistics === undefined && stats.totalGames % 5 < 2)
  ) {
    toast(
      ({ closeToast, toastProps }: ToastContentProps) => (
        <CookieToast
          closeToast={closeToast}
          toastProps={toastProps}
          acceptCookies={acceptCookies}
          setIsCookieModalOpen={setIsCookieModalOpen}
        />
      ),
      { position: 'bottom-left', delay: 700 }
    )
    return true
  }
  return false
}

export type CookieToastProps = ToastContentProps & {
  acceptCookies: (cookies: PurposeCookieType) => void
  setIsCookieModalOpen: (open: boolean) => void
}

export const CookieToast = ({
  closeToast,
  toastProps,
  acceptCookies,
  setIsCookieModalOpen,
}: CookieToastProps) => {
  const dismissButton = classNames(
    'flex-initial rounded border bg-transparent py-1 px-2 font-semibold hover:border-transparent hover:bg-gray-500 hover:text-white',
    {
      'border-gray-200 text-gray-700': toastProps.theme === 'light',
      'border-gray-700 text-gray-200': toastProps.theme === 'dark',
    }
  )

  return (
    <div>
      <div className="mb-2">{COOKIE_STATEMENT}</div>
      <div className="flex gap-2">
        <button
          className="flex-1 rounded border-b-4 border-blue-700 bg-blue-500 py-1 px-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={() => {
            acceptCookies({ necessary: true, statistics: true })
            if (closeToast) closeToast()
          }}
        >
          Accept
        </button>
        <button
          className={dismissButton}
          onClick={() => {
            setIsCookieModalOpen(true)
            if (closeToast) closeToast()
          }}
        >
          Decline
        </button>
      </div>
    </div>
  )
}
