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

/** Set @param debug `true` to send event to GA in dev mode (why tho?) */
export function gaEvent(options: {
  category: 'Game Stats'|'UI Event'|'Web Vitals'|'Error'
  action: string
  value?: number
  label?: string
  nonInteraction?: boolean
  transport?: 'beacon' | 'xhr' | 'image'
  debug?: boolean
}) {
  if (!options.debug && !isProd()) return
  ReactGA.event({
    ...options,
    value: options.value ? Math.round(options.value) : undefined, // values must be integers
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
  gaEvent({
    category: 'Web Vitals',
    action: name,
    value: name === 'CLS' ? value * 1000 : value,
    label: id,
    nonInteraction: true, // avoids affecting bounce rate
  })
}
