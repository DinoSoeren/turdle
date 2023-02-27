import { useCookieConsentContext } from '@use-cookie-consent/react'
import assert from 'assert'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import ReactGA from 'react-ga4'
import { Metric } from 'web-vitals'

import { isProd } from '../lib/browser'
import reportWebVitals from '../reportWebVitals'

export interface GaState {
  /** If debug mode is enabled, GA events will be sent in local dev. */
  debugMode?: boolean
  isGaReady: boolean
  isGaAllowed: boolean
  setIsGaAllowed: (allowed: boolean) => void
  gaEvent: (options: GaEventOptions) => void
}

export interface GaEventOptions {
  category: 'Game Stats' | 'Archive' | 'UI Event' | 'Web Vitals' | 'Error'
  action: string
  value?: number
  label?: string
  nonInteraction?: boolean
  transport?: 'beacon' | 'xhr' | 'image'
}

export const GaContext = createContext<GaState | null>({
  debugMode: false,
  isGaReady: false,
  isGaAllowed: false,
  setIsGaAllowed: () => null,
  gaEvent: () => null,
})
GaContext.displayName = 'GaContext'

export const useGaContext = () => useContext(GaContext) as GaState

export interface GaProviderProps {
  children?: ReactNode
  debugMode?: boolean
}

export const GaProvider = ({ children, debugMode }: GaProviderProps) => {
  const { consent } = useCookieConsentContext()
  const [wereVitalsSent, setWereVitalsSent] = useState(false)
  const [isGaReady, setIsGaReady] = useState(false)
  const [isGaAllowed, setIsGaAllowed] = useState<boolean>(
    () => consent.statistics ?? true
  )
  const gaEvent = useCallback(
    (options: GaEventOptions) => {
      if (isGaReady && isGaAllowed && (isProd() || debugMode)) {
        ReactGA.event({
          ...options,
          value: options.value ? Math.round(options.value) : undefined, // values must be integers
        })
      }
    },
    [isGaAllowed, isGaReady, debugMode]
  )
  const sendVitalsToGA = useCallback(
    (metric: Metric) => {
      gaEvent({
        category: 'Web Vitals',
        action: metric.name,
        value: metric.name === 'CLS' ? metric.value * 1000 : metric.value,
        label: metric.id,
        nonInteraction: true, // avoids affecting bounce rate
      })
    },
    [gaEvent]
  )

  // Initialize GA immediately when it is allowed by cookie consent
  useEffect(() => {
    if (!isGaReady && isGaAllowed && (isProd() || debugMode)) {
      assert(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID, 'Missing GA ID')
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID)
      setIsGaReady(true)
    }
  }, [isGaAllowed, isGaReady, debugMode])

  // Report web vitals immediately after initializing
  // Learn more: https://bit.ly/CRA-vitals
  useEffect(() => {
    if (isGaReady && isGaAllowed && !wereVitalsSent) {
      reportWebVitals(sendVitalsToGA)
      setWereVitalsSent(true)
    }
  }, [sendVitalsToGA, isGaAllowed, isGaReady, wereVitalsSent])

  return (
    <GaContext.Provider
      value={{
        debugMode,
        isGaReady,
        isGaAllowed,
        setIsGaAllowed,
        gaEvent,
      }}
    >
      {children}
    </GaContext.Provider>
  )
}
