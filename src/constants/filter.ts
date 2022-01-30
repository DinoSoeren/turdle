export const KeyboardLetters = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
]

/** Rounds to the nearest multiple of Y. */
function roundMultiple(x: number, y: number): number {
  return Math.ceil(x / y) * y
}

export function letterToTurtleIdx(value?: string): number {
  const letterIdx = KeyboardLetters.indexOf(value || 'Q')
  return ((letterIdx * 5) % KeyboardLetters.length) / 5 + 1
}

export function turtleFilter(value?: string): string {
  const letterIdx = KeyboardLetters.indexOf(value || 'Q')
  const nearestM = roundMultiple(letterIdx + 1, 5)
  const hue = (nearestM / KeyboardLetters.length) * 360
  const effect =
    nearestM % 3 === 0
      ? 'saturate(3)'
      : letterIdx % 3 === 1
      ? 'contrast(160%)'
      : 'brightness(1.35)'
  return 'hue-rotate(' + hue + 'deg) ' + effect
}

export function turtleTransform(value?: string): string {
  return '' // 'scaleX(-1) rotate(-' + deg + 'deg) '
}
