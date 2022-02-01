import { letterToColorIdx, KeyboardLetters, NUM_FRAMES } from './validGuesses'

export function turtleFilter(value?: string): string {
  const colorIdx = letterToColorIdx(value)
  const hue = ((colorIdx * NUM_FRAMES) / KeyboardLetters.length) * 360
  const effect = 'saturate(' + (colorIdx === 1 ? '0' : '1') + ') contrast(260%)'
  return 'hue-rotate(' + hue + 'deg) ' + effect
}

export function turtleTransform(value?: string): string {
  return '' // 'scaleX(-1) rotate(-' + deg + 'deg) '
}
