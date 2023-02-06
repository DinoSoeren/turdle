const gameStateKey = 'gameState'
const archiveGameStateKey = 'archiveGameState'
const gameSettingsKey = 'gameSettings'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (
  isLatestGame: boolean,
  gameState: StoredGameState
) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  localStorage.setItem(key, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (isLatestGame: boolean) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  const state = localStorage.getItem(key)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export type GameSettings = {
  isFirstTimePlaying: boolean
  isExtraVisionModeEnabled: boolean
  // Note: All GameSettings added beyond this point _MUST_ be optional,
  // otherwise the app will fail to load settings from previous versions.
  highContrastModeEnabled?: boolean
  isMemeModeEnabled?: boolean
}

export const saveSettingsToLocalStorage = (gameSettings: GameSettings) => {
  localStorage.setItem(gameSettingsKey, JSON.stringify(gameSettings))
}

export const loadSettingsFromLocalStorage = () => {
  const settings = localStorage.getItem(gameSettingsKey)
  return settings ? (JSON.parse(settings) as GameSettings) : null
}
