import { useEffect, useRef } from 'react'
import usePWAInstall from 'use-pwa-install'
import { useMediaQuery } from 'usehooks-ts'

/** Adapted from https://blog.logrocket.com/accessing-previous-props-state-react-hooks/ */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value //assign the value of ref to the argument
  }, [value]) //this code will run when the value of 'value' changes
  return ref.current //in the end, return the current ref value.
}

export function usePwaInstall() {
  const { isInstalled: wasInstalled, install } = usePWAInstall()
  const isInstalled = useIsInstalled() || wasInstalled
  return { isInstalled, install }
}

function useIsInstalled(): boolean {
  const media = useMediaQuery('(display-mode: standalone)')
  const andref = document.referrer.includes('android-app://')
  return media || andref
}
