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
  const hueDegrees = ((colorIdx * NUM_FRAMES) / KeyboardLetters.length) * 360
  const hue = `hue-rotate(${hueDegrees}deg)`
  const contrast = isHighContrast ? 'contrast(260%)' : ''
  const saturate = `saturate(${colorIdx - offset === 1 ? '0' : '1'})`
  const shadow = isHighContrast ? `drop-shadow(0 0 1px rgb(50, 50, 50))` : ''
  return `${hue} ${saturate} ${shadow} ${contrast}`
}

export function turtleTransform(value?: string): string {
  return '' // 'scaleX(-1) rotate(-' + deg + 'deg) '
}
