import { letterToColorIdx } from './validGuesses'

export function turtleFilter(value?: string): string {
  const hue = letterToColorIdx(value) * 360
  const effect = 'saturate(3) contrast(160%)'
  return 'hue-rotate(' + hue + 'deg) ' + effect
}

export function turtleTransform(value?: string): string {
  return '' // 'scaleX(-1) rotate(-' + deg + 'deg) '
}
