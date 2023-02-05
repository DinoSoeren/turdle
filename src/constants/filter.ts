import { KeyboardLetters, NUM_FRAMES, letterToColorIdx } from './validGuesses'

export interface FilterProps {
  value?: string
  isMemeMode?: boolean
  isHighContrast?: boolean
}

export function turtleFilter({
  value,
  isMemeMode,
  isHighContrast,
}: FilterProps): string {
  const offset = isMemeMode ? 1 : 0
  const colorIdx = letterToColorIdx(value) + offset
  const hue = ((colorIdx * NUM_FRAMES) / KeyboardLetters.length) * 360
  const contrast = isHighContrast ? 'contrast(260%)' : ''
  const effect = 'saturate(' + (colorIdx - offset === 1 ? '0' : '1') + ') '
  return 'hue-rotate(' + hue + 'deg) ' + effect + contrast
}

export function turtleTransform(value?: string): string {
  return '' // 'scaleX(-1) rotate(-' + deg + 'deg) '
}
