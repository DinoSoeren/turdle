import assert from 'assert'
import ReactGA from 'react-ga4'
import { UAParser } from 'ua-parser-js'

const inAppBrowserNames = [
  'Facebook',
  'Instagram',
  'Line',
  'Messenger',
  'Puffin',
  'Twitter',
  'WeChat',
]

const parser = new UAParser()
const browser = parser.getBrowser()

export const isInAppBrowser = () => {
  return inAppBrowserNames.indexOf(browser.name ?? '') > -1
}

export function isProd() {
  return process.env.NODE_ENV === 'production'
}

/** Set @param debug `true` to initialize GA in dev mode (why tho?) */
export function initGA({ debug }: { debug?: boolean } = {}) {
  if (!debug && !isProd()) return
  assert(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID, 'Missing GA ID')
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID)
}

/** Set @param debug `true` to send to GA in dev mode (why tho?) */
export function sendToAnalytics({
  category,
  action,
  value,
  label,
  nonInteraction,
  debug,
}: {
  category: string
  action: string
  value: number
  label: string
  nonInteraction: boolean
  debug?: boolean
}) {
  if (!debug && !isProd()) return
  ReactGA.event({
    category,
    action,
    value: Math.round(value), // values must be integers
    label,
    nonInteraction,
  })
}

export function sendVitalsToGA({
  id,
  name,
  value,
}: {
  id: string
  name: string
  value: number
}) {
  sendToAnalytics({
    category: 'Web Vitals',
    action: name,
    value: name === 'CLS' ? value * 1000 : value,
    label: id,
    nonInteraction: true, // avoids affecting bounce rate
  })
}
