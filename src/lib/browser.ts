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

export type PurposeCookieType = {
  necessary?: boolean
  preferences?: boolean
  statistics?: boolean
  marketing?: boolean
}
