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
  let guesses: string[] = []
  const sequences = generateStartingSequences()
  for (let i = sequences.length - 1; i >= 0; i--) {
    let sequence = shiftArrayRight(sequences[i])
    for (let j = 0; j < NUM_FRAMES; j++) {
      const wordGuess = sequence
        .map((t) => turdleToLetter(t))
        .reduce((prefix, l) => prefix + l)
      if (!guesses.includes(wordGuess)) {
        guesses.push(wordGuess)
      }
      sequence = shiftArrayRight(sequence)
    }
  }
  guesses = shuffle(guesses, xor(1))
  console.log(guesses)
  return guesses
}

function generateStartingSequences(): string[][] {
  const sequences: string[][] = []
  const guesses: string[] = []
  const colors: number[] = new Array(NUM_COLORS)
  for (let i = 0; i < NUM_COLORS; i++) {
    colors[i] = i
  }
  const allColors = variationsRep(colors)
  for (let i = 0; i < NUM_COLORS; i++) {
    allColors.push(new Array(NUM_COLORS).fill(i))
  }
  let sequence: string[] = []
  for (let j = 0; j < allColors.length; j++) {
    for (let k = 0; k < NUM_COLORS; k++) {
      for (let h = 0; h < NUM_FRAMES; h++) {
        for (let i = 0; i < NUM_FRAMES; i++) {
          const f = (h + i) % NUM_FRAMES
          const c = allColors[j][k++]
          if (isNaN(f) || isNaN(c)) continue
          sequence.push(f + '_' + c)
          if (sequence.length === NUM_FRAMES) {
            const wordGuess = sequence
              .map((t) => turdleToLetter(t))
              .reduce((prefix, l) => prefix + l)
            if (!guesses.includes(wordGuess)) {
              guesses.push(wordGuess)
              sequences.push(sequence)
            }
            sequence = []
          }
        }
      }
    }
  }
  return sequences
}

/** Generates all variations with repetition (order matters). */
function variationsRep(arr: any[], l?: number): any[][] {
  if (l === void 0) l = arr.length // Length of the combinations
  var data = Array(l), // Used to store state
    results = [] // Array of results
  ;(function f(pos) {
    // Recursive function
    if (pos === l) {
      // End reached
      results.push(data.slice()) // Add a copy of data to results
      return
    }
    for (var i = 0; i < arr.length; ++i) {
      data[pos] = arr[i] // Update data
      f(pos + 1) // Call f recursively
    }
  })(0) // Start at index 0
  return results // Return results
}

function shiftArrayRight(arr: any[]): any[] {
  const temp = arr[arr.length - 1]
  for (let i = arr.length - 1; i > 0; i--) {
    arr[i] = arr[i - 1]
  }
  arr[0] = temp
  return arr
}

// Predictable Fisher-Yates Shuffle, given a seed like xor(1)
function shuffle(arr: any[], seed = Math.random): any[] {
  let m = arr.length
  let t
  let i
  while (m) {
    i = Math.floor(seed() * m--)
    t = arr[m]
    arr[m] = arr[i]
    arr[i] = t
  }
  return arr
}

// XORshift PRNG
function xor(seed: number): () => number {
  const baseSeeds = [123456789, 362436069, 521288629, 88675123]

  let [x, y, z, w] = baseSeeds

  const random = (): number => {
    const t = x ^ (x << 11)
    ;[x, y, z] = [y, z, w]
    w = w ^ (w >> 19) ^ (t ^ (t >> 8))
    return w / 0x7fffffff
  }

  ;[x, y, z, w] = baseSeeds.map((i) => i + seed)
  ;[x, y, z, w] = [0, 0, 0, 0].map(() => Math.round(random() * 1e16))

  return random
}
