export const NUM_FRAMES = 5
export const NUM_COLORS = 5

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

export const VALIDGUESSES = generateAllValidGuesses()

export function letterToTurdle(letter?: string): string {
  return letterToFrameIdx(letter) - 1 + '_' + (letterToColorIdx(letter) - 1)
}

export function turdleToLetter(turdle: string): string {
  const [fIdx, cIdx] = turdle.split('_')
  return KeyboardLetters[
    parseInt(cIdx) * NUM_COLORS + (parseInt(fIdx) % NUM_FRAMES)
  ]
}

/** Rounds to the nearest multiple of Y. */
export function roundMultiple(x: number, y: number): number {
  return Math.ceil(x / y) * y
}

export function letterToFrameIdx(value?: string): number {
  const letterIdx = KeyboardLetters.indexOf(value || 'Q')
  return ((letterIdx * NUM_COLORS) % KeyboardLetters.length) / NUM_COLORS + 1
}

export function letterToColorIdx(value?: string): number {
  const letterIdx = KeyboardLetters.indexOf(value || 'Q')
  const nearestM = roundMultiple(letterIdx + 1, NUM_FRAMES)
  return nearestM / KeyboardLetters.length
}

function generateAllValidGuesses(): string[] {
  const guesses: string[] = []
  const colors: number[] = new Array(NUM_COLORS)
  for (let i = 0; i < NUM_COLORS; i++) {
    colors[i] = i
  }
  const allColors = permutator(colors)
  for (let i = 0; i < NUM_COLORS; i++) {
    allColors.push(new Array(NUM_COLORS).fill(i))
  }
  let guess: string[] = []
  for (let j = 0; j < allColors.length; j++) {
    for (let k = 0; k < NUM_COLORS; k++) {
      for (let h = 0; h < NUM_FRAMES; h++) {
        for (let i = 0; i < NUM_FRAMES; i++) {
          const f = (h + i) % NUM_FRAMES
          const c = allColors[j][k++]
          if (isNaN(f) || isNaN(c)) continue
          guess.push(f + '_' + c)
          if (guess.length === NUM_FRAMES) {
            const wordGuess = guess
              .map((t) => turdleToLetter(t))
              .reduce((prefix, l) => prefix + l)
            if (!guesses.includes(wordGuess)) guesses.push(wordGuess)
            guess = []
          }
        }
      }
    }
  }
  console.log(guesses)
  return guesses
}

function permutator(inputArr: any[]): any[][] {
  let result: any[][] = []

  const permute = (arr: any[], m: any[] = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

function isValidGuess(guess: string[]): boolean {
  if (guess.length !== NUM_FRAMES) return false
  const frames = guess.map((t) => parseInt(t.split('_')[0]))
  const start = frames.indexOf(0)
  for (let i = 0; i < NUM_FRAMES; i++) {
    if (frames[(start + i) % NUM_FRAMES] !== i) {
      console.log(frames[(start + i) % NUM_FRAMES] + '!==' + i)
      return false
    }
  }
  return true
}
